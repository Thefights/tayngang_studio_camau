import mongoose, { Document, Schema, Types } from 'mongoose'
import { auditSchemaOptions } from '../lib/mongodb'

export interface ICartItem {
	product: Types.ObjectId
	variantId?: string // If product has variants
	quantity: number
	unitPrice: number // VND - price at the time of adding to cart
	totalPrice: number // VND - quantity * unitPrice
}

export interface ICart extends Document {
	_id: Types.ObjectId
	user?: Types.ObjectId // Optional - null for guest carts
	sessionId?: string // For guest carts identification
	items: ICartItem[]
	subtotal: number // VND - total of all items
	currency: 'VND'
	note?: string
	isActive: boolean
	expiresAt?: Date // For guest carts cleanup
	createAt: Date
	updateAt: Date
	createBy?: Types.ObjectId
	updateBy?: Types.ObjectId
}

const CartItemSchema = new Schema<ICartItem>({
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: [true, 'Product is required'],
	},
	variantId: {
		type: String,
		trim: true,
	},
	quantity: {
		type: Number,
		required: [true, 'Quantity is required'],
		min: [1, 'Quantity must be at least 1'],
		max: [100, 'Quantity cannot exceed 100'],
	},
	unitPrice: {
		type: Number,
		required: [true, 'Unit price is required'],
		min: [0, 'Unit price must be positive'],
	},
	totalPrice: {
		type: Number,
		required: [true, 'Total price is required'],
		min: [0, 'Total price must be positive'],
	},
})

const CartSchema = new Schema<ICart>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			index: true,
		},
		sessionId: {
			type: String,
			trim: true,
			index: true,
			validate: {
				validator: function (this: ICart, value: string) {
					// Either user or sessionId must be provided, but not both
					return (this.user && !value) || (!this.user && !!value)
				},
				message: 'Cart must belong to either a user or have a session ID for guests',
			},
		},
		items: {
			type: [CartItemSchema],
			default: [],
			validate: {
				validator: function (items: ICartItem[]) {
					return items.length <= 50 // Limit cart items
				},
				message: 'Cart cannot have more than 50 items',
			},
		},
		subtotal: {
			type: Number,
			required: true,
			min: [0, 'Subtotal must be positive'],
			default: 0,
		},
		currency: {
			type: String,
			enum: ['VND'],
			default: 'VND',
		},
		note: {
			type: String,
			trim: true,
			maxlength: [500, 'Note cannot be more than 500 characters'],
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		expiresAt: {
			type: Date,
			default: function (this: ICart) {
				// Guest carts expire after 7 days
				if (!this.user) {
					return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
				}
				return undefined
			},
			index: { expireAfterSeconds: 0 }, // MongoDB TTL index
		},
		createBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		updateBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		...auditSchemaOptions,
		collection: 'carts',
	}
)


CartSchema.index({ user: 1, isActive: 1 })
CartSchema.index({ sessionId: 1, isActive: 1 })
CartSchema.index({ expiresAt: 1 })

// Pre-save middleware to calculate subtotal
CartSchema.pre('save', function (this: ICart, next) {
	// Calculate subtotal from items
	this.subtotal = this.items.reduce((total: number, item: ICartItem) => {
		// Ensure totalPrice is calculated correctly
		item.totalPrice = item.quantity * item.unitPrice
		return total + item.totalPrice
	}, 0)

	// Round to avoid floating point issues
	this.subtotal = Math.round(this.subtotal)

	next()
})

// Method to add item to cart
CartSchema.methods.addItem = function (
	productId: Types.ObjectId,
	variantId: string | null,
	quantity: number,
	unitPrice: number
) {
	const existingItemIndex = this.items.findIndex(
		(item: ICartItem) => item.product.equals(productId) && item.variantId === variantId
	)

	if (existingItemIndex > -1) {
		// Update existing item
		this.items[existingItemIndex].quantity += quantity
		this.items[existingItemIndex].totalPrice =
			this.items[existingItemIndex].quantity * this.items[existingItemIndex].unitPrice
	} else {
		// Add new item
		this.items.push({
			product: productId,
			variantId,
			quantity,
			unitPrice,
			totalPrice: quantity * unitPrice,
		})
	}

	return this.save()
}

// Method to remove item from cart
CartSchema.methods.removeItem = function (productId: Types.ObjectId, variantId?: string) {
	this.items = this.items.filter(
		(item: ICartItem) => !(item.product.equals(productId) && item.variantId === variantId)
	)

	return this.save()
}

// Method to update item quantity
CartSchema.methods.updateItemQuantity = function (
	productId: Types.ObjectId,
	variantId: string | null,
	quantity: number
) {
	const itemIndex = this.items.findIndex(
		(item: ICartItem) => item.product.equals(productId) && item.variantId === variantId
	)

	if (itemIndex > -1) {
		if (quantity <= 0) {
			this.items.splice(itemIndex, 1)
		} else {
			this.items[itemIndex].quantity = quantity
			this.items[itemIndex].totalPrice = quantity * this.items[itemIndex].unitPrice
		}
	}

	return this.save()
}

// Method to clear cart
CartSchema.methods.clearCart = function () {
	this.items = []
	this.subtotal = 0
	this.note = undefined

	return this.save()
}

// Virtual for item count
CartSchema.virtual('itemCount').get(function (this: ICart) {
	return this.items.reduce((total: number, item: ICartItem) => total + item.quantity, 0)
})

// Virtual to check if cart is empty
CartSchema.virtual('isEmpty').get(function (this: ICart) {
	return this.items.length === 0
})

// Ensure virtual fields are serialized
CartSchema.set('toJSON', { virtuals: true })

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema)

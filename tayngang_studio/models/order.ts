import mongoose, { Document, Schema, Types } from 'mongoose'
import { OrderStatus, PaymentStatus } from '../enum/payment-enum'
import { auditSchemaOptions } from '../lib/mongodb'

export interface IOrderItem {
	product: Types.ObjectId
	productName: string
	variantId?: string
	variantName?: string
	quantity: number
	unitPrice: number
	totalPrice: number
	productImage?: string
}

export interface IShippingAddress {
	fullName: string
	phoneNumber: string
	address: string
	note?: string
}

export interface IOrder extends Document {
	_id: Types.ObjectId
	orderNumber: string
	user?: Types.ObjectId
	email: string
	phoneNumber: string
	items: IOrderItem[]
	subtotal: number
	discountAmount: number
	voucherCode?: string
	voucherDiscount?: number
	total: number
	currency: 'VND'
	shippingAddress: IShippingAddress
	status: OrderStatus
	paymentStatus: PaymentStatus
	paymentMethod?: 'payos' | 'cash' | 'bank_transfer'
	paymentId?: string
	note?: string
	cancelReason?: string
	orderDate: Date
	estimatedDeliveryDate?: Date
	actualDeliveryDate?: Date
	createAt: Date
	updateAt: Date
	createBy?: Types.ObjectId
	updateBy?: Types.ObjectId
}

const OrderItemSchema = new Schema<IOrderItem>({
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: [true, 'Product is required'],
	},
	productName: {
		type: String,
		required: [true, 'Product name is required'],
		trim: true,
	},
	variantId: {
		type: String,
		trim: true,
	},
	variantName: {
		type: String,
		trim: true,
	},
	quantity: {
		type: Number,
		required: [true, 'Quantity is required'],
		min: [1, 'Quantity must be at least 1'],
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
	productImage: {
		type: String,
		trim: true,
	},
})

const ShippingAddressSchema = new Schema<IShippingAddress>({
	fullName: {
		type: String,
		required: [true, 'Full name is required'],
		trim: true,
		maxlength: [100, 'Full name cannot be more than 100 characters'],
	},
	phoneNumber: {
		type: String,
		required: [true, 'Phone number is required'],
		trim: true,
		match: [/^[0-9]{10,11}$/, 'Please enter a valid phone number'],
	},
	address: {
		type: String,
		required: [true, 'Address is required'],
		trim: true,
		maxlength: [500, 'Address cannot be more than 500 characters'],
	},
	note: {
		type: String,
		trim: true,
		maxlength: [200, 'Note cannot be more than 200 characters'],
	},
})

const OrderSchema = new Schema<IOrder>(
	{
		orderNumber: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			uppercase: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			index: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			lowercase: true,
			trim: true,
			match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
		},
		phoneNumber: {
			type: String,
			required: [true, 'Phone number is required'],
			trim: true,
			match: [/^[0-9]{10,11}$/, 'Please enter a valid phone number'],
		},
		items: {
			type: [OrderItemSchema],
			required: true,
			validate: {
				validator: function (items: IOrderItem[]) {
					return items.length > 0
				},
				message: 'Order must have at least one item',
			},
		},
		subtotal: {
			type: Number,
			required: true,
			min: [0, 'Subtotal must be positive'],
		},
		discountAmount: {
			type: Number,
			default: 0,
			min: [0, 'Discount amount must be positive'],
		},
		voucherCode: {
			type: String,
			trim: true,
			uppercase: true,
		},
		voucherDiscount: {
			type: Number,
			default: 0,
			min: [0, 'Voucher discount must be positive'],
		},
		total: {
			type: Number,
			required: true,
			min: [0, 'Total must be positive'],
		},
		currency: {
			type: String,
			enum: ['VND'],
			default: 'VND',
		},
		shippingAddress: {
			type: ShippingAddressSchema,
			required: [true, 'Shipping address is required'],
		},
		status: {
			type: String,
			enum: Object.values(OrderStatus),
			default: OrderStatus.PENDING,
			index: true,
		},
		paymentStatus: {
			type: String,
			enum: Object.values(PaymentStatus),
			default: PaymentStatus.PENDING,
			index: true,
		},
		paymentMethod: {
			type: String,
			enum: ['payos', 'cash', 'bank_transfer'],
		},
		paymentId: {
			type: String,
			trim: true,
			index: true,
		},
		note: {
			type: String,
			trim: true,
			maxlength: [1000, 'Note cannot be more than 1000 characters'],
		},
		cancelReason: {
			type: String,
			trim: true,
			maxlength: [500, 'Cancel reason cannot be more than 500 characters'],
		},
		orderDate: {
			type: Date,
			default: Date.now,
			index: true,
		},
		estimatedDeliveryDate: {
			type: Date,
		},
		actualDeliveryDate: {
			type: Date,
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
		collection: 'orders',
	}
)

OrderSchema.index({ orderNumber: 1 })
OrderSchema.index({ user: 1, orderDate: -1 })
OrderSchema.index({ email: 1, orderDate: -1 })
OrderSchema.index({ status: 1, orderDate: -1 })
OrderSchema.index({ paymentStatus: 1, orderDate: -1 })
OrderSchema.index({ orderDate: -1 })

OrderSchema.pre('save', function (this: IOrder, next) {
	if (!this.orderNumber) {
		const timestamp = Date.now().toString()
		const random = Math.floor(Math.random() * 1000)
			.toString()
			.padStart(3, '0')
		this.orderNumber = `ORD${timestamp}${random}`
	}

	this.subtotal = this.items.reduce((total: number, item: IOrderItem) => {
		item.totalPrice = item.quantity * item.unitPrice
		return total + item.totalPrice
	}, 0)

	this.discountAmount = this.voucherDiscount || 0

	this.total = this.subtotal - this.discountAmount

	this.subtotal = Math.round(this.subtotal)
	this.discountAmount = Math.round(this.discountAmount)
	this.total = Math.round(this.total)

	next()
})

OrderSchema.virtual('statusDisplay').get(function (this: IOrder) {
	return this.status
})

OrderSchema.virtual('paymentStatusDisplay').get(function (this: IOrder) {
	return this.paymentStatus
})

OrderSchema.virtual('totalItems').get(function (this: IOrder) {
	return this.items.reduce((total: number, item: IOrderItem) => total + item.quantity, 0)
})

OrderSchema.methods.canBeCancelled = function () {
	return (
		[OrderStatus.PENDING, OrderStatus.CONFIRMED].includes(this.status) &&
		this.paymentStatus !== PaymentStatus.PAID
	)
}

OrderSchema.methods.canBeRefunded = function () {
	return (
		this.paymentStatus === PaymentStatus.PAID &&
		[OrderStatus.CONFIRMED, OrderStatus.PAID].includes(this.status)
	)
}

OrderSchema.set('toJSON', { virtuals: true })

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)

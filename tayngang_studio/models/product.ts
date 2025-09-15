import mongoose, { Document, Schema, Types } from 'mongoose'
import { auditSchemaOptions } from '../lib/mongodb'

export interface IProductVariant {
	name: string
	price: number
	originalPrice?: number
	stock: number
	sku: string
	images: string[]
	description?: string
}

export interface IComboRule {
	name: string
	description: string
	requiredProducts: {
		productId: Types.ObjectId
		variantId?: string
		quantity: number
	}[]
	discountPrice: number
	isActive: boolean
}

export interface IProduct extends Document {
	_id: Types.ObjectId
	name: string
	description: string
	category: 'notebook' | 'keychain' | 'combo'
	basePrice: number
	currency: 'VND'
	variants: IProductVariant[]
	images: string[]
	stock: number
	isActive: boolean
	isCombo: boolean
	comboRules?: IComboRule[]
	tags: string[]
	dimensions?: {
		length: number
		width: number
	}
	qrCode?: string
	material?: string
	language?: 'vi' | 'en'
	createAt: Date
	updateAt: Date
	createBy?: Types.ObjectId
	updateBy?: Types.ObjectId
}

const ProductVariantSchema = new Schema<IProductVariant>({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
		min: [0, 'Price must be positive'],
	},
	originalPrice: {
		type: Number,
		min: [0, 'Original price must be positive'],
	},
	stock: {
		type: Number,
		required: true,
		min: [0, 'Stock must be non-negative'],
		default: 0,
	},
	sku: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	images: [
		{
			type: String,
			trim: true,
		},
	],
	description: {
		type: String,
		trim: true,
	},
})

const ComboRuleSchema = new Schema<IComboRule>({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	requiredProducts: [
		{
			productId: {
				type: Schema.Types.ObjectId,
				ref: 'Product',
				required: true,
			},
			variantId: {
				type: String,
			},
			quantity: {
				type: Number,
				required: true,
				min: [1, 'Quantity must be at least 1'],
			},
		},
	],
	discountPrice: {
		type: Number,
		required: true,
		min: [0, 'Discount price must be positive'],
	},
	isActive: {
		type: Boolean,
		default: true,
	},
})

const ProductSchema = new Schema<IProduct>(
	{
		name: {
			type: String,
			required: [true, 'Product name is required'],
			trim: true,
			maxlength: [200, 'Product name cannot be more than 200 characters'],
		},
		description: {
			type: String,
			required: [true, 'Product description is required'],
			trim: true,
			maxlength: [2000, 'Description cannot be more than 2000 characters'],
		},
		category: {
			type: String,
			enum: ['notebook', 'keychain', 'combo'],
			required: [true, 'Category is required'],
		},
		basePrice: {
			type: Number,
			required: [true, 'Base price is required'],
			min: [0, 'Price must be positive'],
		},
		currency: {
			type: String,
			enum: ['VND'],
			default: 'VND',
		},
		variants: [ProductVariantSchema],
		images: [
			{
				type: String,
				trim: true,
				required: [true, 'At least one image is required'],
			},
		],
		stock: {
			type: Number,
			required: true,
			min: [0, 'Stock must be non-negative'],
			default: 0,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isCombo: {
			type: Boolean,
			default: false,
		},
		comboRules: [ComboRuleSchema],
		tags: [
			{
				type: String,
				trim: true,
				lowercase: true,
			},
		],

		qrCode: {
			type: String,
			trim: true,
		},
		material: {
			type: String,
			trim: true,
		},
		language: {
			type: String,
			enum: ['vi', 'en'],
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
		collection: 'products',
	}
)

ProductSchema.index({ category: 1, isActive: 1 })
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' })
ProductSchema.index({ 'variants.sku': 1 })

ProductSchema.virtual('totalStock').get(function (this: IProduct) {
	if (this.variants && this.variants.length > 0) {
		return this.variants.reduce(
			(total: number, variant: IProductVariant) => total + variant.stock,
			0
		)
	}
	return this.stock
})

ProductSchema.set('toJSON', { virtuals: true })

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

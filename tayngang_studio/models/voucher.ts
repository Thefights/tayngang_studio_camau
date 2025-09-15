import mongoose, { Document, Schema, Types } from 'mongoose'
import { auditSchemaOptions } from '../lib/mongodb'

export interface IVoucher extends Document {
	_id: Types.ObjectId
	code: string
	name: string
	description?: string
	discountType: 'percentage' | 'fixed'
	discountValue: number // Percentage (0-100) or fixed amount in VND
	maxDiscountAmount?: number // Maximum discount in VND for percentage type
	minOrderAmount?: number // Minimum order amount in VND to apply voucher
	currency: 'VND'
	usageLimit?: number // Total usage limit
	usageCount: number // Current usage count
	usageLimitPerUser?: number // Usage limit per user
	isActive: boolean
	validFrom: Date
	validTo: Date
	applicableCategories?: string[] // Product categories this voucher applies to
	excludedProducts?: Types.ObjectId[] // Products excluded from this voucher
	isFirstTimeOnly?: boolean // Only for first-time customers
	createAt: Date
	updateAt: Date
	createBy?: Types.ObjectId
	updateBy?: Types.ObjectId
}

const VoucherSchema = new Schema<IVoucher>(
	{
		code: {
			type: String,
			required: [true, 'Voucher code is required'],
			unique: true,
			uppercase: true,
			trim: true,
			maxlength: [20, 'Voucher code cannot be more than 20 characters'],
			match: [
				/^[A-Z0-9_-]+$/,
				'Voucher code can only contain uppercase letters, numbers, underscore and dash',
			],
		},
		name: {
			type: String,
			required: [true, 'Voucher name is required'],
			trim: true,
			maxlength: [100, 'Voucher name cannot be more than 100 characters'],
		},
		description: {
			type: String,
			trim: true,
			maxlength: [500, 'Description cannot be more than 500 characters'],
		},
		discountType: {
			type: String,
			enum: ['percentage', 'fixed'],
			required: [true, 'Discount type is required'],
		},
		discountValue: {
			type: Number,
			required: [true, 'Discount value is required'],
			min: [0, 'Discount value must be positive'],
			validate: {
				validator: function (this: IVoucher, value: number) {
					if (this.discountType === 'percentage') {
						return value >= 0 && value <= 100
					}
					return value >= 0
				},
				message: 'Percentage discount must be between 0 and 100',
			},
		},
		maxDiscountAmount: {
			type: Number,
			min: [0, 'Max discount amount must be positive'],
			validate: {
				validator: function (this: IVoucher, value: number) {
					// Only required for percentage discounts
					if (this.discountType === 'percentage' && value == null) {
						return false
					}
					return true
				},
				message: 'Max discount amount is required for percentage vouchers',
			},
		},
		minOrderAmount: {
			type: Number,
			min: [0, 'Minimum order amount must be positive'],
			default: 0,
		},
		currency: {
			type: String,
			enum: ['VND'],
			default: 'VND',
		},
		usageLimit: {
			type: Number,
			min: [1, 'Usage limit must be at least 1'],
		},
		usageCount: {
			type: Number,
			default: 0,
			min: [0, 'Usage count cannot be negative'],
		},
		usageLimitPerUser: {
			type: Number,
			min: [1, 'Usage limit per user must be at least 1'],
			default: 1,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		validFrom: {
			type: Date,
			required: [true, 'Valid from date is required'],
		},
		validTo: {
			type: Date,
			required: [true, 'Valid to date is required'],
			validate: {
				validator: function (this: IVoucher, value: Date) {
					return value > this.validFrom
				},
				message: 'Valid to date must be after valid from date',
			},
		},
		applicableCategories: [
			{
				type: String,
				trim: true,
				lowercase: true,
			},
		],
		excludedProducts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
		isFirstTimeOnly: {
			type: Boolean,
			default: false,
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
		collection: 'vouchers',
	}
)

// Indexes for performance
VoucherSchema.index({ code: 1 })
VoucherSchema.index({ isActive: 1, validFrom: 1, validTo: 1 })
VoucherSchema.index({ validTo: 1 })

// Virtual to check if voucher is currently valid
VoucherSchema.virtual('isCurrentlyValid').get(function () {
	const now = new Date()
	return (
		this.isActive &&
		this.validFrom <= now &&
		this.validTo >= now &&
		(!this.usageLimit || this.usageCount < this.usageLimit)
	)
})

// Method to check if voucher can be used
VoucherSchema.methods.canBeUsed = function (orderAmount?: number, userUsageCount?: number) {
	if (!this.isCurrentlyValid) return false

	if (orderAmount && this.minOrderAmount && orderAmount < this.minOrderAmount) {
		return false
	}

	if (userUsageCount && this.usageLimitPerUser && userUsageCount >= this.usageLimitPerUser) {
		return false
	}

	return true
}

// Method to calculate discount amount
VoucherSchema.methods.calculateDiscount = function (orderAmount: number) {
	if (!this.canBeUsed(orderAmount)) return 0

	let discount = 0

	if (this.discountType === 'percentage') {
		discount = (orderAmount * this.discountValue) / 100
		if (this.maxDiscountAmount && discount > this.maxDiscountAmount) {
			discount = this.maxDiscountAmount
		}
	} else {
		discount = Math.min(this.discountValue, orderAmount)
	}

	return Math.round(discount)
}

// Ensure virtual fields are serialized
VoucherSchema.set('toJSON', { virtuals: true })

export default mongoose.models.Voucher || mongoose.model<IVoucher>('Voucher', VoucherSchema)

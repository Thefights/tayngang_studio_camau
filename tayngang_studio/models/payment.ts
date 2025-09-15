import mongoose, { Document, Schema, Types } from 'mongoose'
import { PaymentStatus } from '../enum/payment-enum'
import { auditSchemaOptions } from '../lib/mongodb'

export interface IPayment extends Document {
	_id: Types.ObjectId
	paymentCode: string
	order: Types.ObjectId
	user?: Types.ObjectId
	amount: number
	currency: 'VND'
	paymentMethod: 'payos' | 'cash' | 'bank_transfer'

	payosOrderId?: number
	payosTransactionId?: string
	payosAccountNumber?: string
	payosAccountName?: string
	payosReference?: string
	payosDescription?: string
	payosReturnUrl?: string
	payosCancelUrl?: string
	payosWebhookUrl?: string

	status: PaymentStatus
	failureReason?: string

	gatewayResponse?: any
	gatewayTransactionId?: string
	gatewayStatus?: string

	refundAmount?: number
	refundReason?: string
	refundDate?: Date
	refundTransactionId?: string

	paidAt?: Date
	failedAt?: Date
	cancelledAt?: Date
	refundedAt?: Date

	customerEmail?: string
	customerPhone?: string
	ipAddress?: string
	userAgent?: string

	createAt: Date
	updateAt: Date
	createBy?: Types.ObjectId
	updateBy?: Types.ObjectId
}

const PaymentSchema = new Schema<IPayment>(
	{
		paymentCode: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			uppercase: true,
			index: true,
		},
		order: {
			type: Schema.Types.ObjectId,
			ref: 'Order',
			required: [true, 'Order is required'],
			index: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			index: true,
		},
		amount: {
			type: Number,
			required: [true, 'Amount is required'],
			min: [1, 'Amount must be positive'],
		},
		currency: {
			type: String,
			enum: ['VND'],
			default: 'VND',
		},
		paymentMethod: {
			type: String,
			enum: ['payos', 'cash', 'bank_transfer'],
			required: [true, 'Payment method is required'],
			index: true,
		},

		payosOrderId: {
			type: Number,
			index: true,
		},
		payosTransactionId: {
			type: String,
			trim: true,
			index: true,
		},
		payosAccountNumber: {
			type: String,
			trim: true,
		},
		payosAccountName: {
			type: String,
			trim: true,
		},
		payosReference: {
			type: String,
			trim: true,
			index: true,
		},
		payosDescription: {
			type: String,
			trim: true,
			maxlength: [500, 'Description cannot be more than 500 characters'],
		},
		payosReturnUrl: {
			type: String,
			trim: true,
		},
		payosCancelUrl: {
			type: String,
			trim: true,
		},
		payosWebhookUrl: {
			type: String,
			trim: true,
		},

		status: {
			type: String,
			enum: Object.values(PaymentStatus),
			default: PaymentStatus.PENDING,
			index: true,
		},
		failureReason: {
			type: String,
			trim: true,
			maxlength: [500, 'Failure reason cannot be more than 500 characters'],
		},

		gatewayResponse: {
			type: Schema.Types.Mixed,
		},
		gatewayTransactionId: {
			type: String,
			trim: true,
			index: true,
		},
		gatewayStatus: {
			type: String,
			trim: true,
		},

		refundAmount: {
			type: Number,
			min: [0, 'Refund amount must be positive'],
		},
		refundReason: {
			type: String,
			trim: true,
			maxlength: [500, 'Refund reason cannot be more than 500 characters'],
		},
		refundDate: {
			type: Date,
		},
		refundTransactionId: {
			type: String,
			trim: true,
		},

		paidAt: {
			type: Date,
			index: true,
		},
		failedAt: {
			type: Date,
		},
		cancelledAt: {
			type: Date,
		},
		refundedAt: {
			type: Date,
		},

		customerEmail: {
			type: String,
			lowercase: true,
			trim: true,
		},
		customerPhone: {
			type: String,
			trim: true,
		},
		ipAddress: {
			type: String,
			trim: true,
		},
		userAgent: {
			type: String,
			trim: true,
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
		collection: 'payments',
	}
)

PaymentSchema.index({ order: 1, status: 1 })
PaymentSchema.index({ paymentMethod: 1, status: 1 })
PaymentSchema.index({ createAt: -1 })
PaymentSchema.index({ paidAt: -1 })
PaymentSchema.index({ payosOrderId: 1 })

PaymentSchema.pre('save', function (this: IPayment, next) {
	if (!this.paymentCode) {
		const timestamp = Date.now().toString()
		const random = Math.floor(Math.random() * 1000)
			.toString()
			.padStart(3, '0')
		this.paymentCode = `PAY${timestamp}${random}`
	}

	if (this.isModified('status')) {
		const now = new Date()

		switch (this.status) {
			case PaymentStatus.PAID:
				if (!this.paidAt) this.paidAt = now
				break
			case PaymentStatus.FAILED:
				if (!this.failedAt) this.failedAt = now
				break
			case PaymentStatus.CANCELLED:
				if (!this.cancelledAt) this.cancelledAt = now
				break
			case PaymentStatus.REFUNDED:
				if (!this.refundedAt) this.refundedAt = now
				if (!this.refundDate) this.refundDate = now
				break
		}
	}

	next()
})

PaymentSchema.virtual('statusDisplay').get(function (this: IPayment) {
	return this.status
})

PaymentSchema.virtual('paymentMethodDisplay').get(function (this: IPayment) {
	const methodMap = {
		payos: 'PayOS',
		cash: 'Tiền mặt',
		bank_transfer: 'Chuyển khoản ngân hàng',
	}
	return methodMap[this.paymentMethod] || this.paymentMethod
})

PaymentSchema.virtual('formattedAmount').get(function (this: IPayment) {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(this.amount)
})

PaymentSchema.methods.canBeRefunded = function () {
	return this.status === PaymentStatus.PAID && this.paymentMethod === 'payos'
}

PaymentSchema.methods.isSuccessful = function () {
	return this.status === PaymentStatus.PAID
}

PaymentSchema.methods.isFailed = function () {
	return [PaymentStatus.FAILED, PaymentStatus.CANCELLED].includes(this.status)
}

PaymentSchema.methods.getPaymentDuration = function () {
	if (!this.paidAt) return null

	const startTime = this.createAt
	const endTime = this.paidAt

	return endTime.getTime() - startTime.getTime()
}

PaymentSchema.set('toJSON', { virtuals: true })

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema)

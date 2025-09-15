import crypto from 'crypto'
import mongoose, { Document, Schema, Types } from 'mongoose'
import { auditSchemaOptions } from '../lib/mongodb'

export interface IUser extends Document {
	_id: Types.ObjectId
	name: string
	email: string
	phoneNumber: string
	password?: string
	role: 'admin' | 'customer'
	isActive: boolean
	isEmailVerified: boolean
	emailVerificationToken?: string
	emailVerificationExpires?: Date
	passwordResetToken?: string
	passwordResetExpires?: Date
	createAt: Date
	updateAt: Date
	createBy?: Types.ObjectId
	updateBy?: Types.ObjectId
}

const UserSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
			maxlength: [100, 'Name cannot be more than 100 characters'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
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
		password: {
			type: String,
			minlength: [6, 'Password must be at least 6 characters'],
			select: false,
		},
		role: {
			type: String,
			enum: ['admin', 'customer'],
			default: 'customer',
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		emailVerificationToken: {
			type: String,
			select: false, // Don't include in queries by default
		},
		emailVerificationExpires: {
			type: Date,
			select: false,
		},
		passwordResetToken: {
			type: String,
			select: false,
		},
		passwordResetExpires: {
			type: Date,
			select: false,
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
		collection: 'users',
	}
)

UserSchema.index({ email: 1 })
UserSchema.index({ phoneNumber: 1 })
UserSchema.index({ emailVerificationToken: 1 })
UserSchema.index({ passwordResetToken: 1 })

// Method to generate email verification token
UserSchema.methods.generateEmailVerificationToken = function () {
	const token = crypto.randomBytes(32).toString('hex')

	this.emailVerificationToken = crypto.createHash('sha256').update(token).digest('hex')
	this.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

	return token // Return unhashed token to send via email
}

// Method to generate password reset token
UserSchema.methods.generatePasswordResetToken = function () {
	const token = crypto.randomBytes(32).toString('hex')

	this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
	this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

	return token // Return unhashed token to send via email
}

// Method to verify email
UserSchema.methods.verifyEmail = function () {
	this.isEmailVerified = true
	this.emailVerificationToken = undefined
	this.emailVerificationExpires = undefined
	return this.save()
}

// Static method to find user by verification token
UserSchema.statics.findByVerificationToken = function (token: string) {
	const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

	return this.findOne({
		emailVerificationToken: hashedToken,
		emailVerificationExpires: { $gt: Date.now() },
	})
}

// Static method to find user by password reset token
UserSchema.statics.findByPasswordResetToken = function (token: string) {
	const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

	return this.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	})
}

UserSchema.pre('save', function (next) {
	if (this.isNew && !this.createBy) {
		this.createBy = this._id
	}
	this.updateBy = this._id
	next()
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

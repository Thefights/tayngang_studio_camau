import mongoose from 'mongoose'

declare global {
	// eslint-disable-next-line no-var
	var mongoose: any
}

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDatabase() {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		const opts = {
			dbName: 'tayngang_studio',
			bufferCommands: false,
			maxIdleTimeMS: 10000, 
		}

		cached.promise = mongoose
			.connect(MONGODB_URI, opts)
			.then((mongoose: typeof import('mongoose')) => {
				return mongoose
			})
	}

	try {
		cached.conn = await cached.promise
	} catch (e) {
		cached.promise = null
		throw e
	}

	return cached.conn
}

export function getVietnamTime(): Date {
	const now = new Date()
	const utc = now.getTime() + now.getTimezoneOffset() * 60000
	const vietnamTime = new Date(utc + 7 * 3600000) // UTC+7
	return vietnamTime
}

export const auditSchemaOptions = {
	timestamps: {
		createdAt: 'createAt',
		updatedAt: 'updateAt',
	},
	transform: function (doc: any, ret: any) {
		if (ret.createAt) {
			ret.createAt = getVietnamTime()
		}
		if (ret.updateAt) {
			ret.updateAt = getVietnamTime()
		}
		return ret
	},
}

export default connectToDatabase

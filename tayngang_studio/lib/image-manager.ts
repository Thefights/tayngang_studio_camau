import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from './r2-cloudflare'

const BUCKET_NAME = 'tayngang-studio-images' // You may want to add this to env

export interface UploadImageOptions {
	file: File
	folder?: string
	fileName?: string
}

export interface UpdateImageOptions {
	file: File
	existingImageKey: string
	folder?: string
	fileName?: string
}

// Generate unique filename
export const generateFileName = (originalName: string, folder?: string): string => {
	const timestamp = Date.now()
	const random = Math.random().toString(36).substring(2, 15)
	const extension = originalName.split('.').pop()
	const baseName = originalName.split('.').slice(0, -1).join('.')
	const fileName = `${baseName}_${timestamp}_${random}.${extension}`

	return folder ? `${folder}/${fileName}` : fileName
}

// Upload image to R2
export const uploadImage = async ({ file, folder, fileName }: UploadImageOptions) => {
	try {
		const key = fileName || generateFileName(file.name, folder)
		const buffer = Buffer.from(await file.arrayBuffer())

		const command = new PutObjectCommand({
			Bucket: BUCKET_NAME,
			Key: key,
			Body: buffer,
			ContentType: file.type,
			Metadata: {
				originalName: file.name,
				uploadedAt: new Date().toISOString(),
			},
		})

		await r2.send(command)

		return {
			success: true,
			key,
			url: `https://${BUCKET_NAME}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`,
			message: 'Image uploaded successfully',
		}
	} catch (error) {
		console.error('Error uploading image:', error)
		return {
			success: false,
			error: error,
			message: 'Failed to upload image',
		}
	}
}

// Get image URL (signed URL for private access or public URL)
export const getImageUrl = async (key: string, expiresIn: number = 3600): Promise<string> => {
	try {
		const command = new GetObjectCommand({
			Bucket: BUCKET_NAME,
			Key: key,
		})

		// Generate signed URL for temporary access
		const signedUrl = await getSignedUrl(r2, command, { expiresIn })
		return signedUrl
	} catch (error) {
		console.error('Error getting image URL:', error)
		throw new Error('Failed to get image URL')
	}
}

// Get public image URL (for public bucket)
export const getPublicImageUrl = (key: string): string => {
	return `https://${BUCKET_NAME}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`
}

// Delete image from R2
export const deleteImage = async (key: string) => {
	try {
		const command = new DeleteObjectCommand({
			Bucket: BUCKET_NAME,
			Key: key,
		})

		await r2.send(command)

		return {
			success: true,
			message: 'Image deleted successfully',
		}
	} catch (error) {
		console.error('Error deleting image:', error)
		return {
			success: false,
			error: error,
			message: 'Failed to delete image',
		}
	}
}

// Update image (upload new and delete existing)
export const updateImage = async ({
	file,
	existingImageKey,
	folder,
	fileName,
}: UpdateImageOptions) => {
	try {
		// Upload new image
		const uploadResult = await uploadImage({ file, folder, fileName })

		if (!uploadResult.success) {
			return {
				success: false,
				error: uploadResult.error,
				message: 'Failed to upload new image',
			}
		}

		// Delete existing image
		const deleteResult = await deleteImage(existingImageKey)

		if (!deleteResult.success) {
			console.warn('Failed to delete existing image:', deleteResult.error)
			// Don't fail the entire operation if delete fails
		}

		return {
			success: true,
			key: uploadResult.key,
			url: uploadResult.url,
			message: 'Image updated successfully',
			deleteResult,
		}
	} catch (error) {
		console.error('Error updating image:', error)
		return {
			success: false,
			error: error,
			message: 'Failed to update image',
		}
	}
}

// Utility function to extract key from URL
export const extractKeyFromUrl = (url: string): string => {
	const urlParts = url.split('/')
	return urlParts.slice(-1)[0] // Get the last part which should be the key
}

import { updateImage } from '@/lib/image-manager'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
	try {
		const formData = await request.formData()
		const file = formData.get('file') as File
		const existingImageKey = formData.get('existingImageKey') as string
		const folder = formData.get('folder') as string | null
		const fileName = formData.get('fileName') as string | null

		if (!file) {
			return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 })
		}

		if (!existingImageKey) {
			return NextResponse.json(
				{ success: false, message: 'Existing image key is required' },
				{ status: 400 }
			)
		}

		if (!file.type.startsWith('image/')) {
			return NextResponse.json(
				{ success: false, message: 'Only image files are allowed' },
				{ status: 400 }
			)
		}

		const maxSize = 10 * 1024 * 1024 
		if (file.size > maxSize) {
			return NextResponse.json(
				{ success: false, message: 'File size too large. Maximum 10MB allowed.' },
				{ status: 400 }
			)
		}

		const result = await updateImage({
			file,
			existingImageKey,
			folder: folder || undefined,
			fileName: fileName || undefined,
		})

		if (result.success) {
			return NextResponse.json(result, { status: 200 })
		} else {
			return NextResponse.json(result, { status: 500 })
		}
	} catch (error) {
		console.error('Update image API error:', error)
		return NextResponse.json(
			{ success: false, message: 'Internal server error', error },
			{ status: 500 }
		)
	}
}

export async function POST(request: NextRequest) {
	return PUT(request)
}

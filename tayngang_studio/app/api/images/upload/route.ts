import { uploadImage } from '@/lib/image-manager'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData()
		const file = formData.get('file') as File
		const folder = formData.get('folder') as string | null
		const fileName = formData.get('fileName') as string | null

		if (!file) {
			return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 })
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

		const result = await uploadImage({
			file,
			folder: folder || undefined,
			fileName: fileName || undefined,
		})

		if (result.success) {
			return NextResponse.json(result, { status: 200 })
		} else {
			return NextResponse.json(result, { status: 500 })
		}
	} catch (error) {
		console.error('Upload API error:', error)
		return NextResponse.json(
			{ success: false, message: 'Internal server error', error },
			{ status: 500 }
		)
	}
}

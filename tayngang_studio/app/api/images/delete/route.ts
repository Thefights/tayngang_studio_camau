import { deleteImage } from '@/lib/image-manager'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const key = searchParams.get('key')

		if (!key) {
			return NextResponse.json(
				{ success: false, message: 'Image key is required' },
				{ status: 400 }
			)
		}

		const result = await deleteImage(key)

		if (result.success) {
			return NextResponse.json(result, { status: 200 })
		} else {
			return NextResponse.json(result, { status: 500 })
		}
	} catch (error) {
		console.error('Delete image API error:', error)
		return NextResponse.json(
			{ success: false, message: 'Internal server error', error },
			{ status: 500 }
		)
	}
}

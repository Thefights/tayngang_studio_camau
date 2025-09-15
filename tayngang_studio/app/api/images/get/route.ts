import { getImageUrl, getPublicImageUrl } from '@/lib/image-manager'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const key = searchParams.get('key')
		const isPublic = searchParams.get('public') === 'true'
		const expiresIn = parseInt(searchParams.get('expiresIn') || '3600')

		if (!key) {
			return NextResponse.json(
				{ success: false, message: 'Image key is required' },
				{ status: 400 }
			)
		}

		try {
			let imageUrl: string

			if (isPublic) {
				imageUrl = getPublicImageUrl(key)
			} else {
				imageUrl = await getImageUrl(key, expiresIn)
			}

			return NextResponse.json({
				success: true,
				url: imageUrl,
				key,
				expiresIn: isPublic ? null : expiresIn,
			})
		} catch (error) {
			return NextResponse.json(
				{ success: false, message: 'Failed to get image URL', error },
				{ status: 500 }
			)
		}
	} catch (error) {
		console.error('Get image API error:', error)
		return NextResponse.json(
			{ success: false, message: 'Internal server error', error },
			{ status: 500 }
		)
	}
}

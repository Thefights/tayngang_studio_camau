'use client'

import { authService } from '@/services/other/auth.service'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'

interface RouteGuardProps {
	children: ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
	const pathname = usePathname()
	const router = useRouter()
	const [isChecking, setIsChecking] = useState(true)

	useEffect(() => {
		// Chỉ chạy kiểm tra khi component đã mount trên client
		if (typeof window === 'undefined') return

		const userRole = authService.getUserRole()

		// Nếu user là Admin
		if (userRole === 'Admin') {
			// Kiểm tra nếu đang không ở route /admin
			if (!pathname.startsWith('/admin')) {
				// Redirect về trang admin
				router.replace('/admin')
				return
			}
		}

		// Nếu user không phải Admin nhưng đang cố truy cập route /admin
		if (userRole !== 'Admin' && pathname.startsWith('/admin')) {
			// Redirect về trang chủ
			router.replace('/')
			return
		}

		// Hoàn tất kiểm tra
		setIsChecking(false)
	}, [pathname, router])

	// Hiển thị loading trong khi kiểm tra route
	if (isChecking) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-[#5A3E2B]'>Đang tải...</div>
			</div>
		)
	}

	return <>{children}</>
}

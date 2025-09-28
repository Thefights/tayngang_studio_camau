'use client'

import { Button } from '@/components/ui/button'
import { authService } from '@/services/other/auth.service'
import { BarChart3, LogOut, Package, ShoppingCart, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AdminSidebar() {
	const pathname = usePathname()

	const menuItems = [
		{ id: 'analytics', label: 'Thống kê', icon: BarChart3, href: '/admin/analytics' },
		{ id: 'products', label: 'Sản phẩm', icon: Package, href: '/admin/products' },
		{ id: 'categories', label: 'Danh mục', icon: Package, href: '/admin/categories' },
		{ id: 'orders', label: 'Đơn hàng', icon: ShoppingCart, href: '/admin/orders' },
		{ id: 'customers', label: 'Khách hàng', icon: Users, href: '/admin/customers' },
	]

	const handleLogout = () => {
		authService.logout()
		window.location.href = '/'
	}
	return (
		<div className='w-64 bg-white border-r border-[#5A3E2B]/10 flex flex-col'>
			{/* Logo */}
			<div className='p-6 border-b border-[#5A3E2B]/10'>
				<Link href='/admin'>
					<div className='flex items-center space-x-2'>
						<div className='w-8 h-8 bg-[#5A3E2B] rounded-sm flex items-center justify-center'>
							<span className='text-white font-bold text-sm'>CM</span>
						</div>
						<div>
							<span className='font-serif text-lg text-[#5A3E2B] font-medium'>Admin Panel</span>
							<p className='text-xs text-[#5A3E2B]/70'>TayNgang Studio</p>
						</div>
					</div>
				</Link>
			</div>

			{/* Navigation */}
			<nav className='flex-1 p-4 space-y-2'>
				{menuItems.map((item) => {
					const Icon = item.icon
					const isActive = pathname.startsWith(item.href)
					return (
						<Button
							key={item.id}
							variant={isActive ? 'default' : 'ghost'}
							className={`w-full justify-start ${
								isActive
									? 'bg-[#5A3E2B] text-white hover:bg-[#5A3E2B]/90'
									: 'text-[#5A3E2B] hover:bg-[#5A3E2B]/10'
							}`}
							asChild
						>
							<Link href={item.href}>
								<Icon className='w-4 h-4 mr-3' />
								{item.label}
							</Link>
						</Button>
					)
				})}
			</nav>

			{/* Logout */}
			<div className='p-4 border-t border-[#5A3E2B]/10'>
				<Button
					onClick={handleLogout}
					variant='ghost'
					className='w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700'
				>
					<LogOut className='w-4 h-4 mr-3' />
					Đăng xuất
				</Button>
			</div>
		</div>
	)
}

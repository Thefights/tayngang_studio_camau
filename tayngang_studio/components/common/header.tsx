'use client'

import { Button } from '@/components/ui/button'
import Logo from '@/public/assets/home/logo.png'
import { authService } from '@/services/other/auth.service'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, LogOut, Menu, ShoppingCart, User, UserCircle, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [userRole, setUserRole] = useState<string | null>(null)
	const [user, setUser] = useState<{
		name: string | null
		email: string | null
	}>({
		name: null,
		email: null,
	})

	useEffect(() => {
		const token = authService.getAccessToken()
		const role = authService.getUserRole()
		if (token) {
			setIsAuthenticated(true)
			setUserRole(role)
			setUser({
				name: localStorage.getItem('userName'),
				email: localStorage.getItem('userEmail'),
			})
		}
	}, [])

	const handleLogout = () => {
		authService.logout()
		setIsAuthenticated(false)
		setUserRole(null)
		setUser({ name: null, email: null })
		setIsAccountDropdownOpen(false)
		window.location.href = '/'
	}

	return (
		<header className='bg-white/90 backdrop-blur-sm border-b border-[#5A3E2B]/10 sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<Link href='/' className='flex items-center space-x-2'>
						<div className='w-8 h-8 bg-[#00000] rounded-sm flex items-center justify-center'>
							<Image
								src={Logo}
								alt='TayNgang Studio'
								className='w-20 h-20'
								width={32}
								height={32}
							/>
						</div>
						<span className='font-serif text-xl text-[#5A3E2B] font-medium'>TayNgang Studio</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center space-x-8'>
						<Link
							href='/'
							className='text-[#5A3E2B] hover:text-[#87C1D8] transition-colors font-medium'
						>
							Trang chủ
						</Link>
						<Link
							href='/products'
							className='text-[#5A3E2B] hover:text-[#87C1D8] transition-colors font-medium'
						>
							Sản phẩm
						</Link>
						<Link
							href='/about'
							className='text-[#5A3E2B] hover:text-[#87C1D8] transition-colors font-medium'
						>
							Về chúng tôi
						</Link>
					</nav>

					{/* Desktop Actions */}
					<div className='hidden md:flex items-center space-x-4'>
						<Button
							variant='ghost'
							size='lg'
							asChild
							className='text-[#5A3E2B] hover:text-[#87C1D8]'
						></Button>

						<div className='relative'>
							<Button
								variant='ghost'
								size='lg'
								className='text-[#5A3E2B] hover:text-[#87C1D8] transition-all duration-200'
								onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
							>
								<User className='w-4 h-4 mr-2' />
								Tài khoản
								<ChevronDown
									className={`w-3 h-3 ml-1 transition-transform duration-200 ${
										isAccountDropdownOpen ? 'rotate-180' : ''
									}`}
								/>
							</Button>

							<AnimatePresence>
								{isAccountDropdownOpen && (
									<motion.div
										initial={{ opacity: 0, y: -10, scale: 0.95 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: -10, scale: 0.95 }}
										transition={{ duration: 0.2, ease: 'easeOut' }}
										className='absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#5A3E2B]/10 py-2 z-50'
										onMouseLeave={() => setIsAccountDropdownOpen(false)}
									>
										{isAuthenticated ? (
											<>
												{/* User Info */}
												<div className='px-4 py-3 border-b border-[#5A3E2B]/10'>
													<p className='text-sm font-medium text-[#5A3E2B]'>{user.name}</p>
													<p className='text-xs text-[#5A3E2B]/70'>{user.email}</p>
												</div>

												{/* Menu Items */}
												<Link
													href='/account'
													className='flex items-center px-4 py-2 text-sm text-[#5A3E2B] hover:bg-[#5A3E2B]/5 transition-colors'
													onClick={() => setIsAccountDropdownOpen(false)}
												>
													<UserCircle className='w-4 h-4 mr-3' />
													Xem hồ sơ
												</Link>

												<button
													onClick={handleLogout}
													className='flex items-center w-full px-4 py-2 text-sm text-[#5A3E2B] hover:bg-[#5A3E2B]/5 transition-colors'
												>
													<LogOut className='w-4 h-4 mr-3' />
													Đăng xuất
												</button>
											</>
										) : (
											<>
												<Link
													href='/auth/login'
													className='flex items-center px-4 py-2 text-sm text-[#5A3E2B] hover:bg-[#5A3E2B]/5 transition-colors'
													onClick={() => setIsAccountDropdownOpen(false)}
												>
													<User className='w-4 h-4 mr-3' />
													Đăng nhập
												</Link>

												<Link
													href='/auth/register'
													className='flex items-center px-4 py-2 text-sm text-[#5A3E2B] hover:bg-[#5A3E2B]/5 transition-colors'
													onClick={() => setIsAccountDropdownOpen(false)}
												>
													<UserCircle className='w-4 h-4 mr-3' />
													Đăng ký
												</Link>
											</>
										)}
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						<Button
							variant='ghost'
							size='sm'
							asChild
							className='text-[#5A3E2B] hover:text-[#87C1D8] relative'
						>
							<Link href='/cart'>
								<ShoppingCart className='w-4 h-4' />
								<span className='absolute -top-1 -right-1 bg-[#A5C6A1] text-[#2D5A27] text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium'>
									0
								</span>
							</Link>
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<Button
						variant='ghost'
						size='sm'
						className='md:hidden text-[#5A3E2B]'
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
					</Button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className='md:hidden py-4 border-t border-[#5A3E2B]/10'>
						<nav className='flex flex-col space-y-4'>
							<Link
								href='/'
								className='text-[#5A3E2B] hover:text-[#87C1D8] transition-colors font-medium'
							>
								Trang chủ
							</Link>
							<Link
								href='/products'
								className='text-[#5A3E2B] hover:text-[#87C1D8] transition-colors font-medium'
							>
								Sản phẩm
							</Link>
							<Link
								href='/about'
								className='text-[#5A3E2B] hover:text-[#87C1D8] transition-colors font-medium'
							>
								Về chúng tôi
							</Link>
							<div className='flex items-center space-x-4 pt-4 border-t border-[#5A3E2B]/10'>
								<Button variant='ghost' size='sm' asChild className='text-[#5A3E2B]'></Button>
								<Button variant='ghost' size='sm' asChild className='text-[#5A3E2B]'>
									<Link href='/account'>
										<User className='w-4 h-4 mr-2' />
										Tài khoản
									</Link>
								</Button>
								<Button variant='ghost' size='sm' asChild className='text-[#5A3E2B] relative'>
									<Link href='/cart'>
										<ShoppingCart className='w-4 h-4' />
										<span className='absolute -top-1 -right-1 bg-[#A5C6A1] text-[#2D5A27] text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium'>
											0
										</span>
									</Link>
								</Button>
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	)
}

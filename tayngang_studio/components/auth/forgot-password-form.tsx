'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgotPasswordSchema } from '@/lib/validations/auth.validation'
import { authService } from '@/services/other/auth.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as yup from 'yup'

type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [emailSent, setEmailSent] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<ForgotPasswordFormData>({
		resolver: yupResolver(forgotPasswordSchema),
	})

	const onSubmit = async (data: ForgotPasswordFormData) => {
		setIsLoading(true)
		try {
			await authService.forgotPassword(data)
			setEmailSent(true)
			toast.success('Mật khẩu mới đã được gửi đến email của bạn!')
		} catch (err: any) {
			toast.error(err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.')
		} finally {
			setIsLoading(false)
		}
	}

	if (emailSent) {
		return (
			<div className='max-w-md mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					className='text-center mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
						<Mail className='w-8 h-8 text-green-600' />
					</div>
					<h1 className='text-3xl font-serif text-[#5A3E2B] mb-2'>Email đã được gửi!</h1>
					<p className='text-[#5A3E2B]/70 mb-4'>
						Mật khẩu mới đã được gửi đến địa chỉ email: <strong>{getValues('email')}</strong>
					</p>
					<p className='text-[#5A3E2B]/70 text-sm'>
						Vui lòng kiểm tra hộp thư đến và hộp thư spam của bạn.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
				>
					<Card className='p-8 bg-white border-[#5A3E2B]/10 shadow-lg'>
						<div className='space-y-4'>
							<Button asChild className='w-full bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white'>
								<Link href='/auth/login'>
									<ArrowLeft className='w-4 h-4 mr-2' />
									Quay lại đăng nhập
								</Link>
							</Button>

							<div className='text-center'>
								<p className='text-[#5A3E2B]/70 text-sm'>
									Cần gửi lại mật khẩu?{' '}
									<button
										onClick={() => setEmailSent(false)}
										className='text-[#87C1D8] hover:text-[#5A3E2B] font-medium transition-colors'
									>
										Thử lại
									</button>
								</p>
							</div>
						</div>
					</Card>
				</motion.div>
			</div>
		)
	}

	return (
		<div className='max-w-md mx-auto px-4 sm:px-6 lg:px-8'>
			<motion.div
				className='text-center mb-8'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<h1 className='text-3xl font-serif text-[#5A3E2B] mb-2'>Quên mật khẩu?</h1>
				<p className='text-[#5A3E2B]/70'>
					Nhập địa chỉ email của bạn và chúng tôi sẽ gửi mật khẩu mới cho bạn.
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
			>
				<Card className='p-8 bg-white border-[#5A3E2B]/10 shadow-lg'>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
						{/* Email Field */}
						<motion.div
							className='space-y-2'
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							<Label htmlFor='email' className='text-[#5A3E2B] font-medium'>
								Email
							</Label>
							<div className='relative'>
								<Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50' />
								<Input
									id='email'
									type='email'
									{...register('email')}
									className='pl-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white transition-all duration-300 focus:ring-2 focus:ring-[#5A3E2B]/20'
									placeholder='your@email.com'
								/>
								{errors.email && (
									<p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
								)}
							</div>
						</motion.div>

						{/* Submit Button */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<Button
								type='submit'
								disabled={isLoading}
								className='w-full bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white py-3 text-base font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'
							>
								{isLoading ? (
									<div className='flex items-center gap-2'>
										<div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
										Đang gửi...
									</div>
								) : (
									<>
										Gửi mật khẩu mới
										<ArrowRight className='w-4 h-4 ml-2' />
									</>
								)}
							</Button>
						</motion.div>
					</form>

					{/* Back to Login */}
					<motion.div
						className='mt-8 text-center'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.5 }}
					>
						<Link
							href='/auth/login'
							className='inline-flex items-center text-[#87C1D8] hover:text-[#5A3E2B] font-medium transition-colors'
						>
							<ArrowLeft className='w-4 h-4 mr-2' />
							Quay lại đăng nhập
						</Link>
					</motion.div>
				</Card>
			</motion.div>
		</div>
	)
}

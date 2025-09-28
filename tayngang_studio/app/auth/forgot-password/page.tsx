import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Forgot Password | Tayngang Studio Ca Mau',
	description: 'Reset your password',
}

export default function ForgotPasswordPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-[#F5F1EB] to-[#E8DDD4] flex items-center justify-center py-12'>
			<ForgotPasswordForm />
		</div>
	)
}

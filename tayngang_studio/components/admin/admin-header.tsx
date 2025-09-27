'use client'

import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'

export function AdminHeader() {
	return (
		<header className='bg-white border-b border-[#5A3E2B]/10 px-6 py-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-4'>
					<h1 className='text-2xl font-serif text-[#5A3E2B]'>Dashboard</h1>
				</div>

				<div className='flex items-center space-x-4'>
					{/* Profile */}
					<Button variant='ghost' size='sm' className='text-[#5A3E2B] hover:bg-[#5A3E2B]/10'>
						<User className='w-5 h-5 mr-2' />
						Admin
					</Button>
				</div>
			</div>
		</header>
	)
}

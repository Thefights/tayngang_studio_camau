'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { getUserById, updateUser } from '@/services/other/users-management.service'
import { IUser } from '@/types/user'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

interface UpdateUserProps {
	userId: number
	onBack: () => void
	onUserUpdated: () => void
}

export function UpdateUser({ userId, onBack, onUserUpdated }: UpdateUserProps) {
	const [formData, setFormData] = useState<Partial<IUser>>({})

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await getUserById(userId)
				setFormData(data)
			} catch (error) {
				console.error(`Failed to fetch user with id ${userId}`, error)
			}
		}
		fetchUser()
	}, [userId])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleRoleChange = (value: string) => {
		setFormData((prev) => ({ ...prev, role: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await updateUser(userId, formData)
			onUserUpdated()
		} catch (error) {
			console.error('Failed to update user', error)
		}
	}

	return (
		<div className='space-y-6'>
			<Button onClick={onBack} variant='outline'>
				<ArrowLeft className='w-4 h-4 mr-2' />
				Back to User List
			</Button>

			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<h2 className='text-2xl font-serif text-[#5A3E2B] mb-4'>Update User</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<Input
						name='email'
						value={formData.email || ''}
						onChange={handleChange}
						placeholder='Email'
						required
					/>
					<Input
						name='fullName'
						value={formData.fullName || ''}
						onChange={handleChange}
						placeholder='Full Name'
					/>
					<Input
						name='phone'
						value={formData.phone || ''}
						onChange={handleChange}
						placeholder='Phone'
					/>
					<Input
						name='address'
						value={formData.address || ''}
						onChange={handleChange}
						placeholder='Address'
					/>
					<Select onValueChange={handleRoleChange} value={formData.role}>
						<SelectTrigger>
							<SelectValue placeholder='Select a role' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='Admin'>Admin</SelectItem>
							<SelectItem value='Customer'>Customer</SelectItem>
						</SelectContent>
					</Select>
					<Button type='submit'>Update User</Button>
				</form>
			</Card>
		</div>
	)
}

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
import { updateUserSchema } from '@/lib/validations/user.validation'
import { getUserById, updateUser } from '@/services/manager/users-management.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as yup from 'yup'

interface UpdateUserProps {
	userId: number
	onBack: () => void
	onUserUpdated: () => void
}

type UpdateUserFormData = yup.InferType<typeof updateUserSchema>

type FormDataType = UpdateUserFormData & { email: string }

export function UpdateUser({ userId, onBack, onUserUpdated }: UpdateUserProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
		setValue,
	} = useForm<FormDataType>({
		resolver: yupResolver(updateUserSchema as any),
	})

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await getUserById(userId)
				reset(data as any)
				setValue('email', data.email)
			} catch (error: any) {
				console.error(`Failed to fetch user with id ${userId}`, error)
				toast.error(error.response?.data?.message || `Failed to fetch user with id ${userId}`)
			}
		}
		fetchUser()
	}, [userId, reset, setValue])

	const onSubmit = async (data: UpdateUserFormData) => {
		try {
			await updateUser(userId, data)
			toast.success('User updated successfully')
			onUserUpdated()
		} catch (error: any) {
			console.error('Failed to update user', error)
			toast.error(error.response?.data?.message || 'Failed to update user')
		}
	}

	return (
		<div className='space-y-6'>
			<Button onClick={onBack} variant='outline'>
				<ArrowLeft className='w-4 h-4 mr-2' />
				Trở về
			</Button>

			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<h2 className='text-2xl font-serif text-[#5A3E2B] mb-4'>Update User</h2>
				<form onSubmit={handleSubmit(onSubmit as any)} className='space-y-4'>
					<div>
						<Input {...register('email')} placeholder='Email' disabled />
						{errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
					</div>
					<div>
						<Input {...register('name')} placeholder='Name' />
						{errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
					</div>
					<div>
						<Input {...register('phone')} placeholder='Phone' />
						{errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>}
					</div>
					<div>
						<Input {...register('address')} placeholder='Address' />
						{errors.address && (
							<p className='text-red-500 text-sm mt-1'>{errors.address.message}</p>
						)}
					</div>
					<div>
						<Controller
							name='role'
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder='Select a role' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Admin'>Admin</SelectItem>
										<SelectItem value='Customer'>Customer</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.role && <p className='text-red-500 text-sm mt-1'>{errors.role.message}</p>}
					</div>
					<Button type='submit'>Update User</Button>
				</form>
			</Card>
		</div>
	)
}

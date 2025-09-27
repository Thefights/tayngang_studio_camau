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
import { createUserSchema } from '@/lib/validations/user.validation'
import { createUser } from '@/services/other/users-management.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowLeft } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as yup from 'yup'

interface CreateUserProps {
	onBack: () => void
	onUserCreated: () => void
}

type FormData = yup.InferType<typeof createUserSchema>

export function CreateUser({ onBack, onUserCreated }: CreateUserProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<FormData>({
		resolver: yupResolver(createUserSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
			phone: '',
			address: '',
			role: 'Customer',
		},
	})

	const onSubmit = async (data: FormData) => {
		try {
			await createUser(data)
			toast.success('User created successfully')
			onUserCreated()
		} catch (error: any) {
			console.error('Failed to create user', error)
			toast.error(error.response?.data?.message || 'Failed to create user')
		}
	}

	return (
		<div className='space-y-6'>
			<Button onClick={onBack} variant='outline'>
				<ArrowLeft className='w-4 h-4 mr-2' />
				Back to User List
			</Button>

			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<h2 className='text-2xl font-serif text-[#5A3E2B] mb-4'>Create New User</h2>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div>
						<Input {...register('email')} placeholder='Email' />
						{errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
					</div>
					<div>
						<Input type='password' {...register('password')} placeholder='Password' />
						{errors.password && (
							<p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
						)}
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
								<Select onValueChange={field.onChange} defaultValue={field.value}>
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
					<Button type='submit'>Create User</Button>
				</form>
			</Card>
		</div>
	)
}

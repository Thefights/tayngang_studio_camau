'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getUserById } from '@/services/other/users-management.service'
import { IUser } from '@/types/user'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ViewUserDetailProps {
	userId: number
	onBack: () => void
}

export function ViewUserDetail({ userId, onBack }: ViewUserDetailProps) {
	const [user, setUser] = useState<IUser | null>(null)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await getUserById(userId)
				setUser(data)
			} catch (error) {
				console.error(`Failed to fetch user with id ${userId}`, error)
			}
		}
		fetchUser()
	}, [userId])

	if (!user) {
		return <div>Loading...</div>
	}

	return (
		<div className='space-y-6'>
			<Button onClick={onBack} variant='outline'>
				<ArrowLeft className='w-4 h-4 mr-2' />
				Back to User List
			</Button>

			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<h2 className='text-2xl font-serif text-[#5A3E2B] mb-4'>User Details</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<strong>ID:</strong> {user.id}
					</div>
					<div>
						<strong>Email:</strong> {user.email}
					</div>
					<div>
						<strong>Full Name:</strong> {user.fullName || 'N/A'}
					</div>
					<div>
						<strong>Phone:</strong> {user.phone}
					</div>
					<div>
						<strong>Address:</strong> {user.address || 'N/A'}
					</div>
					<div>
						<strong>Role:</strong> {user.role}
					</div>
				</div>
			</Card>

			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<h3 className='text-xl font-serif text-[#5A3E2B] mb-4'>Order History</h3>
				{user.orders.length > 0 ? (
					<div className='space-y-4'>
						{user.orders.map((order) => (
							<Card key={order.id} className='p-4'>
								<div className='flex justify-between'>
									<div>
										<p>
											<strong>Order ID:</strong> {order.id}
										</p>
										<p>
											<strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
										</p>
									</div>
									<div>
										<p>
											<strong>Total:</strong> {order.totalAmount.toLocaleString('vi-VN')}₫
										</p>
										<p>
											<strong>Status:</strong> {order.status}
										</p>
									</div>
								</div>
								<div className='mt-4'>
									<h4 className='font-semibold'>Order Details:</h4>
									<ul>
										{order.orderDetails.map((detail, index) => (
											<li key={index}>
												{detail.product.name} - Quantity: {detail.quantity} - Price:{' '}
												{detail.unitPrice.toLocaleString('vi-VN')}₫
											</li>
										))}
									</ul>
								</div>
							</Card>
						))}
					</div>
				) : (
					<p>No orders found for this user.</p>
				)}
			</Card>
		</div>
	)
}

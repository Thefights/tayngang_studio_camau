'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getOrderById } from '@/services/manager/order-management.service'
import { Order } from '@/types/order'
import { ArrowLeft, FileText, Package, User, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface ViewOrderDetailProps {
	orderId: number
	onBack: () => void
}

export function ViewOrderDetail({ orderId, onBack }: ViewOrderDetailProps) {
	const [order, setOrder] = useState<Order | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (orderId) {
			const fetchOrder = async () => {
				try {
					setLoading(true)
					const fetchedOrder = await getOrderById(orderId)
					setOrder(fetchedOrder)
				} catch (error) {
					toast.error('Không thể tải chi tiết đơn hàng.')
				} finally {
					setLoading(false)
				}
			}
			fetchOrder()
		}
	}, [orderId])

	const getStatusBadge = (status: 'Pending' | 'Completed' | 'Canceled') => {
		switch (status) {
			case 'Pending':
				return <Badge className='bg-yellow-500 text-white'>Chờ xử lý</Badge>
			case 'Completed':
				return <Badge className='bg-[#A5C6A1] text-white'>Hoàn thành</Badge>
			case 'Canceled':
				return <Badge className='bg-red-500 text-white'>Đã hủy</Badge>
			default:
				return <Badge className='bg-gray-500 text-white'>Không xác định</Badge>
		}
	}

	if (loading) {
		return <div>Đang tải...</div>
	}

	if (!order) {
		return <div>Không tìm thấy đơn hàng.</div>
	}

	const totalAmount = order.orderDetails.reduce(
		(acc, item) => acc + item.unitPrice * item.quantity,
		0
	)

	return (
		<div className='space-y-6'>
			<div className='flex items-center gap-4'>
				<Button variant='outline' size='icon' onClick={onBack}>
					<ArrowLeft className='w-4 h-4' />
				</Button>
				<h2 className='text-2xl font-serif text-[#5A3E2B]'>Chi tiết đơn hàng #{order.id}</h2>
			</div>

			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{/* Order Info */}
					<div className='space-y-4'>
						<h3 className='font-semibold text-lg text-[#5A3E2B] border-b pb-2'>
							Thông tin đơn hàng
						</h3>
						<div className='flex items-center gap-3'>
							<FileText className='w-5 h-5 text-[#87C1D8]' />
							<div>
								<p className='text-sm text-gray-500'>Mã đơn hàng</p>
								<p className='font-medium text-[#5A3E2B]'>#{order.id}</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<User className='w-5 h-5 text-[#87C1D8]' />
							<div>
								<p className='text-sm text-gray-500'>Mã khách hàng</p>
								<p className='font-medium text-[#5A3E2B]'>{order.userId}</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<Wallet className='w-5 h-5 text-[#87C1D8]' />
							<div>
								<p className='text-sm text-gray-500'>Phương thức thanh toán</p>
								<p className='font-medium text-[#5A3E2B]'>{order.paymentMethod}</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<div
								className={`w-5 h-5 rounded-full ${
									order.status === 'Completed'
										? 'bg-green-500'
										: order.status === 'Canceled'
										? 'bg-red-500'
										: 'bg-yellow-500'
								}`}
							></div>
							<div>
								<p className='text-sm text-gray-500'>Trạng thái</p>
								{getStatusBadge(order.status)}
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<p className='text-sm text-gray-500'>Ngày đặt:</p>
							<p className='font-medium text-[#5A3E2B]'>
								{new Date(order.orderDate).toLocaleString('vi-VN')}
							</p>
						</div>
					</div>

					{/* Order Details */}
					<div className='md:col-span-2 space-y-4'>
						<h3 className='font-semibold text-lg text-[#5A3E2B] border-b pb-2'>
							Chi tiết sản phẩm
						</h3>
						<div className='border rounded-lg border-[#5A3E2B]/10 overflow-hidden'>
							<table className='w-full'>
								<thead className='bg-[#5A3E2B]/5'>
									<tr className='border-b border-[#5A3E2B]/10'>
										<th className='text-left p-3 text-[#5A3E2B] font-medium'>Sản phẩm</th>
										<th className='text-center p-3 text-[#5A3E2B] font-medium'>Số lượng</th>
										<th className='text-right p-3 text-[#5A3E2B] font-medium'>Đơn giá</th>
										<th className='text-right p-3 text-[#5A3E2B] font-medium'>Thành tiền</th>
									</tr>
								</thead>
								<tbody>
									{order.orderDetails.map((item) => (
										<tr key={item.productId} className='border-b border-[#5A3E2B]/5'>
											<td className='p-3 flex items-center gap-3'>
												<Package className='w-5 h-5 text-[#5A3E2B]/50' />
												<span className='font-medium text-[#5A3E2B]'>
													{item.product?.name || `Sản phẩm #${item.productId}`}
												</span>
											</td>
											<td className='p-3 text-center text-[#5A3E2B]'>{item.quantity}</td>
											<td className='p-3 text-right text-[#5A3E2B]'>
												{item.unitPrice.toLocaleString('vi-VN')}₫
											</td>
											<td className='p-3 text-right font-medium text-[#5A3E2B]'>
												{(item.unitPrice * item.quantity).toLocaleString('vi-VN')}₫
											</td>
										</tr>
									))}
								</tbody>
								<tfoot>
									<tr className='bg-[#5A3E2B]/5'>
										<td colSpan={3} className='p-4 text-right font-bold text-[#5A3E2B]'>
											Tổng cộng
										</td>
										<td className='p-4 text-right text-xl font-bold text-[#5A3E2B]'>
											{totalAmount.toLocaleString('vi-VN')}₫
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
						{order.paymentMethod === 'PayOS' && order.paymentUrl && (
							<div className='pt-4'>
								<Button
									onClick={() => window.open(order.paymentUrl!, '_blank')}
									className='w-full bg-[#87C1D8] text-white hover:bg-[#70a9c1]'
								>
									Xem liên kết thanh toán PayOS
								</Button>
							</div>
						)}
					</div>
				</div>
			</Card>
		</div>
	)
}

'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	deleteOrder,
	getAllOrders,
	updateOrderStatus,
} from '@/services/manager/order-management.service'
import { Order } from '@/types/order'
import { CheckCircle, Download, Eye, PlusCircle, Search, Trash2, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CreateOrderForm } from './create-order'
import { ViewOrderDetail } from './view-order-detail'

type View = 'list' | 'create' | 'detail'

export function OrdersManagement() {
	const [orders, setOrders] = useState<Order[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedStatus, setSelectedStatus] = useState<
		'all' | 'Pending' | 'Completed' | 'Canceled'
	>('all')
	const [view, setView] = useState<View>('list')
	const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)

	const fetchOrders = async () => {
		try {
			const fetchedOrders = await getAllOrders()
			const ordersWithTotal = fetchedOrders.map((order) => {
				if (order.totalAmount === undefined || order.totalAmount === null) {
					return {
						...order,
						totalAmount: order.orderDetails.reduce(
							(acc, item) => acc + item.unitPrice * item.quantity,
							0
						),
					}
				}
				return order
			})
			setOrders(ordersWithTotal)
		} catch (error) {
			toast.error('Không thể tải danh sách đơn hàng.')
		}
	}

	useEffect(() => {
		if (view === 'list') {
			fetchOrders()
		}
	}, [view])

	const handleUpdateStatus = async (id: number, status: 'Completed' | 'Canceled') => {
		try {
			await updateOrderStatus(id, status)
			toast.success(
				`Đơn hàng đã được cập nhật thành ${status === 'Completed' ? 'Hoàn thành' : 'Đã hủy'}.`
			)
			fetchOrders()
		} catch (error) {
			toast.error('Cập nhật trạng thái đơn hàng thất bại.')
		}
	}

	const handleDeleteOrder = async (id: number) => {
		if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) {
			try {
				await deleteOrder(id)
				toast.success('Đơn hàng đã được xóa thành công.')
				fetchOrders()
			} catch (error) {
				toast.error('Xóa đơn hàng thất bại.')
			}
		}
	}

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

	const handleShowDetail = (id: number) => {
		setSelectedOrderId(id)
		setView('detail')
	}

	const handleBackToList = () => {
		setSelectedOrderId(null)
		setView('list')
	}

	const filteredOrders = orders
		.filter((order) => (selectedStatus === 'all' ? true : order.status === selectedStatus))
		.filter(
			(order) =>
				order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
				order.userId.toString().toLowerCase().includes(searchTerm.toLowerCase())
		)

	if (view === 'create') {
		return <CreateOrderForm />
	}

	if (view === 'detail' && selectedOrderId) {
		return <ViewOrderDetail orderId={selectedOrderId} onBack={handleBackToList} />
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl font-serif text-[#5A3E2B]'>Quản lý đơn hàng</h2>
				<div className='flex gap-2'>
					<Button
						variant='outline'
						className='border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent'
						onClick={() => setView('create')}
					>
						<PlusCircle className='w-4 h-4 mr-2' />
						Tạo đơn hàng mới
					</Button>
					<Button
						variant='outline'
						className='border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent'
					>
						<Download className='w-4 h-4 mr-2' />
						Xuất báo cáo
					</Button>
				</div>
			</div>

			{/* Filters */}
			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<div className='flex flex-col md:flex-row gap-4'>
					<div className='flex-1'>
						<div className='relative'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50' />
							<Input
								placeholder='Tìm kiếm theo mã đơn hàng, mã khách hàng...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='pl-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white'
							/>
						</div>
					</div>
					<div className='flex gap-2'>
						<Button
							variant={selectedStatus === 'all' ? 'default' : 'outline'}
							size='sm'
							onClick={() => setSelectedStatus('all')}
							className={
								selectedStatus === 'all'
									? 'bg-[#5A3E2B] text-white'
									: 'border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent'
							}
						>
							Tất cả
						</Button>
						<Button
							variant={selectedStatus === 'Pending' ? 'default' : 'outline'}
							size='sm'
							onClick={() => setSelectedStatus('Pending')}
							className={
								selectedStatus === 'Pending'
									? 'bg-[#5A3E2B] text-white'
									: 'border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent'
							}
						>
							Chờ xử lý
						</Button>
						<Button
							variant={selectedStatus === 'Completed' ? 'default' : 'outline'}
							size='sm'
							onClick={() => setSelectedStatus('Completed')}
							className={
								selectedStatus === 'Completed'
									? 'bg-[#5A3E2B] text-white'
									: 'border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent'
							}
						>
							Hoàn thành
						</Button>
						<Button
							variant={selectedStatus === 'Canceled' ? 'default' : 'outline'}
							size='sm'
							onClick={() => setSelectedStatus('Canceled')}
							className={
								selectedStatus === 'Canceled'
									? 'bg-[#5A3E2B] text-white'
									: 'border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent'
							}
						>
							Đã hủy
						</Button>
					</div>
				</div>
			</Card>

			{/* Orders Table */}
			<Card className='bg-white border-[#5A3E2B]/10'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-[#5A3E2B]/10'>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Mã đơn hàng</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Khách hàng</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Tổng tiền</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Thanh toán</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Trạng thái</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Ngày đặt</th>
								<th className='text-center p-4 text-[#5A3E2B] font-medium'>Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{filteredOrders.map((order) => (
								<tr key={order.id} className='border-b border-[#5A3E2B]/5 hover:bg-[#5A3E2B]/5'>
									<td className='p-4'>
										<span className='font-mono text-[#5A3E2B] font-medium'>#{order.id}</span>
									</td>
									<td className='p-4 font-medium text-[#5A3E2B]'>User ID: {order.userId}</td>
									<td className='p-4'>
										<span className='font-medium text-[#5A3E2B]'>
											{order.totalAmount.toLocaleString('vi-VN')}₫
										</span>
									</td>
									<td className='p-4 text-[#5A3E2B]'>{order.paymentMethod}</td>
									<td className='p-4'>{getStatusBadge(order.status)}</td>
									<td className='p-4 text-[#5A3E2B]/70'>
										{new Date(order.orderDate).toLocaleDateString('vi-VN')}
									</td>
									<td className='p-4 flex justify-center gap-1'>
										<Button
											variant='ghost'
											size='icon'
											className='text-[#87C1D8] hover:bg-[#87C1D8]/10'
											onClick={() => handleShowDetail(order.id)}
										>
											<Eye className='w-4 h-4' />
										</Button>
										<Button
											variant='ghost'
											size='icon'
											className='text-green-600 hover:bg-green-100'
											onClick={() => handleUpdateStatus(order.id, 'Completed')}
											disabled={order.status === 'Completed' || order.status === 'Canceled'}
										>
											<CheckCircle className='w-4 h-4' />
										</Button>
										<Button
											variant='ghost'
											size='icon'
											className='text-orange-500 hover:bg-orange-100'
											onClick={() => handleUpdateStatus(order.id, 'Canceled')}
											disabled={order.status === 'Completed' || order.status === 'Canceled'}
										>
											<XCircle className='w-4 h-4' />
										</Button>
										<Button
											variant='ghost'
											size='icon'
											className='text-red-600 hover:bg-red-100'
											onClick={() => handleDeleteOrder(order.id)}
										>
											<Trash2 className='w-4 h-4' />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Card>
		</div>
	)
}

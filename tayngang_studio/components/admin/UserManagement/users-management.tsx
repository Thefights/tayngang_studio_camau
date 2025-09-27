import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { deleteUser, getAllUsers } from '@/services/other/users-management.service'
import { IUser } from '@/types/user'
import { Edit, Eye, Mail, Phone, PlusCircle, Search, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CreateUser } from './create-user'
import { UpdateUser } from './update-user'
import { ViewUserDetail } from './view-user-detail'

type View = 'list' | 'detail' | 'create' | 'edit'

export function UsersManagement() {
	const [users, setUsers] = useState<IUser[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [currentView, setCurrentView] = useState<View>('list')
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

	const fetchUsers = async () => {
		try {
			const data = await getAllUsers()
			console.log(data)
			setUsers(data)
		} catch (error) {
			console.error('Failed to fetch users', error)
		}
	}

	useEffect(() => {
		if (currentView === 'list') {
			fetchUsers()
		}
	}, [currentView])

	const handleViewDetails = (userId: number) => {
		setSelectedUserId(userId)
		setCurrentView('detail')
	}

	const handleEdit = (userId: number) => {
		setSelectedUserId(userId)
		setCurrentView('edit')
	}

	const handleDelete = async (userId: number) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			try {
				await deleteUser(userId)
				fetchUsers()
			} catch (error) {
				console.error('Failed to delete user', error)
			}
		}
	}

	const handleBack = () => {
		setCurrentView('list')
		setSelectedUserId(null)
	}

	if (currentView === 'detail' && selectedUserId) {
		return <ViewUserDetail userId={selectedUserId} onBack={handleBack} />
	}

	if (currentView === 'create') {
		return <CreateUser onBack={handleBack} onUserCreated={handleBack} />
	}

	if (currentView === 'edit' && selectedUserId) {
		return <UpdateUser userId={selectedUserId} onBack={handleBack} onUserUpdated={handleBack} />
	}

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const calculateTotalSpent = (orders: IUser['orders']) => {
		return orders.reduce((total, order) => total + order.totalAmount, 0)
	}

	const getLastOrderDate = (orders: IUser['orders']) => {
		if (orders.length === 0) return 'N/A'
		const lastOrder = orders.reduce((latest, order) => {
			return new Date(order.orderDate) > new Date(latest.orderDate) ? order : latest
		})
		return new Date(lastOrder.orderDate).toLocaleDateString('vi-VN')
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl font-serif text-[#5A3E2B]'>Quản lý khách hàng</h2>
				<Button onClick={() => setCurrentView('create')}>
					<PlusCircle className='w-4 h-4 mr-2' />
					Thêm mới
				</Button>
			</div>

			{/* Search */}
			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<div className='relative'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50' />
					<Input
						placeholder='Tìm kiếm khách hàng...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='pl-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white'
					/>
				</div>
			</Card>

			{/* Customers Table */}
			<Card className='bg-white border-[#5A3E2B]/10'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-[#5A3E2B]/10'>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Khách hàng</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Liên hệ</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Đơn hàng</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Tổng chi tiêu</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Vai trò</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{filteredUsers.map((user) => (
								<tr key={user.id} className='border-b border-[#5A3E2B]/5 hover:bg-[#5A3E2B]/5'>
									<td className='p-4'>
										<div className='flex items-center gap-3'>
											<div className='w-10 h-10 bg-[#5A3E2B] rounded-full flex items-center justify-center'>
												<span className='text-white font-medium text-sm'>
													{user.name?.charAt(0) || user.email.charAt(0)}
												</span>
											</div>
											<div>
												<p className='font-medium text-[#5A3E2B]'>{user.name || 'N/A'}</p>
												<p className='text-sm text-[#5A3E2B]/70'>ID: {user.id}</p>
											</div>
										</div>
									</td>
									<td className='p-4'>
										<div className='space-y-1'>
											<div className='flex items-center gap-2 text-sm text-[#5A3E2B]'>
												<Mail className='w-3 h-3' />
												{user.email}
											</div>
											<div className='flex items-center gap-2 text-sm text-[#5A3E2B]'>
												<Phone className='w-3 h-3' />
												{user.phone}
											</div>
										</div>
									</td>
									<td className='p-4'>
										<div>
											<p className='font-medium text-[#5A3E2B]'>{user.orders.length} đơn hàng</p>
											<p className='text-sm text-[#5A3E2B]/70'>
												Gần nhất: {getLastOrderDate(user.orders)}
											</p>
										</div>
									</td>
									<td className='p-4'>
										<span className='font-medium text-[#5A3E2B]'>
											{calculateTotalSpent(user.orders).toLocaleString('vi-VN')}₫
										</span>
									</td>
									<td className='p-4'>
										<Badge
											className={
												user.role === 'Admin' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
											}
										>
											{user.role}
										</Badge>
									</td>
									<td className='p-4'>
										<Button
											variant='ghost'
											size='sm'
											className='text-[#87C1D8] hover:bg-[#87C1D8]/10'
											onClick={() => handleViewDetails(user.id)}
										>
											<Eye className='w-4 h-4 mr-2' />
											Chi tiết
										</Button>
										<Button
											variant='ghost'
											size='sm'
											className='text-blue-500 hover:bg-blue-500/10'
											onClick={() => handleEdit(user.id)}
										>
											<Edit className='w-4 h-4 mr-2' />
											Sửa
										</Button>
										<Button
											variant='ghost'
											size='sm'
											className='text-red-500 hover:bg-red-500/10'
											onClick={() => handleDelete(user.id)}
										>
											<Trash2 className='w-4 h-4 mr-2' />
											Xóa
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

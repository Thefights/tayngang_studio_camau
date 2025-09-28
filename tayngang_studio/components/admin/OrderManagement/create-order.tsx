'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { createOrder } from '@/services/manager/order-management.service'
import { productManagementService } from '@/services/manager/product-management.service'
import { getAllUsers } from '@/services/manager/users-management.service'
import { CreateOrderDto } from '@/types/order'
import { IProduct } from '@/types/product'
import { IUser } from '@/types/user'
import { Check, ChevronsUpDown, PlusCircle, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface OrderDetailItem {
	productId: number
	quantity: number
	unitPrice: number
	productName?: string
	productImageUrl?: string | null
}

export function CreateOrderForm() {
	const router = useRouter()
	const [products, setProducts] = useState<IProduct[]>([])
	const [users, setUsers] = useState<IUser[]>([])
	const [userId, setUserId] = useState(1) // Hardcoded for now
	const [paymentMethod, setPaymentMethod] = useState<'PayOS' | 'Cash'>('Cash')
	const [orderDetails, setOrderDetails] = useState<OrderDetailItem[]>([])
	const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
	const [userPopoverOpen, setUserPopoverOpen] = useState(false)
	const [productPopoverOpen, setProductPopoverOpen] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [allProducts, allUsers] = await Promise.all([
					productManagementService.getAllProducts(),
					getAllUsers(),
				])
				setProducts(allProducts)
				setUsers(allUsers)
			} catch (error) {
				toast.error('Không thể tải dữ liệu. Vui lòng thử lại.')
			}
		}
		fetchData()
	}, [])

	const handleAddProduct = () => {
		if (selectedProduct) {
			const product = products.find((p) => p.id === selectedProduct)
			if (product && !orderDetails.some((od) => od.productId === product.id)) {
				setOrderDetails([
					...orderDetails,
					{
						productId: product.id,
						quantity: 1,
						unitPrice: product.price,
						productName: product.name,
						productImageUrl: product.imageUrl ?? null,
					},
				])
				setSelectedProduct(null)
			}
		}
	}

	const handleRemoveProduct = (productId: number) => {
		setOrderDetails(orderDetails.filter((od) => od.productId !== productId))
	}

	const handleQuantityChange = (productId: number, quantity: number) => {
		setOrderDetails(
			orderDetails.map((od) => (od.productId === productId ? { ...od, quantity } : od))
		)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (orderDetails.length === 0) {
			toast.error('Vui lòng thêm ít nhất một sản phẩm vào đơn hàng.')
			return
		}

		const orderData: CreateOrderDto = {
			userId,
			paymentMethod,
			orderDetails: orderDetails.map(({ productId, quantity, unitPrice }) => ({
				productId,
				quantity,
				unitPrice,
			})),
		}

		try {
			const newOrder = await createOrder(orderData)
			toast.success('Tạo đơn hàng thành công!')

			if (newOrder.paymentMethod === 'PayOS' && newOrder.paymentUrl) {
				router.push(newOrder.paymentUrl)
			} else {
				router.push('/admin/orders')
			}
		} catch (error) {
			toast.error('Tạo đơn hàng thất bại.')
		}
	}

	const totalAmount = orderDetails.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)

	return (
		<Card className='p-6 bg-white border-[#5A3E2B]/10'>
			<form onSubmit={handleSubmit} className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h2 className='text-2xl font-serif text-[#5A3E2B]'>Tạo đơn hàng mới</h2>
					<Button
						type='button'
						variant='outline'
						onClick={() => router.push('/admin/orders')}
						className='border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent'
					>
						Trở về danh sách
					</Button>
				</div>

				{/* User ID and Payment Method */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<Label className='text-[#5A3E2B]'>Khách hàng</Label>
						<Popover open={userPopoverOpen} onOpenChange={setUserPopoverOpen}>
							<PopoverTrigger asChild>
								<Button
									variant='outline'
									role='combobox'
									aria-expanded={userPopoverOpen}
									className='mt-1 w-full justify-between border-[#5A3E2B]/20 bg-white'
								>
									{userId ? (
										<span className='truncate text-left'>
											{users.find((u) => u.id === userId)?.name || `User ID: ${userId}`}
										</span>
									) : (
										'Chọn khách hàng'
									)}
									<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
								</Button>
							</PopoverTrigger>
							<PopoverContent className='p-0 w-[--radix-popover-trigger-width]'>
								<Command>
									<CommandInput placeholder='Tìm khách hàng...' />
									<CommandEmpty>Không tìm thấy khách hàng.</CommandEmpty>
									<CommandList>
										<CommandGroup>
											{users.map((u) => (
												<CommandItem
													key={u.id}
													value={`${u.name} ${u.email} ${u.phone} #${u.id}`}
													onSelect={() => {
														setUserId(u.id)
														setUserPopoverOpen(false)
													}}
												>
													<Check
														className={cn(
															'mr-2 h-4 w-4',
															userId === u.id ? 'opacity-100' : 'opacity-0'
														)}
													/>
													<div className='flex flex-col'>
														<span className='text-sm font-medium text-[#5A3E2B]'>
															{u.name} (#{u.id})
														</span>
														<span className='text-xs text-muted-foreground'>
															{u.email} · {u.phone}
														</span>
													</div>
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</div>
					<div>
						<Label className='text-[#5A3E2B]'>Phương thức thanh toán</Label>
						<RadioGroup
							value={paymentMethod}
							onValueChange={(value: 'PayOS' | 'Cash') => setPaymentMethod(value)}
							className='mt-2 flex gap-4'
						>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='Cash' id='cash' />
								<Label htmlFor='cash'>Tiền mặt</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='PayOS' id='payos' />
								<Label htmlFor='payos'>PayOS</Label>
							</div>
						</RadioGroup>
					</div>
				</div>

				{/* Product Selection */}
				<div>
					<Label className='text-[#5A3E2B]'>Sản phẩm</Label>
					<div className='flex gap-2 mt-1'>
						<Popover open={productPopoverOpen} onOpenChange={setProductPopoverOpen}>
							<PopoverTrigger asChild>
								<Button
									variant='outline'
									role='combobox'
									aria-expanded={productPopoverOpen}
									className='flex-1 justify-between border-[#5A3E2B]/20 bg-white'
								>
									{selectedProduct ? (
										<span className='flex items-center gap-2 truncate'>
											{(() => {
												const p = products.find((pp) => pp.id === selectedProduct)
												if (!p) return null
												return (
													<>
														<span className='inline-flex h-6 w-6 items-center justify-center rounded bg-[#5A3E2B]/10 overflow-hidden'>
															{p.imageUrl ? (
																<Image
																	src={p.imageUrl}
																	alt={p.name}
																	width={24}
																	height={24}
																	className='h-full w-full object-cover'
																/>
															) : (
																<span className='text-xs text-[#5A3E2B]'>{p.name?.[0] ?? '?'}</span>
															)}
														</span>
														<span className='truncate'>
															{p.name} - {p.price.toLocaleString('vi-VN')}₫
														</span>
													</>
												)
											})()}
										</span>
									) : (
										'Chọn sản phẩm để thêm vào đơn hàng'
									)}
									<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
								</Button>
							</PopoverTrigger>
							<PopoverContent className='p-0 w-[--radix-popover-trigger-width] max-h-80 overflow-auto'>
								<Command>
									<CommandInput placeholder='Tìm sản phẩm...' />
									<CommandEmpty>Không tìm thấy sản phẩm.</CommandEmpty>
									<CommandList>
										<CommandGroup>
											{products.map((p) => (
												<CommandItem
													key={p.id}
													value={`${p.name} ${p.price} #${p.id}`}
													onSelect={() => {
														setSelectedProduct(p.id)
														setProductPopoverOpen(false)
													}}
												>
													<Check
														className={cn(
															'mr-2 h-4 w-4',
															selectedProduct === p.id ? 'opacity-100' : 'opacity-0'
														)}
													/>
													<span className='mr-2 inline-flex h-8 w-8 items-center justify-center rounded bg-[#5A3E2B]/10 overflow-hidden'>
														{p.imageUrl ? (
															<Image
																src={p.imageUrl}
																alt={p.name}
																width={32}
																height={32}
																className='h-full w-full object-cover'
															/>
														) : (
															<span className='text-xs text-[#5A3E2B]'>{p.name[0]}</span>
														)}
													</span>
													<div className='flex flex-col'>
														<span className='text-sm font-medium text-[#5A3E2B]'>{p.name}</span>
														<span className='text-xs text-muted-foreground'>
															{p.price.toLocaleString('vi-VN')}₫
														</span>
													</div>
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
						<Button
							type='button'
							onClick={handleAddProduct}
							disabled={!selectedProduct}
							className='bg-[#5A3E2B] text-white hover:bg-[#4d3424]'
						>
							<PlusCircle className='w-4 h-4 mr-2' />
							Thêm
						</Button>
					</div>
				</div>

				{/* Order Details Table */}
				{orderDetails.length > 0 && (
					<div className='border rounded-lg border-[#5A3E2B]/10 overflow-hidden'>
						<table className='w-full'>
							<thead className='bg-[#5A3E2B]/5'>
								<tr className='border-b border-[#5A3E2B]/10'>
									<th className='text-left p-3 text-[#5A3E2B] font-medium'>Sản phẩm</th>
									<th className='text-left p-3 text-[#5A3E2B] font-medium'>Số lượng</th>
									<th className='text-left p-3 text-[#5A3E2B] font-medium'>Đơn giá</th>
									<th className='text-left p-3 text-[#5A3E2B] font-medium'>Thành tiền</th>
									<th className='text-right p-3'></th>
								</tr>
							</thead>
							<tbody>
								{orderDetails.map((item) => (
									<tr key={item.productId} className='border-b border-[#5A3E2B]/5'>
										<td className='p-3 font-medium text-[#5A3E2B]'>
											<div className='flex items-center gap-2'>
												<span className='inline-flex h-8 w-8 items-center justify-center rounded bg-[#5A3E2B]/10 overflow-hidden'>
													{item.productImageUrl ? (
														<Image
															src={item.productImageUrl}
															alt={item.productName ?? 'product'}
															width={32}
															height={32}
															className='h-full w-full object-cover'
														/>
													) : (
														<span className='text-xs text-[#5A3E2B]'>
															{item.productName?.[0] ?? '?'}
														</span>
													)}
												</span>
												<span>{item.productName}</span>
											</div>
										</td>
										<td className='p-3'>
											<Input
												type='number'
												min='1'
												value={item.quantity}
												onChange={(e) =>
													handleQuantityChange(item.productId, Number(e.target.value))
												}
												className='w-20 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white'
											/>
										</td>
										<td className='p-3 text-[#5A3E2B]'>
											{item.unitPrice.toLocaleString('vi-VN')}₫
										</td>
										<td className='p-3 font-medium text-[#5A3E2B]'>
											{(item.unitPrice * item.quantity).toLocaleString('vi-VN')}₫
										</td>
										<td className='p-3 text-right'>
											<Button
												type='button'
												variant='ghost'
												size='sm'
												onClick={() => handleRemoveProduct(item.productId)}
												className='text-red-600 hover:bg-red-100'
											>
												<Trash2 className='w-4 h-4' />
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{/* Total Amount and Submit */}
				<div className='flex items-center justify-between pt-4 border-t border-[#5A3E2B]/10'>
					<div className='text-xl font-bold text-[#5A3E2B]'>
						Tổng cộng: <span className='text-2xl'>{totalAmount.toLocaleString('vi-VN')}₫</span>
					</div>
					<Button type='submit' className='bg-[#A5C6A1] text-white hover:bg-[#90b58c]' size='lg'>
						Tạo đơn hàng
					</Button>
				</div>
			</form>
		</Card>
	)
}

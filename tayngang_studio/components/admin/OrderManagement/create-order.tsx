'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { createOrder } from '@/services/manager/order-management.service'
import { productManagementService } from '@/services/manager/product-management.service'
import { CreateOrderDto } from '@/types/order'
import { IProduct } from '@/types/product'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface OrderDetailItem {
	productId: number
	quantity: number
	unitPrice: number
	productName?: string
}

export function CreateOrderForm() {
	const router = useRouter()
	const [products, setProducts] = useState<IProduct[]>([])
	const [userId, setUserId] = useState(1) // Hardcoded for now
	const [paymentMethod, setPaymentMethod] = useState<'PayOS' | 'Cash'>('Cash')
	const [orderDetails, setOrderDetails] = useState<OrderDetailItem[]>([])
	const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const allProducts = await productManagementService.getAllProducts()
				setProducts(allProducts)
			} catch (error) {
				toast.error('Không thể tải danh sách sản phẩm.')
			}
		}
		fetchProducts()
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
				router.push('/admin?tab=orders')
			}
		} catch (error) {
			toast.error('Tạo đơn hàng thất bại.')
		}
	}

	const totalAmount = orderDetails.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)

	return (
		<Card className='p-6 bg-white border-[#5A3E2B]/10'>
			<form onSubmit={handleSubmit} className='space-y-6'>
				<h2 className='text-2xl font-serif text-[#5A3E2B]'>Tạo đơn hàng mới</h2>

				{/* User ID and Payment Method */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<Label htmlFor='userId' className='text-[#5A3E2B]'>
							Mã khách hàng (User ID)
						</Label>
						<Input
							id='userId'
							type='number'
							value={userId}
							onChange={(e) => setUserId(Number(e.target.value))}
							className='mt-1 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white'
							required
						/>
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
						<Select
							onValueChange={(value) => setSelectedProduct(Number(value))}
							value={selectedProduct?.toString() || ''}
						>
							<SelectTrigger className='flex-1 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white'>
								<SelectValue placeholder='Chọn sản phẩm để thêm vào đơn hàng' />
							</SelectTrigger>
							<SelectContent>
								{products.map((product) => (
									<SelectItem key={product.id} value={product.id.toString()}>
										{product.name} - {product.price.toLocaleString('vi-VN')}₫
									</SelectItem>
								))}
							</SelectContent>
						</Select>
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
										<td className='p-3 font-medium text-[#5A3E2B]'>{item.productName}</td>
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

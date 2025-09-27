'use client'

import { Button } from '@/components/ui/button'
import { IProduct } from '@/types/product'
import { X } from 'lucide-react'
import Image from 'next/image'

interface ViewProductDetailProps {
	isOpen: boolean
	onClose: () => void
	product: IProduct | null
}

export function ViewProductDetail({ isOpen, onClose, product }: ViewProductDetailProps) {
	if (!isOpen || !product) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
			<div className='bg-white rounded-lg shadow-lg w-full max-w-4xl border border-[#5A3E2B]/10 max-h-[90vh] overflow-y-auto'>
				<div className='p-6'>
					{/* Header */}
					<div className='flex items-center justify-between mb-6'>
						<h3 className='text-lg font-serif text-[#5A3E2B]'>Chi tiết sản phẩm</h3>
						<Button
							variant='ghost'
							size='sm'
							onClick={onClose}
							className='h-8 w-8 p-0 hover:bg-[#5A3E2B]/10'
						>
							<X className='h-4 w-4' />
						</Button>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						{/* Product Image */}
						<div className='space-y-4'>
							<div className='w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border'>
								{product.imageUrl ? (
									<Image
										src={product.imageUrl}
										alt={product.name}
										className='w-full h-full object-cover'
										width={400}
										height={400}
									/>
								) : (
									<div className='w-full h-full flex items-center justify-center text-gray-400'>
										<div className='text-center'>
											<div className='text-6xl mb-4'>📷</div>
											<p className='text-sm'>Chưa có hình ảnh</p>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Product Details */}
						<div className='lg:col-span-2 space-y-6'>
							{/* Product Name */}
							<div>
								<h4 className='text-2xl font-semibold text-[#5A3E2B] mb-2'>{product.name}</h4>
								<div className='flex items-center gap-4 text-sm text-gray-600'>
									<span>ID: #{product.id}</span>
									<span className='px-2 py-1 bg-[#87C1D8]/20 text-[#87C1D8] rounded-md'>
										{product.productCategoryName || 'Chưa phân loại'}
									</span>
								</div>
							</div>

							{/* Product Info Grid */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='space-y-4'>
									<div className='bg-gray-50 p-4 rounded-lg'>
										<label className='text-sm font-medium text-gray-600 block mb-1'>Giá bán</label>
										<p className='text-2xl font-bold text-[#5A3E2B]'>
											{new Intl.NumberFormat('vi-VN', {
												style: 'currency',
												currency: 'VND',
											}).format(product.price)}
										</p>
									</div>

									<div className='bg-gray-50 p-4 rounded-lg'>
										<label className='text-sm font-medium text-gray-600 block mb-1'>
											Số lượng tồn kho
										</label>
										<p className='text-xl font-semibold text-[#5A3E2B]'>
											{product.quantity.toLocaleString()} sản phẩm
										</p>
									</div>
								</div>

								<div className='space-y-4'>
									<div className='bg-gray-50 p-4 rounded-lg'>
										<label className='text-sm font-medium text-gray-600 block mb-1'>Đánh giá</label>
										<div className='flex items-center gap-2'>
											<p className='text-xl font-semibold text-[#5A3E2B]'>{product.rating}/5</p>
											<div className='flex'>
												{Array.from({ length: 5 }, (_, i) => (
													<span
														key={i}
														className={`text-lg ${
															i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'
														}`}
													>
														★
													</span>
												))}
											</div>
										</div>
									</div>

									<div className='bg-gray-50 p-4 rounded-lg'>
										<label className='text-sm font-medium text-gray-600 block mb-1'>
											Số lượt đánh giá
										</label>
										<p className='text-xl font-semibold text-[#5A3E2B]'>
											{product.review.toLocaleString()} lượt
										</p>
									</div>
								</div>
							</div>

							{/* Description */}
							{product.description && (
								<div>
									<label className='text-sm font-medium text-gray-600 block mb-2'>
										Mô tả sản phẩm
									</label>
									<div className='bg-gray-50 p-4 rounded-lg'>
										<p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
											{product.description}
										</p>
									</div>
								</div>
							)}

							{/* Status Indicators */}
							<div className='flex gap-4'>
								<div
									className={`px-3 py-1 rounded-full text-sm font-medium ${
										product.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
									}`}
								>
									{product.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
								</div>
								<div
									className={`px-3 py-1 rounded-full text-sm font-medium ${
										product.rating >= 4
											? 'bg-yellow-100 text-yellow-700'
											: product.rating >= 3
											? 'bg-orange-100 text-orange-700'
											: 'bg-gray-100 text-gray-700'
									}`}
								>
									{product.rating >= 4
										? 'Đánh giá cao'
										: product.rating >= 3
										? 'Đánh giá tốt'
										: 'Cần cải thiện'}
								</div>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className='flex justify-end pt-6 border-t mt-6'>
						<Button onClick={onClose} className='bg-[#5A3E2B] text-white hover:bg-[#5A3E2B]/90'>
							Đóng
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

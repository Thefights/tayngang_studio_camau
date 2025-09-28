'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { categoryManagementService } from '@/services/manager/category-management.service'
import { productManagementService } from '@/services/manager/product-management.service'
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { Edit, Eye, Plus, Search, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { CreateProduct } from './create-product'
import { UpdateProduct } from './update-product'
import { ViewProductDetail } from './view-product-detail'

export function ProductsManagement() {
	const [products, setProducts] = useState<IProduct[]>([])
	const [categories, setCategories] = useState<ICategory[]>([])
	const [loading, setLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all')
	const [deletingId, setDeletingId] = useState<number | null>(null)
	const [deleteLoading, setDeleteLoading] = useState(false)
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
	const [isViewModalOpen, setIsViewModalOpen] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)

	const fetchProducts = async () => {
		try {
			setLoading(true)
			const data = await productManagementService.getAllProducts()
			console.log(data)
			setProducts(data || [])
		} catch (err: any) {
			toast.error(err?.response?.data?.message || 'Không thể tải sản phẩm')
		} finally {
			setLoading(false)
		}
	}

	const fetchCategories = async () => {
		try {
			const data = await categoryManagementService.getAllCategories()
			setCategories(data || [])
		} catch (err: any) {
			console.error('Failed to fetch categories:', err)
		}
	}

	useEffect(() => {
		fetchProducts()
		fetchCategories()
	}, [])

	const confirmDelete = (id: number) => {
		setDeletingId(id)
	}

	const openUpdateModal = (product: IProduct) => {
		setSelectedProduct(product)
		setIsUpdateModalOpen(true)
	}

	const openViewModal = (product: IProduct) => {
		setSelectedProduct(product)
		setIsViewModalOpen(true)
	}

	const closeUpdateModal = () => {
		setIsUpdateModalOpen(false)
		setSelectedProduct(null)
	}

	const closeViewModal = () => {
		setIsViewModalOpen(false)
		setSelectedProduct(null)
	}

	const handleDelete = async () => {
		if (!deletingId) return
		try {
			setDeleteLoading(true)
			await productManagementService.deleteProduct(deletingId)
			toast.success('Xoá sản phẩm thành công')
			setDeletingId(null)
			fetchProducts()
		} catch (err: any) {
			toast.error(err?.response?.data?.message || 'Không thể xoá sản phẩm')
		} finally {
			setDeleteLoading(false)
		}
	}

	const getStatusBadge = (quantity: number) => {
		if (quantity === 0) {
			return <Badge className='bg-red-500 text-white'>Hết hàng</Badge>
		}
		if (quantity < 10) {
			return <Badge className='bg-yellow-500 text-white'>Sắp hết</Badge>
		}
		return <Badge className='bg-[#A5C6A1] text-white'>Còn hàng</Badge>
	}

	const filtered = useMemo(() => {
		return products.filter((product) => {
			const matchesSearch = [product.name, product.description, product.productCategoryName].some(
				(field) => field?.toLowerCase().includes(searchTerm.trim().toLowerCase())
			)

			const matchesCategory =
				selectedCategoryFilter === 'all' ||
				product.productCategoryName?.toLowerCase() === selectedCategoryFilter.toLowerCase()

			return matchesSearch && matchesCategory
		})
	}, [products, searchTerm, selectedCategoryFilter])

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl font-serif text-[#5A3E2B]'>Quản lý sản phẩm</h2>
				<Button
					onClick={() => setIsCreateModalOpen(true)}
					className='bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white'
				>
					<Plus className='w-4 h-4 mr-2' />
					Thêm sản phẩm
				</Button>
			</div>

			{/* Filters */}
			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<div className='flex flex-col md:flex-row gap-4'>
					<div className='flex-1'>
						<div className='relative'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50' />
							<Input
								placeholder='Tìm kiếm sản phẩm...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='pl-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white'
							/>
						</div>
					</div>
					<div className='flex gap-2 flex-wrap'>
						<Button
							variant={selectedCategoryFilter === 'all' ? 'default' : 'outline'}
							size='sm'
							onClick={() => setSelectedCategoryFilter('all')}
							className={
								selectedCategoryFilter === 'all'
									? 'bg-[#5A3E2B] text-white'
									: 'border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent'
							}
						>
							Tất cả
						</Button>
						{categories.map((category) => (
							<Button
								key={category.id}
								variant={selectedCategoryFilter === category.name ? 'default' : 'outline'}
								size='sm'
								onClick={() => setSelectedCategoryFilter(category.name)}
								className={
									selectedCategoryFilter === category.name
										? 'bg-[#5A3E2B] text-white'
										: 'border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent'
								}
							>
								{category.name}
							</Button>
						))}
					</div>
				</div>
			</Card>

			{/* Products Table */}
			<Card className='bg-white border-[#5A3E2B]/10'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-[#5A3E2B]/10'>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Sản phẩm</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Danh mục</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Giá</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Tồn kho</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Đánh giá</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Trạng thái</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan={7} className='p-6 text-center text-[#5A3E2B]/70'>
										Đang tải...
									</td>
								</tr>
							) : filtered.length === 0 ? (
								<tr>
									<td colSpan={7} className='p-6 text-center text-[#5A3E2B]/70'>
										Không có sản phẩm
									</td>
								</tr>
							) : (
								filtered.map((product) => (
									<tr key={product.id} className='border-b border-[#5A3E2B]/5 hover:bg-[#5A3E2B]/5'>
										<td className='p-4'>
											<div className='flex items-center gap-3'>
												<div className='w-12 h-12 bg-[#EAEAEA]/30 rounded-lg overflow-hidden'>
													<Image
														src={product.imageUrl ? product.imageUrl : '/placeholder.svg'}
														alt={product.name}
														className='w-full h-full object-cover'
														width={48}
														height={48}
													/>
												</div>
												<div>
													<p className='font-medium text-[#5A3E2B]'>{product.name}</p>
													<p className='text-sm text-[#5A3E2B]/70'>ID: {product.id}</p>
												</div>
											</div>
										</td>
										<td className='p-4 text-[#5A3E2B]'>
											{product.productCategoryName || (
												<span className='italic text-[#5A3E2B]/40'>Chưa phân loại</span>
											)}
										</td>
										<td className='p-4'>
											<span className='font-medium text-[#5A3E2B]'>
												{product.price.toLocaleString('vi-VN')}₫
											</span>
										</td>
										<td className='p-4 text-[#5A3E2B]'>{product.quantity}</td>
										<td className='p-4 text-[#5A3E2B]'>
											{product.rating > 0 ? (
												<span>
													⭐ {product.rating} ({product.review} đánh giá)
												</span>
											) : (
												<span className='italic text-[#5A3E2B]/40'>Chưa có đánh giá</span>
											)}
										</td>
										<td className='p-4'>{getStatusBadge(product.quantity)}</td>
										<td className='p-4'>
											<div className='flex items-center gap-2'>
												<Button
													variant='ghost'
													size='sm'
													onClick={() => openViewModal(product)}
													className='text-[#87C1D8] hover:bg-[#87C1D8]/10'
												>
													<Eye className='w-4 h-4' />
												</Button>
												<Button
													variant='ghost'
													size='sm'
													onClick={() => openUpdateModal(product)}
													className='text-[#5A3E2B] hover:bg-[#5A3E2B]/10'
												>
													<Edit className='w-4 h-4' />
												</Button>
												<Button
													variant='ghost'
													size='sm'
													className='text-red-600 hover:bg-red-50'
													onClick={() => confirmDelete(product.id)}
												>
													<Trash2 className='w-4 h-4' />
												</Button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</Card>

			{/* Delete Confirmation */}
			{deletingId !== null && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
					<div className='bg-white rounded-lg shadow-lg w-full max-w-sm border border-[#5A3E2B]/10 p-6 space-y-4'>
						<h3 className='text-lg font-serif text-[#5A3E2B]'>Xác nhận xoá</h3>
						<p className='text-sm text-[#5A3E2B]/80'>
							Bạn có chắc chắn muốn xoá sản phẩm ID {deletingId}?
						</p>
						<div className='flex justify-end gap-2'>
							<Button
								variant='ghost'
								className='text-[#5A3E2B] hover:bg-[#5A3E2B]/10'
								onClick={() => setDeletingId(null)}
							>
								Huỷ
							</Button>
							<Button
								disabled={deleteLoading}
								onClick={handleDelete}
								className='bg-red-600 text-white hover:bg-red-700'
							>
								{deleteLoading ? 'Đang xoá...' : 'Xoá'}
							</Button>
						</div>
					</div>
				</div>
			)}

			<CreateProduct
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onSuccess={() => fetchProducts()}
			/>

			<UpdateProduct
				isOpen={isUpdateModalOpen}
				onClose={closeUpdateModal}
				onSuccess={() => {
					fetchProducts()
					closeUpdateModal()
				}}
				product={selectedProduct}
			/>

			<ViewProductDetail
				isOpen={isViewModalOpen}
				onClose={closeViewModal}
				product={selectedProduct}
			/>
		</div>
	)
}

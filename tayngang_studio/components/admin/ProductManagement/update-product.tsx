'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UpdateProductFormData, updateProductSchema } from '@/lib/validations/product.validation'
import { categoryManagementService } from '@/services/other/category-management.service'
import { productManagementService } from '@/services/other/product-management.service'
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface UpdateProductProps {
	isOpen: boolean
	onClose: () => void
	onSuccess: () => void
	product: IProduct | null
}

export function UpdateProduct({ isOpen, onClose, onSuccess, product }: UpdateProductProps) {
	const [categories, setCategories] = useState<ICategory[]>([])
	const [loading, setLoading] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [imageFile, setImageFile] = useState<File | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<UpdateProductFormData>({
		resolver: yupResolver(updateProductSchema),
		defaultValues: {
			name: '',
			quantity: 0,
			price: 0,
			description: '',
			productCategoryId: 1,
		},
	})

	// Fetch product details and initialize form
	useEffect(() => {
		const fetchProductData = async () => {
			if (!isOpen || !product?.id) return

			try {
				setLoading(true)

				// Fetch categories and product details in parallel
				const [categoriesData, productData] = await Promise.all([
					categoryManagementService.getAllCategories(),
					productManagementService.getProductById(product.id),
				])

				// Set categories
				setCategories(categoriesData || [])

				// Set form values with fetched product data
				setValue('name', productData.name || '')
				setValue('quantity', productData.quantity || 0)
				setValue('price', productData.price || 0)
				setValue('description', productData.description || '')
				setValue('productCategoryId', productData.productCategoryId || 1)

				// Set current image preview if exists
				if (productData.imageUrl) {
					setImagePreview(productData.imageUrl)
				} else {
					setImagePreview(null)
				}
				setImageFile(null)
			} catch (err: any) {
				toast.error('Không thể tải thông tin sản phẩm')
				console.error('Error fetching product data:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchProductData()
	}, [isOpen, product?.id, setValue])

	const onSubmit = async (data: UpdateProductFormData) => {
		if (!product) return

		try {
			setSubmitting(true)
			const formDataObj = new FormData()
			formDataObj.append('Name', data.name)
			formDataObj.append('Quantity', data.quantity.toString())
			formDataObj.append('Price', data.price.toString())
			formDataObj.append('Description', data.description || '')
			formDataObj.append('ProductCategoryId', data.productCategoryId.toString())

			if (imageFile) {
				formDataObj.append('ImageFile', imageFile)
			}

			await productManagementService.updateProduct(product.id, formDataObj)
			toast.success('Cập nhật sản phẩm thành công')
			onSuccess()
			handleClose()
		} catch (err: any) {
			toast.error(err?.response?.data?.message || 'Không thể cập nhật sản phẩm')
		} finally {
			setSubmitting(false)
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null
		setImageFile(file)

		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				setImagePreview(e.target?.result as string)
			}
			reader.readAsDataURL(file)
		} else if (product?.imageUrl) {
			// Revert to original image if file is cleared
			setImagePreview(product.imageUrl)
		} else {
			setImagePreview(null)
		}
	}

	const handleClose = () => {
		reset()
		setImageFile(null)
		setImagePreview(null)
		onClose()
	}

	if (!isOpen || !product) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
			<div className='bg-white rounded-lg shadow-lg w-full max-w-4xl border border-[#5A3E2B]/10 max-h-[90vh] overflow-y-auto'>
				{loading ? (
					<div className='p-6 flex items-center justify-center min-h-[400px]'>
						<div className='text-center'>
							<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#5A3E2B] mx-auto mb-4'></div>
							<p className='text-[#5A3E2B]'>Đang tải thông tin sản phẩm...</p>
						</div>
					</div>
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-4'>
						<h3 className='text-lg font-serif text-[#5A3E2B]'>Cập nhật sản phẩm</h3>

						<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
							{/* Image Preview Section */}
							<div className='space-y-4'>
								<div className='space-y-1'>
									<label className='text-sm font-medium text-[#5A3E2B]'>Hình ảnh sản phẩm</label>
									<Input
										type='file'
										accept='image/*'
										onChange={handleFileChange}
										className='file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[#5A3E2B] file:text-white hover:file:bg-[#5A3E2B]/90'
									/>
									<p className='text-xs text-gray-500'>Để trống nếu không muốn thay đổi hình ảnh</p>
								</div>

								{/* Image Preview */}
								<div className='w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300'>
									{imagePreview ? (
										<Image
											src={imagePreview}
											alt='Preview'
											className='w-full h-full object-cover'
											width={300}
											height={300}
										/>
									) : (
										<div className='w-full h-full flex items-center justify-center text-gray-400'>
											<div className='text-center'>
												<div className='text-4xl mb-2'>📷</div>
												<p className='text-sm'>Chưa có hình ảnh</p>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Form Fields */}
							<div className='lg:col-span-2 space-y-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-1'>
										<label className='text-sm font-medium text-[#5A3E2B]'>Tên sản phẩm *</label>
										<Input
											{...register('name')}
											placeholder='Tên sản phẩm'
											className={errors.name ? 'border-red-500' : ''}
										/>
										{errors.name && <p className='text-xs text-red-500'>{errors.name.message}</p>}
									</div>

									<div className='space-y-1'>
										<label className='text-sm font-medium text-[#5A3E2B]'>Danh mục *</label>
										<select
											{...register('productCategoryId', { valueAsNumber: true })}
											className={`w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5A3E2B] ${
												errors.productCategoryId ? 'border-red-500' : 'border-[#5A3E2B]/20'
											}`}
										>
											{categories.map((category) => (
												<option key={category.id} value={category.id}>
													{category.name}
												</option>
											))}
										</select>
										{errors.productCategoryId && (
											<p className='text-xs text-red-500'>{errors.productCategoryId.message}</p>
										)}
									</div>

									<div className='space-y-1'>
										<label className='text-sm font-medium text-[#5A3E2B]'>Giá *</label>
										<Input
											{...register('price', { valueAsNumber: true })}
											type='number'
											min='0'
											step='0.01'
											placeholder='Giá sản phẩm'
											className={errors.price ? 'border-red-500' : ''}
										/>
										{errors.price && <p className='text-xs text-red-500'>{errors.price.message}</p>}
									</div>

									<div className='space-y-1'>
										<label className='text-sm font-medium text-[#5A3E2B]'>Số lượng *</label>
										<Input
											{...register('quantity', { valueAsNumber: true })}
											type='number'
											min='0'
											placeholder='Số lượng tồn kho'
											className={errors.quantity ? 'border-red-500' : ''}
										/>
										{errors.quantity && (
											<p className='text-xs text-red-500'>{errors.quantity.message}</p>
										)}
									</div>
								</div>

								<div className='space-y-1'>
									<label className='text-sm font-medium text-[#5A3E2B]'>Mô tả</label>
									<textarea
										{...register('description')}
										className={`w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5A3E2B] ${
											errors.description ? 'border-red-500' : 'border-[#5A3E2B]/20'
										}`}
										rows={4}
										placeholder='Mô tả sản phẩm'
									/>
									{errors.description && (
										<p className='text-xs text-red-500'>{errors.description.message}</p>
									)}
								</div>
							</div>
						</div>

						<div className='flex justify-end gap-2 pt-4'>
							<Button
								variant='ghost'
								type='button'
								className='text-[#5A3E2B] hover:bg-[#5A3E2B]/10'
								onClick={handleClose}
								disabled={submitting}
							>
								Huỷ
							</Button>
							<Button
								type='submit'
								className='bg-[#5A3E2B] text-white hover:bg-[#5A3E2B]/90'
								disabled={submitting}
							>
								{submitting ? 'Đang cập nhật...' : 'Cập nhật sản phẩm'}
							</Button>
						</div>
					</form>
				)}
			</div>
		</div>
	)
}

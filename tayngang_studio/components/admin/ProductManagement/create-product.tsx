'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CreateProductFormData, createProductSchema } from '@/lib/validations/product.validation'
import { categoryManagementService } from '@/services/manager/category-management.service'
import { productManagementService } from '@/services/manager/product-management.service'
import { ICategory } from '@/types/category'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface CreateProductProps {
	isOpen: boolean
	onClose: () => void
	onSuccess: () => void
}

export function CreateProduct({ isOpen, onClose, onSuccess }: CreateProductProps) {
	const [categories, setCategories] = useState<ICategory[]>([])
	const [loading, setLoading] = useState(false)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [imageError, setImageError] = useState<string>('')

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<CreateProductFormData>({
		resolver: yupResolver(createProductSchema),
		defaultValues: {
			name: '',
			quantity: 0,
			price: 0,
			description: '',
			rating: 0,
			review: 0,
			productCategoryId: 1,
		},
	})

	const fetchCategories = useCallback(async () => {
		try {
			const data = await categoryManagementService.getAllCategories()
			setCategories(data || [])
			if (data && data.length > 0) {
				setValue('productCategoryId', data[0].id)
			}
		} catch (err: any) {
			toast.error('Không thể tải danh mục')
		}
	}, [setValue])

	useEffect(() => {
		if (isOpen) {
			fetchCategories()
		}
	}, [isOpen, fetchCategories])

	const onSubmit = async (data: CreateProductFormData) => {
		// Validate image is required
		if (!imageFile) {
			setImageError('Hình ảnh sản phẩm là bắt buộc')
			return
		}

		setImageError('')

		try {
			setLoading(true)
			const formDataObj = new FormData()
			formDataObj.append('Name', data.name)
			formDataObj.append('Quantity', data.quantity.toString())
			formDataObj.append('Price', data.price.toString())
			formDataObj.append('Description', data.description || '')
			formDataObj.append('Rating', data.rating.toString())
			formDataObj.append('Review', data.review.toString())
			formDataObj.append('ProductCategoryId', data.productCategoryId.toString())

			if (imageFile) {
				formDataObj.append('ImageFile', imageFile)
			}

			await productManagementService.createProduct(formDataObj)
			toast.success('Tạo sản phẩm thành công')
			onSuccess()
			handleClose()
		} catch (err: any) {
			toast.error(err?.response?.data?.message || 'Không thể tạo sản phẩm')
		} finally {
			setLoading(false)
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null
		setImageFile(file)
		setImageError('') // Clear error when file is selected

		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				setImagePreview(e.target?.result as string)
			}
			reader.readAsDataURL(file)
		} else {
			setImagePreview(null)
		}
	}

	const handleClose = () => {
		reset()
		setImageFile(null)
		setImagePreview(null)
		setImageError('')
		onClose()
	}

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
			<div className='bg-white rounded-lg shadow-lg w-full max-w-4xl border border-[#5A3E2B]/10 max-h-[90vh] overflow-y-auto'>
				<form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-4'>
					<h3 className='text-lg font-serif text-[#5A3E2B]'>Thêm sản phẩm</h3>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						{/* Image Preview Section */}
						<div className='space-y-4'>
							<div className='space-y-1'>
								<label className='text-sm font-medium text-[#5A3E2B]'>Hình ảnh sản phẩm *</label>
								<Input
									type='file'
									accept='image/*'
									onChange={handleFileChange}
									className={`file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[#5A3E2B] file:text-white hover:file:bg-[#5A3E2B]/90 ${
										imageError ? 'border-red-500' : ''
									}`}
								/>
								{imageError && <p className='text-xs text-red-500'>{imageError}</p>}
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

								<div className='space-y-1'>
									<label className='text-sm font-medium text-[#5A3E2B]'>Đánh giá *</label>
									<Input
										{...register('rating', { valueAsNumber: true })}
										type='number'
										min='0'
										max='5'
										step='0.1'
										placeholder='Điểm đánh giá (0-5)'
										className={errors.rating ? 'border-red-500' : ''}
									/>
									{errors.rating && <p className='text-xs text-red-500'>{errors.rating.message}</p>}
								</div>

								<div className='space-y-1'>
									<label className='text-sm font-medium text-[#5A3E2B]'>Số lượt đánh giá *</label>
									<Input
										{...register('review', { valueAsNumber: true })}
										type='number'
										min='0'
										placeholder='Số lượt đánh giá'
										className={errors.review ? 'border-red-500' : ''}
									/>
									{errors.review && <p className='text-xs text-red-500'>{errors.review.message}</p>}
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
							disabled={loading}
						>
							Huỷ
						</Button>
						<Button
							type='submit'
							className='bg-[#5A3E2B] text-white hover:bg-[#5A3E2B]/90'
							disabled={loading}
						>
							{loading ? 'Đang tạo...' : 'Tạo sản phẩm'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

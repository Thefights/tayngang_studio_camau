/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ProductGallery } from '@/components/product/product-gallery'
import { Button } from '@/components/ui/button'
import { useLoading } from '@/context/loading-context'
import * as productData from '@/data/other/product.data'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ProductsPage() {
	const [products, setProducts] = useState([])
	const [keyword, setKeyword] = useState('')
	const { setLoading } = useLoading()

	const fetchProductsByCategory = async (category: string) => {
		setLoading(true)
		const products = await productData.getProductCategories(category)
		setProducts(products)
		setLoading(false)
	}

	const fetchAllProducts = async () => {
		setLoading(true)
		const products = await productData.getProducts()
		setProducts(products)
		setLoading(false)
	}

	const handleSearch = async () => {
		setLoading(true)
		const results = await productData.getProductByName(keyword)
		setProducts(results)
		setKeyword('')
		setLoading(false)
	}

	useEffect(() => {
		fetchAllProducts()
	}, [])

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='bg-[#5A3E2B] text-white py-16'>
				<div className='container mx-auto px-4'>
					<div className='max-w-3xl mx-auto text-center'>
						<h1 className='text-4xl md:text-5xl font-bold font-serif mb-6'>
							Bộ Sưu Tập Sổ Tay Du Lịch
						</h1>
						<p className='text-xl text-white/90 leading-relaxed'>
							Khám phá những cuốn sổ tay du lịch Cà Mau được thiết kế tinh tế, ghi lại từng khoảnh
							khắc đáng nhớ trong hành trình của bạn.
						</p>
					</div>
				</div>
			</section>

			{/* Filters and Search */}
			<section className='py-8 bg-white border-b'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
						<div className='flex items-center gap-4'>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
								<input
									type='text'
									placeholder='Tìm kiếm sản phẩm...'
									value={keyword}
									className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5A3E2B] focus:border-transparent'
									onChange={(e) => setKeyword(e.currentTarget.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleSearch()
										}
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Product Categories */}
			<section className='py-8'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-wrap gap-3 justify-center'>
						<Button
							variant='default'
							className='bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 px-4 py-2'
							onClick={fetchAllProducts}
						>
							Tất cả sản phẩm
						</Button>
						<Button
							variant='outline'
							className='px-4 py-2 cursor-pointer hover:bg-[#87C1D8]/10'
							onClick={() => fetchProductsByCategory('Sổ Tay Xứ Mũi')}
						>
							Sổ Tay Xứ Mũi
						</Button>
						<Button
							variant='outline'
							className='px-4 py-2 cursor-pointer hover:bg-[#87C1D8]/10'
							onClick={() => fetchProductsByCategory('Móc khoá')}
						>
							Móc khoá
						</Button>
						<Button
							variant='outline'
							className='px-4 py-2 cursor-pointer hover:bg-[#87C1D8]/10'
							onClick={() => fetchProductsByCategory('Sản phẩm combo')}
						>
							Sản phẩm combo
						</Button>
					</div>
				</div>
			</section>

			{/* Products Grid */}
			<section className='py-12'>
				<div className='container mx-auto px-4'>
					<ProductGallery products={products} />
				</div>
			</section>
		</div>
	)
}

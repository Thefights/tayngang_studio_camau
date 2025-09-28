'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { categoryManagementService } from '@/services/manager/category-management.service'
import { ICategory } from '@/types/category'
import { Edit, Plus, Search, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

interface DraftCategory {
	name: string
	description: string
}

export function CategoriesManagement() {
	const [categories, setCategories] = useState<ICategory[]>([])
	const [loading, setLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [editingId, setEditingId] = useState<number | null>(null)
	const [draft, setDraft] = useState<DraftCategory>({ name: '', description: '' })
	const [deletingId, setDeletingId] = useState<number | null>(null)
	const [deleteLoading, setDeleteLoading] = useState(false)

	const fetchCategories = async () => {
		try {
			setLoading(true)
			const data = await categoryManagementService.getAllCategories()
			setCategories(data || [])
		} catch (err: any) {
			toast.error(err?.response?.data?.message || 'Không thể tải danh mục')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchCategories()
	}, [])

	const openCreateModal = () => {
		setIsEditing(false)
		setEditingId(null)
		setDraft({ name: '', description: '' })
		setIsModalOpen(true)
	}

	const openEditModal = (category: ICategory) => {
		setIsEditing(true)
		setEditingId(category.id)
		setDraft({ name: category.name, description: category.description })
		setIsModalOpen(true)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			if (isEditing && editingId != null) {
				await categoryManagementService.updateCategory(editingId, draft)
				toast.success('Cập nhật danh mục thành công')
			} else {
				await categoryManagementService.createCategory(draft)
				toast.success('Tạo danh mục thành công')
			}
			setIsModalOpen(false)
			fetchCategories()
		} catch (err: any) {
			toast.error(err?.response?.data?.message || 'Thao tác thất bại')
		}
	}

	const confirmDelete = (id: number) => {
		setDeletingId(id)
	}

	const handleDelete = async () => {
		if (!deletingId) return
		try {
			setDeleteLoading(true)
			await categoryManagementService.deleteCategory(deletingId)
			toast.success('Xoá danh mục thành công')
			setDeletingId(null)
			fetchCategories()
		} catch (err: any) {
			toast.error(err?.response?.data?.message || 'Không thể xoá danh mục')
		} finally {
			setDeleteLoading(false)
		}
	}

	const filtered = useMemo(
		() =>
			categories.filter((c) =>
				[c.name, c.description].some((field) =>
					field?.toLowerCase().includes(searchTerm.trim().toLowerCase())
				)
			),
		[categories, searchTerm]
	)

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl font-serif text-[#5A3E2B]'>Quản lý danh mục</h2>
				<Button
					onClick={openCreateModal}
					className='bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white'
					disabled={loading}
				>
					<Plus className='w-4 h-4 mr-2' /> Thêm danh mục
				</Button>
			</div>

			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<div className='flex flex-col md:flex-row gap-4'>
					<div className='flex-1'>
						<div className='relative'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50' />
							<Input
								placeholder='Tìm kiếm danh mục...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='pl-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white'
							/>
						</div>
					</div>
				</div>
			</Card>

			<Card className='bg-white border-[#5A3E2B]/10'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-[#5A3E2B]/10'>
								<th className='text-left p-4 text-[#5A3E2B] font-medium w-20'>ID</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Tên danh mục</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium'>Mô tả</th>
								<th className='text-left p-4 text-[#5A3E2B] font-medium w-40'>Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan={4} className='p-6 text-center text-[#5A3E2B]/70'>
										Đang tải...
									</td>
								</tr>
							) : filtered.length === 0 ? (
								<tr>
									<td colSpan={4} className='p-6 text-center text-[#5A3E2B]/70'>
										Không có danh mục
									</td>
								</tr>
							) : (
								filtered.map((cat) => (
									<tr key={cat.id} className='border-b border-[#5A3E2B]/5 hover:bg-[#5A3E2B]/5'>
										<td className='p-4 font-mono text-sm text-[#5A3E2B]/70'>{cat.id}</td>
										<td className='p-4 text-[#5A3E2B] font-medium'>{cat.name}</td>
										<td className='p-4 text-[#5A3E2B]/80 max-w-[400px]'>
											{cat.description || (
												<span className='italic text-[#5A3E2B]/40'>Không có mô tả</span>
											)}
										</td>
										<td className='p-4'>
											<div className='flex items-center gap-2'>
												<Button
													variant='ghost'
													size='sm'
													className='text-[#5A3E2B] hover:bg-[#5A3E2B]/10'
													onClick={() => openEditModal(cat)}
												>
													<Edit className='w-4 h-4' />
												</Button>
												<Button
													variant='ghost'
													size='sm'
													className='text-red-600 hover:bg-red-50'
													onClick={() => confirmDelete(cat.id)}
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

			{/* Modal Create/Edit */}
			{isModalOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
					<div className='bg-white rounded-lg shadow-lg w-full max-w-md border border-[#5A3E2B]/10'>
						<form onSubmit={handleSubmit} className='p-6 space-y-4'>
							<h3 className='text-lg font-serif text-[#5A3E2B]'>
								{isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
							</h3>
							<div className='space-y-1'>
								<label className='text-sm font-medium text-[#5A3E2B]'>Tên danh mục</label>
								<Input
									required
									value={draft.name}
									onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
									placeholder='Ví dụ: Sổ tay, Móc khoá...'
								/>
							</div>
							<div className='space-y-1'>
								<label className='text-sm font-medium text-[#5A3E2B]'>Mô tả</label>
								<textarea
									className='w-full rounded-md border border-[#5A3E2B]/20 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5A3E2B]'
									rows={4}
									value={draft.description}
									onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
									placeholder='Mô tả ngắn về danh mục'
								/>
							</div>
							<div className='flex justify-end gap-2 pt-2'>
								<Button
									variant='ghost'
									type='button'
									className='text-[#5A3E2B] hover:bg-[#5A3E2B]/10'
									onClick={() => setIsModalOpen(false)}
								>
									Huỷ
								</Button>
								<Button type='submit' className='bg-[#5A3E2B] text-white hover:bg-[#5A3E2B]/90'>
									{isEditing ? 'Lưu' : 'Tạo'}
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Delete Confirmation */}
			{deletingId !== null && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
					<div className='bg-white rounded-lg shadow-lg w-full max-w-sm border border-[#5A3E2B]/10 p-6 space-y-4'>
						<h3 className='text-lg font-serif text-[#5A3E2B]'>Xác nhận xoá</h3>
						<p className='text-sm text-[#5A3E2B]/80'>
							Bạn có chắc chắn muốn xoá danh mục ID {deletingId}?
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
		</div>
	)
}

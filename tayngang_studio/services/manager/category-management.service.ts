import axiosInstance from '@/axios.config'

export const categoryManagementService = {
	async getAllCategories() {
		const { data } = await axiosInstance.get('CategoryManagement')
		return data.data
	},

	async createCategory(categoryData: { name: string; description: string }) {
		const { data } = await axiosInstance.post('CategoryManagement', categoryData)
		return data
	},

	async updateCategory(id: number, categoryData: { name: string; description: string }) {
		const { data } = await axiosInstance.put(`CategoryManagement/${id}`, categoryData)
		return data
	},

	async deleteCategory(id: number) {
		const { data } = await axiosInstance.delete(`CategoryManagement/${id}`)
		return data
	},
}

import axiosInstance from '@/axios.config'

export const productManagementService = {
	async getAllProducts() {
		const { data } = await axiosInstance.get('ProductManagement')
		return data.data
	},

	async getProductById(id: number) {
		const { data } = await axiosInstance.get(`ProductManagement/${id}`)
		return data.data
	},

	async createProduct(productData: FormData) {
		const { data } = await axiosInstance.post('ProductManagement', productData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return data
	},

	async updateProduct(id: number, productData: FormData) {
		const { data } = await axiosInstance.put(`ProductManagement/${id}`, productData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return data
	},

	async deleteProduct(id: number) {
		const { data } = await axiosInstance.delete(`ProductManagement/${id}`)
		return data
	},
}

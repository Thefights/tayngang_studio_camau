import axiosInstance from '@/axios.config'
import { ForgotPasswordData, LoginData, RegisterData } from '@/types/auth'

export const authService = {
	login: async (credentials: LoginData) => {
		try {
			const response = await axiosInstance.post('/auth/login', credentials)
			return response.data
		} catch (error) {
			throw error
		}
	},

	register: async (userData: RegisterData) => {
		try {
			const response = await axiosInstance.post('/auth/register', userData)
			return response.data
		} catch (error) {
			throw error
		}
	},

	forgotPassword: async (data: ForgotPasswordData) => {
		try {
			const response = await axiosInstance.post(
				`/auth/forgot-password?email=${encodeURIComponent(data.email)}`
			)
			return response.data
		} catch (error) {
			throw error
		}
	},

	logout: () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('accessToken')
			localStorage.removeItem('userRole')
			localStorage.removeItem('userName')
			localStorage.removeItem('userEmail')
		}
	},

	getAccessToken: () => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('accessToken')
		}
		return null
	},

	getUserRole: () => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('userRole')
		}
		return null
	},
}

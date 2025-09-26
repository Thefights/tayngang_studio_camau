import axiosInstance from '@/axios.config'
import { LoginData, RegisterData } from '@/types/auth'

export const authService = {
	login: async (credentials: LoginData) => {
		try {
			const response = await axiosInstance.post('/auth/login', credentials)
			return response.data
		} catch (error) {
			console.error('Login failed:', error)
			throw error
		}
	},

	register: async (userData: RegisterData) => {
		try {
			const response = await axiosInstance.post('/auth/register', userData)
			return response.data
		} catch (error) {
			console.error('Registration failed:', error)
			throw error
		}
	},

	logout: () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('accessToken')
			localStorage.removeItem('userRole')
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

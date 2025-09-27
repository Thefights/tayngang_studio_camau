import axios from 'axios'
import { toast } from 'sonner'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Request interceptor to add auth token to headers
axiosInstance.interceptors.request.use(
	(config) => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('accessToken')
			if (token) {
				config.headers['Authorization'] = `Bearer ${token}`
			}
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	(response) => {
		if (response.data?.data?.accessToken) {
			const { accessToken, role, name, email, id } = response.data.data
			if (typeof window !== 'undefined') {
				localStorage.setItem('accessToken', accessToken)
				localStorage.setItem('userRole', role)
				localStorage.setItem('userName', name)
				localStorage.setItem('userEmail', email)
				localStorage.setItem('userId', id)
			}
		}
		return response
	},
	(error) => {
		const handleLogout = () => {
			if (typeof window !== 'undefined') {
				localStorage.removeItem('accessToken')
				localStorage.removeItem('userRole')
				localStorage.removeItem('userName')
				localStorage.removeItem('userEmail')
				localStorage.removeItem('userId')
				if (!window.location.pathname.includes('/auth/login')) {
					window.location.href = '/auth/login'
				}
			}
		}
		if (error.response?.status === 401) {
			toast.error(
				error.response?.data?.message || 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
			)
			handleLogout()
		} else if (error.response?.status === 403) {
			toast.error(
				error.response?.data?.message || 'Bạn không có quyền truy cập vào tài nguyên này.'
			)
		}
		return Promise.reject(error)
	}
)

export default axiosInstance

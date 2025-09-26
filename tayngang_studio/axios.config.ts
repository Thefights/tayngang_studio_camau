import axios from 'axios'

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

// Response interceptor to handle token storage and errors
axiosInstance.interceptors.response.use(
	(response) => {
		// If login response contains token, store it
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
		// Handle unauthorized responses
		if (error.response?.status === 401) {
			if (typeof window !== 'undefined') {
				localStorage.removeItem('accessToken')
				localStorage.removeItem('userRole')
				// Redirect to login if not already there
				if (!window.location.pathname.includes('/auth/login')) {
					window.location.href = '/auth/login'
				}
			}
		}
		return Promise.reject(error)
	}
)

export default axiosInstance

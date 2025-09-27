import axiosInstance from '@/axios.config'
import { IUser } from '@/types/user'

export const getAllUsers = async (): Promise<IUser[]> => {
	try {
		const response = await axiosInstance.get('/UserManagement')
		return response.data.data
	} catch (error) {
		console.error('Error fetching users:', error)
		throw error
	}
}

export const getUserById = async (id: number): Promise<IUser> => {
	try {
		const response = await axiosInstance.get(`/UserManagement/${id}`)
		return response.data.data
	} catch (error) {
		console.error(`Error fetching user with id ${id}:`, error)
		throw error
	}
}

export const createUser = async (userData: Omit<IUser, 'id' | 'orders'>) => {
	try {
		const response = await axiosInstance.post('/UserManagement', userData)
		return response.data
	} catch (error) {
		console.error('Error creating user:', error)
		throw error
	}
}

export const updateUser = async (id: number, userData: Partial<IUser>) => {
	try {
		const response = await axiosInstance.put(`/UserManagement/${id}`, userData)
		return response.data
	} catch (error) {
		console.error(`Error updating user with id ${id}:`, error)
		throw error
	}
}

export const deleteUser = async (id: number) => {
	try {
		const response = await axiosInstance.delete(`/UserManagement/${id}`)
		return response.data
	} catch (error) {
		console.error(`Error deleting user with id ${id}:`, error)
		throw error
	}
}

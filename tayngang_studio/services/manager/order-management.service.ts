import axiosInstance from '@/axios.config'
import { CreateOrderDto, Order } from '@/types/order'

export const getAllOrders = async (): Promise<Order[]> => {
	const response = await axiosInstance.get('/OrderManagement')
	return response.data.data
}

export const getOrderById = async (id: number): Promise<Order> => {
	const response = await axiosInstance.get(`/OrderManagement/${id}`)
	return response.data.data
}

export const createOrder = async (order: CreateOrderDto): Promise<Order> => {
	const response = await axiosInstance.post('/OrderManagement', order)
	return response.data.data
}

export const updateOrderStatus = async (
	id: number,
	status: 'Completed' | 'Canceled'
): Promise<void> => {
	await axiosInstance.put(`/OrderManagement/${id}/status`, { status })
}

export const deleteOrder = async (id: number): Promise<void> => {
	await axiosInstance.delete(`/OrderManagement/${id}`)
}

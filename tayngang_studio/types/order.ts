export interface OrderDetail {
	quantity: number
	unitPrice: number
	productId: number
	product: {
		name: string
	}
}

export interface Order {
	id: number
	orderDate: string
	totalAmount: number
	status: 'Pending' | 'Canceled' | 'Completed'
	paymentMethod: 'PayOS' | 'Cash'
	paymentUrl: string | null
	userId: number
	orderDetails: OrderDetail[]
}

export interface CreateOrderDto {
	userId: number
	paymentMethod: 'PayOS' | 'Cash'
	orderDetails: {
		quantity: number
		unitPrice: number
		productId: number
	}[]
}

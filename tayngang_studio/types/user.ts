export interface IProduct {
	name: string
}

export interface IOrderDetail {
	quantity: number
	unitPrice: number
	productId: number
	product: IProduct
}

export interface IOrder {
	orderDate: string
	totalAmount: number
	status: string
	userId: number
	orderDetails: IOrderDetail[]
	id: number
}

export interface IUser {
	email: string
	fullName: string
	phone: string
	address: string
	role: string
	orders: IOrder[]
	id: number
}

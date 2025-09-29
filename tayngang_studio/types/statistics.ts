export interface RevenueData {
	date: string
	totalRevenue: number
}

export interface ProductSalesData {
	productId: number
	productName: string
	totalQuantitySold: number
	totalRevenue: number
}

export interface MonthlyAnalytics {
	month: string
	revenue: number
	orders: number
	customers: number
}

export interface TopProduct {
	productId: number
	name: string
	sales: number
	revenue: number
}

export interface DashboardData {
	monthlyData: MonthlyAnalytics[]
	topProducts: TopProduct[]
}

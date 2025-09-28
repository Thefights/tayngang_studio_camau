import axiosInstance from '@/axios.config'
import type {
	CustomerSegment,
	DashboardData,
	MonthlyAnalytics,
	ProductSalesData,
	RevenueData,
	TopProduct,
} from '@/types/statistics'

export const statisticsService = {
	/**
	 * Get revenue by day for the range (Completed orders only)
	 */
	getRevenue: async (startDate: string, endDate: string): Promise<RevenueData[]> => {
		const response = await axiosInstance.get('Statistic/revenue', {
			params: { startDate, endDate },
		})
		return response.data
	},

	/**
	 * Get aggregated sales by product (Completed orders only)
	 */
	getSalesByProduct: async (startDate: string, endDate: string): Promise<ProductSalesData[]> => {
		const response = await axiosInstance.get('Statistic/sales-by-product', {
			params: { startDate, endDate },
		})
		return response.data
	},

	/**
	 * Get monthly analytics for the range
	 */
	getMonthlyAnalytics: async (startDate: string, endDate: string): Promise<MonthlyAnalytics[]> => {
		const response = await axiosInstance.get('Statistic/monthly', {
			params: { startDate, endDate },
		})
		return response.data
	},

	/**
	 * Get top-N products by quantity sold (Completed orders only)
	 */
	getTopProducts: async (
		startDate: string,
		endDate: string,
		top: number = 5
	): Promise<TopProduct[]> => {
		const response = await axiosInstance.get('Statistic/top-products', {
			params: { startDate, endDate, top },
		})
		return response.data
	},

	/**
	 * Get customer distribution by segment for the range
	 */
	getCustomerSegments: async (startDate: string, endDate: string): Promise<CustomerSegment[]> => {
		const response = await axiosInstance.get('Statistic/customer-segments', {
			params: { startDate, endDate },
		})
		return response.data
	},

	/**
	 * Get one-shot bundle for the Analytics Dashboard
	 */
	getDashboardData: async (startDate: string, endDate: string): Promise<DashboardData> => {
		const response = await axiosInstance.get('Statistic/dashboard', {
			params: { startDate, endDate },
		})
		return response.data
	},
}

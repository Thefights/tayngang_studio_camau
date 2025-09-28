'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { statisticsService } from '@/services/manager/statistics.service'
import type { DashboardData } from '@/types/statistics'
import { useEffect, useState } from 'react'
import {
	Area,
	AreaChart,
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { toast } from 'sonner'

export function AnalyticsDashboard() {
	const [data, setData] = useState<DashboardData | null>(null)
	const [loading, setLoading] = useState(false)
	const [startDate, setStartDate] = useState(() => {
		const date = new Date()
		date.setMonth(date.getMonth() - 6)
		return date.toISOString().split('T')[0]
	})
	const [endDate, setEndDate] = useState(() => {
		return new Date().toISOString().split('T')[0]
	})

	const fetchDashboardData = async () => {
		try {
			setLoading(true)
			const dashboardData = await statisticsService.getDashboardData(startDate, endDate)
			setData(dashboardData)
		} catch (err: any) {
			toast.error(err?.response?.data?.message || 'Không thể tải dữ liệu thống kê')
			console.error('Failed to fetch dashboard data:', err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchDashboardData()
	}, [startDate, endDate]) // eslint-disable-line react-hooks/exhaustive-deps

	const handleDateRangeChange = () => {
		if (startDate && endDate) {
			fetchDashboardData()
		}
	}

	if (loading && !data) {
		return (
			<div className='space-y-6'>
				<h2 className='text-2xl font-serif text-[#5A3E2B]'>Thống kê & Phân tích</h2>
				<div className='flex items-center justify-center h-64'>
					<div className='text-[#5A3E2B]'>Đang tải dữ liệu...</div>
				</div>
			</div>
		)
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl font-serif text-[#5A3E2B]'>Thống kê & Phân tích</h2>

				{/* Date Range Controls */}
				<div className='flex items-center gap-4'>
					<div className='flex items-center gap-2'>
						<label className='text-sm text-[#5A3E2B]'>Từ:</label>
						<Input
							type='date'
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className='w-auto'
						/>
					</div>
					<div className='flex items-center gap-2'>
						<label className='text-sm text-[#5A3E2B]'>Đến:</label>
						<Input
							type='date'
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className='w-auto'
						/>
					</div>
					<Button
						onClick={handleDateRangeChange}
						disabled={loading}
						className='bg-[#5A3E2B] hover:bg-[#5A3E2B]/90'
					>
						{loading ? 'Đang tải...' : 'Cập nhật'}
					</Button>
				</div>
			</div>

			{/* Revenue Chart */}
			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<h3 className='text-lg font-serif text-[#5A3E2B] mb-4'>Doanh thu theo tháng</h3>
				<ResponsiveContainer width='100%' height={400}>
					<AreaChart data={data?.monthlyData || []}>
						<CartesianGrid strokeDasharray='3 3' stroke='#5A3E2B20' />
						<XAxis dataKey='month' stroke='#5A3E2B' />
						<YAxis stroke='#5A3E2B' />
						<Tooltip
							contentStyle={{
								backgroundColor: 'white',
								border: '1px solid #5A3E2B20',
								borderRadius: '8px',
							}}
							formatter={(value: number) => [`${value.toLocaleString('vi-VN')}₫`, 'Doanh thu']}
						/>
						<Area
							type='monotone'
							dataKey='revenue'
							stroke='#5A3E2B'
							fill='#5A3E2B20'
							strokeWidth={2}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</Card>

			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<h3 className='text-lg font-serif text-[#5A3E2B] mb-4'>Xu hướng đơn hàng</h3>
				<ResponsiveContainer width='100%' height={300}>
					<LineChart data={data?.monthlyData || []}>
						<CartesianGrid strokeDasharray='3 3' stroke='#5A3E2B20' />
						<XAxis dataKey='month' stroke='#5A3E2B' />
						<YAxis stroke='#5A3E2B' />
						<Tooltip
							contentStyle={{
								backgroundColor: 'white',
								border: '1px solid #5A3E2B20',
								borderRadius: '8px',
							}}
							formatter={(value: number) => [value, 'Đơn hàng']}
						/>
						<Line
							type='monotone'
							dataKey='orders'
							stroke='#87C1D8'
							strokeWidth={3}
							dot={{ fill: '#87C1D8' }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</Card>

			{/* Top Products */}
			<Card className='p-6 bg-white border-[#5A3E2B]/10'>
				<h3 className='text-lg font-serif text-[#5A3E2B] mb-4'>Sản phẩm bán chạy</h3>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-[#5A3E2B]/10'>
								<th className='text-left py-3 text-[#5A3E2B] font-medium'>Sản phẩm</th>
								<th className='text-left py-3 text-[#5A3E2B] font-medium'>Số lượng bán</th>
								<th className='text-left py-3 text-[#5A3E2B] font-medium'>Doanh thu</th>
								<th className='text-left py-3 text-[#5A3E2B] font-medium'>Tỷ lệ</th>
							</tr>
						</thead>
						<tbody>
							{(data?.topProducts || []).map((product, index) => {
								const maxSales = Math.max(...(data?.topProducts || []).map((p) => p.sales))
								const percentage = maxSales > 0 ? Math.round((product.sales / maxSales) * 100) : 0

								return (
									<tr key={product.productId} className='border-b border-[#5A3E2B]/5'>
										<td className='py-3'>
											<div className='flex items-center gap-2'>
												<span className='w-6 h-6 bg-[#5A3E2B] text-white rounded-full flex items-center justify-center text-sm font-medium'>
													{index + 1}
												</span>
												<span className='text-[#5A3E2B] font-medium'>{product.name}</span>
											</div>
										</td>
										<td className='py-3 text-[#5A3E2B]'>{product.sales}</td>
										<td className='py-3 text-[#5A3E2B] font-medium'>
											{product.revenue.toLocaleString('vi-VN')}₫
										</td>
										<td className='py-3'>
											<div className='flex items-center gap-2'>
												<div className='w-20 h-2 bg-[#EAEAEA] rounded-full overflow-hidden'>
													<div
														className='h-full bg-[#5A3E2B] rounded-full'
														style={{ width: `${percentage}%` }}
													/>
												</div>
												<span className='text-sm text-[#5A3E2B]/70'>{percentage}%</span>
											</div>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
					{(!data?.topProducts || data.topProducts.length === 0) && (
						<div className='text-center py-8 text-[#5A3E2B]/70'>
							Không có dữ liệu sản phẩm bán chạy
						</div>
					)}
				</div>
			</Card>
		</div>
	)
}

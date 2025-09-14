"use client"

import { Card } from "@/components/ui/card"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

// Mock analytics data
const monthlyData = [
  { month: "T1", revenue: 12000000, orders: 45, customers: 38 },
  { month: "T2", revenue: 15000000, orders: 52, customers: 45 },
  { month: "T3", revenue: 18000000, orders: 68, customers: 58 },
  { month: "T4", revenue: 22000000, orders: 78, customers: 67 },
  { month: "T5", revenue: 25000000, orders: 89, customers: 78 },
  { month: "T6", revenue: 28000000, orders: 95, customers: 85 },
]

const topProducts = [
  { name: "Sổ Tay Classic", sales: 156, revenue: 39000000 },
  { name: "Sổ Tay Deluxe", sales: 89, revenue: 31150000 },
  { name: "Sổ Tay Eco", sales: 67, revenue: 13400000 },
  { name: "Sổ Tay Vintage", sales: 45, revenue: 18000000 },
]

const customerSegments = [
  { name: "Khách hàng mới", value: 35, color: "#87C1D8" },
  { name: "Khách hàng thường", value: 45, color: "#5A3E2B" },
  { name: "Khách hàng VIP", value: 20, color: "#A5C6A1" },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif text-[#5A3E2B]">Thống kê & Phân tích</h2>

      {/* Revenue Chart */}
      <Card className="p-6 bg-white border-[#5A3E2B]/10">
        <h3 className="text-lg font-serif text-[#5A3E2B] mb-4">Doanh thu theo tháng</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#5A3E2B20" />
            <XAxis dataKey="month" stroke="#5A3E2B" />
            <YAxis stroke="#5A3E2B" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #5A3E2B20",
                borderRadius: "8px",
              }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#5A3E2B" fill="#5A3E2B20" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Orders Trend */}
        <Card className="p-6 bg-white border-[#5A3E2B]/10">
          <h3 className="text-lg font-serif text-[#5A3E2B] mb-4">Xu hướng đơn hàng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#5A3E2B20" />
              <XAxis dataKey="month" stroke="#5A3E2B" />
              <YAxis stroke="#5A3E2B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #5A3E2B20",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="orders" stroke="#87C1D8" strokeWidth={3} dot={{ fill: "#87C1D8" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Customer Segments */}
        <Card className="p-6 bg-white border-[#5A3E2B]/10">
          <h3 className="text-lg font-serif text-[#5A3E2B] mb-4">Phân khúc khách hàng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="p-6 bg-white border-[#5A3E2B]/10">
        <h3 className="text-lg font-serif text-[#5A3E2B] mb-4">Sản phẩm bán chạy</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#5A3E2B]/10">
                <th className="text-left py-3 text-[#5A3E2B] font-medium">Sản phẩm</th>
                <th className="text-left py-3 text-[#5A3E2B] font-medium">Số lượng bán</th>
                <th className="text-left py-3 text-[#5A3E2B] font-medium">Doanh thu</th>
                <th className="text-left py-3 text-[#5A3E2B] font-medium">Tỷ lệ</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={product.name} className="border-b border-[#5A3E2B]/5">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#5A3E2B] text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-[#5A3E2B] font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-[#5A3E2B]">{product.sales}</td>
                  <td className="py-3 text-[#5A3E2B] font-medium">{product.revenue.toLocaleString("vi-VN")}₫</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-[#EAEAEA] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#5A3E2B] rounded-full"
                          style={{ width: `${(product.sales / 156) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-[#5A3E2B]/70">{Math.round((product.sales / 156) * 100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

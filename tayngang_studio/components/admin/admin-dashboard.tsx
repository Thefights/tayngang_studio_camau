"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard";
import { CustomersManagement } from "@/components/admin/customers-management";
import { OrdersManagement } from "@/components/admin/orders-management";
import { ProductsManagement } from "@/components/admin/products-management";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DollarSign, Eye, Package, ShoppingCart, Users } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock analytics data
const salesData = [
  { month: "T1", revenue: 12000000, orders: 45 },
  { month: "T2", revenue: 15000000, orders: 52 },
  { month: "T3", revenue: 18000000, orders: 68 },
  { month: "T4", revenue: 22000000, orders: 78 },
  { month: "T5", revenue: 25000000, orders: 89 },
  { month: "T6", revenue: 28000000, orders: 95 },
];

const productCategoryData = [
  { name: "Classic", value: 45, color: "#5A3E2B" },
  { name: "Deluxe", value: 30, color: "#87C1D8" },
  { name: "Eco-Friendly", value: 15, color: "#A5C6A1" },
  { name: "Vintage", value: 10, color: "#EAEAEA" },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-[#EAEAEA]">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-white border-[#5A3E2B]/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#5A3E2B]/70">
                        Tổng doanh thu
                      </p>
                      <p className="text-2xl font-bold text-[#5A3E2B]">
                        120.000.000₫
                      </p>
                      <p className="text-sm text-[#A5C6A1]">
                        +12% so với tháng trước
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-[#5A3E2B]/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-[#5A3E2B]" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white border-[#5A3E2B]/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#5A3E2B]/70">Đơn hàng</p>
                      <p className="text-2xl font-bold text-[#5A3E2B]">427</p>
                      <p className="text-sm text-[#A5C6A1]">
                        +8% so với tháng trước
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-[#87C1D8]/10 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-[#87C1D8]" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white border-[#5A3E2B]/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#5A3E2B]/70">Khách hàng</p>
                      <p className="text-2xl font-bold text-[#5A3E2B]">1,234</p>
                      <p className="text-sm text-[#A5C6A1]">
                        +15% so với tháng trước
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-[#A5C6A1]/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#A5C6A1]" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white border-[#5A3E2B]/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#5A3E2B]/70">Sản phẩm</p>
                      <p className="text-2xl font-bold text-[#5A3E2B]">56</p>
                      <p className="text-sm text-[#87C1D8]">4 sản phẩm mới</p>
                    </div>
                    <div className="w-12 h-12 bg-[#87C1D8]/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#87C1D8]" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-white border-[#5A3E2B]/10">
                  <h3 className="text-lg font-serif text-[#5A3E2B] mb-4">
                    Doanh thu theo tháng
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
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
                      <Bar
                        dataKey="revenue"
                        fill="#5A3E2B"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 bg-white border-[#5A3E2B]/10">
                  <h3 className="text-lg font-serif text-[#5A3E2B] mb-4">
                    Phân loại sản phẩm
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={productCategoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {productCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card className="p-6 bg-white border-[#5A3E2B]/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-serif text-[#5A3E2B]">
                    Đơn hàng gần đây
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Xem tất cả
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#5A3E2B]/10">
                        <th className="text-left py-3 text-[#5A3E2B] font-medium">
                          Mã đơn hàng
                        </th>
                        <th className="text-left py-3 text-[#5A3E2B] font-medium">
                          Khách hàng
                        </th>
                        <th className="text-left py-3 text-[#5A3E2B] font-medium">
                          Tổng tiền
                        </th>
                        <th className="text-left py-3 text-[#5A3E2B] font-medium">
                          Trạng thái
                        </th>
                        <th className="text-left py-3 text-[#5A3E2B] font-medium">
                          Ngày đặt
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#5A3E2B]/5">
                        <td className="py-3 text-[#5A3E2B] font-mono">
                          #CM2024001
                        </td>
                        <td className="py-3 text-[#5A3E2B]">Nguyễn Văn A</td>
                        <td className="py-3 text-[#5A3E2B] font-medium">
                          850.000₫
                        </td>
                        <td className="py-3">
                          <Badge className="bg-[#87C1D8] text-white">
                            Đang giao hàng
                          </Badge>
                        </td>
                        <td className="py-3 text-[#5A3E2B]/70">20/12/2024</td>
                      </tr>
                      <tr className="border-b border-[#5A3E2B]/5">
                        <td className="py-3 text-[#5A3E2B] font-mono">
                          #CM2024002
                        </td>
                        <td className="py-3 text-[#5A3E2B]">Trần Thị B</td>
                        <td className="py-3 text-[#5A3E2B] font-medium">
                          450.000₫
                        </td>
                        <td className="py-3">
                          <Badge className="bg-[#A5C6A1] text-white">
                            Đã giao hàng
                          </Badge>
                        </td>
                        <td className="py-3 text-[#5A3E2B]/70">19/12/2024</td>
                      </tr>
                      <tr className="border-b border-[#5A3E2B]/5">
                        <td className="py-3 text-[#5A3E2B] font-mono">
                          #CM2024003
                        </td>
                        <td className="py-3 text-[#5A3E2B]">Lê Văn C</td>
                        <td className="py-3 text-[#5A3E2B] font-medium">
                          300.000₫
                        </td>
                        <td className="py-3">
                          <Badge className="bg-[#5A3E2B] text-white">
                            Chờ xử lý
                          </Badge>
                        </td>
                        <td className="py-3 text-[#5A3E2B]/70">18/12/2024</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "products" && <ProductsManagement />}
          {activeTab === "orders" && <OrdersManagement />}
          {activeTab === "customers" && <CustomersManagement />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
        </main>
      </div>
    </div>
  );
}

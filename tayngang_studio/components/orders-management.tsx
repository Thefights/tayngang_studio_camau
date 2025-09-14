"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Eye, Search, Download } from "lucide-react"

// Mock orders data
const orders = [
  {
    id: "CM2024001",
    customer: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    total: 850000,
    status: "shipping",
    items: 3,
    date: "20/12/2024",
    address: "123 Đường ABC, TP.HCM",
  },
  {
    id: "CM2024002",
    customer: "Trần Thị B",
    email: "tranthib@email.com",
    total: 450000,
    status: "delivered",
    items: 2,
    date: "19/12/2024",
    address: "456 Đường XYZ, Hà Nội",
  },
  {
    id: "CM2024003",
    customer: "Lê Văn C",
    email: "levanc@email.com",
    total: 300000,
    status: "pending",
    items: 1,
    date: "18/12/2024",
    address: "789 Đường DEF, Đà Nẵng",
  },
  {
    id: "CM2024004",
    customer: "Phạm Thị D",
    email: "phamthid@email.com",
    total: 600000,
    status: "cancelled",
    items: 2,
    date: "17/12/2024",
    address: "321 Đường GHI, Cần Thơ",
  },
]

export function OrdersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Chờ xử lý</Badge>
      case "shipping":
        return <Badge className="bg-[#87C1D8] text-white">Đang giao hàng</Badge>
      case "delivered":
        return <Badge className="bg-[#A5C6A1] text-white">Đã giao hàng</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 text-white">Đã hủy</Badge>
      default:
        return <Badge className="bg-gray-500 text-white">Không xác định</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif text-[#5A3E2B]">Quản lý đơn hàng</h2>
        <Button
          variant="outline"
          className="border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
        >
          <Download className="w-4 h-4 mr-2" />
          Xuất báo cáo
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white border-[#5A3E2B]/10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50" />
              <Input
                placeholder="Tìm kiếm đơn hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("all")}
              className={
                selectedStatus === "all"
                  ? "bg-[#5A3E2B] text-white"
                  : "border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
              }
            >
              Tất cả
            </Button>
            <Button
              variant={selectedStatus === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("pending")}
              className={
                selectedStatus === "pending"
                  ? "bg-[#5A3E2B] text-white"
                  : "border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
              }
            >
              Chờ xử lý
            </Button>
            <Button
              variant={selectedStatus === "shipping" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("shipping")}
              className={
                selectedStatus === "shipping"
                  ? "bg-[#5A3E2B] text-white"
                  : "border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
              }
            >
              Đang giao
            </Button>
            <Button
              variant={selectedStatus === "delivered" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("delivered")}
              className={
                selectedStatus === "delivered"
                  ? "bg-[#5A3E2B] text-white"
                  : "border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
              }
            >
              Đã giao
            </Button>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="bg-white border-[#5A3E2B]/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#5A3E2B]/10">
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Mã đơn hàng</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Khách hàng</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Tổng tiền</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Trạng thái</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Sản phẩm</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Ngày đặt</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-[#5A3E2B]/5 hover:bg-[#5A3E2B]/5">
                  <td className="p-4">
                    <span className="font-mono text-[#5A3E2B] font-medium">#{order.id}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-[#5A3E2B]">{order.customer}</p>
                      <p className="text-sm text-[#5A3E2B]/70">{order.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-[#5A3E2B]">{order.total.toLocaleString("vi-VN")}₫</span>
                  </td>
                  <td className="p-4">{getStatusBadge(order.status)}</td>
                  <td className="p-4 text-[#5A3E2B]">{order.items} sản phẩm</td>
                  <td className="p-4 text-[#5A3E2B]/70">{order.date}</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm" className="text-[#87C1D8] hover:bg-[#87C1D8]/10">
                      <Eye className="w-4 h-4 mr-2" />
                      Chi tiết
                    </Button>
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

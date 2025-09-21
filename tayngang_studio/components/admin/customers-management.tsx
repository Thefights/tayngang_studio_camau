"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Eye, Search, Mail, Phone } from "lucide-react"

// Mock customers data
const customers = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0123 456 789",
    orders: 5,
    totalSpent: 2500000,
    joinDate: "15/03/2024",
    status: "active",
    lastOrder: "20/12/2024",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "0987 654 321",
    orders: 3,
    totalSpent: 1200000,
    joinDate: "22/04/2024",
    status: "active",
    lastOrder: "19/12/2024",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@email.com",
    phone: "0456 789 123",
    orders: 1,
    totalSpent: 300000,
    joinDate: "10/11/2024",
    status: "new",
    lastOrder: "18/12/2024",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    phone: "0789 123 456",
    orders: 8,
    totalSpent: 4200000,
    joinDate: "05/01/2024",
    status: "vip",
    lastOrder: "15/12/2024",
  },
]

export function CustomersManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500 text-white">Mới</Badge>
      case "active":
        return <Badge className="bg-[#A5C6A1] text-white">Hoạt động</Badge>
      case "vip":
        return <Badge className="bg-[#5A3E2B] text-white">VIP</Badge>
      default:
        return <Badge className="bg-gray-500 text-white">Không xác định</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif text-[#5A3E2B]">Quản lý khách hàng</h2>
      </div>

      {/* Search */}
      <Card className="p-6 bg-white border-[#5A3E2B]/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50" />
          <Input
            placeholder="Tìm kiếm khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white"
          />
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="bg-white border-[#5A3E2B]/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#5A3E2B]/10">
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Khách hàng</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Liên hệ</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Đơn hàng</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Tổng chi tiêu</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Trạng thái</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Ngày tham gia</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-[#5A3E2B]/5 hover:bg-[#5A3E2B]/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#5A3E2B] rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {customer.name.split(" ").pop()?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-[#5A3E2B]">{customer.name}</p>
                        <p className="text-sm text-[#5A3E2B]/70">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-[#5A3E2B]">
                        <Mail className="w-3 h-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#5A3E2B]">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-[#5A3E2B]">{customer.orders} đơn hàng</p>
                      <p className="text-sm text-[#5A3E2B]/70">Gần nhất: {customer.lastOrder}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-[#5A3E2B]">{customer.totalSpent.toLocaleString("vi-VN")}₫</span>
                  </td>
                  <td className="p-4">{getStatusBadge(customer.status)}</td>
                  <td className="p-4 text-[#5A3E2B]/70">{customer.joinDate}</td>
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

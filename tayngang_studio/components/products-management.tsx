"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react"

// Mock products data
const products = [
  {
    id: "1",
    name: "Sổ Tay Cà Mau Classic",
    category: "Classic",
    price: 250000,
    originalPrice: 300000,
    stock: 25,
    status: "active",
    image: "/classic-brown-leather-travel-notebook.jpg",
    createdAt: "15/12/2024",
  },
  {
    id: "2",
    name: "Sổ Tay Miền Tây Deluxe",
    category: "Deluxe",
    price: 350000,
    originalPrice: null,
    stock: 15,
    status: "active",
    image: "/premium-blue-travel-journal-with-golden-details.jpg",
    createdAt: "10/12/2024",
  },
  {
    id: "3",
    name: "Sổ Tay Eco-Friendly",
    category: "Eco",
    price: 200000,
    originalPrice: 250000,
    stock: 0,
    status: "out_of_stock",
    image: "/placeholder.svg?key=eco1",
    createdAt: "05/12/2024",
  },
]

export function ProductsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return <Badge className="bg-red-500 text-white">Hết hàng</Badge>
    }
    if (status === "active") {
      return <Badge className="bg-[#A5C6A1] text-white">Đang bán</Badge>
    }
    return <Badge className="bg-gray-500 text-white">Tạm dừng</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif text-[#5A3E2B]">Quản lý sản phẩm</h2>
        <Button className="bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Thêm sản phẩm
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white border-[#5A3E2B]/10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className={
                selectedCategory === "all"
                  ? "bg-[#5A3E2B] text-white"
                  : "border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
              }
            >
              Tất cả
            </Button>
            <Button
              variant={selectedCategory === "classic" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("classic")}
              className={
                selectedCategory === "classic"
                  ? "bg-[#5A3E2B] text-white"
                  : "border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
              }
            >
              Classic
            </Button>
            <Button
              variant={selectedCategory === "deluxe" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("deluxe")}
              className={
                selectedCategory === "deluxe"
                  ? "bg-[#5A3E2B] text-white"
                  : "border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
              }
            >
              Deluxe
            </Button>
          </div>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="bg-white border-[#5A3E2B]/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#5A3E2B]/10">
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Sản phẩm</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Danh mục</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Giá</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Tồn kho</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Trạng thái</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Ngày tạo</th>
                <th className="text-left p-4 text-[#5A3E2B] font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-[#5A3E2B]/5 hover:bg-[#5A3E2B]/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#EAEAEA]/30 rounded-lg overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[#5A3E2B]">{product.name}</p>
                        <p className="text-sm text-[#5A3E2B]/70">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-[#5A3E2B]">{product.category}</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-[#5A3E2B]">{product.price.toLocaleString("vi-VN")}₫</span>
                      {product.originalPrice && (
                        <span className="text-sm text-[#5A3E2B]/50 line-through">
                          {product.originalPrice.toLocaleString("vi-VN")}₫
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-[#5A3E2B]">{product.stock}</td>
                  <td className="p-4">{getStatusBadge(product.status, product.stock)}</td>
                  <td className="p-4 text-[#5A3E2B]/70">{product.createdAt}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-[#87C1D8] hover:bg-[#87C1D8]/10">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-[#5A3E2B] hover:bg-[#5A3E2B]/10">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

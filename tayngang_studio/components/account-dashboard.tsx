"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Eye, Mail, MapPin, Package, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Mock user data
const userData = {
  firstName: "Nguyễn",
  lastName: "Văn A",
  email: "nguyenvana@email.com",
  phone: "0123 456 789",
  address: "123 Đường ABC, Phường XYZ",
  city: "TP. Hồ Chí Minh",
  joinDate: "15/03/2024",
};

// Mock order data
const orders = [
  {
    id: "CM2024001",
    date: "20/12/2024",
    status: "Đang giao hàng",
    total: 850000,
    items: 3,
  },
  {
    id: "CM2024002",
    date: "15/12/2024",
    status: "Đã giao hàng",
    total: 450000,
    items: 2,
  },
  {
    id: "CM2024003",
    date: "10/12/2024",
    status: "Đã hủy",
    total: 300000,
    items: 1,
  },
];

// Mock wishlist data
const wishlistItems = [
  {
    id: "1",
    name: "Sổ Tay Cà Mau Classic",
    price: 250000,
    originalPrice: 300000,
    image: "/classic-brown-leather-travel-notebook.jpg",
    inStock: true,
  },
  {
    id: "2",
    name: "Sổ Tay Vintage Collection",
    price: 400000,
    originalPrice: null,
    image: "/placeholder.svg?key=vintage1",
    inStock: true,
  },
];

export function AccountDashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving user data:", formData);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang giao hàng":
        return "bg-[#87C1D8] text-white";
      case "Đã giao hàng":
        return "bg-[#A5C6A1] text-white";
      case "Đã hủy":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#5A3E2B] mb-2">
          Tài khoản của tôi
        </h1>
        <p className="text-[#5A3E2B]/70">
          Quản lý thông tin cá nhân và đơn hàng của bạn
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-white border-[#5A3E2B]/10">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#5A3E2B] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-serif text-lg text-[#5A3E2B]">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-sm text-[#5A3E2B]/70">{formData.email}</p>
              <p className="text-xs text-[#5A3E2B]/50 mt-1">
                Thành viên từ {formData.joinDate}
              </p>
            </div>

            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-[#5A3E2B] hover:bg-[#5A3E2B]/10"
              >
                <User className="w-4 h-4 mr-3" />
                Thông tin cá nhân
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#5A3E2B] hover:bg-[#5A3E2B]/10"
              >
                <Package className="w-4 h-4 mr-3" />
                Đơn hàng của tôi
              </Button>
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white border border-[#5A3E2B]/10">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-[#5A3E2B] data-[state=active]:text-white"
              >
                <User className="w-4 h-4 mr-2" />
                Hồ sơ
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-[#5A3E2B] data-[state=active]:text-white"
              >
                <Package className="w-4 h-4 mr-2" />
                Đơn hàng
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <Card className="p-6 bg-white border-[#5A3E2B]/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif text-[#5A3E2B]">
                    Thông tin cá nhân
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() =>
                      isEditing ? handleSave() : setIsEditing(true)
                    }
                    className="border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Lưu" : "Chỉnh sửa"}
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[#5A3E2B]">Họ</Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      disabled={!isEditing}
                      className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white disabled:bg-[#EAEAEA]/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#5A3E2B]">Tên</Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      disabled={!isEditing}
                      className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white disabled:bg-[#EAEAEA]/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#5A3E2B]">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50" />
                      <Input
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        disabled={!isEditing}
                        className="pl-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white disabled:bg-[#EAEAEA]/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#5A3E2B]">Số điện thoại</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50" />
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        disabled={!isEditing}
                        className="pl-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white disabled:bg-[#EAEAEA]/30"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-[#5A3E2B]">Địa chỉ</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50" />
                      <Input
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        disabled={!isEditing}
                        className="pl-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white disabled:bg-[#EAEAEA]/30"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-6">
              <Card className="p-6 bg-white border-[#5A3E2B]/10">
                <h2 className="text-xl font-serif text-[#5A3E2B] mb-6">
                  Đơn hàng của tôi
                </h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-[#5A3E2B]/10 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-[#5A3E2B] font-medium">
                            #{order.id}
                          </span>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
                          >
                            <Link href={`/orders/${order.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-[#5A3E2B]/70">Ngày đặt:</span>
                          <p className="text-[#5A3E2B] font-medium">
                            {order.date}
                          </p>
                        </div>
                        <div>
                          <span className="text-[#5A3E2B]/70">
                            Số sản phẩm:
                          </span>
                          <p className="text-[#5A3E2B] font-medium">
                            {order.items} sản phẩm
                          </p>
                        </div>
                        <div>
                          <span className="text-[#5A3E2B]/70">Tổng tiền:</span>
                          <p className="text-[#5A3E2B] font-medium">
                            {order.total.toLocaleString("vi-VN")}₫
                          </p>
                        </div>
                        <div>
                          <span className="text-[#5A3E2B]/70">Trạng thái:</span>
                          <p className="text-[#5A3E2B] font-medium">
                            {order.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="mt-6">
              <Card className="p-6 bg-white border-[#5A3E2B]/10">
                <h2 className="text-xl font-serif text-[#5A3E2B] mb-6">
                  Sản phẩm yêu thích
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-[#5A3E2B]/10 rounded-lg p-4"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-[#EAEAEA]/30 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-[#5A3E2B] font-medium mb-2">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-[#5A3E2B]">
                              {item.price.toLocaleString("vi-VN")}₫
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-[#5A3E2B]/50 line-through">
                                {item.originalPrice.toLocaleString("vi-VN")}₫
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white"
                            >
                              Thêm vào giỏ
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
                            >
                              Xóa
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <div className="space-y-6">
                <Card className="p-6 bg-white border-[#5A3E2B]/10">
                  <h2 className="text-xl font-serif text-[#5A3E2B] mb-4">
                    Đổi mật khẩu
                  </h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <Label className="text-[#5A3E2B]">
                        Mật khẩu hiện tại
                      </Label>
                      <Input
                        type="password"
                        className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <Label className="text-[#5A3E2B]">Mật khẩu mới</Label>
                      <Input
                        type="password"
                        className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <Label className="text-[#5A3E2B]">
                        Xác nhận mật khẩu mới
                      </Label>
                      <Input
                        type="password"
                        className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white"
                        placeholder="••••••••"
                      />
                    </div>
                    <Button className="bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white">
                      Cập nhật mật khẩu
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 bg-white border-[#5A3E2B]/10">
                  <h2 className="text-xl font-serif text-[#5A3E2B] mb-4">
                    Cài đặt thông báo
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#5A3E2B] font-medium">
                          Email khuyến mãi
                        </p>
                        <p className="text-sm text-[#5A3E2B]/70">
                          Nhận thông tin về các chương trình khuyến mãi
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
                      >
                        Bật
                      </Button>
                    </div>
                    <Separator className="bg-[#5A3E2B]/10" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#5A3E2B] font-medium">
                          Thông báo đơn hàng
                        </p>
                        <p className="text-sm text-[#5A3E2B]/70">
                          Nhận cập nhật về trạng thái đơn hàng
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
                      >
                        Bật
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

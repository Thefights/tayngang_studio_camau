"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as orderData from "@/data/other/order.data";
import * as userData from "@/data/other/user.data";
import { Edit, MapPin, Package, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

export function AccountDashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<Record<string, any>>({});
  const [orders, setOrders] = useState<any[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#A5C6A1] text-white";
      case "Canceled":
        return "bg-red-500 text-white";
      case "Pending":
        return "bg-gray-500 text-white";
      default:
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    updateProfile(user.name, user.phone, user.address);
  };

  const updateProfile = async (
    name: string,
    phone: string,
    address: string,
  ) => {
    try {
      await userData.updateUserProfile(name, phone, address);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      const profile = await userData.fetchUserProfile();
      setUser(profile);
    };

    const loadOrders = async () => {
      const userOrders = await orderData.getOrders();
      setOrders(userOrders);
    };

    loadUserProfile();
    loadOrders();
  }, []);

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
              <h3 className="font-serif text-lg text-[#5A3E2B]">{user.name}</h3>
              <p className="text-sm text-[#5A3E2B]/70">{user.email}</p>
            </div>
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
                      value={user.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      disabled={!isEditing}
                      className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white disabled:bg-[#EAEAEA]/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#5A3E2B]">Số điện thoại</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50" />
                      <Input
                        value={user.phone}
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
                        value={user.address}
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
                  {orders.map((order: any) => (
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
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-[#5A3E2B]/70">Ngày đặt:</span>
                          <p className="text-[#5A3E2B] font-medium">
                            {new Date(order.orderDate).toLocaleDateString(
                              "vi-VN",
                            )}
                          </p>
                        </div>
                        <div>
                          <span className="text-[#5A3E2B]/70">Tổng tiền:</span>
                          <p className="text-[#5A3E2B] font-medium">
                            {order.totalAmount.toLocaleString("vi-VN")}₫
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
          </Tabs>
        </div>
      </div>
    </div>
  );
}

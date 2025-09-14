import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, Phone, Mail, Download } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Chi tiết đơn hàng - Sổ tay du lịch Cà Mau",
  description: "Theo dõi chi tiết đơn hàng và trạng thái giao hàng.",
}

// Mock order data
const orderData = {
  id: "CM2024001",
  date: "20/12/2024",
  status: "shipping",
  total: 850000,
  subtotal: 750000,
  shipping: 50000,
  tax: 50000,
  paymentMethod: "Thanh toán khi nhận hàng",
  estimatedDelivery: "23-25/12/2024",
  trackingNumber: "VN123456789",
  customer: {
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0123 456 789",
  },
  shippingAddress: {
    name: "Nguyễn Văn A",
    address: "123 Đường ABC, Phường XYZ",
    city: "TP. Hồ Chí Minh",
    phone: "0123 456 789",
  },
  items: [
    {
      id: "1",
      name: "Sổ Tay Cà Mau Classic",
      image: "/classic-brown-leather-travel-notebook.jpg",
      price: 250000,
      quantity: 2,
      total: 500000,
    },
    {
      id: "2",
      name: "Sổ Tay Premium Blue",
      image: "/premium-blue-travel-journal-with-golden-details.jpg",
      price: 250000,
      quantity: 1,
      total: 250000,
    },
  ],
  timeline: [
    {
      status: "Đã đặt hàng",
      date: "20/12/2024 - 14:30",
      description: "Đơn hàng đã được tiếp nhận và xác nhận",
      completed: true,
    },
    {
      status: "Đã xác nhận",
      date: "20/12/2024 - 15:45",
      description: "Đơn hàng đã được xác nhận và chuẩn bị đóng gói",
      completed: true,
    },
    {
      status: "Đang đóng gói",
      date: "21/12/2024 - 09:15",
      description: "Sản phẩm đang được đóng gói cẩn thận",
      completed: true,
    },
    {
      status: "Đang giao hàng",
      date: "22/12/2024 - 08:00",
      description: "Đơn hàng đã được giao cho đơn vị vận chuyển",
      completed: true,
      current: true,
    },
    {
      status: "Đã giao hàng",
      date: "Dự kiến: 23-25/12/2024",
      description: "Đơn hàng sẽ được giao đến địa chỉ của bạn",
      completed: false,
    },
  ],
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" asChild className="text-[#5A3E2B] hover:bg-[#5A3E2B]/10">
            <Link href="/account">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-serif text-[#5A3E2B]">Chi tiết đơn hàng</h1>
            <p className="text-[#5A3E2B]/70">Mã đơn hàng: #{orderData.id}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white border-[#5A3E2B]/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-[#5A3E2B]">Trạng thái đơn hàng</h2>
                {getStatusBadge(orderData.status)}
              </div>

              <div className="space-y-6">
                {orderData.timeline.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed
                            ? step.current
                              ? "bg-[#87C1D8] text-white"
                              : "bg-[#A5C6A1] text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {step.completed ? (
                          step.current ? (
                            <Truck className="w-4 h-4" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )
                        ) : (
                          <Package className="w-4 h-4" />
                        )}
                      </div>
                      {index < orderData.timeline.length - 1 && (
                        <div className={`w-0.5 h-12 mt-2 ${step.completed ? "bg-[#A5C6A1]" : "bg-gray-200"}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`font-medium ${step.current ? "text-[#87C1D8]" : "text-[#5A3E2B]"}`}>
                          {step.status}
                        </h3>
                        {step.current && (
                          <Badge variant="outline" className="text-xs border-[#87C1D8] text-[#87C1D8]">
                            Hiện tại
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-[#5A3E2B]/70 mb-1">{step.date}</p>
                      <p className="text-sm text-[#5A3E2B]/60">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {orderData.trackingNumber && (
                <div className="mt-6 p-4 bg-[#87C1D8]/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#5A3E2B]/70">Mã vận đơn:</p>
                      <p className="font-mono text-[#5A3E2B] font-medium">{orderData.trackingNumber}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#87C1D8] text-[#87C1D8] hover:bg-[#87C1D8] hover:text-white bg-transparent"
                    >
                      Theo dõi
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Order Items */}
            <Card className="p-6 bg-white border-[#5A3E2B]/10">
              <h2 className="text-xl font-serif text-[#5A3E2B] mb-6">Sản phẩm đã đặt</h2>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-[#5A3E2B]/10 rounded-lg">
                    <div className="w-16 h-16 bg-[#EAEAEA]/30 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-[#5A3E2B] font-medium mb-1">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-[#5A3E2B]/70">
                          Số lượng: {item.quantity} × {item.price.toLocaleString("vi-VN")}₫
                        </div>
                        <div className="font-medium text-[#5A3E2B]">{item.total.toLocaleString("vi-VN")}₫</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary & Info */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="p-6 bg-white border-[#5A3E2B]/10">
              <h2 className="text-xl font-serif text-[#5A3E2B] mb-6">Tóm tắt đơn hàng</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#5A3E2B]/70">Tạm tính:</span>
                  <span className="text-[#5A3E2B]">{orderData.subtotal.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A3E2B]/70">Phí vận chuyển:</span>
                  <span className="text-[#5A3E2B]">{orderData.shipping.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A3E2B]/70">Thuế:</span>
                  <span className="text-[#5A3E2B]">{orderData.tax.toLocaleString("vi-VN")}₫</span>
                </div>
                <Separator className="bg-[#5A3E2B]/10" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-[#5A3E2B]">Tổng cộng:</span>
                  <span className="text-[#5A3E2B]">{orderData.total.toLocaleString("vi-VN")}₫</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#5A3E2B]/10">
                <p className="text-sm text-[#5A3E2B]/70 mb-2">Phương thức thanh toán:</p>
                <p className="text-[#5A3E2B] font-medium">{orderData.paymentMethod}</p>
              </div>

              <Button className="w-full mt-6 bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white">
                <Download className="w-4 h-4 mr-2" />
                Tải hóa đơn
              </Button>
            </Card>

            {/* Shipping Address */}
            <Card className="p-6 bg-white border-[#5A3E2B]/10">
              <h2 className="text-xl font-serif text-[#5A3E2B] mb-4">Địa chỉ giao hàng</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#5A3E2B]/50 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#5A3E2B] font-medium">{orderData.shippingAddress.name}</p>
                    <p className="text-[#5A3E2B]/70 text-sm">{orderData.shippingAddress.address}</p>
                    <p className="text-[#5A3E2B]/70 text-sm">{orderData.shippingAddress.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#5A3E2B]/50" />
                  <p className="text-[#5A3E2B]/70 text-sm">{orderData.shippingAddress.phone}</p>
                </div>
              </div>
            </Card>

            {/* Customer Info */}
            <Card className="p-6 bg-white border-[#5A3E2B]/10">
              <h2 className="text-xl font-serif text-[#5A3E2B] mb-4">Thông tin khách hàng</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#5A3E2B]/50" />
                  <p className="text-[#5A3E2B]/70 text-sm">{orderData.customer.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#5A3E2B]/50" />
                  <p className="text-[#5A3E2B]/70 text-sm">{orderData.customer.phone}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

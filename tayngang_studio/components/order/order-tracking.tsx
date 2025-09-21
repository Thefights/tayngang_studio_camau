"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Truck, CheckCircle, MapPin, Clock } from "lucide-react"

// Mock tracking data
const trackingData = {
  VN123456789: {
    orderId: "CM2024001",
    status: "shipping",
    currentLocation: "Trung tâm phân loại TP.HCM",
    estimatedDelivery: "23-25/12/2024",
    timeline: [
      {
        status: "Đã nhận hàng",
        location: "Kho Cà Mau",
        date: "21/12/2024 - 08:00",
        completed: true,
      },
      {
        status: "Đang vận chuyển",
        location: "Trung tâm phân loại TP.HCM",
        date: "22/12/2024 - 06:30",
        completed: true,
        current: true,
      },
      {
        status: "Đang giao hàng",
        location: "Bưu cục địa phương",
        date: "Dự kiến: 23/12/2024",
        completed: false,
      },
      {
        status: "Đã giao hàng",
        location: "Địa chỉ khách hàng",
        date: "Dự kiến: 23-25/12/2024",
        completed: false,
      },
    ],
  },
}

export function OrderTracking() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const result = trackingData[trackingNumber as keyof typeof trackingData]
      setTrackingResult(result || null)
      setIsLoading(false)
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "shipping":
        return <Badge className="bg-[#87C1D8] text-white">Đang giao hàng</Badge>
      case "delivered":
        return <Badge className="bg-[#A5C6A1] text-white">Đã giao hàng</Badge>
      default:
        return <Badge className="bg-gray-500 text-white">Không xác định</Badge>
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Section */}
      <Card className="p-6 bg-white border-[#5A3E2B]/10 mb-8">
        <h2 className="text-2xl font-serif text-[#5A3E2B] mb-6">Theo dõi đơn hàng</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Nhập mã vận đơn (VD: VN123456789)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white"
              onKeyPress={(e) => e.key === "Enter" && handleTrack()}
            />
          </div>
          <Button onClick={handleTrack} disabled={isLoading} className="bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white">
            <Search className="w-4 h-4 mr-2" />
            {isLoading ? "Đang tìm..." : "Theo dõi"}
          </Button>
        </div>
      </Card>

      {/* Tracking Results */}
      {trackingResult && (
        <div className="space-y-6">
          {/* Status Overview */}
          <Card className="p-6 bg-white border-[#5A3E2B]/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-serif text-[#5A3E2B] mb-2">Đơn hàng #{trackingResult.orderId}</h3>
                <p className="text-[#5A3E2B]/70">Mã vận đơn: {trackingNumber}</p>
              </div>
              {getStatusBadge(trackingResult.status)}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#87C1D8]" />
                <div>
                  <p className="text-sm text-[#5A3E2B]/70">Vị trí hiện tại:</p>
                  <p className="text-[#5A3E2B] font-medium">{trackingResult.currentLocation}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#A5C6A1]" />
                <div>
                  <p className="text-sm text-[#5A3E2B]/70">Dự kiến giao hàng:</p>
                  <p className="text-[#5A3E2B] font-medium">{trackingResult.estimatedDelivery}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Tracking Timeline */}
          <Card className="p-6 bg-white border-[#5A3E2B]/10">
            <h3 className="text-xl font-serif text-[#5A3E2B] mb-6">Lịch trình vận chuyển</h3>
            <div className="space-y-6">
              {trackingResult.timeline.map((step: any, index: number) => (
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
                    {index < trackingResult.timeline.length - 1 && (
                      <div className={`w-0.5 h-12 mt-2 ${step.completed ? "bg-[#A5C6A1]" : "bg-gray-200"}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className={`font-medium ${step.current ? "text-[#87C1D8]" : "text-[#5A3E2B]"}`}>
                        {step.status}
                      </h4>
                      {step.current && (
                        <Badge variant="outline" className="text-xs border-[#87C1D8] text-[#87C1D8]">
                          Hiện tại
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#5A3E2B]/70 mb-1">{step.date}</p>
                    <p className="text-sm text-[#5A3E2B]/60">{step.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {trackingNumber && !trackingResult && !isLoading && (
        <Card className="p-8 bg-white border-[#5A3E2B]/10 text-center">
          <Package className="w-16 h-16 text-[#5A3E2B]/30 mx-auto mb-4" />
          <h3 className="text-lg font-serif text-[#5A3E2B] mb-2">Không tìm thấy thông tin</h3>
          <p className="text-[#5A3E2B]/70">
            Vui lòng kiểm tra lại mã vận đơn hoặc liên hệ với chúng tôi để được hỗ trợ.
          </p>
        </Card>
      )}
    </div>
  )
}

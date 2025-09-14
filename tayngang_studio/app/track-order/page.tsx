import type { Metadata } from "next"
import { OrderTracking } from "@/components/order-tracking"

export const metadata: Metadata = {
  title: "Theo dõi đơn hàng - Sổ tay du lịch Cà Mau",
  description: "Theo dõi trạng thái và vị trí đơn hàng của bạn.",
}

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#5A3E2B] mb-4">Theo Dõi Đơn Hàng</h1>
          <p className="text-xl text-[#5A3E2B]/70 max-w-2xl mx-auto">
            Nhập mã vận đơn để theo dõi trạng thái và vị trí hiện tại của đơn hàng
          </p>
        </div>

        <OrderTracking />
      </div>
    </div>
  )
}

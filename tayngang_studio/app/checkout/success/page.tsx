import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Package, Phone, Truck } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <main className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-[#A5C6A1] mx-auto mb-6" />
            <h1 className="text-3xl lg:text-4xl font-serif text-[#5A3E2B] mb-4">
              Đặt hàng thành công!
            </h1>
            <p className="text-lg text-[#5A3E2B]/70">
              Cảm ơn bạn đã tin tưởng và mua sắm tại TayNgang Studio. Đơn hàng
              của bạn đã được tiếp nhận và đang được xử lý.
            </p>
          </div>

          <Card className="p-8 bg-white border-[#5A3E2B]/10 text-left mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#5A3E2B]/70">Mã đơn hàng:</span>
                <span className="font-mono text-[#5A3E2B] font-medium">
                  #CM2024001
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5A3E2B]/70">Tổng tiền:</span>
                <span className="text-xl font-bold text-[#5A3E2B]">
                  850.000₫
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5A3E2B]/70">
                  Phương thức thanh toán:
                </span>
                <span className="text-[#5A3E2B]">Thanh toán khi nhận hàng</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5A3E2B]/70">
                  Thời gian giao hàng dự kiến:
                </span>
                <span className="text-[#5A3E2B]">3-5 ngày làm việc</span>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Package className="w-12 h-12 text-[#87C1D8] mx-auto mb-3" />
              <h3 className="font-serif text-lg text-[#5A3E2B] mb-2">
                Đóng gói cẩn thận
              </h3>
              <p className="text-sm text-[#5A3E2B]/70">
                Sản phẩm được đóng gói kỹ lưỡng để đảm bảo chất lượng
              </p>
            </div>
            <div className="text-center">
              <Truck className="w-12 h-12 text-[#A5C6A1] mx-auto mb-3" />
              <h3 className="font-serif text-lg text-[#5A3E2B] mb-2">
                Giao hàng nhanh chóng
              </h3>
              <p className="text-sm text-[#5A3E2B]/70">
                Đội ngũ giao hàng chuyên nghiệp, đúng hẹn
              </p>
            </div>
            <div className="text-center">
              <Phone className="w-12 h-12 text-[#87C1D8] mx-auto mb-3" />
              <h3 className="font-serif text-lg text-[#5A3E2B] mb-2">
                Hỗ trợ 24/7
              </h3>
              <p className="text-sm text-[#5A3E2B]/70">
                Luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[#5A3E2B]/70">
              Chúng tôi sẽ gửi email xác nhận và thông tin theo dõi đơn hàng đến
              địa chỉ email của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white"
              >
                <Link href="/products">Tiếp tục mua sắm</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
              >
                <Link href="/contact">Liên hệ hỗ trợ</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

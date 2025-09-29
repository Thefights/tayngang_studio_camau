"use client";

import { Button } from "@/components/ui/button";
import { cancelOrder } from "@/data/other/checkout.data"; // 👈 chỗ bạn viết
import { ShoppingBag, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function CheckoutCancelPage() {
  useEffect(() => {
    // Gọi API cancel ngay khi load trang
    const handleCancel = async () => {
      try {
        await cancelOrder();
        console.log("Order cancelled");
      } catch (error) {
        console.error("Cancel order failed:", error);
      }
    };

    handleCancel();
  }, []);

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <main className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <XCircle className="w-20 h-20 text-red-400 mx-auto mb-6" />
            <h1 className="text-3xl lg:text-4xl font-serif text-[#5A3E2B] mb-4">
              Đơn hàng đã bị huỷ
            </h1>
            <p className="text-lg text-[#5A3E2B]/70">
              Bạn vừa huỷ đơn hàng. Nếu đây là nhầm lẫn, hãy tiếp tục mua sắm.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-[#5A3E2B]/70">
              Nếu cần hỗ trợ, vui lòng liên hệ bộ phận CSKH 24/7 của chúng tôi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white"
              >
                <Link href="/products">
                  <ShoppingBag className="w-4 h-4 mr-2" /> Tiếp tục mua sắm
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

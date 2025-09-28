"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CheckoutForm({
  handleCheckout,
  paymentMethod,
  setPaymentMethod,
}: {
  handleCheckout: () => void;
  paymentMethod: number | undefined;
  setPaymentMethod: (method: number) => void;
}) {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.unitPrice * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCheckout();
  };

  console.log("Selected payment method:", paymentMethod);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          asChild
          className="text-[#5A3E2B] hover:text-[#87C1D8] p-0"
        >
          <Link href="/cart">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại giỏ hàng
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-serif text-[#5A3E2B]">
            Thông tin thanh toán
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6 bg-white border-[#5A3E2B]/10">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-[#87C1D8]" />
                  <h2 className="text-xl font-serif text-[#5A3E2B]">
                    Phương thức thanh toán
                  </h2>
                </div>
                <RadioGroup
                  value={paymentMethod?.toString()}
                  onValueChange={(value) => setPaymentMethod(parseInt(value))}
                >
                  <div className="flex items-center space-x-2 p-3 border border-[#5A3E2B]/20 rounded-lg">
                    <RadioGroupItem value="0" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium text-[#5A3E2B]">
                          Thanh toán khi nhận hàng (COD)
                        </p>
                        <p className="text-sm text-[#5A3E2B]/70">
                          Thanh toán bằng tiền mặt khi nhận hàng
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-[#5A3E2B]/20 rounded-lg">
                    <RadioGroupItem value="1" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium text-[#5A3E2B]">
                          Chuyển khoản ngân hàng
                        </p>
                        <p className="text-sm text-[#5A3E2B]/70">
                          Chuyển khoản trước khi giao hàng
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </Card>
            </motion.div>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="p-6 bg-white border-[#5A3E2B]/10 sticky top-8">
            <h2 className="text-xl font-serif text-[#5A3E2B] mb-4">
              Đơn hàng của bạn
            </h2>

            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-4 mb-6">
                {cartItems.map((item: any) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-16 h-16 bg-[#EAEAEA]/30 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.productImageUrl}
                        alt="Product Image"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#5A3E2B] text-sm">
                        {item.productName}
                      </h3>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-[#5A3E2B]/70">
                          Số lượng: {item.quantity}
                        </span>
                        <span className="font-medium text-[#5A3E2B]">
                          {(item.unitPrice * item.quantity).toLocaleString(
                            "vi-VN"
                          )}
                          ₫
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <Separator className="bg-[#5A3E2B]/10 mb-4" />

            {/* Order Totals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-3">
                <Separator className="bg-[#5A3E2B]/10" />
                <div className="flex justify-between text-lg font-bold text-[#5A3E2B]">
                  <span>Tổng cộng:</span>
                  <span>{total.toLocaleString("vi-VN")}₫</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                type="submit"
                size="lg"
                className="w-full mt-6 bg-[#5A3E2B] hover:bg-gradient-to-r hover:from-[#5A3E2B] hover:to-[#4A3325] text-white transition-all duration-300"
                onClick={handleSubmit}
              >
                Hoàn tất đơn hàng
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

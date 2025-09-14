"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Mock cart data for checkout
const cartItems = [
  {
    id: "1",
    name: "Sổ Tay Cà Mau Classic",
    price: 250000,
    quantity: 2,
    image: "/classic-brown-leather-travel-notebook.jpg",
  },
  {
    id: "2",
    name: "Sổ Tay Miền Tây Deluxe",
    price: 350000,
    quantity: 1,
    image: "/premium-blue-travel-journal-with-golden-details.jpg",
  },
]

export function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    postalCode: "",
    notes: "",
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shippingMethod === "express" ? 50000 : subtotal >= 500000 ? 0 : 30000
  const total = subtotal + shippingCost

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle order submission
    console.log("Order submitted:", { formData, paymentMethod, shippingMethod, cartItems })
    // Redirect to success page
    window.location.href = "/checkout/success"
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="text-[#5A3E2B] hover:text-[#87C1D8] p-0">
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
          <h1 className="text-3xl font-serif text-[#5A3E2B]">Thông tin thanh toán</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6 bg-white border-[#5A3E2B]/10">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-[#87C1D8]" />
                  <h2 className="text-xl font-serif text-[#5A3E2B]">Thông tin liên hệ</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-[#5A3E2B]">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] focus:ring-2 focus:ring-[#5A3E2B]/20 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="firstName" className="text-[#5A3E2B]">
                      Họ *
                    </Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] focus:ring-2 focus:ring-[#5A3E2B]/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-[#5A3E2B]">
                      Tên *
                    </Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] focus:ring-2 focus:ring-[#5A3E2B]/20 transition-all duration-300"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone" className="text-[#5A3E2B]">
                      Số điện thoại *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] focus:ring-2 focus:ring-[#5A3E2B]/20 transition-all duration-300"
                      placeholder="0123 456 789"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-[#5A3E2B]">
                      Địa chỉ *
                    </Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] focus:ring-2 focus:ring-[#5A3E2B]/20 transition-all duration-300"
                      placeholder="Số nhà, tên đường"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-[#5A3E2B]">
                      Tỉnh/Thành phố *
                    </Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] focus:ring-2 focus:ring-[#5A3E2B]/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="district" className="text-[#5A3E2B]">
                      Quận/Huyện *
                    </Label>
                    <Input
                      id="district"
                      required
                      value={formData.district}
                      onChange={(e) => handleInputChange("district", e.target.value)}
                      className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] focus:ring-2 focus:ring-[#5A3E2B]/20 transition-all duration-300"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="notes" className="text-[#5A3E2B]">
                      Ghi chú đơn hàng (tùy chọn)
                    </Label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      className="border-[#5A3E2B]/20 focus:border-[#5A3E2B] focus:ring-2 focus:ring-[#5A3E2B]/20 transition-all duration-300"
                      placeholder="Ghi chú về đơn hàng, ví dụ: giao hàng giờ hành chính"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Shipping Method */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 bg-white border-[#5A3E2B]/10">
                <h2 className="text-xl font-serif text-[#5A3E2B] mb-4">Phương thức vận chuyển</h2>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                  <div className="flex items-center space-x-2 p-3 border border-[#5A3E2B]/20 rounded-lg">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-[#5A3E2B]">Giao hàng tiêu chuẩn</p>
                          <p className="text-sm text-[#5A3E2B]/70">3-5 ngày làm việc</p>
                        </div>
                        <span className="text-[#5A3E2B] font-medium">
                          {subtotal >= 500000 ? "Miễn phí" : "30.000₫"}
                        </span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-[#5A3E2B]/20 rounded-lg">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-[#5A3E2B]">Giao hàng nhanh</p>
                          <p className="text-sm text-[#5A3E2B]/70">1-2 ngày làm việc</p>
                        </div>
                        <span className="text-[#5A3E2B] font-medium">50.000₫</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </Card>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6 bg-white border-[#5A3E2B]/10">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-[#87C1D8]" />
                  <h2 className="text-xl font-serif text-[#5A3E2B]">Phương thức thanh toán</h2>
                </div>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border border-[#5A3E2B]/20 rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium text-[#5A3E2B]">Thanh toán khi nhận hàng (COD)</p>
                        <p className="text-sm text-[#5A3E2B]/70">Thanh toán bằng tiền mặt khi nhận hàng</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-[#5A3E2B]/20 rounded-lg">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium text-[#5A3E2B]">Chuyển khoản ngân hàng</p>
                        <p className="text-sm text-[#5A3E2B]/70">Chuyển khoản trước khi giao hàng</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </Card>
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm text-[#5A3E2B]/80 cursor-pointer">
                  Tôi đồng ý với{" "}
                  <Link href="/terms" className="text-[#87C1D8] hover:underline">
                    điều khoản và điều kiện
                  </Link>{" "}
                  của cửa hàng
                </Label>
              </div>
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
            <h2 className="text-xl font-serif text-[#5A3E2B] mb-4">Đơn hàng của bạn</h2>

            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-[#EAEAEA]/30 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#5A3E2B] text-sm">{item.name}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-[#5A3E2B]/70">Số lượng: {item.quantity}</span>
                        <span className="font-medium text-[#5A3E2B]">
                          {(item.price * item.quantity).toLocaleString("vi-VN")}₫
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
                <div className="flex justify-between text-[#5A3E2B]/80">
                  <span>Tạm tính:</span>
                  <span>{subtotal.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between text-[#5A3E2B]/80">
                  <span>Phí vận chuyển:</span>
                  <span>{shippingCost === 0 ? "Miễn phí" : `${shippingCost.toLocaleString("vi-VN")}₫`}</span>
                </div>
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
  )
}

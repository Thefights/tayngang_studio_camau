"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Mock cart data
const initialCartItems = [
  {
    id: "1",
    name: "Sổ Tay Cà Mau Classic",
    price: 250000,
    originalPrice: 300000,
    image: "/classic-brown-leather-travel-notebook.jpg",
    quantity: 2,
    inStock: true,
  },
  {
    id: "2",
    name: "Sổ Tay Miền Tây Deluxe",
    price: 350000,
    originalPrice: null,
    image: "/premium-blue-travel-journal-with-golden-details.jpg",
    quantity: 1,
    inStock: true,
  },
]

export function ShoppingCartContent() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 500000 ? 0 : 30000
  const discount = promoCode === "CAMAU10" ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <ShoppingBag className="w-24 h-24 text-[#5A3E2B]/30 mx-auto mb-6" />
          <h2 className="text-2xl font-serif text-[#5A3E2B] mb-4">Giỏ hàng của bạn đang trống</h2>
          <p className="text-[#5A3E2B]/70 mb-8">Hãy khám phá bộ sưu tập sổ tay tuyệt vời của chúng tôi</p>
          <Button asChild className="bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white">
            <Link href="/products">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="text-[#5A3E2B] hover:text-[#87C1D8] p-0">
          <Link href="/products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tiếp tục mua sắm
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-serif text-[#5A3E2B]">Giỏ hàng của bạn</h1>
            <span className="text-[#5A3E2B]/70">({cartItems.length} sản phẩm)</span>
          </motion.div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: -100,
                    scale: 0.8,
                    transition: { duration: 0.3 },
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <Card className="p-6 bg-white border-[#5A3E2B]/10">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <motion.div
                        className="w-24 h-24 bg-[#EAEAEA]/30 rounded-lg overflow-hidden flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-serif text-lg text-[#5A3E2B] font-medium">{item.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-lg font-bold text-[#5A3E2B]">
                                {item.price.toLocaleString("vi-VN")}₫
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-[#5A3E2B]/50 line-through">
                                  {item.originalPrice.toLocaleString("vi-VN")}₫
                                </span>
                              )}
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-[#5A3E2B]/50 hover:text-red-500 p-1 transition-colors duration-200"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-[#5A3E2B]/20 rounded-lg">
                            <motion.div
                              whileTap={{ scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-[#5A3E2B] hover:bg-[#5A3E2B]/10 px-3 transition-colors duration-200"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                            </motion.div>
                            <motion.span
                              className="px-4 py-2 text-[#5A3E2B] font-medium min-w-[3rem] text-center"
                              key={`${item.id}-${item.quantity}`}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              {item.quantity}
                            </motion.span>
                            <motion.div
                              whileTap={{ scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-[#5A3E2B] hover:bg-[#5A3E2B]/10 px-3 transition-colors duration-200"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          </div>
                          <motion.span
                            className="text-lg font-bold text-[#5A3E2B]"
                            key={`total-${item.id}-${item.quantity}`}
                            initial={{ scale: 1.1, color: "#A5C6A1" }}
                            animate={{ scale: 1, color: "#5A3E2B" }}
                            transition={{ duration: 0.3 }}
                          >
                            {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="p-6 bg-white border-[#5A3E2B]/10">
            <h2 className="text-xl font-serif text-[#5A3E2B] mb-4">Tóm tắt đơn hàng</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-[#5A3E2B]/80">
                <span>Tạm tính:</span>
                <span>{subtotal.toLocaleString("vi-VN")}₫</span>
              </div>
              <div className="flex justify-between text-[#5A3E2B]/80">
                <span>Phí vận chuyển:</span>
                <span>{shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString("vi-VN")}₫`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#A5C6A1]">
                  <span>Giảm giá:</span>
                  <span>-{discount.toLocaleString("vi-VN")}₫</span>
                </div>
              )}
              <Separator className="bg-[#5A3E2B]/10" />
              <div className="flex justify-between text-lg font-bold text-[#5A3E2B]">
                <span>Tổng cộng:</span>
                <span>{total.toLocaleString("vi-VN")}₫</span>
              </div>
            </div>

            {shipping > 0 && (
              <div className="mt-4 p-3 bg-[#87C1D8]/10 rounded-lg">
                <p className="text-sm text-[#5A3E2B]/70">
                  Thêm {(500000 - subtotal).toLocaleString("vi-VN")}₫ để được miễn phí vận chuyển
                </p>
              </div>
            )}
          </Card>

          {/* Promo Code */}
          <Card className="p-6 bg-white border-[#5A3E2B]/10">
            <h3 className="font-serif text-lg text-[#5A3E2B] mb-3">Mã giảm giá</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Nhập mã giảm giá"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="border-[#5A3E2B]/20 focus:border-[#5A3E2B]"
              />
              <Button
                variant="outline"
                className="border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent"
              >
                Áp dụng
              </Button>
            </div>
            {promoCode === "CAMAU10" && (
              <p className="text-sm text-[#A5C6A1] mt-2">Mã giảm giá đã được áp dụng! Giảm 10%</p>
            )}
          </Card>

          {/* Checkout Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              asChild
              size="lg"
              className="w-full bg-[#5A3E2B] hover:bg-gradient-to-r hover:from-[#5A3E2B] hover:to-[#4A3325] text-white transition-all duration-300"
            >
              <Link href="/checkout">Tiến hành thanh toán</Link>
            </Button>
          </motion.div>

          {/* Security Info */}
          <div className="text-center text-sm text-[#5A3E2B]/60">
            <p>Thanh toán an toàn và bảo mật</p>
            <p>Hỗ trợ đổi trả trong 30 ngày</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

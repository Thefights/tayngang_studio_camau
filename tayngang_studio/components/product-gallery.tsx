"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { motion } from "framer-motion"

// Mock product data
const products = [
  {
    id: 1,
    name: "Sổ Tay Cà Mau Classic",
    price: 250000,
    originalPrice: 300000,
    image: "/classic-brown-leather-travel-notebook.jpg",
    rating: 4.8,
    reviews: 124,
    isNew: false,
    isBestseller: true,
  },
  {
    id: 2,
    name: "Sổ Tay Miền Tây Deluxe",
    price: 350000,
    originalPrice: null,
    image: "/premium-blue-travel-journal-with-golden-details.jpg",
    rating: 4.9,
    reviews: 89,
    isNew: true,
    isBestseller: false,
  },
  {
    id: 3,
    name: "Sổ Tay Eco-Friendly",
    price: 200000,
    originalPrice: 250000,
    image: "/placeholder.svg?key=q5g2v",
    rating: 4.7,
    reviews: 156,
    isNew: false,
    isBestseller: false,
  },
  {
    id: 4,
    name: "Sổ Tay Vintage Collection",
    price: 400000,
    originalPrice: null,
    image: "/placeholder.svg?key=pqezi",
    rating: 4.9,
    reviews: 67,
    isNew: false,
    isBestseller: true,
  },
]

export function ProductGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl lg:text-4xl font-serif text-[#5A3E2B] mb-4 text-balance">Bộ Sưu Tập Sổ Tay</h2>
          <p className="text-lg text-[#5A3E2B]/70 max-w-2xl mx-auto text-pretty">
            Mỗi cuốn sổ tay đều được chế tác tỉ mỉ, mang đến trải nghiệm viết và ghi chép tuyệt vời cho hành trình khám
            phá của bạn.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <motion.div
                  className="relative aspect-square overflow-hidden bg-[#EAEAEA]/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <motion.span
                        className="bg-[#A5C6A1] text-white text-xs font-medium px-2 py-1 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 30 }}
                      >
                        Mới
                      </motion.span>
                    )}
                    {product.isBestseller && (
                      <motion.span
                        className="bg-[#87C1D8] text-white text-xs font-medium px-2 py-1 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 500, damping: 30 }}
                      >
                        Bán chạy
                      </motion.span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-3 right-3"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 bg-white/80 hover:bg-white text-[#5A3E2B] transition-all duration-200"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </motion.div>

                  {/* Quick View Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <Button
                        asChild
                        className="bg-white text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white transition-all duration-300"
                      >
                        <Link href={`/products/${product.id}`}>Xem chi tiết</Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <div className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#5A3E2B]/60">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-serif text-lg text-[#5A3E2B] font-medium text-balance">{product.name}</h3>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-[#5A3E2B]">{product.price.toLocaleString("vi-VN")}₫</span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#5A3E2B]/50 line-through">
                        {product.originalPrice.toLocaleString("vi-VN")}₫
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      className="w-full bg-[#5A3E2B] hover:bg-gradient-to-r hover:from-[#5A3E2B] hover:to-[#4A3325] text-white transition-all duration-300"
                      size="sm"
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white px-8 bg-transparent transition-all duration-300"
            >
              <Link href="/products">Xem tất cả sản phẩm</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-white to-[#EAEAEA] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <motion.h1
                className="text-4xl lg:text-6xl font-serif text-[#5A3E2B] leading-tight text-balance"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Sổ Tay Du Lịch
                <span className="block text-[#2563EB]">Cà Mau</span>
              </motion.h1>
              <motion.p
                className="text-lg text-[#5A3E2B]/80 leading-relaxed text-pretty max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Khám phá vẻ đẹp hoang sơ của miền Tây Nam Bộ qua những trang sổ tay được thiết kế tinh tế, lưu giữ từng
                khoảnh khắc đáng nhớ trong hành trình của bạn.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-[#5A3E2B] hover:bg-gradient-to-r hover:from-[#5A3E2B] hover:to-[#4A3325] text-white px-8 py-3 text-base font-medium transition-all duration-300"
                >
                  <Link href="/products">Khám phá sản phẩm</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white px-8 py-3 text-base font-medium bg-transparent transition-all duration-300"
                >
                  Tìm hiểu thêm
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="aspect-square bg-white rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <img
                src="/elegant-travel-notebook-with-c--mau-landscape-sket.jpg"
                alt="Sổ tay du lịch Cà Mau"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-[#A5C6A1]/20 rounded-full blur-xl"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#87C1D8]/20 rounded-full blur-xl"
              animate={{
                y: [0, 10, 0],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  stockQuantity: number;
  category: string;
  tags: string[];
}

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Image */}
          <motion.div
            className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg"
            layoutId={`product-image-${selectedImage}`}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-white rounded-lg overflow-hidden shadow-md transition-all ${
                  selectedImage === index
                    ? "ring-2 ring-[#5A3E2B] ring-offset-2"
                    : "hover:shadow-lg"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-[#A5C6A1] text-white">
                {product.category}
              </Badge>
              {discount > 0 && (
                <Badge variant="destructive" className="bg-red-500 text-white">
                  -{discount}%
                </Badge>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-serif text-[#5A3E2B] text-balance">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#5A3E2B]/70">
                {product.rating} ({product.reviews} đánh giá)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[#5A3E2B]">
                {product.price.toLocaleString("vi-VN")}₫
              </span>
              {product.originalPrice && (
                <span className="text-xl text-[#5A3E2B]/50 line-through">
                  {product.originalPrice.toLocaleString("vi-VN")}₫
                </span>
              )}
            </div>
            <p className="text-sm text-[#5A3E2B]/70">
              Đã bao gồm VAT. Miễn phí vận chuyển cho đơn hàng trên 500.000₫
            </p>
          </div>

          {/* Description */}
          <p className="text-[#5A3E2B]/80 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity & Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[#5A3E2B] font-medium">Số lượng:</span>
              <div className="flex items-center border border-[#5A3E2B]/20 rounded-lg">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#5A3E2B] hover:bg-[#5A3E2B]/10 transition-colors duration-200"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.span
                  className="px-4 py-2 text-[#5A3E2B] font-medium min-w-[3rem] text-center"
                  key={quantity}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {quantity}
                </motion.span>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setQuantity(Math.min(product.stockQuantity, quantity + 1))
                    }
                    className="text-[#5A3E2B] hover:bg-[#5A3E2B]/10 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
              <span className="text-sm text-[#5A3E2B]/60">
                ({product.stockQuantity} sản phẩm có sẵn)
              </span>
            </div>

            <div className="flex gap-4">
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  className="w-full bg-[#5A3E2B] hover:bg-gradient-to-r hover:from-[#5A3E2B] hover:to-[#4A3325] text-white transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Thêm vào giỏ hàng
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`border-[#5A3E2B] transition-all duration-300 ${
                    isWishlisted
                      ? "bg-[#5A3E2B] text-white"
                      : "text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white"
                  }`}
                >
                  <motion.div
                    animate={{ scale: isWishlisted ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white bg-transparent transition-all duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Features */}
          <Card className="p-6 bg-white border-[#5A3E2B]/10">
            <h3 className="font-serif text-lg text-[#5A3E2B] mb-4">
              Đặc điểm nổi bật
            </h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-[#5A3E2B]/80"
                >
                  <div className="w-1.5 h-1.5 bg-[#A5C6A1] rounded-full mt-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </Card>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-[#5A3E2B]/70">
              <Truck className="w-5 h-5 text-[#87C1D8]" />
              <span className="text-sm">Giao hàng nhanh</span>
            </div>
            <div className="flex items-center gap-2 text-[#5A3E2B]/70">
              <Shield className="w-5 h-5 text-[#A5C6A1]" />
              <span className="text-sm">Bảo hành 1 năm</span>
            </div>
            <div className="flex items-center gap-2 text-[#5A3E2B]/70">
              <RotateCcw className="w-5 h-5 text-[#87C1D8]" />
              <span className="text-sm">Đổi trả 30 ngày</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-[#5A3E2B]/10">
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-[#5A3E2B] data-[state=active]:text-white"
            >
              Mô tả chi tiết
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="data-[state=active]:bg-[#5A3E2B] data-[state=active]:text-white"
            >
              Thông số kỹ thuật
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-[#5A3E2B] data-[state=active]:text-white"
            >
              Đánh giá ({product.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="p-6 bg-white">
              <div className="prose prose-lg max-w-none text-[#5A3E2B]/80">
                <p className="leading-relaxed">{product.description}</p>
                <p className="leading-relaxed mt-4">
                  Sản phẩm được thiết kế đặc biệt cho những người yêu thích du
                  lịch và khám phá. Mỗi chi tiết đều được chăm chút tỉ mỉ để
                  mang lại trải nghiệm tốt nhất cho người sử dụng.
                </p>
                <p className="leading-relaxed mt-4">
                  Với chất lượng cao cấp và thiết kế tinh tế, đây là món quà
                  hoàn hảo cho bản thân hoặc những người thân yêu của bạn.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card className="p-6 bg-white">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-2 border-b border-[#5A3E2B]/10"
                  >
                    <span className="font-medium text-[#5A3E2B]">{key}:</span>
                    <span className="text-[#5A3E2B]/80">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="p-6 bg-white">
              <div className="text-center py-8">
                <p className="text-[#5A3E2B]/60">
                  Tính năng đánh giá sẽ được cập nhật sớm
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

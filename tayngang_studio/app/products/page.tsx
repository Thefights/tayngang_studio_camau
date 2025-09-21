"use client";

import { ProductGallery } from "@/components/product-gallery";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#5A3E2B] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              Bộ Sưu Tập Sổ Tay Du Lịch
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Khám phá những cuốn sổ tay du lịch Cà Mau được thiết kế tinh tế,
              ghi lại từng khoảnh khắc đáng nhớ trong hành trình của bạn.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5A3E2B] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge
              variant="default"
              className="bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 px-4 py-2"
            >
              Tất cả sản phẩm
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-[#87C1D8]/10"
            >
              Sổ Tay Xứ Mũi
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-[#87C1D8]/10"
            >
              Móc khoá
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-[#87C1D8]/10"
            >
              Sản phẩm combo
            </Badge>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ProductGallery />
        </div>
      </section>
    </div>
  );
}

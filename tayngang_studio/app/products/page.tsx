import type { Metadata } from "next"
import { ProductGallery } from "@/components/product-gallery"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Grid, List } from "lucide-react"

export const metadata: Metadata = {
  title: "Sản phẩm - Sổ tay du lịch Cà Mau",
  description: "Khám phá bộ sưu tập sổ tay du lịch Cà Mau cao cấp với thiết kế độc đáo và chất lượng tuyệt vời.",
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#5A3E2B] to-[#87C1D8] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Bộ Sưu Tập Sổ Tay Du Lịch</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Khám phá những cuốn sổ tay du lịch Cà Mau được thiết kế tinh tế, ghi lại từng khoảnh khắc đáng nhớ trong
              hành trình của bạn.
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
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Bộ lọc
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Hiển thị:</span>
              <div className="flex border rounded-lg">
                <Button variant="ghost" size="sm" className="rounded-r-none">
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-l-none border-l">
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="default" className="bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 px-4 py-2">
              Tất cả sản phẩm
            </Badge>
            <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-[#87C1D8]/10">
              Sổ tay da cao cấp
            </Badge>
            <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-[#87C1D8]/10">
              Sổ tay vải canvas
            </Badge>
            <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-[#87C1D8]/10">
              Phiên bản giới hạn
            </Badge>
            <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-[#87C1D8]/10">
              Quà tặng
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

      {/* Newsletter Section */}
      <section className="py-16 bg-[#A5C6A1]/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-serif text-[#5A3E2B] mb-4">Đăng ký nhận thông tin mới</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Nhận thông báo về sản phẩm mới, ưu đãi đặc biệt và những câu chuyện du lịch thú vị từ Cà Mau.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5A3E2B] focus:border-transparent"
            />
            <Button className="bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 px-8">Đăng ký</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

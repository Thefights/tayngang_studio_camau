import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#5A3E2B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <span className="text-[#5A3E2B] font-bold text-sm">CM</span>
              </div>
              <span className="font-serif text-xl font-medium">Cà Mau Travel</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Khám phá vẻ đẹp Cà Mau qua những trang sổ tay được thiết kế tinh tế, lưu giữ từng khoảnh khắc đáng nhớ
              trong hành trình của bạn.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/60 hover:text-[#87C1D8] transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white/60 hover:text-[#87C1D8] transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium">Liên kết nhanh</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-white/80 hover:text-[#87C1D8] transition-colors text-sm">
                Trang chủ
              </Link>
              <Link href="/products" className="text-white/80 hover:text-[#87C1D8] transition-colors text-sm">
                Sản phẩm
              </Link>
              <Link href="/about" className="text-white/80 hover:text-[#87C1D8] transition-colors text-sm">
                Về chúng tôi
              </Link>
              <Link href="/contact" className="text-white/80 hover:text-[#87C1D8] transition-colors text-sm">
                Liên hệ
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium">Hỗ trợ khách hàng</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/shipping" className="text-white/80 hover:text-[#87C1D8] transition-colors text-sm">
                Chính sách giao hàng
              </Link>
              <Link href="/returns" className="text-white/80 hover:text-[#87C1D8] transition-colors text-sm">
                Đổi trả hàng
              </Link>
              <Link href="/warranty" className="text-white/80 hover:text-[#87C1D8] transition-colors text-sm">
                Bảo hành
              </Link>
              <Link href="/faq" className="text-white/80 hover:text-[#87C1D8] transition-colors text-sm">
                Câu hỏi thường gặp
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium">Thông tin liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-[#87C1D8] flex-shrink-0" />
                <span className="text-white/80 text-sm">123 Đường Nguyễn Văn Cừ, TP. Cà Mau, Tỉnh Cà Mau</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#87C1D8] flex-shrink-0" />
                <span className="text-white/80 text-sm">0290 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#87C1D8] flex-shrink-0" />
                <span className="text-white/80 text-sm">info@camautravel.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">© 2024 Cà Mau Travel. Tất cả quyền được bảo lưu.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-white/60 hover:text-[#87C1D8] transition-colors text-sm">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-[#87C1D8] transition-colors text-sm">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

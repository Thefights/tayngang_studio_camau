import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Về chúng tôi - Sổ tay du lịch Cà Mau",
  description:
    "Tìm hiểu về câu chuyện, sứ mệnh và giá trị của thương hiệu sổ tay du lịch Cà Mau.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#5A3E2B] to-[#87C1D8] text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
              Câu Chuyện Của Chúng Tôi
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Từ vùng đất mũi Cà Mau, chúng tôi mang đến những cuốn sổ tay du
              lịch được chế tác tỉ mỉ, ghi lại từng khoảnh khắc đáng nhớ trong
              hành trình khám phá của bạn.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-serif text-[#5A3E2B] mb-6">
                Khởi Nguồn Từ Tình Yêu Du Lịch
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Sinh ra và lớn lên tại Cà Mau - vùng đất mũi của Tổ quốc,
                  chúng tôi hiểu rõ giá trị của việc lưu giữ những kỷ niệm đẹp.
                  Mỗi chuyến đi là một câu chuyện, mỗi trải nghiệm là một bài
                  học quý giá.
                </p>
                <p>
                  Với niềm đam mê du lịch và tình yêu với nghệ thuật thủ công
                  truyền thống, chúng tôi đã tạo ra những cuốn sổ tay du lịch
                  không chỉ đẹp mắt mà còn mang trong mình câu chuyện văn hóa
                  đặc sắc của vùng đất Cà Mau.
                </p>
                <p>
                  Mỗi cuốn sổ được làm thủ công tỉ mỉ, từ việc chọn lựa chất
                  liệu đến từng đường kim mũi chỉ, tất cả đều thể hiện tình yêu
                  và sự tôn trọng đối với nghề thủ công truyền thống.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/ca-mau-landscape-sunset.jpg"
                alt="Phong cảnh Cà Mau"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-[#EAEAEA]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-[#5A3E2B] mb-6">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những giá trị định hướng mọi hoạt động của chúng tôi trong việc
              tạo ra những sản phẩm chất lượng và ý nghĩa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#5A3E2B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-[#5A3E2B]" />
                </div>
                <h3 className="text-xl font-bold text-[#5A3E2B] mb-4">
                  Tình Yêu Thủ Công
                </h3>
                <p className="text-gray-600">
                  Mỗi sản phẩm được chế tác thủ công với tình yêu và sự tỉ mỉ,
                  mang đậm dấu ấn cá nhân của người thợ.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#87C1D8]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-[#87C1D8]" />
                </div>
                <h3 className="text-xl font-bold text-[#5A3E2B] mb-4">
                  Chất Lượng Cao
                </h3>
                <p className="text-gray-600">
                  Chúng tôi chỉ sử dụng những chất liệu tốt nhất, đảm bảo độ bền
                  và vẻ đẹp lâu dài cho sản phẩm.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#A5C6A1]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-[#A5C6A1]" />
                </div>
                <h3 className="text-xl font-bold text-[#5A3E2B] mb-4">
                  Cộng Đồng
                </h3>
                <p className="text-gray-600">
                  Xây dựng cộng đồng những người yêu du lịch, chia sẻ câu chuyện
                  và trải nghiệm qua từng trang sổ.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#5A3E2B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-[#5A3E2B]" />
                </div>
                <h3 className="text-xl font-bold text-[#5A3E2B] mb-4">
                  Bền Vững
                </h3>
                <p className="text-gray-600">
                  Cam kết sử dụng nguyên liệu thân thiện với môi trường, góp
                  phần bảo vệ hành tinh xanh.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-[#5A3E2B] mb-6">
              Đội Ngũ Của Chúng Tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những con người đam mê và tài năng, cùng nhau tạo nên những sản
              phẩm độc đáo và ý nghĩa cho cộng đồng yêu du lịch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#5A3E2B] to-[#87C1D8] rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-[#5A3E2B] mb-2">
                  Nguyễn Văn An
                </h3>
                <p className="text-[#87C1D8] font-medium mb-4">
                  Nhà sáng lập & Giám đốc sáng tạo
                </p>
                <p className="text-gray-600 text-sm">
                  Với hơn 15 năm kinh nghiệm trong ngành thủ công mỹ nghệ, anh
                  An là người đặt nền móng cho thương hiệu.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#87C1D8] to-[#A5C6A1] rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-[#5A3E2B] mb-2">
                  Trần Thị Bình
                </h3>
                <p className="text-[#87C1D8] font-medium mb-4">
                  Trưởng phòng thiết kế
                </p>
                <p className="text-gray-600 text-sm">
                  Chuyên gia thiết kế với tình yêu đặc biệt dành cho văn hóa
                  truyền thống và xu hướng hiện đại.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#A5C6A1] to-[#5A3E2B] rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-[#5A3E2B] mb-2">
                  Lê Minh Cường
                </h3>
                <p className="text-[#87C1D8] font-medium mb-4">
                  Trưởng phòng sản xuất
                </p>
                <p className="text-gray-600 text-sm">
                  Đảm bảo chất lượng sản phẩm từ khâu chọn nguyên liệu đến thành
                  phẩm cuối cùng.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#5A3E2B] to-[#87C1D8] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-serif mb-6">
            Bắt Đầu Hành Trình Của Bạn
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Hãy để chúng tôi đồng hành cùng bạn trong những chuyến đi đáng nhớ.
            Khám phá bộ sưu tập sổ tay du lịch Cà Mau ngay hôm nay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#5A3E2B] hover:bg-white/90 px-8"
            >
              Xem Sản Phẩm
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#5A3E2B] px-8 bg-transparent"
            >
              Liên Hệ Chúng Tôi
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

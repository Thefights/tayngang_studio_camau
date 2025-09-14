"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Globe, Heart, Users } from "lucide-react";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#5A3E2B] to-[#87C1D8] text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
              Câu Chuyện Của Chúng Tôi
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Từ vùng đất mũi Cà Mau, chúng tôi mang đến những cuốn sổ tay du
              lịch được chế tác tỉ mỉ, ghi lại từng khoảnh khắc đáng nhớ trong
              hành trình khám phá của bạn.
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
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
            </motion.div>
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Image
                src="/ca-mau-landscape-sunset.jpg"
                alt="Phong cảnh Cà Mau"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Image
                src="/ca-mau-landscape-sunset.jpg"
                alt="Phong cảnh Cà Mau"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-bold font-serif text-[#5A3E2B] mb-6">
                Sứ mệnh lan tỏa giá trị, kết nối con người và quảng bá văn hóa
                bản địa.
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Dự án sinh ra để quảng bá vẻ đẹp tự nhiên, văn hóa, lịch sử và
                ẩm thực của Cà Mau bằng niềm đam mê. Đồng thời truyền tải giá
                trị bản địa thông qua hình ảnh, câu chuyện và những trải nghiệm
                thực tế nhằm kết nối du khách với người dân địa phương, góp phần
                phát triển du lịch, bảo tồn di sản văn hóa, nâng cao nhận thức
                về du lịch bền vững cũng như trách nhiệm với môi trường.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-bold font-serif text-[#5A3E2B] mb-6">
                Tầm nhìn khát vọng vươn tầm và khẳng định vị thế Cà Mau
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Trở thành một ấn phẩm du lịch – văn hóa góp phần khẳng định vị
                thế Cà Mau trên bản đồ du lịch Việt Nam và truyền cảm hứng khám
                phá vùng đất Cà Mau đến trong nước và quốc tế.
              </p>
            </motion.div>
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Image
                src="/ca-mau-landscape-sunset.jpg"
                alt="Phong cảnh Cà Mau"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-[#EAEAEA]/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold font-serif text-[#5A3E2B] mb-6">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những giá trị định hướng mọi hoạt động của chúng tôi trong việc
              tạo ra những sản phẩm chất lượng và ý nghĩa.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#5A3E2B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-[#5A3E2B]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#5A3E2B] mb-4">
                    Cá nhân hoá hành trình
                  </h3>
                  <p className="text-gray-600">
                    Biến cuốn sổ thành nơi người dùng ghi chú, vẽ, dán ảnh – kể
                    lại chuyến đi theo cách riêng, không ai giống ai.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#87C1D8]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-[#87C1D8]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#5A3E2B] mb-4">
                    Kết nối cảm xúc bản địa
                  </h3>
                  <p className="text-gray-600">
                    Khám phá Cà Mau qua câu chuyện con người, văn hoá và món ăn
                    – chạm tới chiều sâu thay vì chỉ check-in bề nổi.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#A5C6A1]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-[#A5C6A1]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#5A3E2B] mb-4">
                    Truyền cảm hứng sáng tạo
                  </h3>
                  <p className="text-gray-600">
                    Sổ tay được thiết kế đẹp mắt, mang phong cách minh hoạ tay,
                    dành cho thế hệ yêu du lịch nghệ thuật và “sống ảo” tinh tế.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#5A3E2B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-8 h-8 text-[#5A3E2B]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#5A3E2B] mb-4">
                    Lan toả du lịch bền vững
                  </h3>
                  <p className="text-gray-600">
                    Gắn kết với người địa phương, khuyến khích du lịch tử tế,
                    không làm tổn thương thiên nhiên – góp phần phát triển cộng
                    đồng.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Goals Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold font-serif text-[#5A3E2B] mb-8">
              Mục Tiêu Dự Án
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Giới thiệu hình ảnh Cà Mau đến với người dân từ các nơi khác và du
              khách quốc tế một cách sinh động, dễ tiếp cận, đồng thời giúp học
              sinh – sinh viên Cà Mau hiểu và yêu hơn quê hương của mình. Góp
              phần quảng bá văn hóa, ẩm thực và các giá trị lịch sử của Cà Mau
              ra bên ngoài.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-6">
              Tạo ra một sản phẩm du lịch độc đáo, vừa mang tính giáo dục, vừa
              mang tính nghệ thuật và tương tác. Kết hợp nghệ thuật minh họa,
              nội dung sáng tạo và công nghệ để thu hút sự quan tâm của giới trẻ
              và khách du lịch hiện đại, đồng thời truyền cảm hứng khám phá quê
              hương qua lăng kính sáng tạo của chính người trẻ địa phương.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

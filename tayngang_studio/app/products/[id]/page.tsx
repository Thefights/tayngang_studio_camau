import { ProductDetail } from "@/components/product-detail";
import { RelatedProducts } from "@/components/related-products";
import { notFound } from "next/navigation";

// Mock product data - in real app this would come from database
const products = [
  {
    id: "1",
    name: "Sổ Tay Cà Mau Classic",
    price: 250000,
    originalPrice: 300000,
    images: [
      "/classic-brown-leather-travel-notebook.jpg",
      "/placeholder.svg?key=img1",
      "/placeholder.svg?key=img2",
      "/placeholder.svg?key=img3",
    ],
    rating: 4.8,
    reviews: 124,
    description:
      "Sổ tay du lịch Cà Mau Classic được chế tác từ da thật cao cấp, mang đến cảm giác sang trọng và bền bỉ. Thiết kế cổ điển với màu nâu đặc trưng, phù hợp cho mọi chuyến du lịch.",
    features: [
      "Da thật cao cấp, bền bỉ theo thời gian",
      "200 trang giấy ivory cao cấp",
      "Kích thước tiện lợi: 14x21cm",
      "Có dây đánh dấu trang",
      "Túi nhỏ bên trong để cất giữ vé, tem",
      "Thiết kế chống nước nhẹ",
    ],
    specifications: {
      "Kích thước": "14 x 21 x 2 cm",
      "Trọng lượng": "350g",
      "Chất liệu bìa": "Da thật",
      "Chất liệu giấy": "Giấy ivory 120gsm",
      "Số trang": "200 trang",
      "Màu sắc": "Nâu cổ điển",
    },
    inStock: true,
    stockQuantity: 25,
    category: "Classic",
    tags: ["da-that", "co-dien", "cao-cap"],
  },
  {
    id: "2",
    name: "Sổ Tay Miền Tây Deluxe",
    price: 350000,
    originalPrice: undefined,
    images: [
      "/premium-blue-travel-journal-with-golden-details.jpg",
      "/placeholder.svg?key=img4",
      "/placeholder.svg?key=img5",
      "/placeholder.svg?key=img6",
    ],
    rating: 4.9,
    reviews: 89,
    description:
      "Phiên bản cao cấp với thiết kế tinh tế, kết hợp màu xanh dương nhẹ nhàng và chi tiết vàng sang trọng. Đây là lựa chọn hoàn hảo cho những ai yêu thích sự tinh tế.",
    features: [
      "Thiết kế cao cấp với chi tiết vàng",
      "250 trang giấy bamboo thân thiện môi trường",
      "Bìa cứng chống va đập",
      "Khóa từ tính bảo mật",
      "Kèm bút viết cao cấp",
      "Hộp quà tặng sang trọng",
    ],
    specifications: {
      "Kích thước": "15 x 22 x 2.5 cm",
      "Trọng lượng": "420g",
      "Chất liệu bìa": "Da PU cao cấp",
      "Chất liệu giấy": "Giấy bamboo 140gsm",
      "Số trang": "250 trang",
      "Màu sắc": "Xanh dương với chi tiết vàng",
    },
    inStock: true,
    stockQuantity: 15,
    category: "Deluxe",
    tags: ["cao-cap", "deluxe", "qua-tang"],
  },
];

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <main>
        <ProductDetail product={product} />
        <RelatedProducts currentProductId={product.id} />
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

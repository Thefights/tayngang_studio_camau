import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Star } from "lucide-react"

// Mock related products data
const relatedProducts = [
  {
    id: "3",
    name: "Sổ Tay Eco-Friendly",
    price: 200000,
    originalPrice: 250000,
    image: "/placeholder.svg?key=eco1",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "4",
    name: "Sổ Tay Vintage Collection",
    price: 400000,
    originalPrice: null,
    image: "/placeholder.svg?key=vintage1",
    rating: 4.9,
    reviews: 67,
  },
  {
    id: "5",
    name: "Sổ Tay Minimalist",
    price: 180000,
    originalPrice: null,
    image: "/placeholder.svg?key=minimal1",
    rating: 4.6,
    reviews: 203,
  },
  {
    id: "6",
    name: "Sổ Tay Premium Gold",
    price: 500000,
    originalPrice: 600000,
    image: "/placeholder.svg?key=gold1",
    rating: 4.8,
    reviews: 45,
  },
]

interface RelatedProductsProps {
  currentProductId: string
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const filteredProducts = relatedProducts.filter((product) => product.id !== currentProductId)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-[#5A3E2B] mb-4">Sản phẩm liên quan</h2>
          <p className="text-[#5A3E2B]/70 max-w-2xl mx-auto">
            Khám phá thêm những sản phẩm tương tự có thể bạn quan tâm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-[#EAEAEA]/30">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button asChild className="bg-white text-[#5A3E2B] hover:bg-[#5A3E2B] hover:text-white">
                    <Link href={`/products/${product.id}`}>Xem chi tiết</Link>
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#5A3E2B]/60">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <h3 className="font-serif text-base text-[#5A3E2B] font-medium text-balance">{product.name}</h3>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#5A3E2B]">{product.price.toLocaleString("vi-VN")}₫</span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#5A3E2B]/50 line-through">
                      {product.originalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  )}
                </div>

                <Button className="w-full bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white" size="sm">
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

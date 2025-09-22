/* eslint-disable react-hooks/exhaustive-deps */

import { ProductDetail } from "@/components/product/product-detail";
import * as productData from "@/data/other/product.data";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await productData.getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#5A3E2B] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">
            {product?.name}
          </h1>
          <p className="text-lg text-white/90">
            Khám phá chi tiết sản phẩm và những tiện ích tuyệt vời mà{" "}
            <span className="font-semibold">{product?.name}</span> mang lại.
          </p>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ProductDetail product={product!} />
        </div>
      </section>
    </div>
  );
}

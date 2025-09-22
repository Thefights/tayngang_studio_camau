"use client";
import { Hero } from "@/components/common/hero";
import { ProductFeatureGallery } from "@/components/product/product-feature-gallery";
import * as productData from "@/data/other/product.data";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await productData.getProductFeatures();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <main>
        <Hero />
        <ProductFeatureGallery products={products} />
      </main>
    </div>
  );
}

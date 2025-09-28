"use client";
import { Hero } from "@/components/common/hero";
import { ProductFeatureGallery } from "@/components/product/product-feature-gallery";
import { useCart } from "@/context/cart-context";
import * as productData from "@/data/other/product.data";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

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
        <ProductFeatureGallery products={products} addToCart={addToCart} />
      </main>
    </div>
  );
}

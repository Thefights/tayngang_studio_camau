"use client";
import { Hero } from "@/components/common/hero";
import { ProductFeatureGallery } from "@/components/product/product-feature-gallery";
import * as cartData from "@/data/other/cart.data";
import * as productData from "@/data/other/product.data";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await productData.getProductFeatures();
      setProducts(data);
    };
    loadProducts();
  }, []);

  // 👉 addToCart chỉ xử lý logic, không return JSX
  const addToCart = async (
    productId: number,
    quantity: number,
    unitPrice: number
  ): Promise<void> => {
    try {
      await cartData.addToCart(productId, quantity, unitPrice);
      setCartItems((prevItems) => [
        ...prevItems,
        { productId, quantity, unitPrice },
      ]);
      alert("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // 👉 Component return JSX ở đây
  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <main>
        <Hero />
        <ProductFeatureGallery products={products} addToCart={addToCart} />
      </main>
    </div>
  );
}

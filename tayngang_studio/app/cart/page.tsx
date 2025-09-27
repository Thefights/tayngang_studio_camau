"use client";

import { ShoppingCartContent } from "@/components/cart/shopping-cart-content";
import * as cartData from "@/data/other/cart.data";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await cartData.getCarts();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);
  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <main className="py-8">
        <ShoppingCartContent cartItems={cartItems} />
      </main>
    </div>
  );
}

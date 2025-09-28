"use client";

import { ShoppingCartContent } from "@/components/cart/shopping-cart-content";
import * as cartData from "@/data/other/cart.data";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await cartData.getCartItems();
        setCartItems(data.cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const increaseQuantity = async (productId: number) => {
    try {
      const data = await cartData.increaseCartItemQuantity(productId);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error increasing item quantity:", error);
    }
  };

  const decreaseQuantity = async (productId: number) => {
    try {
      const data = await cartData.decreaseCartItemQuantity(productId);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error decreasing item quantity:", error);
    }
  };

  const removeItem = async (productId: number) => {
    try {
      const data = await cartData.removeCartItem(productId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <main className="py-8">
        <ShoppingCartContent
          cartItems={cartItems}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeItem={removeItem}
        />
      </main>
    </div>
  );
}

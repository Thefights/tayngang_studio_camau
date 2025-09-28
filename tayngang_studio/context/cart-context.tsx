"use client";

import * as cartData from "@/data/other/cart.data";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = async (
    productId: number,
    quantity: number,
    unitPrice: number
  ) => {
    try {
      await cartData.addToCart(productId, quantity, unitPrice);
      await getCartItems(); // reload lại giỏ hàng ngay sau khi thêm
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      alert("Đã thêm vào giỏ hàng!");
    }
  };

  const getCartItems = async () => {
    try {
      const items = await cartData.getCartItems();
      const normalized = Array.isArray(items) ? items : [items]; // luôn ép về array
      setCartItems(normalized);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    }
  };

  // tự động load giỏ hàng khi app mount
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

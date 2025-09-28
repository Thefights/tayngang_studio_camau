"use client";

import * as cartData from "@/data/other/cart.data";
import { createContext, useContext } from "react";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const addToCart = async (
    productId: number,
    quantity: number,
    unitPrice: number
  ): Promise<void> => {
    try {
      await cartData.addToCart(productId, quantity, unitPrice);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      alert("Đã thêm vào giỏ hàng!");
    }
  };

  const getCartItems = async () => {
    try {
      const cartItems = await cartData.getCartItems();
      return cartItems;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
  };

  return (
    <CartContext.Provider value={{ addToCart, getCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

"use client";

import * as cartData from "@/data/other/cart.data";
import { createContext, useContext, useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";

const LoadingContext = createContext<any>(null);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  const addToCart = async (
    productId: number,
    quantity: number,
    unitPrice: number
  ) => {
    setLoading(true);
    try {
      await cartData.addToCart(productId, quantity, unitPrice);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoading, addToCart }}>
      {children}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <CircleLoader
            size={60}
            color="#5A3E2B"
            loading={loading}
            speedMultiplier={5}
          />
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

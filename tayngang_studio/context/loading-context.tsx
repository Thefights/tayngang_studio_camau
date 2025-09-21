// context/LoadingContext.tsx
"use client";

import { createContext, useContext, useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";

const LoadingContext = createContext<any>(null);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
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

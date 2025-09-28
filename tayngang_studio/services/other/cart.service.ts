import axiosInstance from "@/axios.config";

export const getCartByUser = async () => {
  try {
    const response = await axiosInstance.get("cart/user");
    return response;
  } catch (error) {
    console.error("Error fetching cart for user:", error);
    throw error;
  }
};

export const addToCart = async (productId: number, quantity: number) => {
  try {
    const response = await axiosInstance.post("cart/add", {
      productId,
      quantity,
    });
    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

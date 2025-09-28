import axiosInstance from "@/axios.config";

export const addToCart = async (
  productId: number,
  quantity: number,
  unitPrice: number
) => {
  try {
    const response = await axiosInstance.post("cart/items", {
      productId,
      quantity,
      unitPrice,
    });
    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getCartItems = async () => {
  try {
    const response = await axiosInstance.get("cart/user");
    return response;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

export const increaseCartItemQuantity = async (productId: number) => {
  try {
    const response = await axiosInstance.patch(
      `cart/items/${productId}/increase`
    );
    return response;
  } catch (error) {
    console.error("Error increasing cart item quantity:", error);
    throw error;
  }
};

export const decreaseCartItemQuantity = async (productId: number) => {
  try {
    const response = await axiosInstance.patch(
      `cart/items/${productId}/decrease`
    );
    return response;
  } catch (error) {
    console.error("Error decreasing cart item quantity:", error);
    throw error;
  }
};

export const removeCartItem = async (productId: number) => {
  try {
    const response = await axiosInstance.delete(`cart/items/${productId}`);
    return response;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};

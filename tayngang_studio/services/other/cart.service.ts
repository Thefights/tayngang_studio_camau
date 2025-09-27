import axiosInstance from "@/axios.config";

export const fetchAllCart = async () => {
  try {
    const respond = await axiosInstance.get("cart");
    return respond;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const createCart = async (cartData: any) => {
  try {
    const respond = await axiosInstance.post("cart", cartData);
    return respond;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};

export const updateCart = async (cartId: number | string, cartData: any) => {
  try {
    const respond = await axiosInstance.put(`cart/${cartId}`, cartData);
    return respond;
  } catch (error) {
    console.error(`Error updating cart with id ${cartId}:`, error);
    throw error;
  }
};

export const deleteCart = async (cartId: number | string) => {
  try {
    const respond = await axiosInstance.delete(`cart/${cartId}`);
    return respond;
  } catch (error) {
    console.error(`Error deleting cart with id ${cartId}:`, error);
    throw error;
  }
};

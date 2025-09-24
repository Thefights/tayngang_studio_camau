import axiosInstance from "@/axios.config";

const cartService = {
  addToCart: async (item) => {
    try {
      const response = await axiosInstance.post("/cart", item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const response = await axiosInstance.delete(`/cart/${itemId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCartItems: async () => {
    try {
      const response = await axiosInstance.get("/cart");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default cartService;

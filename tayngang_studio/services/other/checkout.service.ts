import axiosInstance from "@/axios.config";

export const checkout = async (checkoutData: { paymentMethod: number }) => {
  try {
    const response = await axiosInstance.post("/checkout", checkoutData);
    return response.data;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};

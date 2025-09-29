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

export const cancelOrder = async () => {
  try {
    const response = await axiosInstance.post("/checkout/cancel");
    return response.data;
  } catch (error) {
    console.error("Error during order cancellation:", error);
    throw error;
  }
};

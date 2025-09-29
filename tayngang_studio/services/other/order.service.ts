import axiosInstance from "@/axios.config";

export const getUserOrder = async () => {
  try {
    const respond = await axiosInstance.get("order/getUserOrder");
    return respond;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

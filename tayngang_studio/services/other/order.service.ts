import axiosInstance from "@/axios.config";

export const fetchAllOrders = async () => {
  try {
    const respond = await axiosInstance.get("order");
    return respond;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const createOrder = async (orderData: any) => {
  try {
    const respond = await axiosInstance.post("order/create", orderData);
    return respond;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const deleteOrder = async (orderId: number | string) => {
  try {
    const respond = await axiosInstance.delete(`order/delete/${orderId}`);
    return respond;
  } catch (error) {
    console.error(`Error deleting order with id ${orderId}:`, error);
    throw error;
  }
};

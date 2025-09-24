import * as orderService from "@/services/other/order.service";

export const getOrders = async () => {
  const response = await orderService.fetchAllOrders();
  return response.data;
};

export const createNewOrder = async (orderData: any) => {
  const response = await orderService.createOrder(orderData);
  return response.data;
};

export const removeOrder = async (orderId: number | string) => {
  const response = await orderService.deleteOrder(orderId);
  return response.data;
};

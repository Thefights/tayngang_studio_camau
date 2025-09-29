import * as orderService from "@/services/other/order.service";

export const getOrders = async () => {
  const response = await orderService.getUserOrder();
  return response.data;
};

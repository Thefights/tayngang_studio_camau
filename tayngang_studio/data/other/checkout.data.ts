import * as checkoutService from "@/services/other/checkout.service";

export const checkout = async (checkoutData: { paymentMethod: number }) => {
  const response = await checkoutService.checkout(checkoutData);
  return response;
};

export const cancelOrder = async () => {
  const response = await checkoutService.cancelOrder();
  return response;
};

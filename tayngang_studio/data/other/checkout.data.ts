import * as checkoutService from "@/services/other/checkout.service";

export const checkout = async (checkoutData: { paymentMethod: number }) => {
  const response = await checkoutService.checkout(checkoutData);
  return response;
};

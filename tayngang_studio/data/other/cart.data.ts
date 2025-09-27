import * as cartService from "@/services/other/cart.service";

export const getCarts = async () => {
  const response = await cartService.fetchAllCart();
  return response.data;
};

export const createCart = async (cartData: any) => {
  const response = await cartService.createCart(cartData);
  return response.data;
};

export const updateCart = async (cartId: number | string, cartData: any) => {
  const response = await cartService.updateCart(cartId, cartData);
  return response.data;
};

export const deleteCart = async (cartId: number | string) => {
  const response = await cartService.deleteCart(cartId);
  return response.data;
};

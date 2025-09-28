import * as cartService from "@/services/other/cart.service";

export const addToCart = async (
  productId: number,
  quantity: number,
  unitPrice: number
) => {
  const response = await cartService.addToCart(productId, quantity, unitPrice);
  return response.data;
};

export const getCartItems = async () => {
  const response = await cartService.getCartItems();
  return response.data;
};

export const increaseCartItemQuantity = async (productId: number) => {
  const response = await cartService.increaseCartItemQuantity(productId);
  return response.data;
};

export const decreaseCartItemQuantity = async (productId: number) => {
  const response = await cartService.decreaseCartItemQuantity(productId);
  return response.data;
};

export const removeCartItem = async (productId: number) => {
  const response = await cartService.removeCartItem(productId);
  return response.data;
};

import * as productService from "@/services/other/product.service";

export const getProducts = async () => {
  const response = await productService.fetchAllProducts();
  return response.data;
};

export const getProductById = async (id: number | string) => {
  const response = await productService.fetchProductById(id);
  return response.data;
};

export const getProductFeatures = async () => {
  const response = await productService.fetchProductFeatures();
  return response.data;
};

export const getProductCategories = async () => {
  const response = await productService.fetchProductCategories();
  return response.data;
};

export const getProductByName = async (name: string) => {
  const response = await productService.fetchProductByName(name);
  return response.data;
};

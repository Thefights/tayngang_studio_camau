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

export const getProductCategories = async (categoryName: string) => {
  const response = await productService.fetchProductByCategory(categoryName);
  return response.data;
};

export const getProductByName = async (name: string) => {
  const response = await productService.searchProduct(name);
  return response.data;
};

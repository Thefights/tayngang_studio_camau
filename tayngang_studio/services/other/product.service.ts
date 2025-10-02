import axiosInstance from "@/axios.config";

export const fetchProductById = async (id: number | string) => {
  try {
    return await axiosInstance.get(`product/${id}`);
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const fetchAllProducts = async () => {
  try {
    return await axiosInstance.get("product/all");
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductFeatures = async () => {
  try {
    return await axiosInstance.get("product/features");
  } catch (error) {
    console.error("Error fetching product features:", error);
    throw error;
  }
};

export const fetchProductByCategory = async (categoryName: string) => {
  const response = await axiosInstance.get(`product/category/${categoryName}`);
  return response || [];
};

export const searchProduct = async (name: string) => {
  try {
    return await axiosInstance.get(`product/search/${name}`);
  } catch (error) {
    console.error(`Error fetching product with name ${name}:`, error);
    throw error;
  }
};

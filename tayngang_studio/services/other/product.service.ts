import axiosInstance from "@/axios.config";

export const fetchProductById = async (id: number | string) => {
  try {
    return await axiosInstance.get(`products/${id}`);
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const fetchAllProducts = async () => {
  try {
    return await axiosInstance.get("products/all");
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductFeatures = async () => {
  try {
    return await axiosInstance.get("products/features");
  } catch (error) {
    console.error("Error fetching product features:", error);
    throw error;
  }
};

export const fetchProductByCategory = async (categoryName: string) => {
  try {
    return await axiosInstance.get(`products/category/${categoryName}`);
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
};

export const searchProduct = async (name: string) => {
  try {
    return await axiosInstance.get(`products/search/${name}`);
  } catch (error) {
    console.error(`Error fetching product with name ${name}:`, error);
    throw error;
  }
};

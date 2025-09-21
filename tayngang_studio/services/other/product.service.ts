import axiosInstance from "@/axios.config";

export const fetchAllProducts = async () => {
  try {
    return await axiosInstance.get("products/all");
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id: number | string) => {
  try {
    return await axiosInstance.get(`products/${id}`);
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
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

export const fetchProductCategories = async () => {
  try {
    return await axiosInstance.get("products/category");
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
};

export const fetchProductByName = async (name: string) => {
  try {
    return await axiosInstance.get(`products/name`, {
      params: { name },
    });
  } catch (error) {
    console.error(`Error fetching product with name ${name}:`, error);
    throw error;
  }
};

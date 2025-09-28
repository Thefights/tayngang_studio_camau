import axiosInstance from "@/axios.config";

export const fetchUserProfile = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

export const updateUserProfile = async (
  name: string,
  phone: string,
  address: string
) => {
  const response = await axiosInstance.put("/user", { name, phone, address });
  return response.data;
};

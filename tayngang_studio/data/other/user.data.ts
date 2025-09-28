import * as userService from "@/services/other/user.service";

export const fetchUserProfile = async () => {
  return userService.fetchUserProfile();
};

export const updateUserProfile = async (
  name: string,
  phone: string,
  address: string
) => {
  return userService.updateUserProfile(name, phone, address);
};

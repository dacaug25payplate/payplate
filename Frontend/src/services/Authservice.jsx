import axiosInstance from "./axiosInstance";

export const registerUser = () => {
  return axiosInstance.get("User/save");
};

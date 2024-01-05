import { Account, ProfileInfo, RegisterInfo } from "../types/types";
import { axiosConfig, axiosInstance } from "./config";

export const loginUser = (data: Account) => {
  return axiosConfig.post("/login", data);
};

export const registerUser = (data: RegisterInfo) => {
  return axiosConfig.post("/register", data);
};

export const getDetailUser = (id: number) => {
  return axiosInstance.get(`/600/users/${id}`);
};

export const updateDetailUser = (id: number, data: ProfileInfo) => {
  return axiosInstance.patch(`/600/users/${id}`, data);
};

export const getAllUsers = (
  searchInfo: string,
  // orderBy: string,
  currentPage: number,
  limit: number
) => {
  return axiosInstance.get(
    `/users?role=user&q=${searchInfo}&_page=${currentPage}&_limit=${limit}`
  );
};

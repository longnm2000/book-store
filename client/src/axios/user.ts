import { Account, RegisterInfo } from "../types/types";
import { axiosConfig } from "./config";

export const loginUser = (data: Account) => {
  return axiosConfig.post("/login", data);
};

export const registerUser = (data: RegisterInfo) => {
  return axiosConfig.post("/register", data);
};

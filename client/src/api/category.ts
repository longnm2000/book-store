import { axiosConfig } from "./config";
export const getCategory = () => axiosConfig.get("/types");

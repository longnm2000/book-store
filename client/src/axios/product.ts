import { axiosConfig } from "./config";
export const getProduct = () => axiosConfig.get("/products");

export const getDetailProduct = (id: number) =>
  axiosConfig.get(`/detail/${id}?_embed=comments`);

import { axiosConfig } from "./config";
export const getProduct = () => axiosConfig.get("/products");

export const getDetailProduct = (id: number) =>
  axiosConfig.get(`/products/${id}?_embed=comments`);

export const getAllProducts = (currentPage: number, limit: number) => {
  let url = "/products?_expand=type&_sort=createAt&_order=desc";
  if (currentPage) {
    url += `&_page=${currentPage}`;
  }
  if (limit) {
    url += `&_limit=${limit}`;
  }
  return axiosConfig.get(url);
};

export const getAllProductsWithComments = (sortBy: string, limit: number) => {
  const url = `/products?_embed=comments&_expand=type&_limit=${limit}&_sort=${sortBy}&_order=desc`;
  return axiosConfig.get(url);
};

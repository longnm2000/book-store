import { axiosConfig } from "./config";

export const getAllComments = (
  productId: number,
  currentPage: number,
  limit: number
) => {
  return axiosConfig.get(
    `/comments?_expand=user&productId=${productId}&_page=${currentPage}&_limit=${limit}&_sort=createAt&_order=desc`
  );
};

import { axiosConfig, axiosInstance } from "./config";

export const isExistOrder = (
  userId: number,
  productId: number,
  status: number | number[]
) => {
  if (Array.isArray(status)) {
    console.log(
      `/orders?userId=${userId}&productId=${productId}&status_like=[${status}]`
    );
    return axiosConfig.get(
      `/orders?userId=${userId}&productId=${productId}&status_like=[${status}]`
    );
  } else {
    return axiosConfig.get(
      `/order?userId=${userId}&productId=${productId}&status=${status}`
    );
  }
};

export const addNewOrder = (data: {
  userId: number;
  productId: number;
  status: number;
  borrowedDate: Date;
  returnDate: Date;
  createAt: Date | number;
}) => {
  return axiosConfig.post("/orders", data);
};

export const getAllOrdersByUserId = (userId: number, page: number) => {
  return axiosInstance.get(
    `/orders?userId=${userId}&_expand=product&_page=${page}&_limit=5&_sort=createAt&_order=desc`
  );
};

export const deleteOrder = (orderId: number) => {
  return axiosInstance.delete(`/orders/${orderId}`);
};

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

export const getAllOrdersByUserId = (
  userId: number,
  page: number,
  limit: number
) => {
  return axiosInstance.get(
    `/orders?userId=${userId}&_expand=product&_page=${page}&_limit=${limit}&_sort=createAt&_order=desc`
  );
};

export const deleteOrder = (orderId: number) => {
  return axiosInstance.delete(`/600/orders/${orderId}`);
};

export const getAllOrders = (
  searchInfo: string,
  status: string,
  limit: number
) => {
  let url = "/orders?_expand=product&_expand=user&_sort=createAt&_order=desc";
  if (searchInfo) {
    url += `&_q=${searchInfo}`;
  }
  if (status) {
    url += `&status=${status}`;
  }
  if (limit) {
    url += `&_limit=${limit}`;
  }

  return axiosConfig.get(url);
};

export const changeStatusOrder = (orderId: number, status: number) => {
  return axiosConfig.patch(`/orders/${orderId}`, { status });
};

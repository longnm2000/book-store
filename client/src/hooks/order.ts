import { useEffect, useState } from "react";
import { Order } from "../types/types";
import { getAllOrdersByUserId } from "../axios/order";
import { AxiosResponse } from "axios";

export const useAllOrdersByUserId = (userId: number, page: number) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(0);
  const fetchAllOrdersByUserId = async (userId: number) => {
    try {
      const response: AxiosResponse = await getAllOrdersByUserId(userId, page);
      setOrders(response.data);
      setIsLoading(false);
      setTotalPage(Math.ceil(response.headers["x-total-count"] / 5));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllOrdersByUserId(userId);
  }, [page]);
  return { orders, isLoading, totalPage, fetchAllOrdersByUserId };
};

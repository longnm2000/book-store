import { useEffect, useState } from "react";
import { Order, OrderInfo } from "../types/types";
import { getAllOrders, getAllOrdersByUserId } from "../api/order";
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

export const useAllOrders = (
  searchInfo: string,
  status: string,
  limit: number
) => {
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [xTotalCount, setXTotalCount] = useState<number>(0);
  const fetchAllOrders = async (searchInfo: string, status: string) => {
    try {
      const response: AxiosResponse = await getAllOrders(
        searchInfo,
        status,
        limit
      );
      setOrders(response.data);
      setIsLoading(false);
      setXTotalCount(response.headers["x-total-count"]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllOrders(searchInfo, status);
  }, [searchInfo, status]);
  return { orders, isLoading, xTotalCount, fetchAllOrders };
};

import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getAllComments } from "../api/comment";
import { Comment } from "../types/types";

export const useAllComments = (
  productId: number,
  currentPage: number,
  limit: number
) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [xTotalCount, setXTotalCount] = useState<number>(0);
  useEffect(() => {
    fetchAllComments(productId, currentPage, limit);
  }, [productId, currentPage, limit]);
  const fetchAllComments = async (
    productId: number,
    currentPage: number,
    limit: number
  ) => {
    try {
      const response: AxiosResponse = await getAllComments(
        productId,
        currentPage,
        limit
      );
      setComments(response.data);
      setIsLoading(false);
      setXTotalCount(response.headers["x-total-count"]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return { comments, isLoading, fetchAllComments, xTotalCount };
};

import { useEffect, useState } from "react";
import { getAllUsers, getDetailUser } from "../api/user";
import { User } from "../types/types";

export const useGetUserByID = (id: number) => {
  const [detailUser, setDetailUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchDetailUser = async (userId: number) => {
    try {
      const response = await getDetailUser(userId);
      setDetailUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailUser(id);
  }, []);
  return { detailUser, isLoading, fetchDetailUser };
};

export const useGetAllUsers = (
  searchInfo: string,
  // orderBy: string,
  currentPage: number,
  limit: number
) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [xTotalCount, setXTotalCount] = useState<number>(0);
  const fetchAllUsers = async () => {
    try {
      const response = await getAllUsers(
        searchInfo,
        // orderBy,
        currentPage,
        limit
      );
      setAllUsers(response.data);
      setIsLoading(false);
      setXTotalCount(response.headers["x-total-count"]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return { allUsers, isLoading, fetchAllUsers, xTotalCount };
};

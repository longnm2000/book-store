import { useEffect, useState } from "react";
import { getDetailUser } from "../axios/user";
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

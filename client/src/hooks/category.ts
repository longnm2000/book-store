import { useEffect, useState } from "react";
import { Category } from "../types/types";
import { getCategory } from "../api/category";
import { AxiosResponse } from "axios";

export const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    try {
      const response: AxiosResponse = await getCategory();
      setCategories(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, isLoading, fetchCategories };
};

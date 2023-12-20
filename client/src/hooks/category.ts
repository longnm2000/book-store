import { useEffect, useState } from "react";
import { Category } from "../types/types";
import { getCategory } from "../axios/category";
import { AxiosResponse } from "axios";

export const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response: AxiosResponse = await getCategory();
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return { categories, loading };
};

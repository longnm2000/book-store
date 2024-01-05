import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Book, BookInfo } from "../types/types";
import {
  getAllProducts,
  getAllProductsWithComments,
  getDetailProduct,
} from "../api/product";
// import { axiosConfig } from "../axios/config";
// import { useSearchParams } from "react-router-dom";

export const useDetailProduct = (id: number) => {
  const [detailProduct, setDetailProduct] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDetailProduct = async () => {
    try {
      const response: AxiosResponse = await getDetailProduct(id);
      setDetailProduct(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailProduct();
  }, []);

  return { detailProduct, isLoading };
};

export const useAllProducts = (currentPage: number, limit: number) => {
  const [products, setProducts] = useState<BookInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [xTotalCount, setXTotalCount] = useState<number>(0);
  const fetchAllProducts = async (currentPage: number, limit: number) => {
    try {
      const response: AxiosResponse = await getAllProducts(currentPage, limit);
      setProducts(response.data);
      setIsLoading(false);
      setXTotalCount(response.headers["x-total-count"]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllProducts(currentPage, limit);
  }, [currentPage, limit]);
  return { products, isLoading, fetchAllProducts, xTotalCount };
};

export const useAllProductsWithComments = (sortBy: string, limit: number) => {
  const [productsWithComments, setProductsWithComments] = useState<BookInfo[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchAllProductsWithComments = async () => {
    try {
      const response: AxiosResponse = await getAllProductsWithComments(
        sortBy,
        limit
      );
      setProductsWithComments(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllProductsWithComments();
  }, []);
  return { productsWithComments, isLoading, fetchAllProductsWithComments };
};

// export const useBookFilter = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [products, setProducts] = useState<Book[]>([]);

//   const fetchFilteredProducts = async (filterValue: SearchParams) => {
//     let url = "?_embed=comments&_sort=title";

//     if (filterValue.title_like) {
//       url += `&title_like=${filterValue.title_like}`;
//     }

//     if (filterValue.categoryId) {
//       url += `&typeId=${filterValue.categoryId}`;
//     }

//     if (filterValue._order) {
//       url += `&_order=${filterValue._order}`;
//     }

//     try {
//       const response: AxiosResponse = await axiosConfig.get(`/products${url}`);
//       setProducts(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchFilteredProducts(searchParams);
//   }, [searchParams]);

//   const handleSearchParams = (filterValue: SearchParams) => {
//     setSearchParams(filterValue);
//   };

//   return {
//     products,
//     handleSearchParams,
//   };
// };

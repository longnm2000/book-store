import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Book } from "../types/types";
import { getDetailProduct } from "../axios/product";
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

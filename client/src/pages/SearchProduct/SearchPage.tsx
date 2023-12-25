import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Helmet } from "react-helmet";
import CardComp from "../../components/card/CardComp";
import HeaderComp from "../../components/layout/header/HeaderComp";
import FooterComp from "../../components/layout/footer/FooterComp";
import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Book } from "../../types/types";
import { useCategory } from "../../hooks/category";
import { useSearchParams } from "react-router-dom";
import { axiosConfig } from "../../axios/config";
import SearchIcon from "@mui/icons-material/Search";

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useCategory();
  const [products, setProducts] = useState<Book[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [filterValue, setFilterValue] = useState({
    categoryId: searchParams.get("categoryId") || "",
    _order: searchParams.get("_order") || "asc",
    title_like: searchParams.get("title_like") || "",
    _page: searchParams.get("_page") || "1",
  });

  const handleChangeOrder = (event: SelectChangeEvent) => {
    setFilterValue((prev) => ({ ...prev, _order: event.target.value }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeInfo = (event: any) => {
    setFilterValue((prev) => ({
      ...prev,
      title_like: event.target.value,
      _page: "1",
    }));
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFilterValue((prev) => ({ ...prev, _page: value.toString() }));
  };

  const handleSelectedCategory = (categoryId: number | string) => {
    setFilterValue((prev) => ({
      ...prev,
      categoryId: categoryId.toString(),
      _page: "1",
    }));
  };

  const fetchFilteredProducts = async () => {
    let url = `?_embed=comments&_sort=title&_page=${filterValue._page}&_limit=6`;

    if (searchParams.get("title_like")) {
      url += `&title_like=${searchParams.get("title_like")}`;
    }

    if (searchParams.get("categoryId")) {
      url += `&typeId=${filterValue.categoryId}`;
    }

    if (searchParams.get("_order")) {
      url += `&_order=${filterValue._order}`;
    }

    try {
      const response: AxiosResponse = await axiosConfig.get(`/products${url}`);
      console.log(`/products${url}`);

      setTotalPage(Math.ceil(response.headers["x-total-count"] / 6));
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [searchParams]);

  useEffect(() => {
    const filteredObj = Object.fromEntries(
      Object.entries(filterValue).filter(([, value]) => value !== "")
    );
    setSearchParams(filteredObj);
  }, [filterValue]);

  return (
    <>
      <Helmet>
        <title>Sách</title>
      </Helmet>
      <HeaderComp />
      <main className=" bg-slate-50 py-10">
        <div className="container mx-auto">
          <div className="">
            <Grid container columnSpacing={5}>
              <Grid item xs={12} md={3}>
                <div className="w-full h-full">
                  <div className="bg-white p-4 rounded-lg sticky top-20">
                    <h1 className=" font-semibold text-xl">Các loại sách</h1>
                    <div className=" h-96 overflow-y-scroll">
                      <div>
                        <Button
                          color="inherit"
                          fullWidth
                          variant={"text"}
                          className=""
                          onClick={() => handleSelectedCategory("")}
                        >
                          Tất cả
                        </Button>
                      </div>
                      {categories.map((category, i) => (
                        <div key={i}>
                          <Button
                            color="inherit"
                            fullWidth
                            className=" capitalize"
                            variant={
                              searchParams.get("categoryId") ===
                              category.id.toString()
                                ? "contained"
                                : "text"
                            }
                            onClick={() => handleSelectedCategory(category.id)}
                          >
                            {category.name}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <hr className="my-4" />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={9}>
                <div className="bg-white rounded-lg p-4 flex justify-between items-center mb-8 flex-col md:flex-row">
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: 400,
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Nhập Tên Sách"
                      onChange={(e) => handleChangeInfo(e)}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                  <div className="flex gap-2 items-center">
                    <span>Sắp xếp theo</span>
                    <FormControl>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterValue._order}
                        onChange={handleChangeOrder}
                      >
                        <MenuItem value={"asc"}>Tên từ A - Z </MenuItem>
                        <MenuItem value={"desc"}>Tên từ Z - A</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <Grid container spacing={6}>
                  {products.map((e, i) => (
                    <Grid item key={i} sm={6} md={4} xs={12} lg={4}>
                      <CardComp book={e} />
                    </Grid>
                  ))}
                </Grid>
                <div className="flex justify-center bg-white my-5 p-2">
                  <Pagination
                    count={totalPage}
                    page={+filterValue._page}
                    onChange={handleChangePage}
                    boundaryCount={2}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default SearchPage;

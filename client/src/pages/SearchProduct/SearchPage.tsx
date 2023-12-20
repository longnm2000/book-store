import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";
import { Helmet } from "react-helmet";
import CardComp from "../../components/card/CardComp";
import HeaderComp from "../../components/layout/header/HeaderComp";
import FooterComp from "../../components/layout/footer/FooterComp";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Book } from "../../types/types";
import { useCategory } from "../../hooks/category";
import { useSearchParams } from "react-router-dom";

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useCategory();
  const [products, setProducts] = useState<Book[]>([]);
  const [sort, setSort] = useState<string>("asc");
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    if (selectedCategory === 0) {
      setSearchParams({ _order: event.target.value.toString() });
      return;
    }
    setSearchParams({
      categoryId: selectedCategory.toString(),
      _order: event.target.value.toString(),
    });
  };

  const handleSelectedCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSearchParams({ categoryId: categoryId.toString(), _order: sort });
  };

  const fetchFilteredProducts = async () => {
    const url =
      selectedCategory === 0 && !searchParams.get("categoryId")
        ? `http://localhost:3000/products?_embed=comments&_sort=price&_order=${sort}`
        : `http://localhost:3000/products?_embed=comments&typeId=${
            selectedCategory || searchParams.get("categoryId")
          }&_sort=price&_order=${sort || searchParams.get("_order")}`;
    const response: AxiosResponse = await axios.get(url);
    setProducts(response.data);
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [searchParams]);


  return (
    <>
      <Helmet>
        <title>Sách</title>
      </Helmet>
      <HeaderComp />
      <main className=" bg-slate-50 py-4">
        <div className="container mx-auto">
          <div className="">
            <Grid container columnSpacing={5}>
              <Grid item xs={12} md={3}>
                <div className="w-full h-full">
                  <div className="bg-white p-4 rounded-lg">
                    <h1 className=" font-semibold text-xl">Các loại sách</h1>
                    <div className=" h-96 overflow-y-scroll">
                      {categories.map((category, i) => (
                        <div key={i}>
                          <Button
                            color="inherit"
                            fullWidth
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
                    <h1 className=" font-semibold text-xl">Giá thuê</h1>
                    <Slider
                      // value={}
                      min={0}
                      max={5000000}
                      marks
                      step={500000}
                      valueLabelDisplay="auto"
                      // onChange={handleSliderChange}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={9}>
                <div className="bg-white rounded-lg p-4 flex justify-between items-center mb-8">
                  <span>Sắp xếp theo</span>
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sort}
                      onChange={handleChange}
                    >
                      <MenuItem value={"asc"}>Giá thấp </MenuItem>
                      <MenuItem value={"desc"}>Giá cao</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Grid container spacing={6}>
                  {products.length > 0 ? (
                    products.map((e, i) => (
                      <Grid item key={i} sm={6} md={4} xs={12} lg={4}>
                        <CardComp book={e} />
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <p className="text-center bg-white p-4 text-semibold text-3xl">
                        {" "}
                        Không có sách
                      </p>
                    </Grid>
                  )}
                </Grid>
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

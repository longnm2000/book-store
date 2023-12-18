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
import { Category } from "../../types/types";
import { Book } from "../../types/types";

const SearchPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [age, setAge] = useState("10");
  const [moneyValue, setMoneyValue] = useState<number[]>([0, 10000000]);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setMoneyValue(newValue as number[]);
  };

  const handleSelectedCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };
  const fetchCategories = async () => {
    const response: AxiosResponse = await axios.get(
      "http://localhost:3000/categories"
    );
    setCategories(response.data);
  };

  const fetchFilteredProducts = async () => {
    const response: AxiosResponse = await axios.get(
      `http://localhost:3000/products?categoryId=${selectedCategory}`
    );
    setProducts(response.data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(categories);
  useEffect(() => {
    fetchFilteredProducts();
  }, [selectedCategory]);

  console.log(products);

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
                  <div className="bg-white p-4 rounded-lg sticky top-4">
                    <h1 className=" font-semibold text-xl">Các loại sách</h1>
                    {categories.map((category) => (
                      <div>
                        <Button
                          color="inherit"
                          onClick={() => handleSelectedCategory(category.id)}
                        >
                          {category.name}
                        </Button>
                      </div>
                    ))}
                    <hr className="my-4" />
                    <h1 className=" font-semibold text-xl">Giá</h1>
                    <Slider
                      value={moneyValue}
                      min={0}
                      max={5000000}
                      marks
                      step={500000}
                      valueLabelDisplay="auto"
                      onChange={handleSliderChange}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={9}>
                <div className="bg-white rounded-lg p-4 flex justify-between mb-8">
                  <img
                    src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/DinhTi_T1223_KC_BannerMobileApp_1080x1080.jpg"
                    alt=""
                    width={250}
                  />
                  <img
                    src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/Gold_T1223_LDP_Banner_social_1080x1080.png"
                    alt=""
                    width={250}
                  />
                  <img
                    src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/HappyTimeT12_MobileApp_1080x1080.jpg"
                    alt=""
                    width={250}
                  />
                </div>
                <div className="bg-white rounded-lg p-4 flex justify-between items-center mb-8">
                  <span>Sắp xếp theo</span>
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Giá thấp </MenuItem>
                      <MenuItem value={20}>Giá cao</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Grid container spacing={6}>
                  {/* {products.map((e, i) => (
                    <Grid item key={e} sm={6} md={4} xs={12} lg={4}>
                      <CardComp book={e} />
                    </Grid>
                  ))} */}
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

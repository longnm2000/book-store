import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";
import { Helmet } from "react-helmet";
import CardComp from "../../components/card/CardComp";
import HeaderComp from "../../components/header/HeaderComp";
import FooterComp from "../../components/footer/FooterComp";
import { useState } from "react";

const SearchPage: React.FC = () => {
  const [age, setAge] = useState("10");
  const [moneyValue, setMoneyValue] = useState<number[]>([0, 3700000]);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setMoneyValue(newValue as number[]);
  };
  console.log(moneyValue);

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
                    <p>Thiếu Nhi</p>
                    <p>Giáo Khoa - Tham Khảo</p>
                    <p>Văn Học</p>
                    <p>Tâm Lý - Kỹ Năng Sống</p>
                    <p>Manga - Comic</p>
                    <p>Sách Học Ngoại Ngữ</p>
                    <p>Kinh Tế</p>
                    <p>Khoa Học Kỹ Thuật</p>
                    <hr className="my-4" />
                    <h1 className=" font-semibold text-xl">Giá</h1>
                    <Slider
                      value={moneyValue}
                      min={0}
                      max={10000000}
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e) => (
                    <Grid item key={e} sm={6} md={4} xs={12} lg={4}>
                      <CardComp />
                    </Grid>
                  ))}
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

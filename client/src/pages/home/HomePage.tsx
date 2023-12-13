import { Grid } from "@mui/material";
import CardComp from "../../components/card/CardComp";
import CarouselComp from "../../components/carousel/CarouselComp";
import FooterComp from "../../components/footer/FooterComp";
import HeaderComp from "../../components/header/HeaderComp";
import { Helmet } from "react-helmet";

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <HeaderComp />
      <main className=" bg-slate-100 py-4">
        <div className=" container mx-auto">
          <div>
            <CarouselComp />
          </div>
          <div className=" bg-white rounded-lg p-4">
            <h1 className="font-semibold text-xl mb-4">CÁC CUỐN SÁCH MỚI</h1>
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
                <Grid key={e} item sm={6} md={4} xs={12} lg={3}>
                  <CardComp />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};

export default HomePage;

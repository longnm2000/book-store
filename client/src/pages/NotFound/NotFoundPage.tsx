import { Button, Grid } from "@mui/material";
import FooterComp from "../../components/layout/footer/FooterComp";
import HeaderComp from "../../components/layout/header/HeaderComp";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  console.log(Date.now());

  return (
    <>
      <HeaderComp />
      <main>
        <div className="container mx-auto px-2 xl:px-0">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {" "}
              <img
                src="https://cdn0.fahasa.com/media/fahasa_web_image/404_web_image.png"
                alt="404 Not Found"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="flex justify-center flex-col h-full gap-4">
                <p className="font-bold text-4xl">Oop!</p>
                <p className="font-semibold text-xl">
                  Rất tiếc, chúng tôi không thể tìm thấy những gì bạn đang tìm
                  kiếm.
                </p>
                <p>Error code: 404</p>
                <Button
                  component={Link}
                  to={"/"}
                  variant="contained"
                  color="error"
                >
                  Quay lại trang chủ
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default NotFoundPage;

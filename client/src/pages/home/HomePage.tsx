import { Grid } from "@mui/material";
import CardComp from "../../components/card/CardComp";
import BannerComp from "../../components/banner/BannerComp";
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
            <BannerComp />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            <a href="#">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/Vongxoay1_Sbanner_310x210_310x210_2.png"
                alt=""
                className="mx-auto"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/TrangThieuNhiT923_Banner_SmallBanner_310x210_1.png"
                alt=""
                className="mx-auto"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/BlindBoxT1123_Banner_SmallBanner_310x210.png"
                alt=""
                className="mx-auto"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/Diamond_T1223_Ver2_TanViet_SmallBanner_310x210.png"
                alt=""
                className="mx-auto"
              />
            </a>
          </div>
          <div className="grid gap-2 lg:grid-cols-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 bg-white p-4 my-4 rounded-lg">
            <a href="#" className="flex flex-col items-center justify-start">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/YearAndSale.png"
                alt=""
                width={80}
              />
              <p className="text-center">Year End Sale</p>
            </a>
            <a href="#" className="flex flex-col items-center justify-start">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/Icon_NoelTuyet_120x120.png"
                alt=""
                width={80}
              />
              <p className="text-center">Sale Ấm Quà Êm</p>
            </a>
            <a href="#" className="flex flex-col items-center justify-start">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/Icon_NCC_DinhTi_1.png"
                alt=""
                width={80}
              />
              <p className="text-center">Đinh Tị</p>
            </a>
            <a href="#" className="flex flex-col items-center justify-start">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/Icon_CayThongNoel_120x120.png"
                alt=""
                width={80}
              />
              <p className="text-center">Giáng Sinh</p>
            </a>
            <a href="#" className="flex flex-col items-center justify-start">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2023/Icon_MangaT11_120x120_3.png"
                alt=""
                width={80}
              />
              <p className="text-center">Manga</p>
            </a>
            <a href="#" className="flex flex-col items-center justify-start">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_FlashSale_Thuong_120x120.png"
                alt=""
                width={80}
              />
              <p className="text-center">Flash Sale</p>
            </a>
            <a href="#" className="flex flex-col items-center justify-start">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_MaGiamGia_8px_1.png"
                alt=""
                width={80}
              />
              <p className="text-center">Mã Giảm Giá</p>
            </a>
            <a href="#" className="flex flex-col items-center justify-start">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/IconDoChoi_Thuong_120x120.png"
                alt=""
                width={80}
              />
              <p className="text-center">Đồ Chơi</p>
            </a>
            <a href="#" className="flex flex-col items-center justify-start">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/Icon_MayTinh_120x120_1.png"
                alt=""
                width={80}
              />
              <p className="text-center">Máy Tính</p>
            </a>
            <a href="#" className="flex flex-col items-center justify-start">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_SanPhamMoi_8px_1.png"
                alt=""
                width={80}
              />
              <p className="text-center">Sản Phẩm Mới</p>
            </a>
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

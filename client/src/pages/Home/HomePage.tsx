import CardComp from "../../components/card/CardComp";
import BannerComp from "../../components/banner/BannerComp";
import FooterComp from "../../components/layout/footer/FooterComp";
import HeaderComp from "../../components/layout/header/HeaderComp";
import { Helmet } from "react-helmet";
import { useAllProductsWithComments } from "../../hooks/product";

const HomePage: React.FC = () => {
  const { productsWithComments } = useAllProductsWithComments("createAt", 8);
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

          {/* <div className="grid gap-2 lg:grid-cols-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 bg-white p-4 my-4 rounded-lg">
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
          </div> */}
          <div className=" bg-white rounded-lg p-4">
            <h1 className="font-semibold text-xl mb-4">CÁC CUỐN SÁCH MỚI</h1>
            <div className="grid gap-2 lg:grid-cols-4 grid-cols-1 sm:grid-cols-3 ">
              {productsWithComments?.map((e, i) => (
                <div key={i}>
                  <CardComp book={e} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};

export default HomePage;

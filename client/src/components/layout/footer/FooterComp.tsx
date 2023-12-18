import { Grid } from "@mui/material";
import logo from "../../../assets/logo.jfif";
const FooterComp: React.FC = () => {
  return (
    <>
      <footer>
        <div className=" container mx-auto py-10 px-1">
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              md={4}
              className="lg:border-r lg:border-r-black lg:pr-1"
            >
              <img src={logo} alt="Logo" width={"100px"} />
              <p>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM</p>
              <p>Công Ty Cổ Phần Phát Hành Sách TP HCM - D2 STORE BOOK</p>
              <p>60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam</p>
              {/* <p>
              Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ
              trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả
              Hệ Thống Fahasa trên toàn quốc.
            </p> */}
              <div className="mt-4">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/logo-bo-cong-thuong-da-thong-bao1.png"
                  alt="Bộ Công Thương"
                  width={"150px"}
                />
              </div>
              <div className="my-4">
                <div className="flex items-center justify-around">
                  <div>
                    <i className=" fa-2xl fa-brands fa-facebook"></i>
                  </div>
                  <div>
                    <i className=" fa-2xl fa-brands fa-square-instagram"></i>
                  </div>
                  <div>
                    <i className=" fa-2xl fa-brands fa-youtube"></i>
                  </div>
                  <div>
                    <i className=" fa-2xl fa-brands fa-square-twitter"></i>
                  </div>
                  <div>
                    <i className=" fa-2xl fa-brands fa-pinterest"></i>
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-wrap justify-around">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png"
                  alt="Google Play"
                  width={130}
                />
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/appstore1.png"
                  alt="App Store"
                  width={130}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container>
                <Grid item xs={12} md={4}>
                  <div className=" flex flex-col">
                    <h4 className=" font-semibold text-lg">DỊCH VỤ</h4>
                    <a href="#">Điều khoản sử dụng</a>
                    <a href="#">Chính sách bảo mật thông tin cá nhân</a>
                    <a href="#">Giới thiệu</a>
                    <a href="#">Chính sách bảo mật thanh toán</a>
                    <a href="#">Hệ thống trung tâm nhà sách</a>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className=" flex flex-col">
                    <h4 className=" font-semibold text-lg">HỖ TRỢ</h4>
                    <a href="#">Chính sách đổi trả</a>
                    <a href="#">Phương thức thanh toán</a>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <h4 className=" font-semibold text-lg">LIÊN HỆ</h4>
                  <div className="flex items-center ">
                    <div className=" w-7 flex items-center justify-center">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <p>60-62 Lê Lợi, Q.1, TP. HCM</p>
                  </div>
                  <div className="flex items-center ">
                    <div className=" w-7 flex items-center justify-center">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <p> cskh@fahasa.com.vn</p>
                  </div>

                  <div className="flex items-center ">
                    <div className=" w-7 flex items-center justify-center">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <p>1900636467</p>
                  </div>
                </Grid>
              </Grid>
              <div className="flex justify-between flex-wrap gap-4 mt-4">
                <img
                  src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/vnpay_logo.png"
                  alt="VNPay"
                  width={130}
                />
                <img
                  src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/ZaloPay-logo-130x83.png"
                  alt="ZaloPay"
                  width={130}
                />
                <img
                  src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/momopay.png"
                  alt="MoMo"
                  width={50}
                />
                <img
                  src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/shopeepay_logo.png"
                  alt="ShopeePay"
                  width={120}
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <p className="text-center">Copyright &copy; 2023</p>
      </footer>
    </>
  );
};
export default FooterComp;

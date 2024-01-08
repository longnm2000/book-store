import { Grid } from "@mui/material";
import logo from "../../../assets/logo.jfif";
const FooterComp: React.FC = () => {
  return (
    <>
      <footer>
        <div className=" container mx-auto py-10 px-1">
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <img src={logo} alt="Logo" width={"100px"} />
              <p>D2 STORE BOOK</p>
              <p>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM</p>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container>
                <Grid item xs={12} md={4}>
                  <div className=" flex flex-col">
                    <h4 className=" font-semibold text-lg">DỊCH VỤ</h4>
                    <a href="#">Điều khoản sử dụng</a>
                    <a href="#">Chính sách bảo mật thông tin cá nhân</a>
                    <a href="#">Giới thiệu</a>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className=" flex flex-col">
                    <h4 className=" font-semibold text-lg">HỖ TRỢ</h4>
                    <a href="#">Chính sách đổi trả</a>
                    <a href="#">Phương thức mượn sách</a>
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
            </Grid>
          </Grid>
        </div>
        <p className="text-center">Copyright &copy; 2023</p>
      </footer>
    </>
  );
};
export default FooterComp;

import logo from "../../assets/logo.jfif";
const FooterComp: React.FC = () => {
  return (
    <>
      <div className=" container mx-auto py-10">
        <div className=" grid grid-cols-4 gap-4">
          <div>
            <img src={logo} alt="Logo" width={"100px"} />
            <p>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM</p>
            <p>Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA</p>
            <p>60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam</p>
            <p>
              Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ
              trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả
              Hệ Thống Fahasa trên toàn quốc.
            </p>
            <img
              src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/logo-bo-cong-thuong-da-thong-bao1.png"
              alt="Bộ Công Thương"
            />
            <div>
              <i className=" fa-2xl fa-brands fa-facebook"></i>
              <i className=" fa-2xl fa-brands fa-square-instagram"></i>
              <i className=" fa-2xl fa-brands fa-youtube"></i>
              <i className=" fa-2xl fa-brands fa-square-twitter"></i>
              <i className=" fa-2xl fa-brands fa-pinterest"></i>
            </div>
            <div>
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png"
                alt="Google Play"
              />
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/appstore1.png"
                alt="App Store"
              />
            </div>
          </div>
          <div className=" flex flex-col">
            <h4 className=" font-semibold text-lg">DỊCH VỤ</h4>
            <a href="#">Điều khoản sử dụng</a>
            <a href="#">Chính sách bảo mật thông tin cá nhân</a>
            <a href="#">Giới thiệu</a>
          </div>
          <div>
            <h4 className=" font-semibold text-lg">HỖ TRỢ</h4>
          </div>
          <div>
            <h4 className=" font-semibold text-lg">TÀI KHOẢN CỦA TÔI</h4>
          </div>
        </div>
      </div>
    </>
  );
};
export default FooterComp;

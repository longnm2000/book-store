import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BannerComp.css";
const BannerComp: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="custom-carousel-wrapper">
      <Slider {...settings}>
        <div>
          <img
            src="https://cdn0.fahasa.com/media/magentothem/banner7/DinhTi_T1223_KC_BannerSlide_840x320.jpg"
            alt=""
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <img
            src="https://cdn0.fahasa.com/media/magentothem/banner7/NoelCMST1123_Slide_840x320.jpg"
            alt=""
            className="w-full  rounded-lg"
          />
        </div>
        <div>
          <img
            src="https://cdn0.fahasa.com/media/magentothem/banner7/CTTangQua_Banner_840x320.jpg"
            alt=""
            className="w-full  rounded-lg"
          />
        </div>
        <div>
          <img
            src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/Vongxoay1_Banner_840x320.jpg"
            alt=""
            className="w-full  rounded-lg"
          />
        </div>
        <div>
          <img
            src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2023/TrangThieuNhiT923_Banner_Slidebanner_840x320-24.jpg"
            alt=""
            className="w-full  rounded-lg"
          />
        </div>
      </Slider>
    </div>
  );
};

export default BannerComp;

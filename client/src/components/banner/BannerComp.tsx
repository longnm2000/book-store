import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BannerComp.css";
import banner1 from "../../assets/istockphoto-1311907705-170667a.jpg";
import banner2 from "../../assets/pngtree-world-book-day-423-charity-banner-image_190996.jpg";
import banner3 from "../../assets/pngtree-world-reading-day-hand-painted-e-commerce-book-banner-picture-image_1118336.jpg";
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
            src="https://cdn0.fahasa.com/media/magentothem/banner7/NoelCMST1123_Slide_840x320.jpg"
            alt=""
            className="w-full  rounded-lg"
          />
        </div>

        <div>
          <img src={banner2} alt="" className="w-full  rounded-lg" />
        </div>
        <div>
          <img src={banner3} alt="" className="w-full  rounded-lg" />
        </div>
      </Slider>
    </div>
  );
};

export default BannerComp;

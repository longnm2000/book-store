import Slider from "react-slick";
import "../banner/BannerComp.css";

// interface Picture {
//   src: string;
// }

const ProductCarouselComp: React.FC = () => {
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
    <>
      <div className="custom-carousel-wrapper">
        <Slider {...settings}>
          <div className="rounded-lg overflow-hidden bg-black">
            <img
              src={""}
              alt=""
              className="w-2/3 md:w-1/2 rounded-lg mx-auto"
            />
          </div>
        </Slider>
      </div>
    </>
  );
};
export default ProductCarouselComp;

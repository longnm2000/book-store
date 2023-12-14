import Slider from "react-slick";
import "../banner/BannerComp.css";
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
          {[1, 2, 3, 4].map((e) => (
            <div key={e} className="rounded-lg overflow-hidden bg-black">
              <img
                src="https://cdn0.fahasa.com/media/flashmagazine/images/page_images/tu_sach_giao_duc_stemtham_tu_khung_long_tap_su/2022_06_07_09_11_08_1-390x510.jpg"
                alt=""
                className="w-2/3 md:w-1/2 rounded-lg mx-auto"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
export default ProductCarouselComp;

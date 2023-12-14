import { Button, Grid, Rating, Slider } from "@mui/material";
import ProductCarouselComp from "../../components/productCarousel/ProductCarouselComp";
import { Helmet } from "react-helmet";
import HeaderComp from "../../components/header/HeaderComp";
import CreateIcon from "@mui/icons-material/Create";
import FooterComp from "../../components/footer/FooterComp";
const DetailPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Trang Chi Tiết</title>
      </Helmet>
      <HeaderComp />
      <main className=" bg-slate-50 py-4">
        <div className="container mx-auto">
          <div className=" bg-white p-4 rounded-lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ProductCarouselComp />
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="flex flex-col gap-3">
                  <h1 className=" font-bold text-3xl">
                    Moriarty The Patriot - Tập 4
                  </h1>
                  <p>
                    Tác giả:{" "}
                    <span className="font-semibold">
                      Ryosuke Takeuchi, Hikaru Miy
                    </span>
                  </p>
                  <p>
                    Nhà xuất bản: <span className="font-semibold">Trẻ</span>
                  </p>
                  <p>
                    Hình thức bìa:{" "}
                    <span className="font-semibold">Bìa Mềm</span>
                  </p>
                  <div className="flex gap-2">
                    <Rating name="read-only" value={5} readOnly />{" "}
                    <span>1 đánh giá</span>
                  </div>
                  <p className=" text-red-500 font-semibold text-3xl">
                    10000 VNĐ/ngày
                  </p>
                  <Button variant="contained" fullWidth color="error">
                    Mượn sách
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className=" bg-white p-4 rounded-lg mt-4">
            <h2 className=" font-semibold text-2xl">Thông tin sản phẩm</h2>
            <table className="table-auto w-full md:w-1/2">
              <tbody>
                <tr>
                  <th className=" text-start">Tác giả</th>
                  <td>Thích Nhất Hạnh</td>
                </tr>

                <tr>
                  <th className=" text-start">Nhà xuất bản</th>
                  <td>Thế giới</td>
                </tr>
                <tr>
                  <th className=" text-start">Năm xuất bản</th>
                  <td>2023</td>
                </tr>
                <tr>
                  <th className=" text-start">Số trang</th>
                  <td>224</td>
                </tr>
                <tr>
                  <th className=" text-start">Hình thức</th>
                  <td>Bìa cứng</td>
                </tr>
              </tbody>
            </table>
            <hr className="my-4" />
            <h2 className=" font-semibold text-2xl">Mô tả sản phẩm</h2>
            <p>
              Cuốn sách này là tổng hợp 33 câu chuyện về 33 con người khác nhau
              đến từ mọi miền đất nước cũng như khắp nơi trên thế giới. Mỗi câu
              chuyện là một cuộc đời, ở đó có những khoảng trời bão giông nhưng
              cũng có những lúc bình yên lạ thường. Họ đã sống trong bão tố và
              cũng đã kịp chuyển mình để trở về với sự bình yên chân thật bên
              trong, cho dù đó vẫn còn là một hành trình dài nhưng cứ đi rồi sẽ
              tớ Những con người đó bằng tất cả nghị lực phi thường của mình đã
              vượt lên số phận, vượt thoát khỏi nghịch cảnh để tìm về với chính
              mình, tìm về với con đường hạnh phúc chân chính. 33 câu chuyện -
              33 con người - 33 bài học - sẽ tiếp thêm sức mạnh cho mỗi chúng ta
              vượt qua những khó khăn bất tận của cuộc sống để làm chủ cuộc đời
              của chính mình. "Hãy luôn mỉm cười khi ngày mới bắt đầu vì kể cả
              ngày đen tối nhất cũng sẽ qua khi bình minh ló rạng, cuộc sống
              giống như một chiếc gương phản chiếu sẽ mang đến cho ta kết quả
              tốt đẹp khi và chỉ khi ta chịu mỉm cười với nó." - Tuệ An
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg mt-4">
            <h2 className=" font-semibold text-2xl mb-4">Đánh giá sản phẩm</h2>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    {" "}
                    <div className="flex flex-col justify-center items-center h-full">
                      <p>
                        <span className="font-semibold text-5xl">4</span>
                        <span className="font-semibold text-4xl">/5</span>
                      </p>
                      <Rating
                        size="small"
                        name="read-only"
                        value={4}
                        readOnly
                      />
                      <p>1 đánh giá</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <div>
                      <div className="flex gap-2">
                        <span>5 sao</span>
                        <Slider
                          disabled
                          defaultValue={50}
                          color="secondary"
                          aria-label="Disabled slider"
                          className=" text-red-500"
                        />
                        <span>1</span>
                      </div>
                      <div className="flex gap-2">
                        <span>4 sao</span>
                        <Slider
                          disabled
                          defaultValue={50}
                          color="secondary"
                          aria-label="Disabled slider"
                          className=" text-red-500"
                        />
                        <span>1</span>
                      </div>
                      <div className="flex gap-2">
                        <span>3 sao</span>
                        <Slider
                          disabled
                          defaultValue={50}
                          color="secondary"
                          aria-label="Disabled slider"
                          className=" text-red-500"
                        />
                        <span>1</span>
                      </div>
                      <div className="flex gap-2">
                        <span>2 sao</span>
                        <Slider
                          disabled
                          defaultValue={50}
                          color="secondary"
                          aria-label="Disabled slider"
                          className=" text-red-500"
                        />
                        <span>1</span>
                      </div>
                      <div className="flex gap-2">
                        <span>1 sao</span>
                        <Slider
                          disabled
                          defaultValue={50}
                          color="secondary"
                          aria-label="Disabled slider"
                          className=" text-red-500"
                        />
                        <span>1</span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className=" h-full flex justify-center items-center">
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CreateIcon />}
                  >
                    Viết đánh giá
                  </Button>
                </div>
              </Grid>
            </Grid>
            {[1, 2, 3, 4].map((e) => (
              <div key={e}>
                <hr className="my-4" />
                <Grid container>
                  <Grid item xs={12} md={3}>
                    <div>
                      <p>Phương Nga</p>
                      <p>11/5/2023</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <div>
                      <Rating name="read-only" value={5} readOnly />
                      <p>
                        Đọc cuốn sách này để chúng ta có một mường tượng về
                        những tình huống nguy hiểm nếu xảy ra thì sẽ xảy ra như
                        thế nào, những điểm quan trọng cần chú ý và hướng dẫn
                        cách quan sát đúng trong những tình huống khác nhau. Rất
                        Đáng Đọc????????
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </div>
            ))}
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default DetailPage;

import { Button, Grid, Pagination, Rating, Slider } from "@mui/material";
import ProductCarouselComp from "../../components/productCarousel/ProductCarouselComp";
import { Helmet } from "react-helmet";
import HeaderComp from "../../components/layout/header/HeaderComp";
import CreateIcon from "@mui/icons-material/Create";
import FooterComp from "../../components/layout/footer/FooterComp";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Book } from "../../types/types";
import { Comment } from "../../types/types";
import * as dayjs from "dayjs";

const ratingCount = (data: Book, point: number) => {
  return data.comments.filter((comment) => comment.score === point).length;
};

const DetailPage: React.FC = () => {
  const id = useParams().id;
  const [data, setData] = useState<Book | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [pageTotal, setPageTotal] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  // const [rowPerPage, setRowPerPage] = useState<number>(5);
  const rowPerPage = 5;
  const fetchData = async () => {
    try {
      const res: AxiosResponse = await axios.get(
        `http://localhost:3000/products/${id}?_embed=comments`
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchComments = async () => {
    const comments: AxiosResponse = await axios.get(
      `http://localhost:3000/comments?_expand=user&productId=${id}&_page=${page}&_limit=${rowPerPage}&_sort=createAt&_order=desc`
    );
    setComments(comments.data);
    setPageTotal(Math.ceil(comments.headers["x-total-count"] / rowPerPage));
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchComments();
  }, [page]);

  const sum = data?.comments?.reduce((a, b) => a + b.score, 0);
  const commentTotal = data?.comments?.length;
  const average = sum && commentTotal ? Math.floor(sum / commentTotal) : 0;
  const commentsLength = data?.comments?.length;

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchComments();
  };
  console.log(page);

  return (
    <>
      <Helmet>
        <title>{data?.title}</title>
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
                  <h1 className=" font-bold text-3xl" title={data?.title}>
                    {data?.title}
                  </h1>
                  <p>
                    Tác giả:{" "}
                    <span className="font-semibold">{data?.author}</span>
                  </p>
                  <p>
                    Nhà xuất bản:{" "}
                    <span className="font-semibold">{data?.publisher}</span>
                  </p>
                  <p>
                    Hình thức bìa:{" "}
                    <span className="font-semibold">{data?.format}</span>
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
                  <td>{data?.author}</td>
                </tr>

                <tr>
                  <th className=" text-start">Nhà xuất bản</th>
                  <td>{data?.publisher}</td>
                </tr>
                <tr>
                  <th className=" text-start">Nhà cung cấp</th>
                  <td>{data?.supplier}</td>
                </tr>
                <tr>
                  <th className=" text-start">Năm xuất bản</th>
                  <td>{data?.releaseDate}</td>
                </tr>
                <tr>
                  <th className=" text-start">Số trang</th>
                  <td>{data?.numberOfPages}</td>
                </tr>
                <tr>
                  <th className=" text-start">Hình thức</th>
                  <td>{data?.format}</td>
                </tr>
                <tr>
                  <th className=" text-start">Ngôn ngữ</th>
                  <td>{data?.language}</td>
                </tr>
                <tr>
                  <th className=" text-start">Cân nặng</th>
                  <td>{data?.weight}</td>
                </tr>
                <tr>
                  <th className=" text-start">Kích thước</th>
                  <td>{data?.dimensions}</td>
                </tr>
              </tbody>
            </table>
            <hr className="my-4" />
            <h2 className=" font-semibold text-2xl">Mô tả sản phẩm</h2>
            <p>{data?.description}</p>
          </div>

          <div className="bg-white p-4 rounded-lg mt-4">
            <h2 className=" font-semibold text-2xl mb-4">Đánh giá sản phẩm</h2>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Grid container>
                  <Grid item xs={12} md={3}>
                    {" "}
                    <div className="flex flex-col justify-center items-center h-full">
                      <p>
                        <span className="font-semibold text-5xl">
                          {average}
                        </span>
                        <span className="font-semibold text-4xl">/5</span>
                      </p>
                      <Rating
                        size="small"
                        name="read-only"
                        value={average}
                        readOnly
                      />
                      <p>{commentsLength} đánh giá</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <div>
                      <div className="flex gap-2">
                        <span>5 sao</span>
                        <Slider
                          value={data ? ratingCount(data, 5) : 0}
                          color="secondary"
                          max={commentsLength}
                          min={0}
                          valueLabelDisplay="auto"
                        />
                        <div className=" w-10">
                          {data && commentsLength
                            ? (
                                (ratingCount(data, 5) / commentsLength) *
                                100
                              ).toFixed(2)
                            : 0}{" "}
                          %
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span>4 sao</span>
                        <Slider
                          value={data ? ratingCount(data, 4) : 0}
                          color="secondary"
                          valueLabelDisplay="auto"
                          max={commentsLength}
                          min={0}
                        />
                        <div className=" w-10">
                          {data && commentsLength
                            ? (
                                (ratingCount(data, 4) / commentsLength) *
                                100
                              ).toFixed(2)
                            : 0}{" "}
                          %
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span>3 sao</span>
                        <Slider
                          value={data ? ratingCount(data, 3) : 0}
                          color="secondary"
                          valueLabelDisplay="auto"
                          max={commentsLength}
                        />
                        <div className=" w-10">
                          {data && commentsLength
                            ? (
                                (ratingCount(data, 3) / commentsLength) *
                                100
                              ).toFixed(2)
                            : 0}{" "}
                          %
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span>2 sao</span>
                        <Slider
                          value={data ? ratingCount(data, 2) : 0}
                          color="secondary"
                          valueLabelDisplay="auto"
                          max={commentsLength}
                        />
                        <div className=" w-10">
                          {data && commentsLength
                            ? (
                                (ratingCount(data, 2) / commentsLength) *
                                100
                              ).toFixed(2)
                            : 0}{" "}
                          %
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span>1 sao</span>
                        <Slider
                          value={data ? ratingCount(data, 1) : 0}
                          color="secondary"
                          valueLabelDisplay="auto"
                          max={commentsLength}
                        />
                        <div className=" w-10">
                          {data && commentsLength
                            ? (
                                (ratingCount(data, 1) / commentsLength) *
                                100
                              ).toFixed(2)
                            : 0}{" "}
                          %
                        </div>
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
            {comments?.map((e, i) => (
              <div key={i}>
                <hr className="my-4" />
                <Grid container>
                  <Grid item xs={12} md={3}>
                    <div>
                      <p>{e.user?.name}</p>
                      <p>{dayjs(e.createAt).format("DD/MM/YYYY")}</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <div>
                      <Rating name="read-only" value={e.score} readOnly />
                      <p>{e.content}</p>
                    </div>
                  </Grid>
                </Grid>
              </div>
            ))}
            <div className="flex justify-center">
              <Pagination count={pageTotal} onChange={handlePage} />
            </div>
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default DetailPage;

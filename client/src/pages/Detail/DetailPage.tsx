import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Pagination,
  Rating,
  Slider,
  TextField,
} from "@mui/material";
import ProductCarouselComp from "../../components/productCarousel/ProductCarouselComp";
import { Helmet } from "react-helmet";
import HeaderComp from "../../components/layout/header/HeaderComp";
import CreateIcon from "@mui/icons-material/Create";
import FooterComp from "../../components/layout/footer/FooterComp";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Book, CommentForm } from "../../types/types";
import { Comment } from "../../types/types";
import * as dayjs from "dayjs";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "../../axios/config";
import { toast } from "react-toastify";
import { calculateForBook } from "../../helper/helper";

const ratingCount = (data: Book, point: number) => {
  return data.comments.filter((comment) => comment.score === point).length;
};

const schema = yup.object().shape({
  score: yup.number().required("Vui lòng chọn rating"),
  content: yup.string().required("Không được để trống"),
});

const DetailPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const id = useParams().id;

  const [data, setData] = useState<Book | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [pageTotal, setPageTotal] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState(false);
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
  }, [comments]);
  useEffect(() => {
    fetchComments();
  }, [page]);

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchComments();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  let average: number = 0,
    commentsTotal: number = 0,
    sumScore: number = 0;
  if (data) {
    commentsTotal = calculateForBook(data).commentsTotal;
    sumScore = calculateForBook(data).sumScore;
    average = Math.floor(sumScore / commentsTotal);
  }

  const onSubmit = (data: CommentForm) => {
    const userId = JSON.parse(localStorage.getItem("user") || "")?.id || "";
    axiosInstance
      .post("/comments", {
        ...data,
        productId: id ? +id : 0,
        userId,
        createAt: Date.now(),
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success("Đánh giá sản phẩm thành công");
          // sumScore += data.score;
          // commentsTotal++;
          handleClose();
          fetchComments();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "ERR_NETWORK") {
          toast.error("Lỗi mạng");
          return;
        }
        toast.error(`Có lỗi xảy ra ${err.response?.data}`);
      });
  };
  console.log(comments);

  return (
    <>
      <Helmet>
        <title>{data?.title}</title>
      </Helmet>
      <HeaderComp />
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Viết đánh giá sản phẩm
        </DialogTitle>
        <DialogContent>
          <Box component="form" className=" w-full">
            <Controller
              name="score"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <Rating {...field} name="score" defaultValue={1} />
              )}
            />
            {errors.score && <p>{errors.score.message}</p>}
            <Controller
              name="content"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  id="content"
                  placeholder="Viết đánh giá"
                  name="content"
                  multiline
                  rows={4}
                  error={!!errors.content}
                  helperText={errors.content?.message}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            Huỷ
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <main className=" bg-slate-50 py-4">
        <div className="container mx-auto">
          <div className=" bg-white p-4 rounded-lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <div className="h-full">
                  <div className="sticky top-5">
                    <ProductCarouselComp />
                  </div>
                </div>
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
                <div className=" mt-8">
                  <table className="table-auto w-full border-collapse">
                    <caption className="caption-top">
                      Thông tin sản phẩm
                    </caption>
                    <tbody>
                      <tr>
                        <th className=" text-start capitalize border p-2 border-slate-300">
                          Tác giả
                        </th>
                        <td className="border border-slate-300 p-2">
                          {data?.author}
                        </td>
                      </tr>

                      <tr>
                        <th className=" text-start capitalize border p-2 border-slate-300">
                          Nhà xuất bản
                        </th>
                        <td className="border border-slate-300 p-2">
                          {data?.publisher}
                        </td>
                      </tr>
                      <tr>
                        <th className=" text-start capitalize border p-2 border-slate-300">
                          Nhà cung cấp
                        </th>
                        <td className="border border-slate-300 p-2">
                          {data?.supplier}
                        </td>
                      </tr>
                      <tr>
                        <th className=" text-start capitalize border p-2 border-slate-300">
                          Năm xuất bản
                        </th>
                        <td className="border border-slate-300 p-2">
                          {data?.releaseDate}
                        </td>
                      </tr>
                      <tr>
                        <th className=" text-start capitalize border p-2 border-slate-300">
                          Số trang
                        </th>
                        <td className="border border-slate-300 p-2">
                          {data?.numberOfPages}
                        </td>
                      </tr>
                      <tr>
                        <th className=" text-start capitalize border p-2 border-slate-300">
                          Hình thức
                        </th>
                        <td className="border border-slate-300 p-2">
                          {data?.format}
                        </td>
                      </tr>
                      <tr>
                        <th className=" text-start capitalize border p-2 border-slate-300">
                          Ngôn ngữ
                        </th>
                        <td className="border border-slate-300 p-2">
                          {data?.language}
                        </td>
                      </tr>
                      <tr>
                        <th className=" text-start capitalize border p-2 border-slate-300">
                          Cân nặng
                        </th>
                        <td className="border border-slate-300 p-2">
                          {data?.weight}
                        </td>
                      </tr>
                      <tr>
                        <th className=" text-start capitalize border p-2 border-slate-300">
                          Kích thước
                        </th>
                        <td className="border border-slate-300 p-2">
                          {data?.dimensions}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr className="my-4" />
                  <h2 className=" font-semibold text-2xl">Mô tả sản phẩm</h2>
                  <p>{data?.description}</p>
                </div>
              </Grid>
            </Grid>
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
                          {average || 0}
                        </span>
                        <span className="font-semibold text-4xl">/5</span>
                      </p>
                      <Rating
                        size="small"
                        name="read-only"
                        value={average ? average : 0}
                        readOnly
                      />
                      <p>{commentsTotal} đánh giá</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <div>
                      <div className="flex gap-2">
                        <span>5 sao</span>
                        <Slider
                          value={data ? ratingCount(data, 5) : 0}
                          color="warning"
                          max={commentsTotal}
                          min={0}
                          valueLabelDisplay="auto"
                        />
                        <div className=" w-10">
                          {data && commentsTotal
                            ? (
                                (ratingCount(data, 5) / commentsTotal) *
                                100
                              ).toFixed(1)
                            : 0}{" "}
                          %
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span>4 sao</span>
                        <Slider
                          value={data ? ratingCount(data, 4) : 0}
                          color="warning"
                          valueLabelDisplay="auto"
                          max={commentsTotal}
                          min={0}
                        />
                        <div className=" w-10">
                          {data && commentsTotal
                            ? (
                                (ratingCount(data, 4) / commentsTotal) *
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
                          color="warning"
                          valueLabelDisplay="auto"
                          max={commentsTotal}
                        />
                        <div className=" w-10">
                          {data && commentsTotal
                            ? (
                                (ratingCount(data, 3) / commentsTotal) *
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
                          color="warning"
                          valueLabelDisplay="auto"
                          max={commentsTotal}
                        />
                        <div className=" w-10">
                          {data && commentsTotal
                            ? (
                                (ratingCount(data, 2) / commentsTotal) *
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
                          color="warning"
                          valueLabelDisplay="auto"
                          max={commentsTotal}
                        />
                        <div className=" w-10">
                          {data && commentsTotal
                            ? (
                                (ratingCount(data, 1) / commentsTotal) *
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
                    onClick={handleOpen}
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

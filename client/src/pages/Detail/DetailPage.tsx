import { FormHelperText } from "@mui/material";

import { Helmet } from "react-helmet";
import HeaderComp from "../../components/layout/header/HeaderComp";

import FooterComp from "../../components/layout/footer/FooterComp";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { BookInfo } from "../../types/types";
import { Comment } from "../../types/types";
import * as dayjs from "dayjs";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { calculateForBook } from "../../helper/helper";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";
import { addNewOrder, isExistOrder } from "../../api/order";
import { toast } from "react-toastify";
import { Avatar, Button, Pagination, PaginationProps, Rate } from "antd";
import { useAllComments } from "../../hooks/comment";
import { axiosConfig } from "../../api/config";

const ratingCount = (data: Comment[], point: number) => {
  return data.filter((comment) => comment.score === point).length;
};

const schema = yup.object().shape({
  borrowedDate: yup.date().required("Không để trống"),
  returnDate: yup
    .date()
    .required("Không để trống")
    .test(
      "is-after-borrowed",
      "Ngày trả phải sau ngày mượn ít nhất 1 ngày và dài nhất 7 ngày",
      function (value) {
        const borrowedDate = this.parent.borrowedDate;
        const returnDate = value;
        if (borrowedDate && returnDate) {
          const diffTime = returnDate.getTime() - borrowedDate.getTime();
          const diffDays = diffTime / (1000 * 3600 * 24);
          return diffDays >= 1 && diffDays <= 7;
        }
        return true;
      }
    ),
});

const DetailPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const id = useParams().id;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentUser = useSelector((state: any) => state.user);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { comments, xTotalCount } = useAllComments(
    Number(id),
    currentPage,
    limit
  );
  const [data, setData] = useState<BookInfo | null>(null);

  const fetchData = async () => {
    try {
      const res: AxiosResponse = await axios.get(
        `http://localhost:3000/products/${id}?_expand=type&_embed=comments`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    _,
    pageSize
  ) => {
    setLimit(pageSize);
  };

  const handleChangePage = (selectPage: number) => {
    setCurrentPage(selectPage);
  };

  let totalComments = calculateForBook(data?.comments || []).totalComments || 0;
  let sumScore = calculateForBook(data?.comments || []).sumScore || 0;
  let average = Math.floor(sumScore / totalComments) || 0;

  console.log(average);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: { borrowedDate: Date; returnDate: Date }) => {
    // if (currentUser.id) {
    //   toast.error("Vui lòng đăng nhập để mượn sách");
    //   return;
    // }
    if (currentUser && id) {
      try {
        const userResponse = await axiosConfig.get(`/users/${currentUser.id}`);
        // if ((userResponse.data.isLock = true)) {
        //   toast.error("Tài khoản đã bị khoá");
        //   return;
        // }
        const response = await axiosConfig.get(`/products/${id}`);
        const isExistRes = await isExistOrder(currentUser.id, +id, [0, 1]);
        if (response.data.quantity === 0) {
          toast.error("Cuốn sách đã được mượn hết");
          return;
        }
        if (isExistRes.data.length === 0) {
          const addOrderRes = await addNewOrder({
            userId: currentUser.id,
            productId: +id,
            status: 0,
            borrowedDate: data.borrowedDate,
            returnDate: data.returnDate,
            createAt: Date.now(),
          });
          if (addOrderRes.status === 201) {
            toast.success("Mượn sách thành công");
          }
        } else {
          toast.error("Cuốn sách này bạn đã mượn");
        }
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra\n" + error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{data?.title}</title>
      </Helmet>
      <HeaderComp />

      <main className=" bg-slate-50 py-4">
        <div className="container mx-auto">
          <div className=" bg-white p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 md:col-span-1">
                <div>
                  <div className="w-3/4 mx-auto">
                    <img src={data?.avatar} alt={data?.title} />
                  </div>
                </div>
              </div>
              <div className="col-span-3 md:col-span-2">
                <div className="flex flex-col gap-3 break-words">
                  <h1 className=" font-semibold text-3xl" title={data?.title}>
                    {data?.title}
                  </h1>
                  <p>
                    Tác giả:{" "}
                    <span className="font-semibold capitalize">
                      {data?.author}
                    </span>
                  </p>
                  <p>
                    Thể loại:{" "}
                    <span className="font-semibold capitalize">
                      {data?.type.name}
                    </span>
                  </p>
                  <p>
                    Trong kho:{" "}
                    <span className="font-semibold capitalize">
                      {data?.quantity === 0
                        ? "Đã hết"
                        : Number(data?.quantity) <= 10
                        ? "Sắp hết"
                        : data?.quantity}
                    </span>
                  </p>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex justify-between my-4 gap-4 flex-col md:flex-row">
                        <div className="flex justify-between w-full gap-2 flex-wrap md:gap-16">
                          <div className=" flex-1">
                            <Controller
                              name="borrowedDate"
                              control={control}
                              defaultValue={undefined}
                              render={({ field }) => (
                                <div>
                                  {" "}
                                  <DatePicker
                                    {...field}
                                    label="Ngày mượn"
                                    format="DD/MM/YYYY"
                                    className="w-full"
                                    disablePast
                                  />
                                  <FormHelperText error>
                                    {errors.borrowedDate?.message}
                                  </FormHelperText>
                                </div>
                              )}
                            />
                          </div>
                          <div className="flex-1">
                            <Controller
                              name="returnDate"
                              control={control}
                              defaultValue={undefined}
                              render={({ field }) => (
                                <>
                                  <DatePicker
                                    {...field}
                                    label="Ngày trả"
                                    format="DD/MM/YYYY"
                                    className="w-full"
                                    disablePast
                                    minDate={dayjs().add(1, "day")}
                                  />
                                  <FormHelperText error>
                                    {errors.returnDate?.message}
                                  </FormHelperText>
                                </>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={handleSubmit(onSubmit)}
                        htmlType="submit"
                        disabled={data?.quantity === 0}
                        className="bg-blue-500 hover:bg-blue-700 text-white capitalize"
                      >
                        Mượn sách
                      </Button>
                    </form>
                  </LocalizationProvider>
                </div>
                <div className=" mt-4">
                  <h2 className=" font-bold text-2xl mb-4">
                    Thông tin cuốn sách
                  </h2>
                  <table className="table-auto w-full border-collapse">
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
                </div>
              </div>
            </div>
            <h2 className=" font-semibold text-2xl mt-4">Mô tả sản phẩm</h2>
            <p>{data?.description}</p>
          </div>

          <div className="bg-white p-4 rounded-lg mt-4">
            <h1 className=" font-semibold text-2xl">Đánh giá cuốn sách</h1>
            <div className="my-4 flex gap-4 w-full justify-between max-w-2xl flex-col md:flex-row">
              <div>
                <p>
                  <span className="font-semibold text-5xl">{average || 0}</span>
                  <span className="font-semibold text-4xl">/5</span>
                </p>
                <Rate disabled value={average} className="mt-4" />
                <p className="mt-4">{xTotalCount} đánh giá</p>
              </div>
              <div>
                <div className="flex gap-4">
                  <Rate disabled defaultValue={5} />
                  {ratingCount(data?.comments || [], 5)} đánh giá
                </div>
                <div className="flex gap-4">
                  <Rate disabled defaultValue={4} />
                  {ratingCount(data?.comments || [], 4)} đánh giá
                </div>
                <div className="flex gap-4">
                  <Rate disabled defaultValue={3} />
                  {ratingCount(data?.comments || [], 3)} đánh giá
                </div>
                <div className="flex gap-4">
                  <Rate disabled defaultValue={2} />
                  {ratingCount(data?.comments || [], 2)} đánh giá
                </div>
                <div className="flex gap-4">
                  <Rate disabled defaultValue={1} />
                  {ratingCount(data?.comments || [], 1)} đánh giá
                </div>
              </div>
            </div>

            {comments?.map((e, i) => (
              <div key={i}>
                <hr className="my-4" />
                <div className="grid grid-cols-3 gap-4">
                  <div className=" col-span-1">
                    <div className="flex items-center gap-4 flex-wrap">
                      <Avatar src={e.user?.avatar} alt="Avatar">
                        {e.user?.name[0]}
                      </Avatar>
                      <div>
                        <p>{e?.user?.name}</p>
                        <p>{dayjs(e.createAt).format("DD/MM/YYYY")}</p>
                      </div>
                    </div>
                  </div>
                  <div className=" col-span-2">
                    <div>
                      <Rate disabled defaultValue={e.score} />
                      <p>{e.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {comments?.length > 0 && (
              <div className="flex justify-center mt-4">
                <Pagination
                  current={currentPage}
                  total={xTotalCount}
                  showSizeChanger
                  onChange={(page) => handleChangePage(page)}
                  onShowSizeChange={onShowSizeChange}
                  locale={{ items_per_page: "/trang" }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default DetailPage;

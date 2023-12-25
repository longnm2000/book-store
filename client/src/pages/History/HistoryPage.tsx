import HeaderComp from "../../components/layout/header/HeaderComp";
import FooterComp from "../../components/layout/footer/FooterComp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAllOrdersByUserId } from "../../hooks/order";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useState } from "react";
import {
  // Box,
  Button,
  Pagination,
  // FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Rating,
  TextField,

  // TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { axiosInstance } from "../../axios/config";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentForm } from "../../types/types";

const schema = yup.object().shape({
  score: yup.number().required("Phai co diem"),
  content: yup.string().required("Phai co noi dung"),
});

const HistoryPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentUser = useSelector((state: any) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [productId, setProductId] = useState(0);
  const { orders, totalPage } = useAllOrdersByUserId(
    currentUser.id,
    currentPage
  );

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  console.log(orders);

  const handleOpen = (productId: number) => {
    setOpen(true);
    setProductId(productId);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: CommentForm) => {
    axiosInstance
      .post("/comments", {
        ...data,
        productId,
        userId: currentUser.id,
        createAt: Date.now(),
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success("Đánh giá sản phẩm thành công");
          handleClose();
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
  return (
    <>
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
      <main className=" bg-slate-50">
        <div className="container mx-auto px-2 xl:px-0 max-w-5xl py-8">
          <div className="bg-white p-4 rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Lịch sử mượn sách</h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="center">Sản phẩm</TableCell>
                    <TableCell align="center">Hình ảnh</TableCell>
                    <TableCell align="center">Ngày mượn</TableCell>
                    <TableCell align="center">Ngày trả</TableCell>
                    <TableCell align="center">Tình trạng</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((e, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {i + 1 + (currentPage - 1) * 5}
                      </TableCell>
                      <TableCell align="center">{e.product.title}</TableCell>
                      <TableCell>
                        <img
                          src={e.product.avatar}
                          alt={e.product.title}
                          width={100}
                          className="mx-auto"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {dayjs(e.borrowedDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {dayjs(e.returnDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="center">
                        {e.status === 0
                          ? "Đang xử lý"
                          : e.status === 1
                          ? "Đã cho mượn"
                          : e.status === 2
                          ? "Đã trả"
                          : "Đã bị huỷ"}
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center gap-2 items-center ">
                          <Button
                            color="success"
                            variant="contained"
                            disabled={e.status !== 2}
                            onClick={() => handleOpen(e.productId)}
                          >
                            Đánh giá
                          </Button>
                          <Button color="error" variant="outlined">
                            Huỷ
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="flex justify-center mt-4">
              <Pagination
                count={totalPage}
                page={currentPage}
                onChange={handleChangePage}
                boundaryCount={2}
              />
            </div>
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};

export default HistoryPage;

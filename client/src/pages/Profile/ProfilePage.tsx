import { Helmet } from "react-helmet";
import HeaderComp from "../../components/layout/header/HeaderComp";
import FooterComp from "../../components/layout/footer/FooterComp";
import { useState } from "react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
const schema = yup.object().shape({
  name: yup.string().required("Họ tên không để trống"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
    .required("Vui lòng nhập số điện thoại"),
});
const ProfilePage: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };
  return (
    <>
      <Helmet>
        <title>Thông tin cá nhân</title>
      </Helmet>
      <HeaderComp />
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            <div className="flex justify-between items-center">
              {" "}
              <p>Sửa Thông Tin</p>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Họ Tên"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Số điện thoại"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Lưu
              </Button>
            </Box>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Huỷ Bỏ
            </Button>
            <Button onClick={handleClose} autoFocus>
              Lưu
            </Button>
          </DialogActions> */}
        </Dialog>
      </React.Fragment>
      <main className=" bg-slate-50">
        <div className="container mx-auto py-4">
          <div className=" max-w-xl p-4 rounded-lg mx-auto bg-white">
            <h1 className=" font-semibold text-2xl text-center mb-4">
              Thông tin cá nhân
            </h1>
            <table className="w-full mb-4">
              <tr>
                <th className="text-start">Họ Tên</th>
                <td>Nguyễn Mạnh Long</td>
              </tr>
              <tr>
                <th className="text-start">Email</th>
                <td>longnguyen2000@gmail.com</td>
              </tr>
              <tr>
                <th className="text-start">Số Điện Thoại</th>
                <td>0123456789</td>
              </tr>
            </table>
            <Button variant="outlined" onClick={handleClickOpen}>
              Sửa thông tin
            </Button>
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default ProfilePage;

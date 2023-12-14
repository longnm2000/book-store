import FooterComp from "../../components/footer/FooterComp";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError, AxiosResponse } from "axios";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Họ tên không để trống"),
  email: yup
    .string()
    .required("Email không được để trống")
    .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, "Email không hợp lệ")
    .max(50, "Email không dài quá 50 ký tự"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(50, "Mật khẩu không quá 50 ký tự")
    .required("Mật khẩu không để trống"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
    .required("Vui lòng nhập số điện thoại"),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: RegisterInfo) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/register`, data)
      .then(async (res: AxiosResponse) => {
        if (res.status === 201) {
          await Swal.fire({
            icon: "success",
            title: "Đăng ký thành công!",
            text: "Tự động chuyển về trang đăng nhập",
            timer: 2000,
          } as SweetAlertOptions);
          localStorage.setItem(
            "accessToken",
            JSON.stringify(res.data?.accessToken)
          );
          localStorage.setItem("user", JSON.stringify(res.data?.user));

          navigate("/");
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);

        if (err.code === "ERR_NETWORK") {
          Swal.fire({
            title: "Lỗi mạng",
            timer: 2000,
            icon: "error",
          } as SweetAlertOptions);
          return;
        }
        if (err.response?.data === "Email already exists") {
          Swal.fire({
            title: "Email đã được sử dụng",
            icon: "error",
            timer: 2000,
          });
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      {/* <HeaderComp /> */}
      <main className=" bg-black md:py-4">
        <div className="container mx-auto">
          <div className=" sm:rounded-lg sm:overflow-hidden bg-no-repeat bg-center bg-cover bg-[url('https://png.pngtree.com/background/20230731/original/pngtree-a-lot-of-used-books-book-library-closeup-photo-picture-image_4349455.jpg')]">
            <div className=" max-w-2xl bg-white p-4">
              <h1 className=" font-semibold text-3xl">Đăng ký</h1>
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
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Email"
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel
                            error={!!errors.password}
                            htmlFor="outlined-adornment-password"
                          >
                            Password
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            error={!!errors.password}
                            //   helperText={errors.password?.message}
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                          <FormHelperText error id="component-error-text">
                            {errors?.password?.message}
                          </FormHelperText>
                        </FormControl>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Đăng ký
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Button component={Link} to={"/login"}>
                      Có tài khoản? Đăng nhập
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default RegisterPage;

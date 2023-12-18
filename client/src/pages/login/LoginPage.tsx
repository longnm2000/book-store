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
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FooterComp from "../../components/layout/footer/FooterComp";
import axios, { AxiosError, AxiosResponse } from "axios";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
// import HeaderComp from "../../components/header/HeaderComp";

type Account = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống")
    .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, "Email không hợp lệ")
    .max(50, "Email không dài quá 50 ký tự"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(50, "Mật khẩu không quá 50 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: Account) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/login`, data)
      .then(async (res: AxiosResponse) => {
        if (res.status === 200) {
          await Swal.fire({
            title: "Đăng nhập thành công!",
            icon: "success",
            timer: 2000,
          } as SweetAlertOptions);
          localStorage.setItem(
            "accessToken",
            JSON.stringify(res.data?.accessToken)
          );
          localStorage.setItem("user", JSON.stringify(res.data?.user));
          console.log(res.data);

          navigate("/");
        }
      })
      .catch((err: AxiosError) => {
        if (err.code === "ERR_NETWORK") {
          Swal.fire({
            title: "Lỗi mạng",
            timer: 2000,
            icon: "error",
          } as SweetAlertOptions);
          return;
        }
        switch (err.response?.data) {
          case "Cannot find user":
            Swal.fire({
              title: "Email chưa được đăng ký",
              icon: "error",
              timer: 2000,
            });
            break;
          case "Incorrect password":
            Swal.fire({
              title: "Mật khẩu không chính xác",
              icon: "error",
              timer: 2000,
            });
            break;
          default:
            Swal.fire({
              title: "Có lỗi xảy ra",
              icon: "error",
              timer: 2000,
            });
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      {/* <HeaderComp /> */}
      <div className="sm:py-20  mx-auto bg-no-repeat bg-center bg-cover bg-[url('https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg')]">
        <div className=" w-fit mx-auto p-2 md:p-4 md:rounded-lg bg-white shadow-xl">
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            className=" max-w-md mx-auto"
          >
            <h1 className=" font-semibold text-3xl text-center mb-3">
              Đăng Nhập
            </h1>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
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
                    autoComplete="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Button component={Link} to={"/login"}>
                  Quên mật khẩu
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link} to={"/register"}>
                  Không có tài khoản? Đăng ký
                </Button>
              </Grid>
            </Grid>
          </Box>
          <div className=" max-w-md mx-auto">
            <p className="mt-3 font-semibold">Hoặc đăng nhập bằng</p>
            <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
              Facebook
            </Button>
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
};
export default LoginPage;

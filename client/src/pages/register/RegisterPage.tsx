import FooterComp from "../../components/layout/footer/FooterComp";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError, AxiosResponse } from "axios";
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
import { toast } from "react-toastify";

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
          toast.success(
            "Đăng ký này thành công. Tự động chuyển về trang đăng nhập."
          );
          navigate("/login");
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);

        if (err.code === "ERR_NETWORK") {
          toast.error("Lỗi mạng");
          return;
        }
        if (err.response?.data === "Email already exists") {
          toast.error("Email đã được sử dụng");
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>

      {/* <HeaderComp /> */}
      <div className="sm:py-20  mx-auto bg-no-repeat bg-center bg-cover bg-[url('https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg')]">
        <div className=" w-fit mx-auto p-2 md:p-4 md:rounded-lg bg-white shadow-xl">
          <h1 className="text-3xl font-semibold text-center">Đăng Ký</h1>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
            className=" max-w-md"
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
                        Mật khẩu
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
                <Button component={Link} to={"/login"} sx={{ color: "black" }}>
                  Có tài khoản? Đăng nhập
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <FooterComp />
    </>
  );
};
export default RegisterPage;

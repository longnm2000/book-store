import FooterComp from "../../components/layout/footer/FooterComp";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosError, AxiosResponse } from "axios";
import { Helmet } from "react-helmet";
import { Box, Button, Grid } from "@mui/material";

import { toast } from "react-toastify";
import { RegisterInfo } from "../../types/types";
import { registerUser } from "../../axios/user";
import CustomInput from "../../components/common/CustomInput/CustomInput";
import PasswordInput from "../../components/common/PasswordInput/PasswordInput";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
} from "../../helper/validations";

const schema = yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  phone: phoneValidation,
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

  const onSubmit = (data: RegisterInfo) => {
    registerUser(data)
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
            <Grid container>
              <Grid item xs={12}>
                <CustomInput
                  control={control}
                  name="name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomInput
                  control={control}
                  name="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput
                  control={control}
                  name="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomInput
                  control={control}
                  name="phone"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
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

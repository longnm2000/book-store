import Button from "@mui/material/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import {
  emailValidation,
  passwordValidation,
} from "../../../helper/validations";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
import CustomInput from "../../../components/common/CustomInput/CustomInput";
import PasswordInput from "../../../components/common/PasswordInput/PasswordInput";
import { Account } from "../../../types/types";
import { loginUser } from "../../../axios/user";
import { AxiosError, AxiosResponse } from "axios";
// import { act_setAdmin } from "../../../redux/action";

const schema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export default function LoginAdminPage() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  //   const dispatch = useDispatch();

  const onSubmit = (data: Account) => {
    loginUser(data)
      .then((res: AxiosResponse) => {
        if (res.data.user.role === "admin") {
          if (res.status === 200) {
            toast.success("Đăng nhập thành công!");
            localStorage.setItem(
              "adminToken",
              JSON.stringify(res.data?.accessToken)
            );
            // dispatch(act_setAdmin(res.data?.user));
            localStorage.setItem("admin", JSON.stringify(res.data?.user));
            navigate("/admin");
          }
        } else {
          toast.error("Bạn không được phép đăng nhập vào trang này");
          navigate("/login");
        }
      })
      .catch((err: AxiosError) => {
        if (err.code === "ERR_NETWORK") {
          toast.error("Lỗi mạng");
          return;
        }
        switch (err.response?.data) {
          case "Cannot find user":
            toast.error("Không tìm thấy người dùng");
            break;
          case "Incorrect password":
            toast.error("Sai mật khẩu");
            break;
          default:
            toast.error("Có lỗi xảy ra");
        }
      });
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* <CssBaseline /> */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p className="text-2xl font-semibold">Đăng nhập</p>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <CustomInput
                control={control}
                name="email"
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                defaultValue=""
              />
              <PasswordInput
                control={control}
                name="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className=" capitalize bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Đăng nhập
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </>
  );
}

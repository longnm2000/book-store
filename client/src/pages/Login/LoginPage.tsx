import { Box, Button } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FooterComp from "../../components/layout/footer/FooterComp";
import { AxiosError, AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Account } from "../../types/types";
import { loginUser } from "../../axios/user";
import { useDispatch } from "react-redux";
import { act_setUser } from "../../redux/action";
import CustomInput from "../../components/common/CustomInput/CustomInput";
import PasswordInput from "../../components/common/PasswordInput/PasswordInput";
import { emailValidation, passwordValidation } from "../../helper/validations";

const schema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
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

  const dispatch = useDispatch();

  const onSubmit = (data: Account) => {
    loginUser(data)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          toast.success("Đăng nhập thành công!");
          localStorage.setItem(
            "accessToken",
            JSON.stringify(res.data?.accessToken)
          );
          dispatch(act_setUser(res.data?.user));
          localStorage.setItem("user", JSON.stringify(res.data?.user));
          navigate("/");
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
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>

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
            <CustomInput
              control={control}
              name="email"
              error={!!errors.email}
              helperText={errors.email?.message}
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
            >
              Đăng nhập
            </Button>

            <div className="flex justify-end">
              <Button component={Link} to={"/register"} sx={{ color: "black" }}>
                Đăng ký
              </Button>
            </div>
          </Box>
        </div>
      </div>
      <FooterComp />
    </>
  );
};
export default LoginPage;
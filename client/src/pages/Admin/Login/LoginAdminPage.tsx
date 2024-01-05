import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import {
  emailValidation,
  passwordValidation,
} from "../../../helper/validations";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import CustomInput from "../../../components/common/CustomInput/CustomInput";
import PasswordInput from "../../../components/common/PasswordInput/PasswordInput";
import { Account } from "../../../types/types";
import { loginUser } from "../../../api/user";
import { AxiosError, AxiosResponse } from "axios";
import { Button, Col, Form, Row } from "antd";
import { act_setAdmin } from "../../../redux/action";

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

  const dispatch = useDispatch();

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
            dispatch(act_setAdmin(res.data?.user));
            localStorage.setItem("admin", JSON.stringify(res.data?.user));
            navigate("/admin/orders");
          }
        } else {
          toast.error("Không tìm thấy người dùng");
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
            toast.error("Sai tài khoản hoặc mật khẩu");
            break;
          default:
            toast.error("Có lỗi xảy ra");
        }
      });
  };

  return (
    <>
      <div>
        <div className="container mx-auto h-screen flex items-center">
          <div className=" w-full sm:w-3/5 lg:w-2/5 max-w-5xl mx-auto p-2 md:p-4 md:rounded-lg bg-white shadow-xl">
            <Form
              onFinish={handleSubmit(onSubmit)}
              layout="vertical"
              className=" mx-auto lg:p-3"
            >
              <h1 className=" font-semibold text-2xl text-center mb-3">
                Đăng nhập Admin
              </h1>

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
                label="Mật khẩu"
              />

              <Button
                htmlType="submit"
                block
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 rounded-lg capitalize"
              >
                Đăng nhập
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

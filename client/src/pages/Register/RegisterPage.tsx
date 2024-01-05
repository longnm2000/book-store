import FooterComp from "../../components/layout/footer/FooterComp";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosError, AxiosResponse } from "axios";
import { Helmet } from "react-helmet";

import { toast } from "react-toastify";
import { RegisterInfo } from "../../types/types";
import { registerUser } from "../../api/user";
import CustomInput from "../../components/common/CustomInput/CustomInput";
import PasswordInput from "../../components/common/PasswordInput/PasswordInput";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
} from "../../helper/validations";
import { Button, Form } from "antd";

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
        <div className="container mx-auto">
          <div className="lg:w-2/5 max-w-5xl mx-auto p-2 md:p-4 md:rounded-lg bg-white shadow-xl">
            <div className=" flex justify-between mb-2">
              <h1 className="text-2xl font-semibold text-center">Đăng Ký</h1>
              <Link to={"/login"}>
                {" "}
                <Button
                  type="text"
                  className="text-sm capitalize text-blue-400"
                >
                  Đăng nhập
                </Button>
              </Link>
            </div>
            <Form
              layout="vertical"
              onFinish={handleSubmit(onSubmit)}
              className=" w-full"
            >
              <CustomInput
                control={control}
                name="name"
                label="Họ Tên"
                error={!!errors.name}
                helperText={errors.name?.message}
                defaultValue=""
              />

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

              <CustomInput
                control={control}
                name="phone"
                label="Số Điện thoại"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                defaultValue=""
              />

              <Button
                htmlType="submit"
                block
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 rounded-lg capitalize"
              >
                Đăng ký
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
};
export default RegisterPage;

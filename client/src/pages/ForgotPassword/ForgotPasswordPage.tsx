import { FC, useRef, useState } from "react";
import * as emailjs from "@emailjs/browser";
import { Button, message, Steps, Form, Input } from "antd";
import * as yup from "yup";
import { emailValidation } from "../../helper/validations";
import CustomInput from "../../components/common/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosConfig } from "../../api/config";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { User } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const schema = yup.object().shape({
  email: emailValidation,
});

const ForgotPasswordPage: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [user, setUser] = useState<User>();
  const [current, setCurrent] = useState(0);
  const code = useRef(Math.random().toString(36).substring(2));

  const navigate = useNavigate();

  const next = () => {
    setCurrent(current + 1);
  };

  let templateParams = {
    message: code.current,
    to_email: "",
  };
  console.log(templateParams);
  console.log(user);

  const handleSendEmail = async (data: any) => {
    templateParams.to_email = data.email;
    try {
      const response: AxiosResponse = await axiosConfig.get(
        `/users?email=${data.email}`
      );
      if (response.data.length > 0 && response.data[0].role === "user") {
        setUser(response.data[0]);
        const emailResponse = await emailjs.send(
          "service_yfv72ud",
          "template_v2fm8n8",
          templateParams,
          "HaLHl0iirClrvxDNt"
        );
        if (emailResponse.status === 200) {
          message.success("Mã khôi phục mật khẩu đã được gửi");
          setTimeout(() => {
            code.current = "";
          }, 10000);
          next();
        }
      } else {
        toast.error("Email không tìm thấy");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Có lỗi xảy ra", error);
    }
  };

  const handleEnterCode = (values: any) => {
    if (code.current === "") {
      message.error("Mã thay đổi mật khẩu đã hết hạn");
    } else {
      if (values.code === templateParams.message) {
        next();
      } else {
        message.error("Mã khôi phục mật khẩu không đúng");
      }
    }
  };

  const onPasswordChange = (values: any) => {
    console.log(values);
    axiosConfig
      .patch(`/users/${user?.id}`, { password: values.password })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          toast.success(
            "Thay đổi mật khẩu thành công. Chuyển sang trang đăng nhập"
          );
          navigate("/login");
        }
      })
      .catch((error: AxiosError) => toast.error("Có lỗi xảy ra"));
  };

  const steps = [
    {
      title: "Nhập Email của bạn",
      content: (
        <Form onFinish={handleSubmit(handleSendEmail)} layout="vertical">
          <CustomInput
            control={control}
            name="email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            defaultValue={""}
          />
          <Button htmlType="submit">Gửi mã</Button>
        </Form>
      ),
    },
    {
      title: "Nhập mã",
      content: (
        <Form onFinish={handleEnterCode} layout="vertical">
          <p>Mã hết hạn trong 60 giây</p>
          <Form.Item
            label="Mã thay đổi mật khẩu"
            name={"code"}
            rules={[{ required: true, message: "Vui lòng nhập mã thay đổi!" }]}
          >
            <Input />
          </Form.Item>
          <Button htmlType="submit">Xác nhận</Button>
        </Form>
      ),
    },
    {
      title: "Đổi mật khẩu",
      content: (
        <Form onFinish={onPasswordChange} layout="vertical">
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới!",
              },
              {
                min: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không trùng khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Hoàn tất
          </Button>
        </Form>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Helmet>
        <title>Quên Mật Khẩu</title>
      </Helmet>
      <div className="container mx-auto pt-20">
        <div className="max-w-2xl mx-auto">
          <Steps current={current} items={items} />
          <div className="mt-10">{steps[current].content}</div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;

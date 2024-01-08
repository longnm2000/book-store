import { Helmet } from "react-helmet";
import HeaderComp from "../../components/layout/header/HeaderComp";
import FooterComp from "../../components/layout/footer/FooterComp";
import { useState } from "react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Grid, Avatar } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useGetUserByID } from "../../hooks/user";
import CustomInput from "../../components/common/CustomInput/CustomInput";
import { nameValidation, phoneValidation } from "../../helper/validations";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { updateDetailUser } from "../../api/user";
import { act_setUser } from "../../redux/action";
import { Button, Form, Input, Modal } from "antd";

interface updateInfo {
  name: string;
  phone: string;
  image: any;
}

const schema = yup.object().shape({
  name: nameValidation,
  phone: phoneValidation,
  image: yup.mixed().notRequired(),
});
const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentUser = useSelector((state: any) => state.user);
  const { detailUser, fetchDetailUser } = useGetUserByID(currentUser.id);

  const [selectedImage, setSelectedImage] = useState<string>(
    detailUser?.avatar || currentUser?.avatar
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: any) => {
    console.log("ok");

    try {
      const { image, ...updateInfo } = data;
      let finalUpdateInfo = { ...updateInfo, avatar: selectedImage };
      if (image && image instanceof File) {
        const storageRef = ref(storage, `images/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        finalUpdateInfo = { ...finalUpdateInfo, avatar: url };
      }
      console.log(data);

      const response = await updateDetailUser(currentUser.id, finalUpdateInfo);

      if (response.status === 200) {
        fetchDetailUser(currentUser.id);
        toast.success("Thay đổi thông tin thành công");
        dispatch(act_setUser({ ...currentUser, ...finalUpdateInfo }));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...currentUser, ...finalUpdateInfo })
        );
        handleClose();
        fetchDetailUser(currentUser.id);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (error instanceof Error) {
        toast.error(`Đã xảy ra lỗi: ${error.message}`);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Thông tin cá nhân</title>
      </Helmet>
      <HeaderComp />
      <Modal
        title="Sửa Thông Tin"
        open={open}
        onCancel={handleClose}
        onOk={handleSubmit(onSubmit)}
        cancelText="Huỷ"
        okText="Thay đổi"
        okButtonProps={{
          style: { background: "#FF7506", color: "white" },
        }}
      >
        <img
          src={selectedImage}
          alt=""
          style={{
            maxWidth: "300px",
            width: "100%",
            display: "block",
            margin: "auto",
          }}
        />
        <Form layout="vertical" style={{ marginTop: "16px" }}>
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Item label="Chọn Ảnh" valuePropName="file">
                {" "}
                <Input
                  type="file"
                  onChange={(e) => {
                    if (e.target?.files) {
                      onChange(e.target.files[0]);
                      setSelectedImage(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  onBlur={onBlur}
                  ref={ref}
                />
              </Form.Item>
            )}
          />
          <CustomInput
            name="name"
            control={control}
            error={!!errors.name}
            helperText={errors.name?.message}
            label="Họ tên"
            defaultValue={detailUser?.name}
          />
          <CustomInput
            name="phone"
            control={control}
            label="Số điện thoại"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            defaultValue={detailUser?.phone}
          />
        </Form>
      </Modal>

      <main className=" bg-slate-50">
        <div className="container mx-auto py-4">
          <div className=" max-w-xl p-4 rounded-lg mx-auto bg-white">
            <h1 className=" font-semibold text-2xl text-center mb-4">
              Thông tin cá nhân
            </h1>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <div className="flex justify-center items-center w-full">
                  <Avatar
                    sx={{ width: 156, height: 156 }}
                    alt={detailUser?.name}
                    src={detailUser?.avatar}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={8}>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <th className="text-start p-2">Họ Tên</th>
                      <td className="p-2">{detailUser?.name}</td>
                    </tr>
                    <tr>
                      <th className="text-start p-2">Email</th>
                      <td className="p-2">{detailUser?.email}</td>
                    </tr>
                    <tr>
                      <th className="text-start p-2">Số Điện Thoại</th>
                      <td className="p-2">{detailUser?.phone}</td>
                    </tr>
                  </tbody>
                </table>
                <Button
                  onClick={handleClickOpen}
                  className="mt-4 ms-2 bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Sửa thông tin
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default ProfilePage;

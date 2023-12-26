import { Helmet } from "react-helmet";
import HeaderComp from "../../components/layout/header/HeaderComp";
import FooterComp from "../../components/layout/footer/FooterComp";
import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Avatar,
  DialogActions,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useGetUserByID } from "../../hooks/user";
import CustomInput from "../../components/common/CustomInput/CustomInput";
import { nameValidation, phoneValidation } from "../../helper/validations";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { updateDetailUser } from "../../axios/user";
import { AxiosResponse } from "axios";
import { act_setUser } from "../../redux/action";

interface updateInfo {
  name: string;
  phone: string;
}

const schema = yup.object().shape({
  name: nameValidation,
  phone: phoneValidation,
});
const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentUser = useSelector((state: any) => state.user);
  const { detailUser, fetchDetailUser } = useGetUserByID(currentUser.id);
  console.log(detailUser, currentUser.id);

  const [imageUrlAvatar, setImageUrlAvatar] = useState<string>(
    currentUser?.avatar
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
    reset();
    setImageUrlAvatar(currentUser?.avatar);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];

    if (selectedImage) {
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      uploadBytes(storageRef, selectedImage)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          setImageUrlAvatar(url);
          toast.success("Upload ảnh thành công");
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const onSubmit = (data: updateInfo) => {
    const info = { ...data, avatar: imageUrlAvatar };
    updateDetailUser(currentUser.id, info).then((response: AxiosResponse) => {
      if (response.status === 200) {
        fetchDetailUser(currentUser.id);
        toast.success("Thay đổi thông tin thành công");
        dispatch(act_setUser({ ...currentUser, ...info }));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...currentUser, ...info })
        );
        handleClose();
      }
    });
  };
  console.log(imageUrlAvatar);

  return (
    <>
      <Helmet>
        <title>Thông tin cá nhân</title>
      </Helmet>
      <HeaderComp />
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            <div className="flex">
              <p>Sửa Thông Tin</p>
            </div>
          </DialogTitle>

          <DialogContent>
            <div>
              <div className="p-4" style={{ marginBottom: "20px" }}>
                <img src={imageUrlAvatar} alt="" width={200} />
              </div>
              <div className="">
                <input type="file" onChange={handleAvatarUpload} className="" />
              </div>
            </div>
            <Box component="form" noValidate>
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
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Huỷ</Button>
            <Button
              type="submit"
              variant="contained"
              className="bg-red-500"
              color="success"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
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
                  variant="outlined"
                  onClick={handleClickOpen}
                  className="mt-4 ms-2"
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

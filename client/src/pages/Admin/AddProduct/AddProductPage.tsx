import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Select } from "antd";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import CustomInput from "../../../components/common/CustomInput/CustomInput";
import { storage } from "../../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { axiosConfig } from "../../../api/config";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../../hooks/category";

const schema = yup.object().shape({
  title: yup
    .string()
    .max(100, "Không dài hơn 100 ký tự")
    .required("Không để trống"),
  author: yup
    .string()
    .max(100, "Không dài hơn 100 ký tự")
    .required("Không để trống"),
  supplier: yup
    .string()
    .max(100, "Không dài hơn 100 ký tự")
    .required("Không để trống"),
  publisher: yup
    .string()
    .max(100, "Không dài hơn 100 ký tự")
    .required("Không để trống"),
  language: yup
    .string()
    .max(100, "Không dài hơn 100 ký tự")
    .required("Không để trống"),
  quantity: yup.number().min(1, "Không nhỏ hơn 1").required("Không để trống"),
  weight: yup.number().min(1, "Không nhỏ hơn 1").required("Không để trống"),
  dimensions: yup
    .string()
    .max(100, "Không dài hơn 100 ký tự")
    .required("Không để trống"),
  releaseDate: yup.number().required("Không để trống"),
  format: yup
    .string()
    .max(100, "Không dài hơn 100 ký tự")
    .required("Không để trống"),
  numberOfPages: yup
    .number()

    .min(1, "Không nhỏ hơn 1")
    .required("Không để trống"),
  typeId: yup.number().required("Không để trống"),
  description: yup
    .string()
    .max(10000, "Không dài hơn 10000 ký tự")
    .required("Không để trống"),
});

const AddProductPage: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { categories } = useCategory();

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const navigate = useNavigate();

  const [imageUrlAvatar, setImageUrlAvatar] = useState("");

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

  const onSubmit = async (data: any) => {
    try {
      const response: AxiosResponse = await axiosConfig.post("/products", {
        ...data,
        avatar: imageUrlAvatar,
        createAt: Date.now(),
        typeId: 1,
      });
      if (response.status === 201) {
        toast.success("Thêm sản phẩm thành công");
        reset();
        navigate("/admin/products");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="font-semibold text-2xl">Thêm Sản Phẩm</h1>
      <div className="p-4" style={{ marginBottom: "20px" }}>
        <img src={imageUrlAvatar} alt="" width={200} />
      </div>
      <div className="">
        <input type="file" onChange={handleAvatarUpload} className="" />
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <CustomInput
          control={control}
          name="title"
          label="Tên"
          error={!!errors.title}
          helperText={errors.title?.message}
          defaultValue=""
        />
        <CustomInput
          control={control}
          name="author"
          label="Tác giả"
          error={!!errors.author}
          helperText={errors.author?.message}
          defaultValue=""
        />
        <CustomInput
          control={control}
          name="supplier"
          label="Nhà cung cấp"
          error={!!errors.supplier}
          helperText={errors.supplier?.message}
          defaultValue=""
        />
        <CustomInput
          control={control}
          name="publisher"
          label="Nhà xuất bản"
          defaultValue=""
          error={!!errors.publisher}
          helperText={errors.publisher?.message}
        />
        <CustomInput
          control={control}
          name="language"
          label="Ngôn ngữ"
          defaultValue=""
          error={!!errors.language}
          helperText={errors.language?.message}
        />
        <CustomInput
          control={control}
          name="quantity"
          label="Số lượng"
          defaultValue={1}
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
        />
        <CustomInput
          control={control}
          name="weight"
          label="Trọng lượng"
          defaultValue={1}
          error={!!errors.weight}
          helperText={errors.weight?.message}
        />
        <CustomInput
          control={control}
          name="dimensions"
          label="Kích thước"
          defaultValue=""
          error={!!errors.dimensions}
          helperText={errors.dimensions?.message}
        />
        <CustomInput
          control={control}
          name="releaseDate"
          label="Năm xuất bản"
          defaultValue={2024}
          error={!!errors.releaseDate}
          helperText={errors.releaseDate?.message}
        />
        <CustomInput
          control={control}
          name="format"
          label="Hình thức"
          defaultValue=""
          error={!!errors.format}
          helperText={errors.format?.message}
        />
        <Controller
          control={control}
          name="typeId"
          defaultValue={1}
          render={({ field }) => (
            <Form.Item
              label="Thể loại"
              help={errors.typeId?.message}
              className={"capitalize"}
              validateStatus={errors.typeId ? "error" : ""}
            >
              <Select {...field} options={categoryOptions} />
            </Form.Item>
          )}
        />
        <CustomInput
          control={control}
          name="numberOfPages"
          label="Số trang"
          defaultValue={1}
          error={!!errors.numberOfPages}
          helperText={errors.numberOfPages?.message}
        />
        <CustomInput
          name="description"
          control={control}
          label="Miêu tả"
          defaultValue=""
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-500 hover:bg-blue-700"
        >
          Thêm
        </Button>
      </Form>
    </>
  );
};

export default AddProductPage;

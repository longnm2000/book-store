import { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useCategory } from "../../hooks/category";
import { Button, Form, Input, Select } from "antd";
import CustomInput from "../common/CustomInput/CustomInput";
import { Book } from "../../types/types";

interface ProductFormProps {
  onSubmit: (data: any) => void;
  defaultValue: Book;
}

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
  image: yup.mixed().notRequired(),
});

const ProductForm: FC<ProductFormProps> = ({ onSubmit, defaultValue }) => {
  const { categories } = useCategory();
  const [selectedImage, setSelectedImage] = useState<string>(
    defaultValue.avatar
  );
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <>
      <img
        src={selectedImage}
        alt=""
        style={{
          maxWidth: "200px",
          width: "100%",
          display: "block",
          margin: "auto",
        }}
      />
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Item
              label="Chọn Ảnh"
              valuePropName="file"
              validateStatus={errors.image ? "error" : ""}
              help={errors.image?.message}
            >
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
          control={control}
          name="title"
          label="Tên"
          error={!!errors.title}
          helperText={errors.title?.message}
          defaultValue={defaultValue.title}
        />
        <CustomInput
          control={control}
          name="author"
          label="Tác giả"
          error={!!errors.author}
          helperText={errors.author?.message}
          defaultValue={defaultValue.author}
        />
        <CustomInput
          control={control}
          name="supplier"
          label="Nhà cung cấp"
          error={!!errors.supplier}
          helperText={errors.supplier?.message}
          defaultValue={defaultValue.supplier}
        />
        <CustomInput
          control={control}
          name="publisher"
          label="Nhà xuất bản"
          defaultValue={defaultValue.publisher}
          error={!!errors.publisher}
          helperText={errors.publisher?.message}
        />
        <CustomInput
          control={control}
          name="language"
          label="Ngôn ngữ"
          defaultValue={defaultValue.language}
          error={!!errors.language}
          helperText={errors.language?.message}
        />
        <CustomInput
          control={control}
          name="quantity"
          label="Số lượng"
          defaultValue={defaultValue.quantity}
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
        />
        <CustomInput
          control={control}
          name="weight"
          label="Trọng lượng (g)"
          defaultValue={defaultValue.weight}
          error={!!errors.weight}
          helperText={errors.weight?.message}
        />
        <CustomInput
          control={control}
          name="dimensions"
          label="Kích thước"
          defaultValue={defaultValue.dimensions}
          error={!!errors.dimensions}
          helperText={errors.dimensions?.message}
        />
        <CustomInput
          control={control}
          name="releaseDate"
          label="Năm xuất bản"
          defaultValue={defaultValue.releaseDate}
          error={!!errors.releaseDate}
          helperText={errors.releaseDate?.message}
        />
        <CustomInput
          control={control}
          name="format"
          label="Hình thức"
          defaultValue={defaultValue.format}
          error={!!errors.format}
          helperText={errors.format?.message}
        />
        <Controller
          control={control}
          name="typeId"
          defaultValue={defaultValue.typeId}
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
          defaultValue={defaultValue.numberOfPages}
          error={!!errors.numberOfPages}
          helperText={errors.numberOfPages?.message}
        />
        <CustomInput
          name="description"
          control={control}
          label="Miêu tả"
          defaultValue={defaultValue.description}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-500 hover:bg-blue-700"
        >
          Lưu
        </Button>
      </Form>
    </>
  );
};

export default ProductForm;

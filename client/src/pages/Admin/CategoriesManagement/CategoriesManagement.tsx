import Table, { ColumnsType } from "antd/es/table";
import React from "react";
import { Category } from "../../../types/types";
import { useCategory } from "../../../hooks/category";
import { Button, Form, Input, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { axiosConfig } from "../../../api/config";
import { toast } from "react-toastify";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../../components/common/CustomInput/CustomInput";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Không để trống")
    .max(50, "Không dài quá 50 ký tự"),
});

const CategoriesManagement: React.FC = () => {
  const { categories, fetchCategories } = useCategory();
  const { confirm } = Modal;
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category>();
  console.log(selectedCategory);
  const [action, setAction] = React.useState<string>("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const columns: ColumnsType<Category> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      key: "id",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            className=" bg-blue-500 hover:bg-blue-700 text-white"
            type="primary"
            onClick={() => {
              setOpen(true);
              handleUpdate(record);
            }}
          >
            Sửa
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  const handleUpdate = (record: Category) => {
    setSelectedCategory(record);
    setAction("update");
  };

  const handleDelete = (id: number) => {
    confirm({
      title: "Bạn có muốn xóa sản phẩm này?",
      icon: <ExclamationCircleFilled />,
      okText: "Xoá",
      okButtonProps: {
        icon: <DeleteOutlined />,
      },
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          const productResponse = await axiosConfig.get(
            `/products?typeId=${id}`
          );
          console.log(productResponse.data);

          if (productResponse.data.length > 0) {
            toast.error("Danh mục này vẫn chứa các cuốn sách không thể xoá");
            return;
          }

          await axiosConfig.delete("/types/" + id);
          fetchCategories();
          toast.success("Xóa thành công");
        } catch (error) {
          console.log(error);
          toast.error("Có lỗi xảy ra");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleSubmitForm = async (data: any) => {
    console.log(data);
    try {
      if (action === "update") {
        await axiosConfig.patch(`/types/${selectedCategory?.id}`, data);
        toast.success("Sửa danh mục thành công");
        fetchCategories();
        setOpen(false);
        setSelectedCategory(undefined);
      } else {
        await axiosConfig.post("/types", data);
        toast.success("Thêm danh mục thành công");
        fetchCategories();
        setOpen(false);
        setSelectedCategory(undefined);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        title={action === "update" ? "Sửa danh mục" : "Tạo danh mục"}
        open={open}
        footer={null}
        onCancel={() => {
          setOpen(false);
          setSelectedCategory(undefined);
        }}
      >
        {selectedCategory?.name ? (
          <>
            <Form onFinish={handleSubmit(handleSubmitForm)} layout={"vertical"}>
              <CustomInput
                control={control}
                error={!!errors?.name}
                name="name"
                helperText={errors.name?.message}
                defaultValue={selectedCategory?.name}
                label={"Danh mục"}
              />
              <Button htmlType="submit">Lưu</Button>
            </Form>
          </>
        ) : (
          <>
            <Form onFinish={handleSubmit(handleSubmitForm)} layout={"vertical"}>
              <CustomInput
                control={control}
                error={!!errors?.name}
                name="name"
                helperText={errors.name?.message}
                defaultValue={""}
                label={"Danh mục"}
              />
              <Button htmlType="submit">Lưu</Button>
            </Form>
          </>
        )}
      </Modal>
      <div className="mb-4">
        <h1 className=" font-semibold text-2xl mb-4">Quản lý danh mục</h1>
        <Button
          onClick={() => {
            setOpen(true);
            setAction("create");
          }}
          className="bg-green-500 hover:bg-green-700 text-white"
        >
          Tạo danh mục
        </Button>
      </div>
      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={categories}
      />
    </>
  );
};

export default CategoriesManagement;

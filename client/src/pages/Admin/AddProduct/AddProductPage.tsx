import { FC } from "react";
import { storage } from "../../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { axiosConfig } from "../../../api/config";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../../components/ProductForm/ProductForm";
import { Book } from "../../../types/types";

const AddProductPage: FC = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const defaultBook: Book = {
    id: 0,
    avatar: "",
    title: "",
    author: "",
    supplier: "",
    publisher: "",
    language: "",
    weight: 1,
    dimensions: "",
    releaseDate: year,
    format: "",
    numberOfPages: 1,
    typeId: 1,
    description: "",
    quantity: 1,
    createAt: Date.now(),
  };

  const onSubmit = async (data: any) => {
    try {
      const { image, ...updateInfo } = data;
      let finalInfo = { ...updateInfo, avatar: "" };
      if (image && image instanceof File) {
        const storageRef = ref(storage, `images/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        finalInfo = { ...finalInfo, avatar: url };
      }
      const response: AxiosResponse = await axiosConfig.post("/products", {
        ...finalInfo,
        createAt: Date.now(),
      });
      if (response.status === 201) {
        toast.success("Thêm sản phẩm thành công");
        navigate("/admin/products");
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
      <h1 className="font-semibold text-2xl">Thêm Sản Phẩm</h1>
      <ProductForm onSubmit={onSubmit} defaultValue={defaultBook} />
    </>
  );
};

export default AddProductPage;

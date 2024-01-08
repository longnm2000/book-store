import HeaderComp from "../../components/layout/header/HeaderComp";
import FooterComp from "../../components/layout/footer/FooterComp";
import { useAllOrdersByUserId } from "../../hooks/order";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { axiosConfig, axiosInstance } from "../../api/config";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Comment, CommentForm, OrderDetail } from "../../types/types";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Modal,
  Pagination,
  PaginationProps,
  Rate,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";

const schema = yup.object().shape({
  score: yup.number().required("Phai co diem"),
  content: yup.string().required("Phai co noi dung"),
});

const HistoryPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentUser = useSelector((state: any) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [productId, setProductId] = useState(0);
  const { orders, totalPage, fetchAllOrdersByUserId } = useAllOrdersByUserId(
    currentUser.id,
    currentPage,
    limit
  );

  const [selectComment, setSelectComment] = useState<Comment | null>(null);

  const handleChangePage = (selectPage: number) => {
    setCurrentPage(selectPage);
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    _,
    pageSize
  ) => {
    setLimit(pageSize);
  };

  const fetchAllCommentsByUserIdAndProductId = async (
    userId: number,
    productId: number
  ) => {
    const result = await axiosInstance.get(
      "/comments?userId=" + userId + "&productId=" + productId
    );
    if (result.data.length > 0) {
      setSelectComment(result.data[0]);
    }
  };

  useEffect(() => {
    fetchAllCommentsByUserIdAndProductId(currentUser.id, productId);
  }, [productId]);

  console.log(selectComment);

  const handleOpen = (productId: number) => {
    setOpen(true);
    setProductId(productId);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectComment(null);
    reset();
  };

  const handleDelete = async (orderId: number) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Bạn có chắc muốn huỷ mượn sách không?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy bỏ",
    } as SweetAlertOptions);

    if (result.isConfirmed) {
      axiosConfig
        .patch("/orders/" + orderId, { status: 3 })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Huỷ thành công");
            fetchAllOrdersByUserId(currentUser.id, currentPage, limit);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error?.code === "ERR_NETWORK") {
            toast.error("Lỗi mạng");
            return;
          }
          switch (error.response?.data) {
            case "jwt expired":
              toast.error("Phiên đăng nhập hết hạn vui lòng đăng nhập lại");
              break;
            case "Missing authorization header":
              toast.error("Vui lòng đăng nhập");
              break;
            case "jwt malformed":
              toast.error("Vui lòng đăng nhập");
              break;
            default:
              toast.error("Có lỗi xảy ra");
          }
        });
    }
  };

  const onSubmit = (data: CommentForm) => {
    if (selectComment) {
      axiosInstance
        .patch("/comments/" + selectComment.id, {
          ...data,
          createAt: Date.now(),
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Đánh giá sản phẩm thành công");
            handleClose();
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.code === "ERR_NETWORK") {
            toast.error("Lỗi mạng");
            return;
          }
          toast.error(`Có lỗi xảy ra ${err.response?.data}`);
        });
    } else {
      axiosInstance
        .post("/comments", {
          ...data,
          productId,
          userId: currentUser.id,
          createAt: Date.now(),
        })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            toast.success("Đánh giá sản phẩm thành công");
            handleClose();
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.code === "ERR_NETWORK") {
            toast.error("Lỗi mạng");
            return;
          }
          toast.error(`Có lỗi xảy ra ${err.response?.data}`);
        });
    }
  };

  const columns: ColumnsType<OrderDetail> = [
    { key: "id", dataIndex: "id", title: "ID" },
    {
      key: "name",
      dataIndex: "product",
      title: "Cuốn Sách",
      render: (product) => (
        <Link to={`/detail/${product.id}`} target="_blank">
          {product.title}
        </Link>
      ),
    },
    {
      key: "id",
      dataIndex: "product",
      title: "Hình Ảnh",
      render: (product) => <img src={product.avatar} alt="" width={100} />,
    },
    {
      key: "borrowedDate",
      dataIndex: "borrowedDate",
      title: "Ngày mượn",
      render: (borrowedDate) => dayjs(borrowedDate).format("DD/MM/YYYY"),
    },
    {
      key: "returnDate",
      dataIndex: "returnDate",
      title: "Ngày trả",
      render: (returnDate) => dayjs(returnDate).format("DD/MM/YYYY"),
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Trạng thái",
      render: (status) => {
        return status === 0
          ? "Đang xử lý"
          : status === 1
          ? "Đã cho mượn"
          : status === 2
          ? "Đã trả"
          : "Đã bị huỷ";
      },
    },
    {
      key: "id",

      render: (_, e) => (
        <>
          <div className="flex justify-center gap-2 items-center ">
            <Button
              color="success"
              type="primary"
              disabled={e.status !== 2}
              className="bg-green-500 hover:bg-green-700"
              onClick={() => handleOpen(e.productId)}
            >
              Đánh giá
            </Button>
            <Button
              danger
              onClick={() => handleDelete(e.id)}
              disabled={e.status !== 0}
            >
              Huỷ
            </Button>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <HeaderComp />
      <Modal
        title="Viết đánh giá"
        open={open}
        onCancel={handleClose}
        onOk={handleSubmit(onSubmit)}
      >
        <p>
          {selectComment
            ? "Cuốn sách đã đánh giá nên sẽ ghi đè lên đánh giá trước"
            : ""}
        </p>
        <Form layout="vertical" className=" w-full">
          <Controller
            name="score"
            control={control}
            defaultValue={selectComment?.score || 1}
            render={({ field }) => {
              console.log(selectComment?.score);
              return <Rate {...field} />;
            }}
          />
          {errors.score && <p>{errors.score.message}</p>}
          <Controller
            name="content"
            control={control}
            defaultValue={selectComment?.content || ""}
            render={({ field }) => (
              <Form.Item
                label="Nội dung"
                validateStatus={errors.content ? "error" : ""}
                help={errors.content?.message}
              >
                <Input.TextArea
                  {...field}
                  placeholder="Viết đánh giá"
                  name="content"
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>

      <main className=" bg-slate-50">
        <div className="container mx-auto px-2 xl:px-0 max-w-5xl py-8">
          <div className="bg-white p-4 rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Lịch sử mượn sách</h1>

            <Table columns={columns} dataSource={orders} pagination={false} />
            <div className="flex justify-center mt-4">
              <Pagination
                showSizeChanger
                current={currentPage}
                onShowSizeChange={onShowSizeChange}
                onChange={(page) => handleChangePage(page)}
                total={totalPage}
                locale={{ items_per_page: "/ trang" }}
              />
            </div>
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};

export default HistoryPage;

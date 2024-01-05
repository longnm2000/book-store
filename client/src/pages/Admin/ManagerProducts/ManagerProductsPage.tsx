import React, { useState } from "react";
import { useAllProducts } from "../../../hooks/product";
import type { ColumnsType } from "antd/es/table";
import { BookInfo } from "../../../types/types";
import { Button, Modal, Pagination, PaginationProps, Table } from "antd";
import {
  DeleteOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
} from "@ant-design/icons";
import "../ManagerOrders/ManagerOrdersPage.css";
import dayjs from "dayjs";
import { axiosConfig } from "../../../api/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ManagerProductsPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<BookInfo>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState(10);
  const { products, isLoading, xTotalCount } = useAllProducts(
    currentPage,
    limit
  );

  const navigate = useNavigate();
  const { confirm } = Modal;

  const columns: ColumnsType<BookInfo> = [
    {
      title: "#",
      key: "id",
      render: (_, record, index) => index + limit * (currentPage - 1) + 1,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: (value: string) => <img src={value} alt="Avatar" width={100} />,
    },
    {
      title: "Tên",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thể loại",
      dataIndex: "type",
      key: "type",
      render: (value) => value.name,
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            className="bg-blue-500 hover:bg-blue-700"
            onClick={() => handleOpenModal(record)}
          >
            Xem
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Xoá
          </Button>
        </div>
      ),
    },
  ];

  const handleOpenModal = (item: BookInfo) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    console.log(item);
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    _,
    pageSize
  ) => {
    setLimit(pageSize);
  };

  const handleChangePage = (selectPage: number) => {
    setCurrentPage(selectPage);
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
      onOk() {
        try {
          axiosConfig.delete("/products/" + id);
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

  return (
    <>
      <h1 className=" font-semibold text-2xl mb-4">Quản Lý Sản Phẩm</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Button
            onClick={() => navigate("/admin/products/add")}
            type="primary"
            className="bg-green-500 hover:bg-green-700"
          >
            Thêm
          </Button>
          <Table
            columns={columns}
            dataSource={products.map((product) => ({
              ...product,
              key: product.id,
            }))}
            pagination={false}
          />
          <div className="flex justify-center mt-4">
            <Pagination
              showSizeChanger
              current={currentPage}
              onShowSizeChange={onShowSizeChange}
              onChange={(page) => handleChangePage(page)}
              total={xTotalCount}
            />
          </div>
          <Modal
            title="Chi tiết sản phẩm"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <table>
              <tbody className="modal-table">
                <tr>
                  <th>ID:</th>
                  <td>{selectedItem?.id}</td>
                </tr>
                <tr>
                  <th>Hình Ảnh:</th>
                  <td>
                    <img src={selectedItem?.avatar} alt="Avatar" width={100} />
                  </td>
                </tr>
                <tr>
                  <th>Tên:</th>
                  <td>{selectedItem?.title}</td>
                </tr>
                <tr>
                  <th>Thể loại:</th>
                  <td>{selectedItem?.type.name}</td>
                </tr>
                <tr>
                  <th>Tác giả</th>
                  <td>{selectedItem?.author}</td>
                </tr>
                <tr>
                  <th>Số lượng:</th>
                  <td>{selectedItem?.quantity}</td>
                </tr>
                <tr>
                  <th>Nhà xuất bản</th>
                  <td>{selectedItem?.publisher}</td>
                </tr>
                <tr>
                  <th>Nhà cung cấp</th>
                  <td>{selectedItem?.supplier}</td>
                </tr>
                <tr>
                  <th>Ngôn ngữ</th>
                  <td>{selectedItem?.language}</td>
                </tr>
                <tr>
                  <th>Số lượng</th>
                  <td>{selectedItem?.quantity}</td>
                </tr>
                <tr>
                  <th>Cân nặng</th>
                  <th>{selectedItem?.weight}</th>
                </tr>
                <tr>
                  <th>Kích thước</th>
                  <th>{selectedItem?.dimensions}</th>
                </tr>
                <tr>
                  <th>Năm xuất bản</th>
                  <td>{selectedItem?.releaseDate}</td>
                </tr>
                <tr>
                  <th>Hình thức</th>
                  <td>{selectedItem?.format}</td>
                </tr>
                <tr>
                  <th>Số trang</th>
                  <td>{selectedItem?.numberOfPages}</td>
                </tr>
                <tr>
                  <th>Ngày thêm</th>
                  <td>{dayjs(selectedItem?.createAt).format("DD/MM/YYYY")}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <p style={{ fontWeight: "bold" }}>Miêu tả:</p>
              <p>{selectedItem?.description}</p>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default ManagerProductsPage;

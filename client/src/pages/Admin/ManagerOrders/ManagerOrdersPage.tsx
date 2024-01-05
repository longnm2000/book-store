import React, { useState } from "react";
import { useAllOrders } from "../../../hooks/order";
import {
  Button,
  Pagination,
  PaginationProps,
  Table,
  Modal,
  Select,
  Input,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { OrderInfo } from "../../../types/types";
import "./ManagerOrdersPage.css";
import dayjs from "dayjs";
import { ExclamationCircleFilled, EyeOutlined } from "@ant-design/icons";
import { changeStatusOrder } from "../../../api/order";
import { toast } from "react-toastify";
import { SearchProps } from "antd/es/input";

const ManagerOrdersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedOrder, setSelectedOrder] = useState<OrderInfo>();
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");
  const [searchInfo, setSearchInfo] = useState("");
  const { orders, isLoading, xTotalCount, fetchAllOrders } = useAllOrders(
    searchInfo,
    status,
    limit
  );

  const { confirm } = Modal;

  const onSearch: SearchProps["onSearch"] = (value) => setSearchInfo(value);

  const handleOpenModal = (order: OrderInfo) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleChange = (value: string, id: number) => {
    confirm({
      title: "Bạn có chắc muốn thay đổi trạng thái không?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        try {
          await changeStatusOrder(id, Number(value));
          fetchAllOrders(searchInfo, status);
          toast.success("Thay đổi trạng thái thành công");
        } catch (error) {
          toast.error("Có lỗi xảy ra");
          console.log(error);
        }
      },
    });
  };

  const columns: ColumnsType<OrderInfo> = [
    {
      title: "#",
      dataIndex: "",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã Khách Hàng",
      dataIndex: "user",
      key: "user",
      render: (_, record) => record.user.id,
    },
    {
      title: "Khách hàng",
      dataIndex: "user",
      key: "user",
      render: (_, record) => record.user.name,
    },
    {
      title: "Sách",
      dataIndex: "product",
      key: "product",
      render: (_, record) => record.product.title,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createAt",
      key: "createAt",
      render: (_, record) => dayjs(record.createAt).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        switch (status) {
          case 0:
            return <p className=" capitalize font-semibold">Đang xử lý</p>;
          case 1:
            return (
              <p className=" capitalize font-semibold text-yellow-500">
                Đã cho mượn
              </p>
            );
          case 2:
            return (
              <p className=" capitalize font-semibold text-green-500">
                Đã trả sách
              </p>
            );
          default:
            return (
              <p className=" capitalize font-semibold text-red-500">Đã huỷ</p>
            );
        }
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "id",
      render: (_, record) => (
        <div className="flex gap-4 flex-col">
          <Button
            type="primary"
            className=" bg-blue-500 hover:bg-blue-700 text-white"
            icon={<EyeOutlined />}
            onClick={() => handleOpenModal(record)}
          >
            Xem
          </Button>

          <Select
            defaultValue={record.status.toString()}
            disabled={record.status === 3 || record.status === 2}
            style={{ width: 120 }}
            onChange={(value) => handleChange(value, record.id)}
            options={[
              {
                value: "0",
                label: "Đang Xử Lý",
                disabled:
                  record.status === 1 ||
                  record.status === 2 ||
                  record.status === 3,
              },
              {
                value: "1",
                label: "Đã Cho Mượn",
                disabled: record.status === 3 || record.status === 2,
              },
              {
                value: "2",
                label: "Đã Trả Sách",
                disabled: record.status === 3 || record.status === 2,
              },
              {
                value: "3",
                label: "Đã Huỷ",
                disabled:
                  record.status === 3 ||
                  record.status === 1 ||
                  record.status === 2,
              },
            ]}
          />
        </div>
      ),
    },
  ];

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    _,
    pageSize
  ) => {
    setLimit(pageSize);
  };

  const handleChangePage = (selectPage: number) => {
    setCurrentPage(selectPage);
  };
  return (
    <>
      {isLoading ? (
        <p className="text-center">Đang tải</p>
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className=" font-semibold text-2xl mb-4">Quản lý mượn sách</h1>
            <div className="flex gap-2 ">
              {" "}
              {/* <Input.Search
                className=" max-w-xs"
                onSearch={onSearch}
                placeholder="Nhập thông tin tìm kiếm"
                loading={isLoading}
              /> */}
              <Select
                style={{ width: 120 }}
                value={status}
                onChange={(value) => setStatus(value)}
                options={[
                  {
                    value: "",
                    label: "Tất cả",
                  },
                  {
                    value: "0",
                    label: "Đang xử lý",
                  },
                  {
                    value: "1",
                    label: "Đã cho mượn",
                  },
                  {
                    value: "2",
                    label: "Đã trả sách",
                  },
                  {
                    value: "3",
                    label: "Đã huỷ",
                  },
                ]}
              />
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={orders.map((order) => ({
              ...order,
              key: order.id,
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
            title="Thông Tin Chi Tiết"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <table className="w-full">
              <tbody>
                <tr className="modal-table">
                  <th>Mã Đơn Hàng</th>
                  <td>{selectedOrder?.id}</td>
                </tr>
                <tr className="modal-table">
                  <th>Mã Khách Hàng</th>
                  <td>{selectedOrder?.user.id}</td>
                </tr>
                <tr className="modal-table">
                  <th>Tên Khách Hàng</th>
                  <td>{selectedOrder?.user.name}</td>
                </tr>
                <tr className="modal-table">
                  <th>Mã Sách</th>
                  <td>{selectedOrder?.product.id}</td>
                </tr>
                <tr className="modal-table">
                  <th>Tên Sách</th>
                  <td>{selectedOrder?.product.title}</td>
                </tr>
                <tr className="modal-table">
                  <th>Trạng Thái</th>
                  <td>
                    {selectedOrder?.status === 0
                      ? "Đang xử lý"
                      : selectedOrder?.status === 1
                      ? "Đã cho mượn"
                      : selectedOrder?.status === 2
                      ? "Đã trả sách"
                      : "Đã huỷ"}
                  </td>
                </tr>
                <tr className="modal-table">
                  <th>Ngày Mượn</th>
                  <td>
                    {dayjs(selectedOrder?.borrowedDate).format("DD/MM/YYYY")}
                  </td>
                </tr>
                <tr className="modal-table">
                  <th>Ngày Trả</th>
                  <td>
                    {dayjs(selectedOrder?.returnDate).format("DD/MM/YYYY")}
                  </td>
                </tr>
              </tbody>
            </table>
          </Modal>
        </>
      )}
    </>
  );
};

export default ManagerOrdersPage;

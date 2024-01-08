import React, { useEffect, useState } from "react";

import { Button, Modal, Pagination, PaginationProps, Table, Input } from "antd";
import { useGetAllUsers } from "../../../hooks/user";
import type { ColumnsType } from "antd/es/table";
import { User } from "../../../types/types";
import { axiosConfig } from "../../../api/config";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { SearchProps } from "antd/es/input";
import { Helmet } from "react-helmet";

const ManagerUser: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchInfo, setSearchInfo] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("asc");
  const [limit, setLimit] = useState(10);
  const { allUsers, fetchAllUsers, xTotalCount, isLoading } = useGetAllUsers(
    searchInfo,
    currentPage,
    limit
  );

  const { confirm } = Modal;
  const handleLockUser = async (userId: number, status: boolean) => {
    try {
      await axiosConfig.patch(`/users/${userId}`, { isLock: status });
      fetchAllUsers();
      toast.success(!status ? "Đã mở khoá tài khoản" : "Đã khoá tài khoản");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      console.log(error);
    }
  };
  const handleChangePage = (selectPage: number) => {
    setCurrentPage(selectPage);
  };
  const onSearch: SearchProps["onSearch"] = (value) => setSearchInfo(value);
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    _,
    pageSize
  ) => {
    setLimit(pageSize);
  };
  useEffect(() => {
    fetchAllUsers();
  }, [currentPage, searchInfo, orderBy, limit]);
  console.log(currentPage, allUsers);

  const showConfirm = (id: number, value: boolean) => {
    confirm({
      title: value
        ? "Bạn có muốn khoá tài khoản này không?"
        : "Bạn có muốn mở khoá tài khoản này không?",
      icon: <ExclamationCircleFilled />,

      onOk() {
        handleLockUser(id, value);
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: {
        style: { backgroundColor: "blue" },
      },
      okText: "Xác nhận",
      cancelText: "Huỷ",
      cancelButtonProps: {
        danger: true,
      },
    });
  };

  const columns: ColumnsType<User> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ảnh Đại Diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string) =>
        text ? <img src={text} alt="Avatar" width={100} /> : <></>,
    },
    {
      title: "Số Điện Thoại",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Trạng Thái",
      key: "isLock",
      dataIndex: "isLock",
      render: (_, value) => (
        <>
          {value.isLock === false ? (
            <Button
              type="primary"
              className=" bg-green-500 hover:bg-green-700 text-white"
              onClick={() => showConfirm(value.id, !value.isLock)}
            >
              Mở
            </Button>
          ) : (
            <Button danger onClick={() => showConfirm(value.id, !value.isLock)}>
              Khoá
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Quản lý người dùng</title>
      </Helmet>

      <div className="flex justify-between flex-wrap mb-4">
        <h1 className=" font-semibold text-2xl mb-4">Quản lý người dùng</h1>
        <Input.Search
          className=" max-w-xs"
          onSearch={onSearch}
          placeholder="Nhập thông tin tìm kiếm"
          loading={isLoading}
        />
      </div>
      {isLoading ? (
        <p className="text-center">Đang tải</p>
      ) : (
        <Table
          columns={columns}
          style={{ overflowX: "auto" }}
          dataSource={allUsers.map((user) => ({
            ...user,
            key: user.id,
          }))}
          locale={{ emptyText: "Không tìm đc kết quả" }}
          pagination={false}
        />
      )}
      <div className="flex justify-center mt-4">
        <Pagination
          showSizeChanger
          current={currentPage}
          onShowSizeChange={onShowSizeChange}
          onChange={(page) => handleChangePage(page)}
          total={xTotalCount}
          locale={{ items_per_page: "/ trang" }}
        />
      </div>
    </>
  );
};

export default ManagerUser;

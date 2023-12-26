import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Table } from "antd";
import { useGetAllUsers } from "../../../hooks/user";
import type { ColumnsType } from "antd/es/table";
import { User } from "../../../types/types";
import { axiosConfig } from "../../../axios/config";
const { Header, Sider, Content } = Layout;

const ManagerUser: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { allUsers, fetchAllUsers } = useGetAllUsers();
  const handleLockUser = (userId: number, status: boolean) => {
    console.log(userId, status);
    axiosConfig.patch(`/users/${userId}`, { isLock: status });
    fetchAllUsers();
  };
  const columns: ColumnsType<User> = [
    {
      title: "#",
      dataIndex: "id",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string) =>
        text ? <img src={text} alt="Avatar" width={100} /> : <></>,
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Status",
      key: "isLock",
      dataIndex: "isLock",
      render: (_, value) => (
        <>
          <Button onClick={() => handleLockUser(value.id, !value.isLock)}>
            {value.isLock === false ? "Unlock" : "Lock"}
          </Button>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Quản lý người dùng",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Quản lý mượn sách",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Quản lý sách",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Table
            columns={columns}
            dataSource={allUsers}
            pagination={{ pageSize: 5 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerUser;

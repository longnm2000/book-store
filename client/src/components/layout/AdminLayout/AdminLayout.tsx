import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { act_setAdmin } from "../../../redux/action";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [selectedKey, setSelectKey] = useState("");

  useEffect(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case "/admin/users":
        setSelectKey("1");
        break;
      case "/admin/products":
        setSelectKey("2");
        break;
      case "/admin/orders":
        setSelectKey("3");
        break;
      case "/admin/products/add":
        setSelectKey("2");
        break;
      default:
        setSelectKey("3");
        break;
    }
  }, [location.pathname]);

  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dispatch = useDispatch();
  const loginItems: MenuProps["items"] = [
    {
      key: "3",
      label: <a>Đăng xuất</a>,
      onClick: () => {
        handleLogout();
      },
    },
  ];
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const handleLogout = () => {
    dispatch(
      act_setAdmin({
        id: -1,
        name: "",
        email: "",
        phone: "",
        avatar: "",
        isLock: false,
      })
    );
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    toast.success("Đăng xuất thành công");
    navigate("/admin/login");
  };
  const currentAdmin = useSelector((state: any) => state.admin);
  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <img src="" alt="" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Quản lý người dùng",
              onClick: () => {
                setSelectKey("1");
                navigate("/admin/users");
              },
            },
            {
              key: "2",
              icon: <BookOutlined />,
              label: "Quản lý sản phẩm",
              onClick: () => {
                setSelectKey("2");
                navigate("/admin/products");
              },
            },
            {
              key: "3",
              icon: <UnorderedListOutlined />,
              label: "Quản lý mượn sách",
              onClick: () => {
                setSelectKey("3");
                navigate("/admin/orders");
              },
            },
          ]}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
        }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-between items-center pe-4">
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
            <Dropdown
              menu={{ items: loginItems }}
              className="cursor-pointer"
              trigger={["click"]}
            >
              <div className="flex items-center gap-4">
                <Avatar
                  size={45}
                  src={currentAdmin?.avatar}
                  alt={currentAdmin?.name}
                  icon={currentAdmin?.name ? null : <UserOutlined />}
                >
                  {currentAdmin?.name.charAt(0)}
                </Avatar>
                <p>{currentAdmin?.name}</p>
              </div>
            </Dropdown>
          </div>
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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

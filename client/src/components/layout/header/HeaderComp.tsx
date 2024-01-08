import logo from "../../../assets/logo.jfif";
import React, { useState } from "react";
import { Avatar, Layout, theme, Dropdown, Drawer, Button } from "antd";
const { Header } = Layout;
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { act_setUser } from "../../../redux/action";
import { axiosConfig } from "../../../api/config";

const HeaderComp: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentUser = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    dispatch(
      act_setUser({
        id: -1,
        name: "",
        email: "",
        phone: "",
        avatar: "",
        isLock: false,
        role: "",
      })
    );
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    toast.success("Đăng xuất thành công");
  };

  // if (currentUser.id) {
  //   try {
  //     const response = await axiosConfig.get("/users/" + currentUser.id);
  //     if (response.data?.isLock === true) {
  //       toast.error("Tài khoản đã bị khoá");
  //       handleLogout();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const loginItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/profile">Trang cá nhân</Link>,
    },
    {
      key: "2",
      label: <Link to="/history">Lịch sử mượn sách</Link>,
    },
    {
      key: "3",
      label: <a>Đăng xuất</a>,
      onClick: () => {
        handleLogout();
      },
    },
  ];
  const logoutItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/login">Đăng nhập</Link>,
    },
    {
      key: "2",
      label: <Link to="/register">Đăng ký</Link>,
    },
  ];
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <div className="hidden md:block h-full">
        <div className=" flex items-center justify-between h-full container mx-auto">
          <div className="flex items-center justify-center gap-4">
            <Link to={"/"}>
              <img src={logo} alt="logo" width={40} height={40} />
            </Link>
            <Link to={"/search"}>Danh mục sản phẩm</Link>
          </div>

          {currentUser?.name ? (
            <Dropdown
              menu={{ items: loginItems }}
              className="cursor-pointer"
              trigger={["click"]}
            >
              <div className="flex items-center gap-4">
                <Avatar
                  size={45}
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  icon={currentUser?.name ? null : <UserOutlined />}
                  className=" capitalize"
                >
                  {currentUser?.name.charAt(0)}
                </Avatar>
                <p className="truncate max-w-32">{currentUser?.name}</p>
              </div>
            </Dropdown>
          ) : (
            <Dropdown
              menu={{ items: logoutItems }}
              className="cursor-pointer"
              trigger={["click"]}
            >
              <div className="flex items-center gap-4">
                <Avatar size={45} icon={<UserOutlined />} />
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="h-full md:hidden">
        <div className=" flex items-center justify-between px-3 h-full container mx-auto">
          <div className="flex items-center justify-center gap-4">
            <Link to={"/"}>
              <img src={logo} alt="logo" width={40} height={40} />
            </Link>
            <Button onClick={showDrawer} icon={<MenuOutlined />}></Button>
          </div>
          <Drawer title="Menu" placement="right" open={open} onClose={onClose}>
            <div>
              <Link to={"/search"}>Danh mục sản phẩm</Link>
            </div>
          </Drawer>
          {currentUser?.name ? (
            <Dropdown
              menu={{ items: loginItems }}
              className="cursor-pointer"
              trigger={["click"]}
            >
              <div className="flex items-center gap-4">
                <Avatar
                  size={45}
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  icon={currentUser?.name ? null : <UserOutlined />}
                  className=" capitalize"
                ></Avatar>
              </div>
            </Dropdown>
          ) : (
            <Dropdown
              menu={{ items: logoutItems }}
              className="cursor-pointer"
              trigger={["click"]}
            >
              <div className="flex items-center gap-4">
                <Avatar size={45} icon={<UserOutlined />} />
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComp;

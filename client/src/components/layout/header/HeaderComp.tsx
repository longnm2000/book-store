import logo from "../../../assets/logo.jfif";
import React from "react";
import { Avatar, Layout, theme, Dropdown } from "antd";
const { Header } = Layout;
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { act_setUser } from "../../../redux/action";

const HeaderComp: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentUser = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(
      act_setUser({
        id: -1,
        name: "",
        email: "",
        phone: "",
        avatar: "",
        isLock: false,
      })
    );
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    toast.success("Đăng xuất thành công");
  };

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

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <div className="flex items-center justify-between h-full container mx-auto">
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
              >
                {currentUser?.name.charAt(0)}
              </Avatar>
              <p className="truncate w-30">{currentUser?.name}</p>
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
    </Header>
  );
};

export default HeaderComp;

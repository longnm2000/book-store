// import { Link } from "react-router-dom";
import logo from "../../assets/logo.jfif";
// const HeaderComp: React.FC = () => {
//   return (
//     <>
//       <header className="bg-white">
//         <div className="container mx-auto">
//           <div className="flex items-center justify-between">
//             <Link to={"/"}>
//               <img src={logo} alt="Logo" width={60} />
//             </Link>
//             <form className=" w-1/2">
//               <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
//                 Search
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                   <svg
//                     className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                     />
//                   </svg>
//                 </div>
//                 <input
//                   type="search"
//                   id="default-search"
//                   className=" outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Tìm kiếm sách"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                   Search
//                 </button>
//               </div>
//             </form>

//             <div className="flex gap-2">
//               <div className="flex flex-col items-center justify-self-center">
//                 <i className="fa-regular fa-bell"></i>
//                 <p>Thông báo</p>
//               </div>
//               <div className="flex flex-col items-center justify-self-center">
//                 <i className="fa-regular fa-user"></i>
//                 <p>Tài khoản</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };
// export default HeaderComp;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { Link } from "react-router-dom";
import Swal, { SweetAlertOptions } from "sweetalert2";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setAnchorElNav(null);
    Swal.fire({
      title: "Đăng xuất thành công",
      timer: 2000,
      icon: "success",
    } as SweetAlertOptions);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let currentUser: User | null = null;
  if (localStorage.getItem("user")) {
    currentUser = JSON.parse(localStorage.getItem("user") || "");
  }

  return (
    <AppBar position="sticky" sx={{ background: "white", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Link to={"/"}>
            <img
              src={logo}
              alt=""
              width={50}
              className=" hidden md:inline-block"
            />
          </Link>
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography>Danh mục sản phẩm</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <img src={logo} alt="" width={50} className="md:hidden" />
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to="/search"
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Danh mục sản phẩm
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={currentUser?.name || ""} src="ewqewq" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {currentUser ? (
                <>
                  <MenuItem onClick={handleLogout}>
                    <Typography>Đăng xuất</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to="/login"
                  >
                    <Typography>Đăng Nhập</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to="/register"
                  >
                    <Typography>Đăng Ký</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

function PrivateUserRoutes() {
  const isUser = jwtDecode(localStorage.getItem("accessToken") || "");

  return isUser ? <Navigate to={"/"} /> : <Outlet />;
}

export default PrivateUserRoutes;

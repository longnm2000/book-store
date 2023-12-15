import { Navigate, Outlet } from "react-router-dom";

function PrivateUserRoutes() {
  const isUser = localStorage.getItem("accessToken") || "";

  return isUser ? <Navigate to={"/"} /> : <Outlet />;
}

export default PrivateUserRoutes;

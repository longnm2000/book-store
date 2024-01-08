import { Navigate, Outlet } from "react-router-dom";

function PrivateAdminRoutes() {
  const hasAdmin =
    localStorage.getItem("adminToken") && localStorage.getItem("admin");

  return hasAdmin ? <Outlet /> : <Navigate to={"admin/login"} />;
}

export default PrivateAdminRoutes;

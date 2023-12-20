import { Navigate, Outlet } from "react-router-dom";

function NotSignedIn() {
  const hasUser =
    localStorage.getItem("accessToken") && localStorage.getItem("user");

  return hasUser ? <Navigate to={"/"} /> : <Outlet />;
}

export default NotSignedIn;

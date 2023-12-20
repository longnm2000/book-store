import { Navigate, Outlet } from "react-router-dom";

function SignedIn() {
  const hasUser =
    localStorage.getItem("accessToken") && localStorage.getItem("user");

  return hasUser ? <Outlet /> : <Navigate to={"/login"} />;
}

export default SignedIn;

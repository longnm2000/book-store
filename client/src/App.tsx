import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import { useEffect } from "react";
import RegisterPage from "./pages/Register/RegisterPage";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import DetailPage from "./pages/Detail/DetailPage";
import SearchPage from "./pages/SearchProduct/SearchPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import { ToastContainer } from "react-toastify";
import NotSignedIn from "./components/PrivateUserRoutes/NotSignedIn";
import SignedIn from "./components/PrivateUserRoutes/SignedIn";
import HistoryPage from "./pages/History/HistoryPage";
import LoginAdminPage from "./pages/Admin/Login/LoginAdminPage";
import ManagerUser from "./pages/Admin/ManagerUser/ManagerUser";
import ManagerOrdersPage from "./pages/Admin/ManagerOrders/ManagerOrdersPage";
import AdminLayout from "./components/layout/AdminLayout/AdminLayout";
import ManagerProductsPage from "./pages/Admin/ManagerProducts/ManagerProductsPage";
import AddProductPage from "./pages/Admin/AddProduct/AddProductPage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import UpdateProductPage from "./pages/Admin/UpdateProduct/UpdateProductPage";
import CategoriesManagement from "./pages/Admin/CategoriesManagement/CategoriesManagement";
import PrivateAdminRoutes from "./components/PrivateAdminRoutes/PrivateAdminRoutes";

function App() {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, [navigate]);
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<NotSignedIn />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<SignedIn />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route element={<PrivateAdminRoutes />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="orders" element={<ManagerOrdersPage />} />
            <Route path="users" element={<ManagerUser />} />
            <Route path="products" element={<ManagerProductsPage />} />
            <Route path="products/add" element={<AddProductPage />} />
            <Route path="products/update/:id" element={<UpdateProductPage />} />
            <Route path="categories" element={<CategoriesManagement />} />
          </Route>
        </Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/admin/login" element={<LoginAdminPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

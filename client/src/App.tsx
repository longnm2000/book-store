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
        autoClose={5000}
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

        <Route path="/admin/login" element={<LoginAdminPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

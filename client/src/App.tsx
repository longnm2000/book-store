import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import { useEffect } from "react";

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
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;

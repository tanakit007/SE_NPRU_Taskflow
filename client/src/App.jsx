import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import Navbar from "./components/Navbar"; // นำเข้า Navbar
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  return (
    <div data-theme="light" className="min-h-screen pt-16">
      {" "}
      {/* เพิ่ม pt-16 เพื่อไม่ให้ Navbar ทับเนื้อหา */}
      <Navbar /> {/* ใส่ Navbar ไว้ตรงนี้เพื่อให้โชว์ทุกหน้า */}
      <Routes>
        <Route
          path="/"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;

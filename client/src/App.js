import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdDetail from "./pages/Ad/AdDetail";
import Layout from "./components/layouts/Layout";
import { AuthProvider } from "./context/AuthContext";
import { themeChange } from "theme-change";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/ad/:avertissementId" element={<AdDetail />} />
  </Routes>
);

const App = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <AuthProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthProvider>
  );
};

export default App;

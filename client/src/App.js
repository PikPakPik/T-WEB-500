import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdDetail from "./pages/Ad/AdDetail";
import Layout from "./components/layouts/Layout";
import { AuthProvider } from "./context/AuthContext";
import { themeChange } from "theme-change";
import NoFound from "./pages/NoFound";
import Profile from "./pages/Profile/Profile";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const ProtectedRoute = ({ element, fallback }) => {
    const { user } = useAuth();
    return user ? element : fallback;
  };
  
  const GuestRoute = ({ element, fallback }) => {
    const { user } = useAuth();
    return !user ? element : fallback;
  };

  useEffect(() => {
    themeChange(false);
  }, []);
  

  return (
    <AuthProvider>
      <Layout>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<GuestRoute element={<Login />} redirectTo={<Home />} />} />
          <Route path="/register" element={<GuestRoute element={<Register />} redirectTo={<Home />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} redirectTo={<Home />} />} />
          <Route path="/ad/:avertissementId" element={<AdDetail />} />
          <Route path="*" element={<NoFound />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;

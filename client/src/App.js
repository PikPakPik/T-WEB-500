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
import AdminIndex from "./pages/Admin/Index";

const App = () => {
  const ProtectedRoute = ({ element, fallback }) => {
    const { user } = useAuth();
    return user ? element : fallback;
  };
  
  const GuestRoute = ({ element, fallback }) => {
    const { user } = useAuth();
    return !user ? element : fallback;
  };

  const UltraProtectedRoute = ({ element, fallback }) => {
    const { user } = useAuth();
    return user && user.isSuperman ? element : fallback;
  };

  useEffect(() => {
    themeChange(false);
  }, []);
  

  return (
    <AuthProvider>
      <Layout>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<GuestRoute element={<Login />} redirectTo={<NoFound />} />} />
          <Route path="/register" element={<GuestRoute element={<Register />} redirectTo={<NoFound />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} redirectTo={<NoFound />} />} />
          <Route path="/ad/:avertissementId" element={<AdDetail />} />
          <Route path="/admin" element={<UltraProtectedRoute element={<AdminIndex />} redirectTo={<NoFound />} />}>
            
          </Route>
          <Route path="*" element={<NoFound />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;

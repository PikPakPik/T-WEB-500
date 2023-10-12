import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layouts/Layout";
import { themeChange } from 'theme-change'
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from './context/AuthContext'
import AdDetail from "./pages/Ad/AdDetail";

function App() {

  useEffect(() => {
    themeChange(false)
  }, [])
  return (
    <>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ad/:avertissementId" element={<AdDetail />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default App;

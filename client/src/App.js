import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layouts/Layout";
import { themeChange } from 'theme-change'
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  useEffect(() => {
    themeChange(false)
  }, [])
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

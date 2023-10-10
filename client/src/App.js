import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layouts/Layout";
import { themeChange } from 'theme-change'
import { useEffect } from "react";

function App() {

  useEffect(() => {
    themeChange(false)
  }, [])
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

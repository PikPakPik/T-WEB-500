import React from "react";
import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <div className="m-5">
      <Header />
      {children}
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;

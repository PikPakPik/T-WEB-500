import React from "react";
import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      <Header />
      {children}
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;

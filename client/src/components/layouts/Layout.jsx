import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* En-tête de l'application */}
      <Header />

      {/* Contenu principal, qui est injecté via la prop 'children' */}
      <div className="flex-grow">{children}</div>

      {/* Conteneur pour les notifications toast */}
      <ToastContainer />

      {/* Pied de page de l'application */}
      <Footer />
    </div>
  );
};

export default Layout;

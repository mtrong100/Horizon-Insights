import React from "react";
import { AuthProvider } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import ButtonScrollTop from "../buttons/ButtonScrollTop";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
      <Footer />
      <ButtonScrollTop />
    </AuthProvider>
  );
};

export default MainLayout;

import React from "react";
import { AuthProvider } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import ButtonScrollTop from "../buttons/ButtonScrollTop";

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

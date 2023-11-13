import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ButtonScrollTop from "./ButtonScrollTop";
import { AuthProvider } from "../context/AuthContext";
import { Outlet } from "react-router-dom";

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

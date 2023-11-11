import React from "react";
import Header from "./Header";
import Home from "../pages/Home";
import Footer from "./Footer";
import ButtonScrollTop from "./ButtonScrollTop";
import { AuthProvider } from "../context/AuthContext";

const MainLayout = () => {
  return (
    <AuthProvider>
      <Header />
      <Home />
      <Footer />
      <ButtonScrollTop />
    </AuthProvider>
  );
};

export default MainLayout;

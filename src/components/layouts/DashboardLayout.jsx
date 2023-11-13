import React from "react";
import { AuthProvider } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";

const DashboardLayout = () => {
  return (
    <AuthProvider>
      <section className="relative flex items-start ">
        <Sidebar />
        <main className="p-5 w-full">
          <Outlet />
        </main>
      </section>
    </AuthProvider>
  );
};

export default DashboardLayout;

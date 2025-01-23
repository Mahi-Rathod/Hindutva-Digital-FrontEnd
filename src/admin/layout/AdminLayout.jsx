import React from "react";
import Navbar from "../../component/navbar/Navbar.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../../component/footer/Footer.jsx";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex pt-11">
        <Sidebar />
        <div className="flex-grow ml-20">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

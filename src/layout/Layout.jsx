import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../component/navbar/Navbar";
import Footer from "../component/footer/Footer";
import Sidebar from "../admin/sidebar/Sidebar";

function Layout() {
  // const [isNavbarLoaded, setIsNavbarLoaded] = useState(false);

  const isAdmin = useSelector((state) => state.auth.isAdmin);

  // const handleNavbarAnimationComplete = () => {
  //   setIsNavbarLoaded(true); // Set to true after Navbar animation finishes
  // };

  return (
    <>
      {/* Navbar with animation handler */}
      <Navbar/>

      {/* Render content only after Navbar is fully loaded */}
        <div className={`${isAdmin ? "flex" : ""}`}>
          {/* Admin-specific Sidebar */}
          {isAdmin && <Sidebar />}

          {/* Main Content Area */}
          <div className={`flex-grow ${isAdmin ? "p-4" : ""} max-w-[1488px] m-auto`}>
            <Outlet />
          </div>
        </div>

      {/* Footer for public layout */}
      {!isAdmin && <Footer />}
    </>
  );
}

export default Layout;

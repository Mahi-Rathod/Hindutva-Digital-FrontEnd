import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../component/navbar/Navbar";
import Footer from "../component/footer/Footer";
import Sidebar from "../admin/sidebar/Sidebar";

function Layout() {
  const [isNavbarLoaded, setIsNavbarLoaded] = useState(false);

  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleNavbarAnimationComplete = () => {
    setIsNavbarLoaded(true); // Set to true after Navbar animation finishes
  };

  return (
    <>
      {/* Navbar with animation handler */}
      <Navbar onAnimationComplete={handleNavbarAnimationComplete} />

      {/* Render content only after Navbar is fully loaded */}
      {isNavbarLoaded && (
        <div className={`mt-[3.8rem] ${isAdmin ? "flex" : ""}`}>
          {/* Admin-specific Sidebar */}
          {isAdmin && <Sidebar />}

          {/* Main Content Area */}
          <div className={`flex-grow ${isAdmin ? "p-4" : ""}`}>
            <Outlet />
          </div>
        </div>
      )}

      {/* Footer for public layout */}
      {!isAdmin && isNavbarLoaded && <Footer />}
    </>
  );
}

export default Layout;


// {
// // !isAdmin &&
//   <div className='mt-[3.8rem]'>
//     <Outlet />
//   </div>
// }
// {
//   isAdmin &&
//   <div className="flex">
//     <Sidebar />
//     <div className="flex-grow p-4">
//       <Outlet />
//     </div>
//   </div>
// }
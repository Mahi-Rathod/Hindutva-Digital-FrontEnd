import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutSuccess } from "../../redux/slices/authSlice"
import axios from "axios";
import { BsBoxArrowRight, BsFillSignpostSplitFill } from "react-icons/bs";
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaUsersCog, FaLock } from "react-icons/fa";
import { IoAnalyticsSharp, IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icons: <MdDashboard className="text-2xl" /> },
    { name: "Posts Management", path: "/admin/posts-management", icons: <BsFillSignpostSplitFill className="text-2xl" /> },
    { name: "Categories", path: "/admin/categories", icons: <MdCategory className="text-2xl" /> },
    { name: "Users Management", path: "/admin/user-management", icons: <FaUsersCog className="text-2xl" /> },
    { name: "Analytics", path: "/admin/analytics", icons: <IoAnalyticsSharp className="text-2xl" /> },
    { name: "Settings", path: "/admin/settings", icons: <IoSettingsOutline className="text-2xl" /> },
  ];
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/user`,
    withCredentials: true
  });

  const handleLogout = async () => {
    const res = await axiosInstance.post('/sign-out');
    if (res.status === 200) {
      dispatch(logoutSuccess());
    }
  }

  const handleSidebar = () => {
    console.log(isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className={`fixed w-64 bg-[#0b2852] text-white min-h-screen z-[999] top-[3.7rem] ${isSidebarOpen ? 'left-0' : ' -left-[11rem]'} pr-4 transition-ease duration-500`}>
      {isSidebarOpen ? (
        <div className="p-4 text-lg font-bold flex items-center justify-between">
          Admin Panel
          <BsBoxArrowRight className="rotate-180 cursor-pointer" onClick={handleSidebar} />
        </div>
      ) :
        (<div className="p-4 text-lg font-bold flex items-center justify-end">
          <BsBoxArrowRight className="cursor-pointer" onClick={handleSidebar} />
        </div>)
      }
      <ul className="space-y-2">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={
              ({ isActive }) => `block px-4 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"} flex items-center gap-5
              ${isSidebarOpen ? 'flex-row justify-start' : 'flex-row-reverse justify-between'}`}
          >
            {link.icons} {link.name}
          </NavLink>
        ))}
        <li className={`px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-5 ${isSidebarOpen ? 'flex-row justify-start' : 'flex-row-reverse justify-between'}`} onClick={handleLogout}>
          <FaLock className="text-2xl" /> Logout
        </li>
      </ul>
    </div>
  )
};

export default Sidebar;

import { Outlet } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="">
        <Sidebar />
        <div className="flex-grow ml-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

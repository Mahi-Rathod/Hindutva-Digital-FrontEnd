import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar.jsx";
import ButtonLoader from "../../component/utils/wifiLoader/ButtonLoader.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";

const AdminLayout = () => {
  const { loading } = useSelector((state) => state.auth);

  if (loading) return <ButtonLoader />;

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

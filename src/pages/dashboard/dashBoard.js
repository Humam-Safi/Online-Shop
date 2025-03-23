import { Outlet } from "react-router-dom";
import SideBar from "../../components/dashboard/SideBar";
import TopBar from "../../components/dashboard/TopBar";
import "./dashboard.css";

const DashBoard = () => {
  return (
    <div className="posatin-relative ">
      <TopBar />
      <div className="dashboard d-flex gap-1" style={{marginTop : "70px"} } >
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;

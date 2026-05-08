import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          flex: 1,
          padding: "35px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
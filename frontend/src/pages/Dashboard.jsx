import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";

function DashboardLayout() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

      {/* FIXED NAVBAR */}
      <Navbar />

      {/* SCROLLABLE CONTENT */}
      <div
        style={{
          flex: 1,               // takes remaining height
          overflowY: "auto",     // ONLY THIS SCROLLS
          padding: "16px",
          background: "#f8f9fa"
        }}
      >
        <Outlet />
      </div>

    </div>
  );
}

export default DashboardLayout;

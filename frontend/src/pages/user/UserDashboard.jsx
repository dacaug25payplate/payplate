import { Outlet } from "react-router-dom";

import Header from "../user/UserLayout/header";
import SideNav from "../user/UserLayout/sidenavbar";
import Footer from "../user/UserLayout/footer";

function UserDashboard() {
  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      {/* FIXED HEADER */}
      <Header />

      {/* BODY */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* OPTIONAL SIDENAV */}
        {/* <SideNav /> */}

        {/* SCROLLABLE CONTENT */}
        <main
          className="flex-grow-1 p-4 bg-light"
          style={{ overflowY: "auto" }}   // ✅ THIS IS THE KEY
        >
          <Outlet />
        </main>
      </div>

      {/* FIXED FOOTER */}
      <Footer />
    </div>
  );
}

export default UserDashboard;

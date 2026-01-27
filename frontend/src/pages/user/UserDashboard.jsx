import { Outlet } from "react-router-dom";

import Header from "../user/UserLayout/header";
import SideNav from "../user/UserLayout/sidenavbar";
import Footer from "../user/UserLayout/footer";

function UserDashboard() {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />

      <div className="d-flex flex-grow-1">
        <SideNav />
        <main className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default UserDashboard;

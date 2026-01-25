import { Outlet } from "react-router-dom";
import Header from "../admin/AdminLayout/header";
import SideNav from "../admin/AdminLayout/sidenavbar";
import Footer from "../admin/AdminLayout/footer";

function CookDashboard() {
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

export default CookDashboard;

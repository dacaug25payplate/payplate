import { Outlet } from "react-router-dom";
import Footer from "./AdminLayout/footer";
import Header from "./AdminLayout/header";
import SideNav from "./AdminLayout/sidenavbar";

function AdminDashboard() {
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

export default AdminDashboard;

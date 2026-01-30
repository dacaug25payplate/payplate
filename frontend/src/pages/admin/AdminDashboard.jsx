import { Outlet } from "react-router-dom";
import Footer from "./AdminLayout/footer";
import Header from "./AdminLayout/header";
import SideNav from "./AdminLayout/sidenavbar";

function AdminDashboard() {
  return (
    <div className="vh-100 d-flex flex-column overflow-hidden">
      <Header />

      <div className="flex-grow-1 d-flex overflow-hidden">
        <SideNav />

        <main className="flex-grow-1 p-4 bg-light overflow-auto">
          <Outlet />
        </main>

      </div>

      <Footer />
    </div>
  );
}

export default AdminDashboard;

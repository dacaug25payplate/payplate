import { Outlet } from "react-router-dom";

import Header from "../cook/CookLayout/header";
import SideNav from "../cook/CookLayout/sidenavbar";
import Footer from "../cook/CookLayout/footer";

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

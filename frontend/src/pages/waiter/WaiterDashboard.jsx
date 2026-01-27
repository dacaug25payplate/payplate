import { Outlet } from "react-router-dom";

import Footer from "../waiter/WaiterLayout/footer";
import Header from "../waiter/WaiterLayout/header";
import SideNav from "../waiter/WaiterLayout/sidenavbar";

function WaiterDashboard() {
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

export default WaiterDashboard;

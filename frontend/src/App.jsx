import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import WaiterDashboard from "./pages/waiter/WaiterDashboard";
import CookDashboard from "./pages/cook/CookDashboard";
import Navbar from "./pages/Navbar";
import Order from "./pages/admin/order";
import StaffRegister from "./pages/admin/staffRegister";
import AddMenu from "./pages/admin/AddMenu";
import Viewmenu from "./pages/admin/viewMenu";
import AddDiscount from "./pages/admin/addDiscount";
import Viewfeedback from "./pages/admin/viewfeedback";

const AuthLayoutWithNavbar = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const DashboardLayout = () => <Outlet />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayoutWithNavbar />,
    children: [
      { index: true, element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgetpassword", element: <ForgetPassword /> },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "user", element: <UserDashboard /> },
      { path: "cook", element: <CookDashboard /> },
      { path: "waiter", element: <WaiterDashboard /> }
    ]
  },
  {
    path: "/admin",
    element: <AdminDashboard />, // ✅ layout ONLY
    children: [
      // { index: true, element: <Dashboard /> },
      { path: "/admin/createStaff", element: <StaffRegister/> },
      { path: "/admin/addmenu", element: <AddMenu /> },
      { path: "/admin/viewmenu", element: <Viewmenu/> },
      { path: "/admin/adddiscount", element: <AddDiscount /> },
      { path: "/admin/viewfeedbacks", element: <Viewfeedback /> },
    ]
  },
  {
    path: "/admin",
    element: <AdminDashboard />, // ✅ layout ONLY
    children: [
      // { index: true, element: <Dashboard /> },
      { path: "/admin/order", element: <Order /> },
      // { path: "billing", element: <Billing /> },
      // { path: "menu", element: <Menu /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

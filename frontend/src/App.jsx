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
import Viewmenu from "./pages/admin/viewMenu";
import AddDiscount from "./pages/admin/addDiscount";
import Viewfeedback from "./pages/admin/viewfeedback";
<<<<<<< HEAD
import AddMenu from "./pages/AddMenu";
=======
import StaffList from "./pages/admin/staffList";
import StaffRegister from "./pages/admin/staffRegister";
import AddMenu from "./pages/admin/AddMenu"
>>>>>>> b0c01b1949121124848cdb6f02dd4c7f7b161532

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
    path: "/admin",
    element: <AdminDashboard />,
    children: [
<<<<<<< HEAD
      // { index: true, element: <Dashboard /> },
      { path: "/admin/createStaff", element: <StaffRegister/> },
      { path: "/admin/addmenu", element: <AddMenu /> },
=======
      // { index: true, element: <Dashboard /> }, 
      { path: "/admin/createStaff", element: <StaffList/> },
       { path: "/admin/addStaff", element: <StaffRegister/> },
       { path: "/admin/addmenu", element: <AddMenu /> },
>>>>>>> b0c01b1949121124848cdb6f02dd4c7f7b161532
      { path: "/admin/viewmenu", element: <Viewmenu/> },
      { path: "/admin/adddiscount", element: <AddDiscount /> },
      { path: "/admin/viewfeedbacks", element: <Viewfeedback /> },
    ]
  },
  {
    path: "/cook",
    element: <CookDashboard />,
    children: [
      { path: "/cook/viewmenu", element: <Viewmenu /> }
    ]
  },
  {
    path: "/waiter",
    element: <WaiterDashboard />,
    children: [
      { path: "/waiter/viewmenu", element: <Viewmenu /> }
    ]
  },
  {
    path: "/user",
    element: <UserDashboard />,
    children: [
      { path: "/user/viewmenu", element: <Viewmenu /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

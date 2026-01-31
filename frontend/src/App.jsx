
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
import StaffList from "./pages/admin/staffList";
import StaffRegister from "./pages/admin/staffRegister";
import AddMenu from "./pages/admin/AddMenu"
import UserViewmenu from "./pages/user/UserViewMenu";

const AuthLayoutWithNavbar = () => (
  <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"   // 🔒 disables scrolling
      }}
    >
      <Navbar />

      <main
        style={{
          flex: 1,
          padding: "16px",
          backgroundColor: "#f8f9fa"
        }}
      >
        <Outlet />
      </main>
      
    </div>
);

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
       { index: true, element: <Viewmenu /> }, 
      { path: "/admin/createStaff", element: <StaffList/> },
       { path: "/admin/addStaff", element: <StaffRegister/> },
       { path: "/admin/addmenu", element: <AddMenu /> },
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
       { index: true, element: <UserViewmenu /> },
      { path: "/user/viewmenu", element: <UserViewmenu /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

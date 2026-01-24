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
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/user", element: <UserDashboard /> },
      { path: "/cook", element: <CookDashboard /> },
      { path: "/waiter", element: <WaiterDashboard /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

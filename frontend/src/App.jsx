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
<<<<<<< HEAD
import AddMenu from "./pages/addMenu";

function App() {
  return (
    <BrowserRouter>
    <Navbar/> {/*Navbar*/} 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/addMenu" element={<AddMenu />} />

        <Route path="/admin" element={
          <ProtectedRoute role="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/user" element={
          <ProtectedRoute role="User">
            <UserDashboard />
          </ProtectedRoute>
        } />

        <Route path="/waiter" element={
          <ProtectedRoute role="Waiter">
            <WaiterDashboard />
          </ProtectedRoute>
        } />

        <Route path="/cook" element={
          <ProtectedRoute role="Cook">
            <CookDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
=======
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
>>>>>>> c375c3d49ffd68eb9efeea76a6cda92744c411a4
}

export default App;

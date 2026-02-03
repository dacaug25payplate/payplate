import React,{useEffect,useState} from "react";
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
import AdminViewFeedbacks from "./pages/admin/AdminViewFeedbacks";
import StaffList from "./pages/admin/staffList";
import StaffRegister from "./pages/admin/staffRegister";
import AddMenu from "./pages/admin/AddMenu"
import UserViewmenu from "./pages/user/UserViewMenu";
import ViewOrder from "./pages/cook/ViewOrder";
import UserViewOrder from "./pages/user/UserViewOrder";
import AdminViewOrders from "./pages/admin/AdminViewOrders";
import WaiterViewMenu from "./pages/waiter/WaiterViewMenu";
import OrderList from "./pages/waiter/OrderList";
import UserProfile from "./pages/UserProfile";
import ViewBill from "./pages/user/ViewBill";
import AddFeedback from "./pages/user/AddFeedback"

/* 🔔 CENTER TOAST */
import CenterToast from "./pages/CenterToast";
import { registerToast } from "./Services/toastrService";

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
      { path: "/admin/viewfeedbacks", element: <AdminViewFeedbacks /> },
      { path: "/admin/vieworders", element: <AdminViewOrders /> },
    ]
  },
  {
    path: "/cook",
    element: <CookDashboard />,
    children: [
       { index: true, element: <ViewOrder /> }, 
      { path: "/cook/vieworder", element: <ViewOrder /> }
    ]
  },
  {
    path: "/waiter",
    element: <WaiterDashboard />,
    children: [
      { index: true, element: <OrderList /> },
      { path: "/waiter/orderlist", element: <OrderList /> },
      { path: "/waiter/viewmenu", element: <WaiterViewMenu /> },
      { path: "/waiter/userprofile", element: <UserProfile /> }
    ]
  },
  {
    path: "/user",
    element: <UserDashboard />,
    children: [
       { index: true, element: <UserViewmenu /> },
       {path : "/user/vieworder",element : <UserViewOrder/>},
      { path: "/user/viewmenu", element: <UserViewmenu /> },
      { path: "/user/viewbill/:orderId", element: <ViewBill /> },
      { path: "/user/addfeedback/:orderId", element: <AddFeedback /> }

    ]
  }
]);

function App() {
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: ""
  });

  useEffect(() => {
    registerToast((type, message) => {
      setToast({
        show: true,
        type,
        message
      });
    });
  }, []);

  return (
    <>
      {/* ROUTER */}
      <RouterProvider router={router} />

      {/* CENTER TOAST MODAL */}
      <CenterToast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() =>
          setToast(prev => ({ ...prev, show: false }))
        }
      />
    </>
  );
}

export default App;

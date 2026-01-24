import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";

import ProtectedRoute from "./pages/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import WaiterDashboard from "./pages/waiter/WaiterDashboard";
import CookDashboard from "./pages/cook/CookDashboard";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar/> {/*Navbar*/} 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/admin" element={< AdminDashboard />} />
        <Route path="/user" element={< UserDashboard />} />
        <Route path="/waiter" element={< WaiterDashboard />} />
        <Route path="/cook" element={< CookDashboard/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

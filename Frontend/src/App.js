
import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import ForgetPasswordComponent from './components/ForgetPasswordComponent';
import Header from './components/HeaderComponent';

function App() {
  return (

    <>
      <Header/>
      <Outlet/>
    </>
    // <BrowserRouter>
    //   <Routes> 
    //     <Route path="/" element={<RegisterComponent />} />
    //     <Route path="/login" element={<LoginComponent />} />
    //     <Route path="/forgetpassword" element={<ForgetPasswordComponent />} />
    //     <Route path="/header" element={<Header />} />
    //   </Routes>  
    // </BrowserRouter>
  );
}

export default App;

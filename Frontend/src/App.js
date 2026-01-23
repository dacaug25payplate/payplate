
import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import ForgetPasswordComponent from './components/ForgetPasswordComponent';
import Header from './components/HeaderComponent';

function App() {
  return (
<<<<<<< HEAD

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
=======
    <BrowserRouter>
      <Routes> 
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/" element={<LoginComponent />} />
        <Route path="/forgetpassword" element={<ForgetPasswordComponent />} />
      </Routes>  
    </BrowserRouter>
>>>>>>> d9e786654b0dcaf9538b676f6c5d3c02c1dabece
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import ForgetPasswordComponent from './components/ForgetPasswordComponent';


function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/" element={<LoginComponent />} />
        <Route path="/forgetpassword" element={<ForgetPasswordComponent />} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;

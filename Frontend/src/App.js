import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;

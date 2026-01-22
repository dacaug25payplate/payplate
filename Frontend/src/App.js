import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComponent from './components/RegisterComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<RegisterComponent />} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;

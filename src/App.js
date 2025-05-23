import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KeukuLoginPage from './components/authLogin/KeukuLoginPage';
import RegisterPage from './components/authRegister/RegisterPage';
import LupaPasswordPage from './components/authLupaPassword/LupaPasswordPage'; // Tambahan ini

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KeukuLoginPage />} />
        <Route path="/login" element={<KeukuLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lupa-password" element={<LupaPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;

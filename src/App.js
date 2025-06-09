import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KeukuLoginPage from './components/authLogin/KeukuLoginPage';
import RegisterPage from './components/authRegister/RegisterPage';
import LupaPasswordPage from './components/authLupaPassword/LupaPasswordPage';
import CatatTransaksi, { InputDesign } from './components/catatTransaksi/InputDesign';
import TentangKeuku, { AboutPage } from './components/tentangKeuku/AboutPage';
import StatistikPage from './components/statistikPage/StatistikPage';
import DashboardPage from './components/DashboardPage/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KeukuLoginPage />} />
        <Route path="/login" element={<KeukuLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lupa-password" element={<LupaPasswordPage />} />
        <Route path="/catat-transaksi" element={<InputDesign />} />
        <Route path="/tentang-keuku" element={<AboutPage />} />
        <Route path="/statistik" element={<StatistikPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;

// GANTI SEMUA ISI App.js DENGAN INI
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Impor komponen Layout
import MainLayout from './layouts/MainLayout';

// Impor semua halaman dengan PATH LENGKAP & BENAR
import KeukuLoginPage from './pages/authLogin/KeukuLoginPage';
import RegisterPage from './pages/authRegister/RegisterPage';
import LupaPasswordPage from './pages/authLupaPassword/LupaPasswordPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import CatatTransaksi from './pages/catatTransaksi/CatatTransaksi';
import StatistikPage from './pages/statistikPage/StatistikPage';
import AboutPage from './pages/tentangKeuku/AboutPage';
import AuthStatusPage from './pages/authStatus/AuthStatusPage'; // Halaman untuk status otorisasi Google Sheets
// import PengaturanPage from './pages/pengaturanPage/PengaturanPage'; // Ini di-comment dulu sampai filenya ada

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Grup 1: Halaman-halaman yang TIDAK PAKAI sidebar */}
        <Route path="/" element={<KeukuLoginPage />} />
        <Route path="/login" element={<KeukuLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lupa-password" element={<LupaPasswordPage />} />

        {/* Halaman untuk status otorisasi Google Sheets */}
        <Route path="/auth-status" element={<AuthStatusPage />} />

        {/* Grup 2: Halaman-halaman YANG PAKAI sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/catat-transaksi" element={<CatatTransaksi />} />
          <Route path="/statistik" element={<StatistikPage />} />
          <Route path="/tentang-keuku" element={<AboutPage />} />
          {/* <Route path="/pengaturan" element={<PengaturanPage />} /> */}
        </Route>

        {/* Halaman "404 Not Found" untuk path yang tidak ada */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
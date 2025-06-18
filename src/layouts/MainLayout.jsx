// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

const MainLayout = () => {
  return (
    // Pembungkus utama, tidak berubah
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* ================== PERBAIKAN DI SINI ================== */}
      {/* Tambahkan 'overflow-x-hidden' pada div pembungkus konten utama */}
      <div className="ml-80 flex-grow flex flex-col overflow-x-hidden">
        
        <main className="flex-grow p-8">
          <Outlet />
        </main>
        
        <footer className="py-6 px-8 text-center text-sm text-gray-600 bg-gray-100">
          © 2025 Keuku by Indah. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
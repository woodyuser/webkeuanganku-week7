// src/pages/authStatus/AuthStatusPage.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AuthStatusPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const message = queryParams.get('message');

  useEffect(() => {
    // Logika untuk menangani status (misal: tampilkan pesan, lalu redirect ke dashboard)
    if (status === 'success') {
      console.log('Otorisasi berhasil!');
      // alert('Otorisasi Google Sheets berhasil!'); // Mungkin munculkan alert atau toast
      // setTimeout(() => { window.close(); }, 1000); // Tutup tab jika ini dibuka di tab baru
      // atau redirect ke halaman utama aplikasi setelah beberapa detik
      // window.opener.location.reload(); // Refresh halaman parent jika ini pop-up
    } else {
      console.error('Otorisasi gagal:', message);
      // alert(`Otorisasi Google Sheets gagal: ${message}`);
    }
    // Pastikan untuk menghapus query params setelah diproses
    // window.history.replaceState({}, document.title, window.location.pathname);
  }, [status, message]);

  return (
    <div>
      <h2>Status Otorisasi Google Sheets</h2>
      {status === 'success' ? (
        <p className="text-green-600">Otorisasi berhasil! Anda bisa menutup jendela ini.</p>
      ) : (
        <p className="text-red-600">Otorisasi gagal: {message}</p>
      )}
      <p>Silakan kembali ke aplikasi utama.</p>
    </div>
  );
}
export default AuthStatusPage;
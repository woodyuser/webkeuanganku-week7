// src/components/KeukuLoginPage.jsx

"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios'; // Import axios

function KeukuLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State nomorhandphone kita biarkan saja, tapi tidak akan dipakai untuk login
  const [nomorhandphone, setNomorHandphone] = useState(""); 
  
  const navigate = useNavigate(); // Hook untuk redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // --- INI LOGIKA LOGIN YANG KITA TAMBAHKAN ---
    try {
      // 1. Kirim email dan password ke endpoint login
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password
      });

      // 2. Jika berhasil, ambil token dari respons
      const token = response.data.access_token;

      // 3. BAGIAN PALING PENTING: Simpan token ke Local Storage browser
      // Ini akan jadi "tiket masuk" untuk semua halaman yang butuh login
      localStorage.setItem('authToken', token);

      // 4. Beri notifikasi dan arahkan ke dashboard
      alert('Login berhasil!');
      navigate('/dashboard'); // Pastikan kamu punya rute untuk /dashboard

    } catch (error) {
      // 5. Jika gagal (misal: password salah), beri notifikasi error
      if (error.response && error.response.status === 401) {
        alert('Login Gagal: Email atau password salah.');
      } else {
        alert('Terjadi kesalahan pada server. Coba lagi nanti.');
      }
      console.error("Login error:", error);
    }
  };

  return (
    // ... Seluruh kode JSX-mu dari <main> sampai </main> tidak perlu diubah ...
    // ... Kamu bisa copy-paste bagian itu ke sini ...
    <main className="flex justify-center items-center pt-20 pb-20 min-h-screen w-full bg-white max-sm:p-5">
      <div className="flex flex-col gap-44 items-center w-full max-w-[647px]">
        <section className="flex flex-col gap-10 items-center p-16 w-full rounded-md border border-gray-400 border-solid shadow-md max-md:px-8 max-md:py-10 max-sm:px-5 max-sm:py-8">
          <header className="flex gap-11 justify-between items-center w-full max-md:flex-col max-md:gap-5 max-md:text-center">
            <div className="flex flex-col flex-1 gap-5 max-md:items-center">
              <h1 className="text-2xl font-medium leading-5 text-gray-900 uppercase max-sm:text-xl">
                WELCOME TO KEUKU - KEUANGANKU
              </h1>
              <p className="text-base leading-5 text-gray-500 max-sm:text-sm">
                Catat dan Kelola Keuanganmu dengan Mudah
              </p>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c322d1863b0faca31d8b89eb04414b2fce88515c"
              className="shrink-0 h-[41px] w-[41px]"
              alt="Logo"
            />
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center w-full">
            <p className="text-base leading-5 text-gray-500">
              Masukan Email dan Password Anda
            </p>
            <div className="flex flex-col gap-5 w-full">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid border-neutral-500 border-opacity-70 outline-none max-sm:px-5 max-sm:py-4"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid border-neutral-500 border-opacity-70 outline-none max-sm:px-5 max-sm:py-4"
              />
              {/* Input nomor HP tidak diperlukan untuk login, bisa kamu hapus dari JSX jika mau */}
              <input
                type="tel"
                placeholder="Nomor Handphone"
                value={nomorhandphone}
                onChange={(e) => setNomorHandphone(e.target.value)}
                className="px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid border-neutral-500 border-opacity-70 outline-none max-sm:px-5 max-sm:py-4"
              />
              <button
                type="submit"
                className="h-14 text-xl font-semibold text-white rounded-md cursor-pointer bg-neutral-800 flex items-center justify-center"
              >
                SIGN IN
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-2.5 items-center">
            <Link
              to="/lupa-password"
              className="text-base text-gray-500 underline cursor-pointer hover:text-gray-700"
            >
              Lupa Password
            </Link>
            <p className="text-base text-gray-500">
              Belum Punya Akun?{" "}
              <Link
                to="/register"
                className="underline cursor-pointer hover:text-gray-700"
              >
                Register Now
              </Link>
            </p>
          </div>
        </section>
        <footer className="text-base text-center text-gray-500">
          © 2025 Keuku by Indah. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

export default KeukuLoginPage;
// src/components/RegisterPage.jsx

"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

// Kita asumsikan kamu punya komponen header dan footer ini
import WelcomeHeader from "./WelcomeHeader"; 
import Footer from "./Footer";

function RegisterPage() {
  // State yang dibutuhkan untuk registrasi
  const [email, setEmail] = useState("");
  const [nomorhandphone, setNomorHandphone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate();

  // Fungsi untuk menangani submit form registrasi
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi password di frontend
    if (password !== confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    try {
      // Mengirim data ke API registrasi di backend
      await axios.post('http://127.0.0.1:8000/api/register', {
        email: email,
        nomor_handphone: nomorhandphone,
        password: password,
        password_confirmation: confirmPassword,
      });

      alert('Registrasi berhasil! Anda akan diarahkan ke halaman login.');
      navigate('/login'); // Arahkan ke halaman login setelah registrasi sukses

    } catch (error) {
      // Menangani error dari backend (misal: email sudah terdaftar)
      if (error.response && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
        alert('Registrasi gagal:\n' + errorMessages);
      } else {
        alert('Terjadi kesalahan pada server. Coba lagi nanti.');
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <main className="flex justify-center items-center pb-20 min-h-screen w-full bg-white max-sm:p-5">
      <div className="flex flex-col gap-10 items-center w-full max-w-[647px] mt-10 max-sm:gap-12">
        <section className="flex flex-col gap-10 items-center p-16 w-full rounded-md border border-gray-400 border-solid shadow-md max-md:px-8 max-md:py-10 max-sm:px-5 max-sm:py-8">
          
          {/* Menggunakan komponen header yang sudah ada */}
          <WelcomeHeader
            title="BUAT AKUN BARU DI KEUKU"
            subtitle="Mulai kelola keuanganmu sekarang juga"
          />

          {/* Form Registrasi */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center w-full">
            <div className="flex flex-col gap-5 w-full">
              {/* Ini bisa kamu ganti dengan komponen InputDesign.jsx jika mau */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid border-neutral-500 border-opacity-70 outline-none max-sm:px-5 max-sm:py-4"
              />
              <input
                type="tel"
                placeholder="Nomor Handphone"
                value={nomorhandphone}
                onChange={(e) => setNomorHandphone(e.target.value)}
                required
                className="px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid border-neutral-500 border-opacity-70 outline-none max-sm:px-5 max-sm:py-4"
              />
              <input
                type="password"
                placeholder="Password (min. 8 karakter)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid border-neutral-500 border-opacity-70 outline-none max-sm:px-5 max-sm:py-4"
              />
              <input
                type="password"
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid border-neutral-500 border-opacity-70 outline-none max-sm:px-5 max-sm:py-4"
              />
              
              <button
                type="submit"
                className="h-14 text-xl font-semibold text-white rounded-md cursor-pointer bg-neutral-800 flex items-center justify-center"
              >
                REGISTER
              </button>
            </div>
          </form>

          {/* Link ke halaman Login */}
          <p className="text-base text-gray-500">
            Sudah Punya Akun?{" "}
            <Link to="/login" className="underline cursor-pointer hover:text-gray-700">
              Login Now
            </Link>
          </p>
        </section>

        {/* Menggunakan komponen footer yang sudah ada */}
        <Footer />
      </div>
    </main>
  );
}

export default RegisterPage;
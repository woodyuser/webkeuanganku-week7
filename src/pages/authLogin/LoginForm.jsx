// src/components/LoginForm.jsx
"use client";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nomorhandphone, setNomorHandphone] = useState(""); // Pastikan state ini ada
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nomorhandphone }), // Pastikan nomorhandphone dikirim jika diperlukan backend
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Login gagal.");
      } else {
        setMsg(data.message || "Login berhasil.");
        // Anda bisa tambahkan redirect atau localStorage di sini jika login berhasil
      }

    } catch (err) {
      setMsg("Terjadi kesalahan saat login.");
    }
  };

  return (
    <section className="flex flex-col gap-5 items-center w-full">
      <p className="text-base leading-5 text-gray-500">
        Masukan Email dan Password Anda
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-neutral-500 border-opacity-70"
          aria-label="Email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-neutral-500 border-opacity-70"
          aria-label="Password"
          required
        />
        {/* >>>>>> INI ADALAH INPUT NOMOR HANDPHONE <<<<<< */}
        <input
          type="tel" // <<< PASTIKAN type="tel"
          placeholder="Nomor Handphone"
          value={nomorhandphone}
          onChange={(e) => setNomorHandphone(e.target.value)}
          className="px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-neutral-500 border-opacity-70"
          aria-label="Nomor Handphone"
          required
        />
        {/* >>>>>> AKHIR INPUT NOMOR HANDPHONE <<<<<< */}
        <button
          type="submit"
          className="w-full h-14 text-xl font-semibold text-white rounded-md bg-neutral-800"
        >
          SIGN IN
        </button>
      </form>
      {msg && (
        <p className="text-sm text-red-500 mt-2">{msg}</p>
      )}

      <button className="text-base leading-5 text-gray-500 underline cursor-pointer">
        Lupa Password
      </button>
    </section>
  );
};

export default LoginForm;
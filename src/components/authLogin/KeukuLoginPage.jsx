"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";  // <-- import Link

function KeukuLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };

  return (
    <main className="flex justify-center items-center pb-20 min-h-screen w-full bg-white max-sm:p-5">
      <div className="flex flex-col gap-44 items-center w-full max-w-[647px]">
        {/* Login Card */}
        <section className="flex flex-col gap-10 items-center p-16 w-full rounded-md border border-gray-400 border-solid shadow-md max-md:px-8 max-md:py-10 max-sm:px-5 max-sm:py-8">
          {/* Header Section */}
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

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center w-full">
            <p className="text-base leading-5 text-gray-500">
              Masukkan Email dan Password Anda
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
              <button
                type="submit"
                className="h-14 text-xl font-semibold text-white rounded-md cursor-pointer bg-neutral-800 flex items-center justify-center"
              >
                SIGN IN
              </button>
            </div>
          </form>

          {/* Footer Links */}
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

        {/* Copyright Footer */}
        <footer className="text-base text-center text-gray-500">
          © 2025 Keuku by Indah. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

export default KeukuLoginPage;

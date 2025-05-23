"use client";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", { email, password });
  };

  return (
    <section className="flex flex-col gap-5 items-center w-full">
      <p className="text-base leading-5 text-gray-500">
        Masukkan Email dan Password Anda
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
        <button
          type="submit"
          className="w-full h-14 text-xl font-semibold text-white rounded-md bg-neutral-800"
        >
          SIGN IN
        </button>
      </form>
      <button className="text-base leading-5 text-gray-500 underline cursor-pointer">
        Lupa Password
      </button>
      
    </section>
  );
};

export default LoginForm;

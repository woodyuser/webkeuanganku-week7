"use client";
import React from "react";

const LoginHeader = () => {
  return (
    <header className="flex gap-11 justify-between items-center w-full max-sm:flex-col max-sm:gap-5">
      <div className="flex flex-col gap-5 items-start">
        <h1 className="text-2xl font-medium leading-5 text-gray-900 uppercase max-sm:text-xl">
          WELCOME TO KEUKU - KEUANGANKU
        </h1>
        <p className="text-base leading-5 text-gray-500">
          Catat dan Kelola Keuanganmu dengan Mudah
        </p>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c322d1863b0faca31d8b89eb04414b2fce88515c"
        alt="Logo"
        className="w-[41px] h-[41px]"
      />
    </header>
  );
};

export default LoginHeader;

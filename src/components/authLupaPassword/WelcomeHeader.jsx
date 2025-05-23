import React from "react";

function WelcomeHeader() {
  return (
    <header className="flex gap-11 justify-between items-center w-full max-md:flex-col max-md:gap-5 max-md:text-center">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-medium leading-5 text-gray-900 uppercase max-sm:text-xl">
          WELCOME TO KEUKU - KEUANGANKU
        </h1>
        <p className="text-base leading-5 text-gray-500">
          Catat dan Kelola Keuanganmu dengan Mudah
        </p>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c322d1863b0faca31d8b89eb04414b2fce88515c"
        className="object-contain h-[41px] w-[41px] max-md:mx-auto max-md:my-0"
        alt="Logo"
      />
    </header>
  );
}

export default WelcomeHeader;

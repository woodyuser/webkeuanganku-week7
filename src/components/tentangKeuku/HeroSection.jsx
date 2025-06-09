import React from 'react';

export const HeroSection = () => {
  return (
    <section className="flex relative flex-col gap-9 items-center w-[799px]">
      <h1 className="relative self-stretch text-2xl font-medium leading-5 text-center uppercase text-neutral-800">
        KEUKU Atur Keuangan Pribadi dengan Mudah
      </h1>
      <p className="relative self-stretch text-base leading-6 text-center uppercase text-neutral-800">
        KEUKU adalah aplikasi manajemen keuangan pribadi berbasis Google Spreadsheet.
        Catat, pantau, dan analisis keuangan dengan mudah dalam satu dashboard sederhana.
      </p>
    </section>
  );
};

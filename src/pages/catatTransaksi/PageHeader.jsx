import React from 'react';

export const PageHeader = () => {
  const handleOpenSpreadsheet = () => {
    console.log('Open spreadsheet clicked');
    // Add spreadsheet opening functionality here
    window.open(
    'https://docs.google.com/spreadsheets/d/1blBKvMfDISgM1AA23lSL081wfQCnSSrWdRlpgGNpGGA/edit?gid=0#gid=0', 
    '_blank'
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-md:max-w-full">
      <h1 className="text-2xl font-medium leading-none uppercase text-neutral-800">
        Catat transaksi keuangan mu
      </h1>
      <p className="mt-8 text-base leading-6 text-center uppercase text-neutral-800 w-[772px] max-md:max-w-full">
        Pengguna mencatat transaksi manual di Google Spreadsheet
        berisi tanggal, nominal, kategori (belanja, transportasi),
        dan kartu (BCA, Permata), yang kemudian disinkronkan ke
        aplikasi sebagai data utama.
      </p>
      <button
        onClick={handleOpenSpreadsheet}
        className="flex gap-2.5 justify-center items-center py-1.5 mt-8 max-w-full bg-teal-800 hover:bg-teal-900 rounded-md min-h-[58px] w-[259px] max-md:w-full transition-colors duration-200"
      >
        <div className="flex gap-2.5 justify-center items-center min-h-12 w-[51px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/6785d75e11558de40da459c62175402d99d42fef?placeholderIfAbsent=true"
            className="object-contain w-6 aspect-square"
            alt="Spreadsheet icon"
          />
        </div>
        <span className="text-base leading-none uppercase text-slate-100">
          Buka spreadsheet
        </span>
      </button>
    </div>
  );
};

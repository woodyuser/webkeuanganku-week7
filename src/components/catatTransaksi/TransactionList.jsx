import React, { useMemo } from 'react';
import TransactionCard from './TransactionCard';
import { FilterControls } from './FilterControls';

const TransactionList = () => {
  // Pindahkan transactions ke dalam useMemo supaya arraynya gak berubah setiap render
  const transactions = useMemo(() => [
    {
      bankName: "Bank Permata",
      date: "2025-03-10",
      description: "Belanja bulanan",
      paymentMethod: "QRIS",
      amount: "- Rp250,000"
    },
    {
      bankName: "Bank Permata",
      date: "2025-03-10",
      description: "Belanja bulanan",
      paymentMethod: "QRIS",
      amount: "- Rp250,000"
    },
    {
      bankName: "Bank Permata",
      date: "2025-03-10",
      description: "Belanja bulanan",
      paymentMethod: "QRIS",
      amount: "- Rp250,000"
    },
    {
      bankName: "Bank Permata",
      date: "2025-03-10",
      description: "Belanja bulanan",
      paymentMethod: "QRIS",
      amount: "- Rp250,000"
    }
  ], []); // kosong karena data statis

  return (
    <main className="flex flex-col flex-1 items-center max-sm:ml-16">
      <div className="flex flex-col gap-8 items-start px-8 py-14 w-full max-w-[1026px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-8">
        <section className="flex flex-col gap-8 items-end w-full">
          <div className="flex flex-col gap-8 items-center w-full">
            <h1 className="text-2xl font-medium leading-5 text-center uppercase text-neutral-800 max-md:text-xl max-sm:text-lg">
              Catat transaksi keuangan mu
            </h1>
            <p className="w-full text-base leading-6 text-center uppercase max-w-[772px] text-neutral-800 max-md:text-sm max-sm:text-xs">
              Pengguna mencatat transaksi manual di Google Spreadsheet berisi
              tanggal, nominal, kategori (belanja, transportasi), dan kartu
              (BCA, Permata), yang kemudian disinkronkan ke aplikasi sebagai
              data utama.
            </p>
            <button
              className="flex gap-2.5 justify-center items-center px-0 py-1.5 bg-teal-800 rounded-md h-[58px] w-[259px] max-md:w-[220px] max-sm:w-full max-sm:h-[50px] hover:bg-teal-700 transition-colors"
              onClick={() => window.open('https://docs.google.com/spreadsheets', '_blank')}
            >
              <div className="flex gap-2.5 justify-center items-center h-12 flex-[shrink] w-[51px] max-sm:w-10 max-sm:h-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                     className="w-[24px] max-sm:w-[20px] h-[24px] max-sm:h-[20px] flex-shrink-0">
                  <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                        stroke="#EEF2F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 9H21" stroke="#EEF2F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21V9" stroke="#EEF2F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-base leading-5 uppercase flex-[shrink] text-slate-100 max-md:text-sm max-sm:text-xs">
                Buka spreadsheet
              </span>
            </button>
          </div>
          <FilterControls />
        </section>
        <section className="flex flex-col gap-5 items-start w-full">
          {transactions.map((transaction, index) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </section>
      </div>
      <footer className="gap-2.5 p-9 mt-auto w-full text-base leading-normal text-center text-gray-900 bg-zinc-300 h-[92px] max-md:text-sm max-sm:p-5 max-sm:text-xs max-sm:h-[60px]">
        © 2025 Keuku by Indah. All rights reserved.
      </footer>
    </main>
  );
};

export default TransactionList;

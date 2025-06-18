// src/components/TransactionCard.jsx
import React from 'react';

export const TransactionCard = ({ type, date, description, paymentMethod, amount, bankName, typeColor, typeBackgroundColor }) => {
  return (
    <div className="flex flex-wrap gap-10 justify-between items-center px-10 py-6 w-full bg-white shadow-md rounded-xl">
      <div className="flex flex-wrap gap-8 text-black min-w-60">
        <div className={`flex justify-center items-center w-32 h-16 rounded ${typeBackgroundColor}`}>
          {/* PERBAIKAN DI SINI: Ubah ukuran font dari text-lg menjadi text-base */}
          <span className={`font-bold ${typeColor} text-base`}>
            {type}
          </span>
        </div>
        <div className="flex flex-col min-w-60 w-[267px]">
          <h3 className="text-lg font-bold">{bankName}</h3>
          <time className="text-sm text-gray-600">{date}</time>
          <p className="mt-2 text-base">{description}</p>
          <div className="mt-2 text-base font-semibold text-green-600">{paymentMethod}</div>
        </div>
      </div>
      <div className="flex flex-col items-end text-lg min-h-20">
        <div className="mt-1 text-black font-semibold">{amount}</div>
      </div>
    </div>
  );
};
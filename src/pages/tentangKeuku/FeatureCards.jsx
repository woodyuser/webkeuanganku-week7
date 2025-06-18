import React from 'react';

export const FeatureCards = () => {
  return (
    <div className="flex flex-col gap-8 items-center w-full">
      <div className="flex gap-8 items-center justify-center w-full">
        <div className="relative shrink-0 flex items-center justify-center text-base text-center text-black uppercase bg-emerald-100 rounded-md h-[212px] !w-[427px] px-8 py-4"> {/* Tambah !w-[427px] */}
          Sinkronisasi otomatis dari spreadsheet
        </div>
        <div className="relative shrink-0 flex items-center justify-center text-base text-center text-black uppercase bg-sky-200 rounded-md h-[212px] !w-[427px] px-8 py-4"> {/* Tambah !w-[427px] */}
          Pantau semua kartu dalam satu tampilan
        </div>
      </div>

      <div className="flex gap-8 items-center justify-center w-full">
        <div className="relative flex items-center justify-center text-base text-center text-black uppercase bg-pink-300 rounded-md h-[212px] !w-[427px] px-8 py-4"> {/* Tambah !w-[427px] */}
          transaksi lengkap dan fleksibel
        </div>
        <div className="relative shrink-0 flex items-center justify-center text-base text-center text-black uppercase bg-orange-200 rounded-md h-[212px] !w-[427px] px-8 py-4"> {/* Tambah !w-[427px] */}
          Desain minimalis untuk pengalaman terbaik
        </div>
      </div>
    </div>
  );
};
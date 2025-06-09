import React from 'react';

export const FeatureCards = () => {
  return (
    <div className="flex relative flex-col gap-8 items-start self-stretch">
      <div className="flex relative gap-8 items-center self-stretch">
        <div className="relative shrink-0 flex items-center justify-center text-base text-center text-black uppercase bg-emerald-100 rounded-md h-[212px] w-[427px] px-28 py-24">
          Sinkronisasi otomatis dari spreadsheet
        </div>
        <div className="relative shrink-0 flex items-center justify-center text-base text-center text-black uppercase bg-sky-200 rounded-md h-[212px] w-[427px] px-24 py-20">
          Pantau semua kartu dalam satu tampilan
        </div>
      </div>
      <div className="flex relative gap-8 items-center self-stretch">
        <div className="relative flex items-center justify-center text-base text-center text-black uppercase bg-pink-300 rounded-md h-[212px] w-[427px] px-16 py-24">
          transaksi lengkap dan fleksibel
        </div>
        <div className="relative shrink-0 flex items-center justify-center text-base text-center text-black uppercase bg-orange-200 rounded-md h-[212px] w-[427px] px-20 py-24">
          Desain minimalis untuk pengalaman terbaik
        </div>
      </div>
    </div>
  );
};

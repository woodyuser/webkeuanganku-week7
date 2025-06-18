// src/components/CreditCard.jsx
"use client";
import React from "react";

export const CreditCard = ({
    bankName,
    cardNumber,
    cardHolder,
    expiry,
    chipIcon,
    networkIcon,
    expenseAmount,
    progressWidth = "50px",
    cardStyle, // Hapus nilai default di sini, karena akan datang dari MainContent
    customImageUrl // Tambahkan prop customImageUrl di sini
}) => {
    // Logika untuk latar belakang gambar kustom
    // Jika customImageUrl ada dan cardStyle (dari getCardStyleClass) adalah string kosong ('')
    // Maka gunakan gambar kustom, jika tidak, biarkan cardStyle (kelas Tailwind) yang bekerja.
    const cardBackgroundStyle = (customImageUrl && customImageUrl.startsWith('data:image')) && cardStyle === '' ? {
        backgroundImage: `url('${customImageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    } : {};

    return (
        <div className="grow shrink w-60 min-w-60">
            {/* Terapkan cardBackgroundStyle ke div ini */}
            <div
                className={`overflow-hidden px-4 py-4 w-full rounded-2xl max-w-[300px] shadow-[8px_9px_15px_rgba(0,0,0,0.05)] ${cardStyle}`}
                style={cardBackgroundStyle} // <--- PENERAPAN INLINE STYLE DI SINI
            >
                <div className="flex gap-5 justify-between text-base font-medium text-white whitespace-nowrap max-md:mr-1">
                    <div className="text-white font-poppins">{bankName}</div>
                    <img
                        src={chipIcon}
                        className="object-contain shrink-0 aspect-[0.83] w-[19px]"
                        alt="Chip"
                    />
                </div>
                <div className="flex gap-5 justify-between items-start mt-20 max-md:mt-10">
                    <div className="flex flex-col">
                        <div className="flex gap-10 self-start text-xs tracking-wide whitespace-nowrap">
                            <div className="text-white uppercase font-poppins">{cardHolder}</div>
                            <div className="text-right text-white font-poppins">{expiry}</div>
                        </div>
                        <div className="mt-2 text-base text-white tracking-[2.25px] font-poppins">
                            {cardNumber}
                        </div>
                    </div>
                    <img
                        src={networkIcon}
                        className="object-contain shrink-0 mt-3.5 rounded aspect-[1.43] w-[43px]"
                        alt="Network"
                    />
                </div>
            </div>
            <div className="mt-4 w-full">
                <div className="flex justify-between items-start w-full">
                    <div className="flex-1 shrink text-base leading-none basis-0 text-neutral-800 font-poppins">
                        Expenses this month
                    </div>
                    <div className="text-sm leading-none text-gray-500 font-poppins">
                        {expenseAmount}
                    </div>
                </div>
                <div className="mt-2 w-full">
                    <div className="flex flex-col items-start bg-blue-50 rounded-md max-md:pr-5">
                        <div
                            className="flex shrink-0 h-2 bg-blue-600 rounded-md"
                            style={{ width: progressWidth }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
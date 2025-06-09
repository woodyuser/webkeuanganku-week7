"use client";
import React from "react";

export const SummaryCard = ({
  title,
  amount,
  backgroundColor,
  textColor = "text-neutral-800",
}) => {
  return (
    <div className={`flex flex-col p-5 mt-5 w-full ${backgroundColor} rounded-md ${textColor}`}>
      <div className="w-full">
        <div className="text-base leading-none uppercase font-poppins">{title}</div>
        <div className="mt-5 text-2xl font-medium leading-none font-poppins">{amount}</div>
      </div>
      <div className="flex gap-1.5 justify-center items-start self-end mt-5 text-sm leading-none">
        <div className="font-poppins">Lihat Detail</div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/cf4ad87df5164a3a706cf552e51641151de06ea0?placeholderIfAbsent=true"
          className="object-contain shrink-0 w-3 aspect-square"
          alt=""
        />
      </div>
    </div>
  );
};

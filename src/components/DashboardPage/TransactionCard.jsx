"use client";
import React from "react";

export const TransactionCard = ({
  bankName,
  date,
  description,
  paymentMethod,
  amount,
  image,
}) => {
  return (
    <article className="flex flex-wrap gap-10 justify-between items-center px-10 py-11 w-full bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-8 self-stretch my-auto text-black min-w-60 max-md:max-w-full">
        <img
          src={image}
          className="object-contain w-60 aspect-[1.13]"
          alt={`${bankName} transaction`}
        />
        <div className="flex flex-col self-start min-w-60 w-[267px]">
          <div className="w-full">
            <h3 className="text-4xl font-bold font-poppins">{bankName}</h3>
            <time className="text-base leading-7 font-poppins">{date}</time>
          </div>
          <p className="mt-5 text-2xl leading-10 font-poppins">{description}</p>
          <div className="gap-3.5 self-start mt-5 text-2xl font-semibold leading-10 text-green-600 whitespace-nowrap font-poppins">
            {paymentMethod}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end self-stretch my-auto text-2xl leading-none text-orange-500 min-h-56">
        <div className="flex gap-8 items-end">
          <div className="flex flex-col items-center">
            <div className="text-orange-500 font-poppins font-medium">{amount}</div>
          </div>
        </div>
      </div>
    </article>
  );
};

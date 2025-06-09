"use client";
import React from "react";

export const NavigationItem = ({ icon, label, isActive = false }) => {
  return (
    <div
      className={`flex gap-5 items-center py-1.5 pl-2.5 w-full rounded-md ${
        isActive ? "rounded-xl bg-neutral-800" : ""
      }`}
    >
      <div className="flex gap-2.5 justify-center items-center self-stretch p-3 my-auto rounded-md min-h-12 w-[51px]">
        <img
          src={icon}
          className="object-contain self-stretch my-auto w-6 aspect-square"
          alt=""
        />
      </div>
      <div
        className={`self-stretch my-auto text-base leading-none uppercase font-poppins ${
          isActive ? "text-slate-100 w-[99px]" : "text-gray-500"
        }`}
      >
        {label}
      </div>
    </div>
  );
};

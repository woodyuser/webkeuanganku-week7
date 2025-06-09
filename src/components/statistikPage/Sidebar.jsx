"use client";
import React from 'react';

const NavigationItem = ({ iconSrc, label, isActive = false }) => {
  const bgColor = isActive ? 'bg-neutral-800' : '';
  const textColor = isActive ? 'text-slate-100' : 'text-gray-500';

  return (
    <div className={`flex gap-5 items-center py-1.5 pl-2.5 mt-2.5 w-full rounded-md ${bgColor}`}>
      <div className="flex gap-2.5 justify-center items-center self-stretch p-3 my-auto rounded-md min-h-12 w-[51px]">
        <img
          src={iconSrc}
          className="object-contain self-stretch my-auto w-6 aspect-square"
          alt=""
        />
      </div>
      <div className={`self-stretch my-auto text-base leading-none uppercase ${textColor}`}>
        {label}
      </div>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div className="w-[24%] max-md:ml-0 max-md:w-full">
      <div className="flex items-center pr-20 border-r border-solid border-r-[color:var(--Neutral-200,#E3E8EF)] max-md:mt-8">
        <div className="flex flex-col justify-between self-stretch py-5 my-auto min-h-[903px] min-w-60 w-[262px]">
          <div className="flex gap-1.5 items-center self-start text-gray-900 whitespace-nowrap">
            <div className="flex flex-col justify-center self-stretch my-auto min-h-[35px] w-[104px]">
              <div className="text-3xl font-medium leading-none text-gray-900">
                KEUKU
              </div>
              <div className="mt-1.5 text-base leading-3 text-center text-gray-900">
                Keuanganku
              </div>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/c3f9725fb17cd42cb51d0c0a85e6ece351b26e75?placeholderIfAbsent=true"
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[41px]"
              alt=""
            />
          </div>

          <div className="mt-56 w-full max-md:mt-10">
            <div className="flex gap-5 items-center py-1.5 pl-2.5 w-full rounded-xl">
              <div className="flex gap-2.5 justify-center items-center self-stretch p-3 my-auto rounded-md min-h-12 w-[51px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/806f5839dc1ddbe88fed813c4e10609b8278d937?placeholderIfAbsent=true"
                  className="object-contain self-stretch my-auto w-6 aspect-square"
                  alt=""
                />
              </div>
              <div className="self-stretch my-auto text-base leading-none text-gray-500 uppercase whitespace-nowrap w-[99px]">
                DASHBOARD
              </div>
            </div>
            <NavigationItem iconSrc="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/9bdcb6b2eb58efc48d50d37a54ee1997e8c084bc?placeholderIfAbsent=true" label="CATAT TRANSAKSI" />
            <NavigationItem iconSrc="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/bd3a01de6204f56fadf65bb790cb198f4449dad5?placeholderIfAbsent=true" label="STATISTIK" isActive={true} />
            <NavigationItem iconSrc="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/4c88bb9881aca0e89e0b64d3907b8c207dd9b85a?placeholderIfAbsent=true" label="TENTANG KEUKU" />
          </div>

          <div className="mt-56 w-full max-md:mt-10">
            <div className="flex gap-5 items-center py-1.5 pl-2.5 w-full">
              <div className="flex gap-2.5 justify-center items-center self-stretch my-auto min-h-12 w-[51px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/79d6dc5b46981854e676d1bc70a99a3e0fd98f96?placeholderIfAbsent=true"
                  className="object-contain self-stretch my-auto w-6 aspect-square"
                  alt=""
                />
              </div>
              <div className="self-stretch my-auto text-base leading-none text-gray-500 uppercase whitespace-nowrap w-[110px]">
                PENGATURAN
              </div>
            </div>
            <div className="flex gap-5 py-1.5 pl-2.5 mt-2.5 w-full">
              <div className="flex gap-2.5 justify-center items-center my-auto min-h-12 w-[51px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/6de1e307f2fdc7ce891fce34604751c4327d7405?placeholderIfAbsent=true"
                  className="object-contain self-stretch my-auto w-6 aspect-square"
                  alt=""
                />
              </div>
              <div className="text-base leading-5 text-gray-500 uppercase w-[71px]">
                LOG OUT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";
import React from "react";
import { NavigationItem } from "./NavigationItem";

export const Sidebar = () => {
  return (
    <aside className="w-[24%] max-md:ml-0 max-md:w-full">
      <div className="flex grow items-start pt-10 pr-20 border-r border-solid border-r-[color:var(--Neutral-200,#E3E8EF)] min-h-[2307px]">
        <nav className="flex flex-col justify-between py-5 min-h-[903px] min-w-60 w-[262px]">
          <header className="flex gap-1.5 items-center self-start text-gray-900 whitespace-nowrap">
            <div className="flex flex-col justify-center self-stretch my-auto min-h-[35px] w-[104px]">
              <h1 className="text-3xl font-medium leading-none text-gray-900 font-poppins">
                KEUKU
              </h1>
              <p className="mt-1.5 text-base leading-3 text-center text-gray-900 font-poppins">
                Keuanganku
              </p>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/c3f9725fb17cd42cb51d0c0a85e6ece351b26e75?placeholderIfAbsent=true"
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[41px]"
              alt="KEUKU Logo"
            />
          </header>

          <div className="mt-56 w-full max-md:mt-10">
            <NavigationItem
              icon="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/b933ac13b8bca6105d06f71b347dd99b6b00d2e6?placeholderIfAbsent=true"
              label="DASHBOARD"
              isActive={true}
            />
            <div className="mt-2.5">
              <NavigationItem
                icon="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/9bdcb6b2eb58efc48d50d37a54ee1997e8c084bc?placeholderIfAbsent=true"
                label="CATAT TRANSAKSI"
              />
            </div>
            <div className="mt-2.5">
              <NavigationItem
                icon="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/59d910beecf6b6b65ae1af479c6dfd90d17d0632?placeholderIfAbsent=true"
                label="STATISTIK"
              />
            </div>
            <div className="mt-2.5">
              <NavigationItem
                icon="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/4c88bb9881aca0e89e0b64d3907b8c207dd9b85a?placeholderIfAbsent=true"
                label="TENTANG KEUKU"
              />
            </div>
          </div>

          <div className="mt-56 w-full max-md:mt-10">
            <div className="flex gap-5 items-center py-1.5 pl-2.5 w-full">
              <div className="flex gap-2.5 justify-center items-center self-stretch my-auto min-h-12 w-[51px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/de9b27aebad0bf0d3bc273ad44c50b466e60ee10?placeholderIfAbsent=true"
                  className="object-contain self-stretch my-auto w-6 aspect-square"
                  alt=""
                />
              </div>
              <div className="self-stretch my-auto text-base leading-none text-gray-500 uppercase whitespace-nowrap w-[110px] font-poppins">
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
              <div className="text-base leading-5 text-gray-500 uppercase w-[71px] font-poppins">
                LOG OUT
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

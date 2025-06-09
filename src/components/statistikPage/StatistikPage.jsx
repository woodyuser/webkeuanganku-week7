"use client";
import React from 'react';
import { AccountCard } from './AccountCard';
import { Sidebar } from './Sidebar';
import { BarChart } from './BarChart';

export default function StatistikPage() {
  return (
    <div className="font-['Poppins'] overflow-hidden pt-8 pl-16 bg-white max-md:pl-5" space={0}>
      <div className="flex gap-5 max-md:flex-col max-md:">
        <Sidebar />
        <div className="ml-5 w-[76%] max-md:ml-0 max-md:w-full">
          <div className="mt-9 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col items-end ml-10 max-w-full w-[840px]">
              <div className="self-start text-2xl font-medium leading-none uppercase text-neutral-800 max-md:max-w-full">
                Bagaimana statistik keuangan mu?
              </div>

              <div className="mt-20 max-w-full font-medium w-[724px] max-md:mt-10">
                <AccountCard
                  imageSrc="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/4cc9e402e6803ada8d9947fb25f89d60eaf9e1be?placeholderIfAbsent=true"
                  title="Main account"
                  balance="Rp60.675.000"
                  percentage="5.2%"
                  isPositive={true}
                />
                <div className="mt-6">
                  <AccountCard
                    imageSrc="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/8dbd190cecc44292c5c1f3b42be42469e01a137a?placeholderIfAbsent=true"
                    title="Secondary account"
                    balance="Rp12.750.000"
                    percentage="4.1%"
                    isPositive={false}
                  />
                </div>
              </div>

              <div className="mt-24 max-w-full w-[724px] max-md:mt-10">
                <BarChart />
              </div>
            </div>

            <div className="gap-2.5 self-stretch px-96 py-9 text-base text-center text-gray-900 bg-zinc-300 min-h-[81px] mt-[510px] max-md:px-5 max-md:mt-10">
              © 2025 Keuku by Indah. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

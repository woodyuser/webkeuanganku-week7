"use client";
import React, { useState } from "react";
import { CreditCard } from "./CreditCard";
import { SummaryCard } from "./SummaryCard";
import { TransactionCard } from "./TransactionCard";
import { DatePicker } from "./DatePicker";

export const MainContent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Here you can add logic to filter data based on selected date
    console.log("Selected date:", date);
  };

  return (
    <main className="ml-5 w-[76%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-14 w-full max-md:mt-10 max-md:max-w-full">
        <div className="self-center max-w-full w-[1011px]">
          <div className="w-full max-md:max-w-full">
            <h1 className="text-2xl font-medium leading-none uppercase text-neutral-800 max-md:max-w-full font-poppins">
              HALO, siap atur keuangan hari ini? 💸💰{" "}
            </h1>

            <div className="flex flex-wrap gap-5 justify-between items-center mt-16 w-full max-md:mt-10 max-md:max-w-full">
              <section className="overflow-hidden self-stretch my-auto rounded-xl border border-solid border-[color:var(--Neutral-200,#E3E8EF)] min-w-60 w-[690px] max-md:max-w-full">
                <div className="overflow-hidden p-8 w-full bg-white max-w-[690px] max-md:px-5 max-md:max-w-full">
                  <div className="flex flex-wrap gap-4 items-center w-full text-base leading-7 uppercase text-neutral-800 max-md:max-w-full">
                    <h2 className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full font-poppins">
                      KARTU ANDA
                    </h2>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/de0e949633fd8c2d813e925ccd8ed722d6d17a65?placeholderIfAbsent=true"
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      alt=""
                    />
                  </div>

                  <div className="flex flex-wrap gap-8 items-start mt-5 w-full max-md:max-w-full">
                    <CreditCard
                      bankName="BCA"
                      cardNumber="4321 1234 1234 1234"
                      cardHolder="ADMIN"
                      expiry="06/24"
                      chipIcon="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/e37fb27e637056c10652d35645d70bb5a92c2807?placeholderIfAbsent=true"
                      networkIcon="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/25f5b63d2ac0aaa8637b6aad3f4f74778a908e0c?placeholderIfAbsent=true"
                      expenseAmount="Rp 3.170.000"
                      progressWidth="50px"
                      cardStyle="bg-gradient-to-r from-blue-600 to-blue-800"
                    />

                    <CreditCard
                      bankName="PERMATA"
                      cardNumber="5432 1234 1234 1234"
                      cardHolder="ADMIN"
                      expiry="10/24"
                      chipIcon="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/6803fc4bf822b8fc0ab25c8be56fadb6ca211791?placeholderIfAbsent=true"
                      networkIcon="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/343ac87ece33f18283d32c216fd1b6802b77467a?placeholderIfAbsent=true"
                      expenseAmount="Rp 95.250.000"
                      progressWidth="100%"
                      cardStyle="bg-gradient-to-r from-purple-600 to-purple-800"
                    />
                  </div>
                </div>

                <div className="w-full max-md:max-w-full">
                  <div className="flex shrink-0 h-px bg-slate-200 max-md:max-w-full" />
                </div>

                <footer className="flex flex-col justify-center items-end p-5 w-full text-base leading-none bg-white text-slate-100 max-md:max-w-full">
                  <button className="overflow-hidden gap-2 self-stretch px-4 py-5 rounded-md border border-solid shadow-sm bg-neutral-800 border-[color:var(--Neutral-300,#CDD5DF)] text-slate-100 font-poppins hover:bg-neutral-700 transition-colors">
                    Card settings
                  </button>
                </footer>
              </section>

              <aside className="self-stretch p-8 my-auto rounded-xl border border-solid border-slate-200 min-w-60 w-[302px] max-md:px-5">
                <div className="w-full max-w-[242px]">
                  <h2 className="text-base leading-7 uppercase text-neutral-800 font-poppins">
                    REKAP
                  </h2>

                  <div className="flex gap-3 items-start mt-5 w-full text-sm font-medium leading-none text-gray-700">
                    <DatePicker
                      selectedDate={selectedDate}
                      onDateSelect={handleDateSelect}
                    />
                  </div>
                </div>

                <SummaryCard
                  title="Total Pengeluaran"
                  amount="Rp 4.500.000"
                  backgroundColor="bg-red-400"
                />

                <SummaryCard
                  title="Total Pemasukan"
                  amount="Rp 13.000.000"
                  backgroundColor="bg-yellow-400"
                />
              </aside>
            </div>
          </div>

          <section className="mt-24 w-full max-md:mt-10 max-md:max-w-full">
            <h2 className="text-base leading-7 uppercase text-neutral-800 max-md:max-w-full font-poppins">
              Transaksi terakhir
            </h2>

            <div className="mt-8 w-full max-md:max-w-full">
              <TransactionCard
                bankName="Bank Permata"
                date="2025-03-10"
                description="Belanja bulanan"
                paymentMethod="QRIS"
                amount="- Rp250,000"
                image="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/3cf9b6ad973c51874c28a794617c40461623a909?placeholderIfAbsent=true"
              />

              <div className="mt-5">
                <TransactionCard
                  bankName="Bank Permata"
                  date="2025-03-10"
                  description="Belanja bulanan"
                  paymentMethod="QRIS"
                  amount="- Rp250,000"
                  image="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/3cf9b6ad973c51874c28a794617c40461623a909?placeholderIfAbsent=true"
                />
              </div>

              <div className="mt-5">
                <TransactionCard
                  bankName="Bank Permata"
                  date="2025-03-10"
                  description="Belanja bulanan"
                  paymentMethod="QRIS"
                  amount="- Rp250,000"
                  image="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/3cf9b6ad973c51874c28a794617c40461623a909?placeholderIfAbsent=true"
                />
              </div>

              <div className="mt-5">
                <TransactionCard
                  bankName="Bank Permata"
                  date="2025-03-10"
                  description="Belanja bulanan"
                  paymentMethod="QRIS"
                  amount="- Rp250,000"
                  image="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/3cf9b6ad973c51874c28a794617c40461623a909?placeholderIfAbsent=true"
                />
              </div>
            </div>
          </section>
        </div>

        <footer className="gap-2.5 self-stretch px-96 py-10 mt-48 text-base text-center text-gray-900 bg-zinc-300 min-h-[92px] max-md:px-5 max-md:mt-10 font-poppins">
          © 2025 Keuku by Indah. All rights reserved.
        </footer>
      </div>
    </main>
  );
};

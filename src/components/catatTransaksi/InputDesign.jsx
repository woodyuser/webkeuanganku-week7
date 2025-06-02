"use client";
import React from 'react';
import { Sidebar } from './Sidebar';
import TransactionList from './TransactionList';
import { Footer } from './Footer';

export const InputDesign = () => {
  return (
    <div className="flex w-full bg-white min-h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1 items-center ml-[342px] max-md:ml-[280px] max-sm:ml-[60px]">
        <TransactionList />
        <Footer />
      </main>
    </div>
  );
};

export default InputDesign;

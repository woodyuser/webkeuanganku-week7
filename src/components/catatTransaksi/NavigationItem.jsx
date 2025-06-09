"use client";
import React from 'react';
import { Sidebar } from './Sidebar';
import {TransactionList} from './TransactionList';
import { Footer } from './Footer';


export const InputDesign = () => {
  return (
    <div className="flex w-full bg-white min-h-[screen]">
      <Sidebar />
      <main className="flex flex-col flex-1 items-center max-sm:ml-16">
        <TransactionList />
        <Footer />
      </main>
    </div>
  );
};

export default InputDesign;

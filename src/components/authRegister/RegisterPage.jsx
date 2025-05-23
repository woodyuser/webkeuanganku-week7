"use client";
import React from "react";
import WelcomeHeader from "./WelcomeHeader";
import LoginInputs from "./LoginInputs";
import LoginLinks from "./LoginLinks";
import Footer from "./Footer";

const RegisterPage = () => {
  return (
    <main className="flex flex-col items-center px-5 py-0 min-h-screen bg-white font-['Poppins']">
      <div className="flex flex-col gap-24 items-center pb-20 w-full max-w-[647px] max-sm:gap-12 mt-10">
        <section className="flex flex-col gap-10 items-end p-16 w-full rounded-md border border-gray-400 border-solid shadow-[0_1px_3px_rgba(18,25,38,0.10),0_1px_2px_rgba(18,25,38,0.06)] max-md:p-10 max-sm:p-5">
          <WelcomeHeader />
          <LoginInputs />
          <LoginLinks />
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default RegisterPage;

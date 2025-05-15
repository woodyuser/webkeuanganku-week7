"use client";
import React from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import LoginFooter from "./LoginFooter";

const LoginPage = () => {
  return (
    <main className="flex justify-center items-center p-5 w-full bg-white min-h-[screen]">
      <div className="flex flex-col gap-44 items-center w-full max-w-[647px] max-md:gap-24 max-sm:gap-16">
        <section className="flex flex-col gap-10 items-center p-16 w-full rounded-md border border-gray-400 shadow max-md:p-10 max-sm:p-5">
          <LoginHeader />
          <LoginForm />
        </section>
        <LoginFooter />
      </div>
    </main>
  );
};

export default LoginPage;

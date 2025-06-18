"use client";
import React from "react";
import { Link } from "react-router-dom"; // Link needs to be imported if used
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import LoginFooter from "./LoginFooter";

function LoginPage() {
  return (
    <main className="flex justify-center items-center pb-20 min-h-screen bg-white max-sm:p-5">
      <div className="flex flex-col gap-10 items-center w-full max-w-[647px] mt-20 mb-20"> {/* Adjusted gap and added margin */}
        <section className="flex flex-col gap-10 items-center p-16 w-full rounded-md border border-gray-400 border-solid shadow max-md:px-8 max-md:py-10 max-sm:px-5 max-sm:py-8">
          <LoginHeader />

          {/* Form */}
          <LoginForm />

          {/* Link to Register */}
          <p className="text-sm text-gray-600 text-center mt-4">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-600">
              Register now
            </Link>
          </p>
        </section> {/* Closing section tag was missing */}
      </div>

      {/* Footer - Positioned relative to the main content */}
      <div className="absolute bottom-4 text-sm text-gray-400 text-center">
        <LoginFooter />
      </div>
    </main>
  );
}

export default LoginPage;
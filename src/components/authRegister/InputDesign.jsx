"use client";
import React from "react";
import LoginForm from "./LoginForm";

function InputDesign() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style jsx global>{`
        body {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      <LoginForm />
    </>
  );
}

export default InputDesign;

"use client";
import React, { useState, useEffect } from "react";
import WelcomeHeader from "./WelcomeHeader";
import InputField from "./InputField";
import ActionButton from "./ActionButton";
import { Link } from "react-router-dom";


function LupaPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState(""); // Simulating stored old password

  // Validation states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Validate form on input changes
  useEffect(() => {
    validateForm();
  }, [email, password, confirmPassword]);

  const validateForm = () => {
    let valid = true;

    // Email validation
    if (email && !email.includes('@')) {
      setEmailError("Email must contain @");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password validation (simulating check against old password)
    if (password && password === oldPassword) {
      setPasswordError("New password cannot be the same as the old password");
      valid = false;
    } else if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    // Confirm password validation
    if (confirmPassword && confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    setIsFormValid(valid && email && password && confirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Handle form submission logic here
      alert("Form berhasil disubmit!");
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <main className="flex flex-col gap-24 items-center px-5 py-10 min-h-screen bg-white font-['Poppins']">
        <section className="flex flex-col gap-10 items-center w-full max-w-[647px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 p-16 w-full rounded-md border border-gray-400 border-solid shadow max-md:px-8 max-md:py-10 max-sm:px-5 max-sm:py-8"
          >
            <WelcomeHeader />

            <div className="flex flex-col gap-5 items-center w-full">
              <p className="text-base leading-5 text-gray-500">
                Masukkan Email dan Password Anda
              </p>
              <div className="flex flex-col gap-5 w-full max-sm:gap-4">
                <InputField
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                />
                <InputField
                  type="password"
                  placeholder="Password Baru"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError}
                />
                <InputField
                  type="password"
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={confirmPasswordError}
                />
                <ActionButton
                  text="SIGN IN"
                  type="submit"
                  disabled={!isFormValid}
                />

                {/*<p
                  className="text-sm text-center text-gray-500 cursor-pointer hover:underline mt-2"
                  onClick={() => setIsResetModalOpen(true)}
                >
                  Lupa Password?
                </p>*/}

              </div>
            </div>
          </form>

          <p className="text-base leading-5 text-gray-500">
             Belum Punya Akun?{" "}
              <Link to="/register" className="underline cursor-pointer text-gray-500 hover:text-gray-700">
               Register Now
              </Link>
          </p>

        </section>

        <footer className="text-base text-center text-gray-500">
          © 2025 Keuku by Indah. All rights reserved.
        </footer>
      </main>
    </>
  );
}

export default LupaPasswordPage;

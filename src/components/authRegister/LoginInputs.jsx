"use client";
import React, { useState } from "react";

const LoginInputs = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required";
    }
    if (!email.includes('@')) {
      return "Email must contain @";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      return "Please confirm your password";
    }
    if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({
      ...prev,
      email: validateEmail(value)
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors(prev => ({
      ...prev,
      password: validatePassword(value),
      confirmPassword: confirmPassword ? validateConfirmPassword(confirmPassword, value) : ""
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors(prev => ({
      ...prev,
      confirmPassword: validateConfirmPassword(value, password)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });

    // If no errors, proceed with form submission
    if (!emailError && !passwordError && !confirmPasswordError) {
      // Form submission logic would go here
      console.log("Form submitted successfully", { email, password });
    }
  };

  return (
    <section className="flex flex-col gap-5 items-center w-full">
      <p className="text-base leading-5 text-gray-500">
        Masukkan Email dan Password Anda
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-sm:gap-4">
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={`box-border px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid ${
              errors.email ? "border-red-500" : "border-neutral-500 border-opacity-70"
            } max-sm:px-5 max-sm:py-4`}
            aria-label="Email"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className={`box-border px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid ${
              errors.password ? "border-red-500" : "border-neutral-500 border-opacity-70"
            } max-sm:px-5 max-sm:py-4`}
            aria-label="Password"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`box-border px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid ${
              errors.confirmPassword ? "border-red-500" : "border-neutral-500 border-opacity-70"
            } max-sm:px-5 max-sm:py-4`}
            aria-label="Konfirmasi Password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="flex justify-center items-center px-0 py-5 w-full h-14 text-xl font-semibold text-white rounded-md cursor-pointer bg-neutral-800 hover:bg-neutral-800 transition-colors"
        >
          SIGN UP
        </button>
      </form>
    </section>
  );
};

export default LoginInputs;

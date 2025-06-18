// src/components/LoginInputs.jsx
"use client";
import React, { useState } from "react";

const LoginInputs = () => {
  const [email, setEmail] = useState("");
  const [nomorHandphone, setNomorHandphone] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    nomorHandphone: "",
    password: "",
    confirmPassword: ""
  });

  // Fungsi validasi untuk setiap field
  const validateEmail = (email) => {
    if (!email) return "Email wajib diisi.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Format email tidak valid.";
    return "";
  };

  const validateNomorHandphone = (nomorHandphone) => {
    if (!nomorHandphone) return "Nomor handphone wajib diisi.";
    if (nomorHandphone.length < 10) return "Nomor handphone minimal 10 digit.";
    const phoneRegex = /^\d+$/; 
    if (!phoneRegex.test(nomorHandphone)) return "Nomor handphone hanya boleh angka.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password wajib diisi.";
    if (password.length < 8) return "Password minimal 8 karakter.";
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Konfirmasi password wajib diisi.";
    if (confirmPassword !== password) return "Password tidak cocok.";
    return "";
  };

  // --- Fungsi untuk memicu validasi saat ada perubahan atau blur ---
  // Ini akan dipanggil oleh onChange dan onBlur untuk setiap input
  const handleValidation = (fieldName, value, currentPassword = password) => {
    let errorMessage = "";
    switch (fieldName) {
      case "email":
        errorMessage = validateEmail(value);
        break;
      case "nomorHandphone":
        errorMessage = validateNomorHandphone(value);
        break;
      case "password":
        errorMessage = validatePassword(value);
        break;
      case "confirmPassword":
        errorMessage = validateConfirmPassword(value, currentPassword);
        break;
      default:
        break;
    }
    setErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage
    }));
  };

  // Event handler untuk setiap perubahan input
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    handleValidation("email", value);
  };

  const handleEmailBlur = (e) => { // Validasi saat input kehilangan fokus
    handleValidation("email", e.target.value);
  };

  const handleNomorHandphoneChange = (e) => {
    const value = e.target.value;
    setNomorHandphone(value);
    handleValidation("nomorHandphone", value);
  };

  const handleNomorHandphoneBlur = (e) => { // Validasi saat input kehilangan fokus
    handleValidation("nomorHandphone", e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Saat password berubah, validasi password itu sendiri dan konfirmasi password
    handleValidation("password", value);
    handleValidation("confirmPassword", confirmPassword, value); 
  };

  const handlePasswordBlur = (e) => { // Validasi saat input kehilangan fokus
    handleValidation("password", e.target.value);
    handleValidation("confirmPassword", confirmPassword, e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    handleValidation("confirmPassword", value);
  };

  const handleConfirmPasswordBlur = (e) => { // Validasi saat input kehilangan fokus
    handleValidation("confirmPassword", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lakukan validasi terakhir untuk semua field saat submit
    const emailError = validateEmail(email);
    const nomorHandphoneError = validateNomorHandphone(nomorHandphone);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

    // Set semua error ke state 'errors'
    setErrors({
      email: emailError,
      nomorHandphone: nomorHandphoneError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });

    // Jika tidak ada error validasi di frontend, lanjutkan
    if (!emailError && !nomorHandphoneError && !passwordError && !confirmPasswordError) {
      const backendRegisterUrl = 'http://localhost:5000/register'; 

      console.log("Mencoba registrasi dengan data:", { email, nomorHandphone, password });
      console.log("Mengirim request ke:", backendRegisterUrl);

      try {
        const response = await fetch(backendRegisterUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, nomorHandphone, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message || "Registrasi berhasil!");
          // Reset form setelah sukses
          setEmail("");
          setNomorHandphone("");
          setPassword("");
          setConfirmPassword("");
          setErrors({ // Reset error juga
            email: "",
            nomorHandphone: "",
            password: "",
            confirmPassword: ""
          });
        } else {
          alert(data.message || 'Gagal registrasi. Silakan coba lagi.');
        }
      } catch (error) {
        console.error('Error saat melakukan registrasi:', error);
        alert('Terjadi kesalahan jaringan atau server. Mohon coba lagi nanti.');
      }
    } else {
      console.log("Form memiliki error validasi frontend. Perbaiki sebelum submit.");
    }
  };

  return (
    <section className="flex flex-col gap-5 items-center w-full">
      <p className="text-base leading-5 text-gray-500">
        Silakan daftar akun Anda.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-sm:gap-4">
        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur} // PENTING: Tambah onBlur
            className={`box-border px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid ${
              errors.email ? "border-red-500" : "border-neutral-500 border-opacity-70"
            } max-sm:px-5 max-sm:py-4`}
            aria-label="Email"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Nomor Handphone Input */}
        <div className="flex flex-col gap-1">
          <input
            type="tel"
            placeholder="Nomor Handphone"
            value={nomorHandphone}
            onChange={handleNomorHandphoneChange} 
            onBlur={handleNomorHandphoneBlur} // PENTING: Tambah onBlur
            className={`box-border px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid ${
              errors.nomorHandphone ? "border-red-500" : "border-neutral-500 border-opacity-70"
            } max-sm:px-5 max-sm:py-4`}
            aria-label="Nomor Handphone"
          />
          {errors.nomorHandphone && (
            <p className="text-sm text-red-500 mt-1">{errors.nomorHandphone}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur} // PENTING: Tambah onBlur
            className={`box-border px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid ${
              errors.password ? "border-red-500" : "border-neutral-500 border-opacity-70"
            } max-sm:px-5 max-sm:py-4`}
            aria-label="Password"
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password Input */}
        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur} // PENTING: Tambah onBlur
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
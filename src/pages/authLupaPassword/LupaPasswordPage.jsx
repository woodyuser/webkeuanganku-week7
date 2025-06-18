// src/app/lupa-password/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import WelcomeHeader from "./WelcomeHeader"; // Sesuaikan path jika berbeda
import InputField from "./InputField";       // Sesuaikan path jika berbeda
import ActionButton from "./ActionButton";     // Sesuaikan path jika berbeda
import { Link, useNavigate } from "react-router-dom"; // Tambahkan useNavigate

function LupaPasswordPage() {
    // State untuk input form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate(); // Inisialisasi useNavigate

    // State untuk pesan error
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [submissionMessage, setSubmissionMessage] = useState(""); // Untuk pesan sukses/error dari API

    // State untuk validasi form secara keseluruhan
    const [isFormValid, setIsFormValid] = useState(false);

    // >>>>> State BARU untuk melacak apakah input sudah disentuh/form disubmit <<<<<
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [submitted, setSubmitted] = useState(false);
    // >>>>> AKHIR State BARU <<<<<

    // Effect untuk validasi form setiap kali input berubah atau form disubmit
    useEffect(() => {
        validateForm();
    }, [email, password, confirmPassword, touched, submitted]); // Tambahkan touched dan submitted sebagai dependensi

    const validateForm = () => {
        let valid = true; // Variabel lokal untuk validitas keseluruhan form

        // Validasi Email
        let currentEmailError = "";
        if (!email) {
            currentEmailError = "Email tidak boleh kosong.";
            valid = false;
        } else if (!email.includes('@')) {
            currentEmailError = "Email harus mengandung @.";
            valid = false;
        }
        // Tampilkan error hanya jika sudah disentuh atau form disubmit
        setEmailError((touched.email || submitted) ? currentEmailError : "");

        // Validasi Password Baru
        let currentPasswordError = "";
        if (password.length < 8) {
            currentPasswordError = "Password baru harus minimal 8 karakter.";
            valid = false;
        }
        // Tampilkan error hanya jika sudah disentuh atau form disubmit
        setPasswordError((touched.password || submitted) ? currentPasswordError : "");


        // Validasi Konfirmasi Password
        let currentConfirmPasswordError = "";
        if (!confirmPassword) {
            currentConfirmPasswordError = "Konfirmasi password tidak boleh kosong.";
            valid = false;
        } else if (confirmPassword !== password) {
            currentConfirmPasswordError = "Konfirmasi password tidak cocok.";
            valid = false;
        }
        // Tampilkan error hanya jika sudah disentuh atau form disubmit
        setConfirmPasswordError((touched.confirmPassword || submitted) ? currentConfirmPasswordError : "");
        
        // Form valid jika semua field yang diperlukan terisi dan validasinya benar (tanpa mempertimbangkan 'touched'/'submitted')
        const allFieldsFilledAndValid = !currentEmailError && !currentPasswordError && !currentConfirmPasswordError && email && password && confirmPassword;
        setIsFormValid(allFieldsFilledAndValid);
    };

    // Handler untuk event onBlur (saat input kehilangan fokus)
    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    // Handler saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah refresh halaman
        setSubmitted(true); // Tandai form sudah disubmit
        setSubmissionMessage(""); // Reset pesan submit

        // Panggil validateForm lagi untuk update state error dan isFormValid secara instan
        // Beri jeda kecil agar state 'touched' dan 'submitted' update dulu
        await new Promise(resolve => setTimeout(resolve, 0)); // Menunggu state update

        // Check validasi final sebelum kirim ke API
        // Gunakan isFormValid dari state yang sudah diperbarui setelah setSubmitted
        if (!isFormValid) {
            alert("Harap lengkapi semua bidang dengan benar.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/reset-password-direct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    password_confirmation: confirmPassword,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setSubmitted(false); // Reset status submit
                setTouched({ email: false, password: false, confirmPassword: false }); // Reset touched
                navigate("/login");
            } else {
                const errorMessage = data.message || "Gagal mengubah password.";
                alert(errorMessage);
                if (data.errors) {
                    Object.values(data.errors).forEach(errArray => errArray.forEach(err => alert(err)));
                }
            }
        } catch (error) {
            console.error("Kesalahan jaringan/server saat submit:", error);
            setSubmissionMessage("Terjadi masalah koneksi atau server.");
            alert("Terjadi masalah koneksi atau server.");
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
                                Masukkan Email dan Password Baru Anda
                            </p>
                            {submissionMessage && (
                                <p className={`text-base leading-5 text-center ${submissionMessage.includes("gagal") || submissionMessage.includes("Error") ? 'text-red-500' : 'text-gray-500'}`}>
                                    {submissionMessage}
                                </p>
                            )}

                            <div className="flex flex-col gap-5 w-full max-sm:gap-4">
                                <InputField
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => handleBlur('email')} // Tambahkan onBlur
                                    error={emailError}
                                    required
                                />
                                <InputField
                                    type="password"
                                    placeholder="Password Baru"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => handleBlur('password')} // Tambahkan onBlur
                                    error={passwordError}
                                    required
                                />
                                <InputField
                                    type="password"
                                    placeholder="Konfirmasi Password Baru"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onBlur={() => handleBlur('confirmPassword')} // Tambahkan onBlur
                                    error={confirmPasswordError}
                                    required
                                />
                                <ActionButton
                                    text="UBAH PASSWORD"
                                    type="submit"
                                    // disabled={!isFormValid} // Atribut disabled bisa diaktifkan lagi jika mau,
                                                              // tapi alert di handleSubmit sudah cukup.
                                />
                            </div>
                        </div>
                    </form>

                    <p className="text-base leading-5 text-gray-500">
                        Sudah punya akun?{" "}
                        <Link to="/login" className="underline cursor-pointer text-gray-500 hover:text-gray-700">
                            Login Sekarang
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
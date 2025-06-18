// src/components/CardSettingsModal.jsx
"use client";
import React, { useState, useEffect } from 'react';

export const CardSettingsModal = ({ onClose, cards, editingCardId, onEditCard, onUpdateCard, onAddCard, onDeleteCard, getCardStyleClass }) => {
    const [currentCardDetails, setCurrentCardDetails] = useState(null);
    const [isAddingNewCard, setIsAddingNewCard] = useState(false);

    // State untuk file gambar yang diunggah dan pratinjaunya (Base64 string)
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        // Reset state gambar saat modal dibuka atau kartu diganti
        setImageFile(null);
        setImagePreview(null);

        if (editingCardId) {
            const cardToEdit = cards.find(card => card.id === editingCardId);
            if (cardToEdit) {
                setCurrentCardDetails({ ...cardToEdit });
                setIsAddingNewCard(false);
                // Jika ada customImageUrl (Base64 dari localStorage) dan gaya adalah 'custom-image', set untuk preview
                if (cardToEdit.customImageUrl && cardToEdit.cardStyleOption === 'custom-image') {
                    setImagePreview(cardToEdit.customImageUrl);
                }
            } else {
                setCurrentCardDetails(null); // Kartu tidak ditemukan
            }
        } else if (isAddingNewCard) {
            // Ini untuk mode tambah kartu baru
            setCurrentCardDetails({
                id: `card-${Date.now()}`, // Beri ID sementara agar bisa disimpan di localStorage
                bankName: '',
                cardNumber: '',
                cardHolder: '',
                expiry: '',
                chipIcon: "https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/e37fb27e637056c10652d35645d70bb5a92c2807?placeholderIfAbsent=true",
                networkIcon: "https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/25f5b63d2ac0aaa8637b6aad3f4f74778a908e0c?placeholderIfAbsent=true",
                expenseAmount: 0,
                progressWidth: "0%",
                cardStyleOption: 'default',
                customImageUrl: null, // Penting: ini null secara default
                limit: 0,
            });
        } else {
            setCurrentCardDetails(null);
        }
    }, [editingCardId, cards, isAddingNewCard]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentCardDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleBackgroundChange = (e) => {
        const newStyleOption = e.target.value;
        setCurrentCardDetails(prev => ({
            ...prev,
            cardStyleOption: newStyleOption,
            // Jika gaya bukan 'custom-image', pastikan customImageUrl disetel null
            customImageUrl: newStyleOption === 'custom-image' ? prev.customImageUrl : null
        }));
        // Reset preview gambar jika bukan 'custom-image' lagi
        if (newStyleOption !== 'custom-image') {
            setImageFile(null);
            setImagePreview(null);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Simpan objek File yang baru diunggah
            // Buat URL objek untuk preview langsung di modal
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Menggunakan Base64 untuk preview, ini yang akan disimpan
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreview(null);
        }
    };

    const handleSave = () => {
        if (!currentCardDetails || !currentCardDetails.bankName || !currentCardDetails.cardNumber) {
            alert("Nama Bank dan Nomor Kartu harus diisi!");
            return;
        }

        let cardToSave = { ...currentCardDetails };

        // Pastikan ID ada untuk menyimpan ke localStorage
        if (!cardToSave.id) {
            cardToSave.id = `card-${Date.now()}`;
        }

        // Jika gaya kartu adalah custom-image
        if (cardToSave.cardStyleOption === 'custom-image') {
            // Jika ada file gambar baru yang diunggah
            if (imageFile) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    cardToSave.customImageUrl = reader.result; // Simpan Base64 string ke objek kartu
                    // Simpan Base64 string ke localStorage terpisah dengan kunci unik
                    localStorage.setItem(`card_image_${cardToSave.id}`, reader.result);
                    finalizeSave(cardToSave);
                };
                reader.readAsDataURL(imageFile);
            } else if (cardToSave.customImageUrl) {
                // Jika tidak ada file baru tapi sudah ada customImageUrl (dari awal load),
                // pastikan itu tetap disimpan di localStorage (jika belum)
                localStorage.setItem(`card_image_${cardToSave.id}`, cardToSave.customImageUrl);
                finalizeSave(cardToSave);
            } else {
                 // Jika 'custom-image' dipilih tapi tidak ada gambar, kosongkan
                localStorage.removeItem(`card_image_${cardToSave.id}`);
                cardToSave.customImageUrl = null;
                finalizeSave(cardToSave);
            }
        } else {
            // Jika gaya bukan 'custom-image', pastikan customImageUrl null dan hapus dari localStorage
            cardToSave.customImageUrl = null;
            localStorage.removeItem(`card_image_${cardToSave.id}`);
            finalizeSave(cardToSave);
        }
    };

    const finalizeSave = (cardData) => {
        if (isAddingNewCard) {
            onAddCard(cardData); // Panggil fungsi di MainContent
        } else {
            onUpdateCard(cardData); // Panggil fungsi di MainContent
        }
        // Reset state dan tutup modal
        setIsAddingNewCard(false);
        setCurrentCardDetails(null);
        onEditCard(null); // Ini untuk mereset editingCardId di MainContent
        onClose(); // Tutup modal
    };

    const handleCancel = () => {
        onClose(); // Tutup modal tanpa menyimpan perubahan
        onEditCard(null); // Pastikan editingCardId direset di MainContent
    };

    // Fungsi ini menerima cardId sebagai argumen
    const handleDelete = (cardIdToDelete) => {
        // Validasi: Pastikan cardIdToDelete tidak null atau undefined
        if (!cardIdToDelete) {
            console.error("handleDelete dipanggil tanpa cardId yang valid.");
            return; // Hentikan eksekusi jika ID tidak valid
        }

        // Cari kartu berdasarkan ID untuk menampilkan konfirmasi yang benar
        const cardToDelete = cards.find(card => card.id === cardIdToDelete);
        const cardName = cardToDelete ? cardToDelete.bankName : "kartu ini";

        if (window.confirm(`Yakin ingin menghapus kartu ${cardName}?`)) {
            // Panggil onDeleteCard yang ada di MainContent
            onDeleteCard(cardIdToDelete);
            onClose(); // Tutup modal setelah menghapus
        }
    };


    // Jangan render modal jika currentCardDetails belum siap dan tidak dalam mode edit/tambah
    if (!currentCardDetails && (editingCardId || isAddingNewCard)) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-semibold text-neutral-800 font-poppins">
                        {editingCardId || isAddingNewCard ? "Edit/Tambah Kartu" : "Kelola Kartu Anda"}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl leading-none" aria-label="Close modal">&times;</button>
                </div>

                {/* Kondisional render form edit/tambah atau daftar kartu */}
                {editingCardId || isAddingNewCard ? (
                    <>
                        <p className="mb-4 text-gray-700">{isAddingNewCard ? "Masukkan detail kartu baru Anda." : `Edit detail kartu ${currentCardDetails?.bankName || 'ini'}.`}</p>
                        <div className="mb-4">
                            <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">Nama Bank</label>
                            <input
                                type="text"
                                id="bankName"
                                name="bankName"
                                value={currentCardDetails?.bankName || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Nama Bank"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Nomor Kartu</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={currentCardDetails?.cardNumber || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Nomor Kartu"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">Nama Pemegang Kartu</label>
                            <input
                                type="text"
                                id="cardHolder"
                                name="cardHolder"
                                value={currentCardDetails?.cardHolder || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Nama Pemegang Kartu"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Masa Berlaku</label>
                            <input
                                type="text"
                                id="expiry"
                                name="expiry"
                                value={currentCardDetails?.expiry || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-1">Limit Kartu (Angka Saja)</label>
                            <input
                                type="number"
                                id="limit"
                                name="limit"
                                value={currentCardDetails?.limit || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Contoh: 5000000"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="cardStyleOption" className="block text-sm font-medium text-gray-700 mb-1">Background Kartu</label>
                            <select id="cardStyleOption" name="cardStyleOption" value={currentCardDetails?.cardStyleOption || 'default'} onChange={handleBackgroundChange} className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="default">Default (Biru)</option>
                                <option value="gradient-purple">Gradient Ungu</option>
                                <option value="gradient-green">Gradient Hijau</option>
                                <option value="gradient-orange">Gradient Oranye</option>
                                <option value="custom-image">Gambar Kustom</option>
                            </select>

                            {/* Input Unggah Gambar & Preview */}
                            {currentCardDetails?.cardStyleOption === 'custom-image' && (
                                <div className="mt-4">
                                    <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">Upload Gambar Kartu</label>
                                    <input type="file" id="imageUpload" name="imageUpload" accept="image/png, image/jpeg, image/gif" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                    {imagePreview && (
                                        <div className="mt-2">
                                            <p className="text-sm">Preview:</p>
                                            <img src={imagePreview} alt="Preview" className="w-32 h-auto object-contain rounded-md border mt-1" />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Preview warna background non-gambar */}
                            {currentCardDetails && currentCardDetails.cardStyleOption && currentCardDetails.cardStyleOption !== 'custom-image' && (
                                <div className={`mt-2 h-10 w-full rounded-md ${getCardStyleClass(currentCardDetails.cardStyleOption)} border border-gray-300`}></div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={handleCancel} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                                Batal
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 rounded-md bg-neutral-800 text-white hover:bg-neutral-700 transition-colors">
                                Simpan Perubahan
                            </button>
                            {!isAddingNewCard && ( // Tampilkan tombol hapus hanya jika bukan mode tambah baru
                                <button onClick={() => handleDelete(currentCardDetails.id)} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors">
                                    Hapus Kartu
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    // Tampilan daftar kartu
                    <>
                        <p className="mb-4 text-gray-700">Pilih kartu untuk mengedit, atau tambah yang baru.</p>
                        {cards.length === 0 ? (
                            <p className="text-gray-500">Belum ada kartu. Silakan tambah kartu baru.</p>
                        ) : (
                            <ul className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                                {cards.map(card => (
                                    <li key={card.id} className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                                        <span className="font-medium text-neutral-800">{card.bankName} - {card.cardNumber.slice(-4)}</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => { onEditCard(card.id); setIsAddingNewCard(false); }} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-poppins">Edit</button>
                                            <button onClick={() => handleDelete(card.id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-poppins">Hapus</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="flex justify-end mt-4">
                            <button onClick={() => { setIsAddingNewCard(true); onEditCard(null); }} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-poppins">+ Tambah Kartu Baru</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
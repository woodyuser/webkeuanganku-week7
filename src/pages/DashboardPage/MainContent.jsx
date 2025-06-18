// src/components/MainContent.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { CreditCard } from "./CreditCard"; // Pastikan CreditCard bisa menerima customImageUrl
import { SummaryCard } from "./SummaryCard";
import { TransactionCard } from "./TransactionCard";
import { DatePicker } from "./DatePicker";
import { useNavigate } from 'react-router-dom';
import { CardSettingsModal } from './CardSettingsModal';

const getCardStyleClass = (bgColorOption) => {
    switch (bgColorOption) {
        case 'default': return 'bg-gradient-to-r from-blue-600 to-blue-800';
        case 'gradient-purple': return 'bg-gradient-to-r from-purple-600 to-purple-800';
        case 'gradient-green': return 'bg-gradient-to-r from-green-500 to-green-700';
        case 'gradient-orange': return 'bg-gradient-to-r from-orange-400 to-orange-600';
        // 'custom-image' tidak perlu kelas background karena akan diatur di CreditCard dengan customImageUrl
        case 'custom-image': return '';
        default: return 'bg-gradient-to-r from-blue-600 to-blue-800';
    }
};

export const MainContent = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isCardSettingsModalOpen, setIsCardSettingsModalOpen] = useState(false);
    const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
    const optionsMenuRef = useRef(null);
    const navigate = useNavigate();

    // --- START: Perubahan di MainContent untuk Persistensi Gambar Lokal ---
    const [cards, setCards] = useState(() => {
        // 1. Coba muat kartu dari localStorage saat inisialisasi state
        const savedCardsJson = localStorage.getItem('userCards');
        if (savedCardsJson) {
            const parsedCards = JSON.parse(savedCardsJson);
            // Untuk setiap kartu, muat customImageUrl (Base64 string) dari localStorage terpisah
            return parsedCards.map(card => {
                if (card.cardStyleOption === 'custom-image' && card.id) { // Pastikan ada ID untuk lookup
                    const customImageUrl = localStorage.getItem(`card_image_${card.id}`);
                    return { ...card, customImageUrl: customImageUrl || null };
                }
                return card;
            });
        }
        // Jika tidak ada data kartu di localStorage, gunakan default awal dari kode
        return [
            { id: 'bca_card', bankName: "Bank BCA", cardNumber: "4321 1234 1234 1234", cardHolder: "ADMIN", expiry: "06/24", chipIcon: "https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/e37fb27e637056c10652d35645d70bb5a92c2807?placeholderIfAbsent=true", networkIcon: "https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/25f5b63d2ac0aaa8637b6aad3f4f74778a908e0c?placeholderIfAbsent=true", expenseAmount: 0, progressWidth: "0%", cardStyleOption: "default", customImageUrl: null, limit: 5000000 },
            { id: 'permata_card', bankName: "Bank Permata", cardNumber: "5432 1234 1234 1234", cardHolder: "ADMIN", expiry: "10/24", chipIcon: "https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/6803fc4bf822b8fc0ab25c8be56fadb6ca211791?placeholderIfAbsent=true", networkIcon: "https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/343ac87ece33f18283d32c216fd1b6802b77467a?placeholderIfAbsent=true", expenseAmount: 0, progressWidth: "0%", cardStyleOption: "gradient-purple", customImageUrl: null, limit: 100000000 }
        ];
    });

    // 2. Simpan data kartu (kecuali Base64 gambar) ke localStorage setiap kali state 'cards' berubah
    useEffect(() => {
        // Buat salinan kartu tanpa customImageUrl (Base64 string) untuk disimpan ke 'userCards'
        // customImageUrl (Base64) sudah disimpan secara terpisah di CardSettingsModal
        const cardsToSave = cards.map(card => {
            const { customImageUrl, ...rest } = card; // Ambil customImageUrl dan sisanya
            return rest; // Kembalikan objek tanpa customImageUrl
        });
        localStorage.setItem('userCards', JSON.stringify(cardsToSave));
    }, [cards]);
    // --- END: Perubahan di MainContent untuk Persistensi Gambar Lokal ---

    const [editingCardId, setEditingCardId] = useState(null);
    const [totalPengeluaran, setTotalPengeluaran] = useState(0);
    const [totalPemasukan, setTotalPemasukan] = useState(0);
    const [latestTransactions, setLatestTransactions] = useState([]);

    const spreadsheetId = '1blBKvMfDISgM1AA23lSL081wfQCnSSrWdRlpgGNpGGA';
    const apiKey = 'AIzaSyDVv-miQ_1nmTWOO3UwBL78mQX_XCzrXAA';
    const sheetName = 'Sheet1';
    const range = 'A:F';

    const parseNominal = (amountString) => {
        let cleanedString = String(amountString).replace(/Rp\s?/g, '').trim().replace(/,/g, '').replace(/\./g, '');
        const numericAmount = parseFloat(cleanedString);
        return isNaN(numericAmount) ? 0 : numericAmount;
    };

    const formatCurrency = (amount) => {
        if (typeof amount !== 'number' || isNaN(amount)) { return 'Rp 0'; }
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const getTypeColor = (type) => {
        return type.trim().toLowerCase() === 'pemasukan' ? 'text-green-600' : 'text-red-500';
    };

    const getTypeBackgroundColor = (type) => {
        return type.trim().toLowerCase() === 'pemasukan' ? 'bg-green-100' : 'bg-red-100';
    };

    useEffect(() => {
        const fetchAllDashboardData = async () => {
            const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}?key=${apiKey}`;
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error(`Gagal mengambil data`);
                const apiData = await response.json();
                const rows = apiData.values;

                if (!rows || rows.length < 2) { return; }

                const headers = rows[0].map(header => header.toLowerCase().replace(/\s/g, '').replace('(rp)', ''));
                
                const allFetchedTransactions = rows.slice(1).map((row, index) => {
                    const transaction = {};
                    headers.forEach((header, colIndex) => { transaction[header] = row[colIndex] || ''; });

                    const txDate = new Date(transaction.tanggal);
                    if (isNaN(txDate.getTime())) return null;

                    return {
                        id: `tx-${Date.now()}-${index}`,
                        date: txDate,
                        originalDateString: transaction.tanggal,
                        bankName: (transaction.kartu || '').trim(),
                        type: (transaction.jenis || '').trim(),
                        description: transaction.deskripsi,
                        amount: parseNominal(transaction.nominal),
                        paymentMethod: transaction.metodepembayaran,
                        originalIndex: index, // Menyimpan indeks baris asli
                    };
                }).filter(Boolean);

                const transactionsForRekap = selectedDate
                    ? allFetchedTransactions.filter(tx => tx.date.toDateString() === selectedDate.toDateString())
                    : allFetchedTransactions;

                let currentTotalPengeluaran = 0;
                let currentTotalPemasukan = 0;

                transactionsForRekap.forEach(tx => {
                    const txType = tx.type.toLowerCase();
                    if (txType === 'pemasukan') {
                        currentTotalPemasukan += tx.amount;
                    } else if (txType === 'pengeluaran') {
                        currentTotalPengeluaran += tx.amount;
                    }
                });

                const cardExpensesMap = new Map();
                cards.forEach(card => {
                    cardExpensesMap.set(card.bankName.trim(), { total: 0, limit: card.limit });
                });

                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();

                allFetchedTransactions.forEach(tx => {
                    const txType = tx.type.toLowerCase();
                    const txBank = tx.bankName;
                    if (txType === 'pengeluaran' && tx.date.getMonth() === currentMonth && tx.date.getFullYear() === currentYear) {
                        if (cardExpensesMap.has(txBank)) {
                            cardExpensesMap.get(txBank).total += tx.amount;
                        }
                    }
                });

                setTotalPengeluaran(currentTotalPengeluaran);
                setTotalPemasukan(currentTotalPemasukan);

                setCards(prevCards => prevCards.map(card => {
                    const expenseSummary = cardExpensesMap.get(card.bankName.trim());
                    const expense = expenseSummary ? expenseSummary.total : 0;
                    const cardLimit = card.limit;
                    let progress = cardLimit > 0 ? Math.min((expense / cardLimit) * 100, 100) : 0;
                    return { ...card, expenseAmount: expense, progressWidth: `${progress}%` };
                }));


                const latestNTransactions = allFetchedTransactions
                    .sort((a, b) => {
                        // Coba urutkan berdasarkan tanggal
                        const dateComparison = b.date - a.date;
                        if (dateComparison !== 0) {
                            return dateComparison; // Jika tanggal beda, urutkan berdasarkan tanggal (terbaru dulu)
                        }
                        // Jika tanggal sama, urutkan berdasarkan indeks asli (indeks lebih besar = lebih baru)
                        return b.originalIndex - a.originalIndex;
                    })
                    .slice(0, 4);
                setLatestTransactions(latestNTransactions);

            } catch (e) {
                console.error("Error fetching dashboard data:", e);
            }
        };

        fetchAllDashboardData();
    }, [selectedDate]);

    const handleDateSelect = (date) => { setSelectedDate(date); };
    const handleManageCardsClick = () => { setIsCardSettingsModalOpen(true); setEditingCardId(null); };
    const closeCardSettingsModal = () => { setIsCardSettingsModalOpen(false); setEditingCardId(null); };
    const handleEditCard = (cardId) => { setEditingCardId(cardId); };

    // Fungsi untuk memperbarui kartu yang sudah ada
    const handleUpdateCard = (updatedCard) => {
        setCards(prevCards => prevCards.map(card =>
            card.id === updatedCard.id ? { ...updatedCard } : card
        ));
        setEditingCardId(null); // Keluar dari mode edit setelah update
    };

    // Fungsi untuk menambah kartu baru
    const handleAddCard = (newCard) => {
        // newCard sudah memiliki ID dan customImageUrl (Base64) dari CardSettingsModal
        setCards(prevCards => [...prevCards, { ...newCard }]);
        setEditingCardId(null); // Keluar dari mode add setelah tambah
    };

    // Fungsi untuk menghapus kartu
    const handleDeleteCard = (cardId) => {
        setCards(prevCards => prevCards.filter(card => card.id !== cardId));
        // Hapus juga gambar dari localStorage saat kartu dihapus
        localStorage.removeItem(`card_image_${cardId}`);
        setEditingCardId(null);
    };

    const toggleOptionsMenu = () => { setIsOptionsMenuOpen(prev => !prev); };
    const closeOptionsMenu = () => { setIsOptionsMenuOpen(false); };
    useEffect(() => { const handleClickOutside = (event) => { if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) { closeOptionsMenu(); } }; document.addEventListener("mousedown", handleClickOutside); return () => { document.removeEventListener("mousedown", handleClickOutside); }; }, []);

    return (
        <div className="w-full">
            <h1 className="text-2xl font-medium leading-none uppercase text-neutral-800 font-poppins">
                HALO, siap atur keuangan hari ini? 💸💰{" "}
            </h1>
            <div className="mt-16 w-full flex justify-center">
                <div className="flex flex-wrap gap-5 items-stretch">
                    <section className="flex flex-col overflow-hidden rounded-xl border border-solid border-slate-200 min-w-60 w-[690px]">
                        <div className="flex-grow p-8 w-full bg-white">
                            <div className="flex flex-wrap gap-4 items-center w-full text-base leading-7 uppercase text-neutral-800">
                                <h2 className="flex-1 shrink my-auto basis-0 font-poppins">KARTU ANDA</h2>
                                <div className="relative" ref={optionsMenuRef}>
                                    <button onClick={toggleOptionsMenu} className="p-1 rounded-full hover:bg-gray-100">
                                        <img src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/de0e949633fd8c2d813e925ccd8ed722d6d17a65?placeholderIfAbsent=true" className="w-6 h-6" alt="Opsi" />
                                    </button>
                                    {isOptionsMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border">
                                            <button onClick={() => { handleManageCardsClick(); closeOptionsMenu(); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Kelola Kartu...</button>
                                            <button onClick={() => { closeOptionsMenu(); setIsCardSettingsModalOpen(true); setEditingCardId(null); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Tambah Kartu Baru</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-8 items-start mt-5 w-full">
                                {cards.map(card => (
                                    <CreditCard
                                        key={card.id}
                                        {...card}
                                        // Meneruskan customImageUrl ke CreditCard
                                        cardStyle={getCardStyleClass(card.cardStyleOption)}
                                    />
                                ))}
                            </div>
                        </div>
                        <footer className="flex items-center justify-end p-5 w-full bg-white border-t border-slate-200">
                            <button className="px-4 py-2 rounded-md border border-solid shadow-sm bg-neutral-800 text-slate-100 font-poppins hover:bg-neutral-700 transition-colors" onClick={handleManageCardsClick}>Kelola Kartu</button>
                        </footer>
                    </section>
                    <aside className="p-8 rounded-xl border border-solid border-slate-200 min-w-60 flex-1">
                        <h2 className="text-base leading-7 uppercase text-neutral-800 font-poppins">REKAP</h2>
                        <div className="flex gap-3 items-start mt-5">
                            <DatePicker selectedDate={selectedDate} onDateSelect={handleDateSelect} />
                        </div>
                        <div className="mt-4 space-y-4">
                            <SummaryCard title="Total Pengeluaran" amount={totalPengeluaran} backgroundColor="bg-red-400" link="/catat-transaksi?type=pengeluaran" />
                            <SummaryCard title="Total Pemasukan" amount={totalPemasukan} backgroundColor="bg-yellow-400" link="/catat-transaksi?type=pemasukan" />
                        </div>
                    </aside>
                </div>
            </div>
            <section className="mt-24 w-full">
                <h2 className="text-base leading-7 uppercase text-neutral-800 font-poppins">Transaksi terakhir</h2>
                <div className="mt-4 w-full space-y-3">
                    {latestTransactions.length === 0 ? (
                        <div>Tidak ada transaksi terakhir ditemukan.</div>
                    ) : (
                        latestTransactions.map(transaction => (
                            <TransactionCard
                                key={transaction.id}
                                {...transaction}
                                date={transaction.originalDateString}
                                amount={formatCurrency(transaction.amount)}
                                typeColor={getTypeColor(transaction.type)}
                                typeBackgroundColor={getTypeBackgroundColor(transaction.type)}
                            />
                        ))
                    )}
                </div>
            </section>
            {isCardSettingsModalOpen && (
                <CardSettingsModal
                    onClose={closeCardSettingsModal}
                    cards={cards}
                    editingCardId={editingCardId}
                    onEditCard={handleEditCard}
                    onUpdateCard={handleUpdateCard}
                    onAddCard={handleAddCard}
                    onDeleteCard={handleDeleteCard}
                    getCardStyleClass={getCardStyleClass}
                />
            )}
        </div>
    );
};
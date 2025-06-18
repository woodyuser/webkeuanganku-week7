// src/components/FilterControls.jsx
import React, { useState, useEffect } from 'react';
import { DatePicker } from './DatePicker';
import { TransactionCard } from './TransactionCard';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export const FilterControls = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('none');
  const [searchTerm, setSearchTerm] = useState('');

  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [transactionsError, setTransactionsError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const spreadsheetId = '1blBKvMfDISgM1AA23lSL081wfQCnSSrWdRlpgGNpGGA';
  const apiKey = 'AIzaSyDVv-miQ_1nmTWOO3UwBL78mQX_XCzrXAA';
  const sheetName = 'Sheet1';
  const range = 'A:F';

  const formatCurrency = (amountString) => {
    let cleanedString = String(amountString);
    cleanedString = cleanedString.replace(/Rp\s?/g, '').trim();
    cleanedString = cleanedString.replace(/,/g, '');
    cleanedString = cleanedString.replace(/\./g, '');
    
    const numericAmount = parseFloat(cleanedString);

    if (isNaN(numericAmount)) {
      console.warn("Could not parse amount for formatting:", amountString, "Cleaned to:", cleanedString, "Result:", numericAmount);
      return 'Rp 0';
    }

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericAmount);
  };

  const getTypeColor = (type) => {
    return type === 'Pemasukan' ? 'text-green-600' : 'text-red-500';
  };

  const getTypeBackgroundColor = (type) => {
    return type === 'Pemasukan' ? 'bg-green-100' : 'bg-red-100';
  };

  const formatLastUpdated = (date) => {
    if (!date) return 'Belum ada pembaruan';
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoadingTransactions(true);
      setTransactionsError(null);
      const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}?key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Gagal mengambil data: ${response.status} ${response.statusText}`);
        }
        const apiData = await response.json();
        const rows = apiData.values;

        if (!rows || rows.length < 2) {
          setData([]);
          setFilteredData([]);
          setLastUpdated(new Date());
          return;
        }

        const headers = rows[0].map(header => header.toLowerCase().replace(/\s/g, ''));
        const fetchedAndFormatted = rows.slice(1).map((row, index) => {
          const transaction = {};
          headers.forEach((header, colIndex) => {
            transaction[header] = row[colIndex] || '';
          });
          return {
            id: `tx-${Date.now()}-${index}`,
            date: transaction.tanggal,
            bankName: transaction.kartu,
            type: transaction.jenis,
            description: transaction.deskripsi,
            amount: transaction['nominal(rp)'],
            paymentMethod: transaction.metodepembayaran,
          };
        });

        setData(fetchedAndFormatted);
        applyFilters(sortOrder, selectedDate, searchTerm, fetchedAndFormatted);
        setLastUpdated(new Date());

      } catch (e) {
        console.error("Error fetching transactions:", e);
        setTransactionsError(e.message);
      } finally {
        setLoadingTransactions(false);
      }
    };

    fetchTransactions();

    const interval = setInterval(fetchTransactions, 60000);

    return () => clearInterval(interval);

  }, [spreadsheetId, apiKey, sheetName, range]);

  // >>>>>> PERUBAHAN DI SINI: Fungsi applyFilters untuk pencarian multi-kolom <<<<<<
  const applyFilters = (order, date, search, dataToFilter = data) => {
    let result = [...dataToFilter];

    if (date) {
      result = result.filter(item =>
        new Date(item.date).toDateString() === date.toDateString()
      );
    }

    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      result = result.filter(item =>
        // Cari di Deskripsi
        item.description.toLowerCase().includes(lowerCaseSearch) ||
        // Cari di Nama Kartu (Bank Name)
        item.bankName.toLowerCase().includes(lowerCaseSearch) ||
        // Cari di Metode Pembayaran
        item.paymentMethod.toLowerCase().includes(lowerCaseSearch) ||
        // Cari di Jenis Transaksi (Pemasukan/Pengeluaran)
        item.type.toLowerCase().includes(lowerCaseSearch)
      );
    }

    if (order === 'asc') {
      result.sort((a, b) => parseFloat(String(a.amount).replace(/[^0-9-]/g, '')) - parseFloat(String(b.amount).replace(/[^0-9-]/g, '')));
    } else if (order === 'desc') {
      result.sort((a, b) => parseFloat(String(b.amount).replace(/[^0-9-]/g, '')) - parseFloat(String(a.amount).replace(/[^0-9-]/g, '')));
    }

    setFilteredData(result);
  };
  // >>>>>> AKHIR PERUBAHAN <<<<<<

  useEffect(() => {
    applyFilters(sortOrder, selectedDate, searchTerm, data);
  }, [searchTerm, sortOrder, selectedDate, data]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
  };

  const handleFilter = (order) => {
    setSortOrder(order);
    setIsFilterMenuOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-4 mt-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
        <input
          type="text"
          placeholder="Cari (deskripsi, kartu, metode, jenis)" // >>> UBAH PLACEHOLDER INI <<<
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full md:w-80"
        />

        <div className="flex gap-4 relative">
          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex gap-2 items-center px-4 py-2.5 bg-white rounded-md border shadow-sm hover:bg-gray-50"
            >
              <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
              <span>
                {selectedDate
                  ? selectedDate.toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Select Date'}
              </span>
              <ChevronDownIcon
                className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${isDatePickerOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isDatePickerOpen && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <DatePicker
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate}
                  onClose={() => setIsDatePickerOpen(false)}
                />
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="flex gap-2 items-center px-4 py-2.5 bg-white rounded-md border shadow-sm hover:bg-gray-50"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/13606eae1ef4f44b3ec0d62e4fc89c6207122523"
                alt="Filter icon"
                className="w-5 h-5"
              />
              <span>Filter</span>
            </button>
            {isFilterMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <button onClick={() => handleFilter('asc')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Terkecil</button>
                <button onClick={() => handleFilter('desc')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Terbesar</button>
                <button onClick={() => handleFilter('none')} className="block w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-100">Reset Filter</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs italic text-gray-400 self-end">
        Last Updated: {formatLastUpdated(lastUpdated)}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {loadingTransactions ? (
          <div className="text-gray-600">Memuat transaksi...</div>
        ) : transactionsError ? (
          <div className="text-red-500">Error memuat transaksi: {transactionsError}</div>
        ) : filteredData.length > 0 ? (
          <>
            {filteredData.map((transaction, index) => (
              <div key={transaction.id} className={index > 0 ? "mt-5" : ""}>
                <TransactionCard
                  date={transaction.date}
                  bankName={transaction.bankName}
                  type={transaction.type}
                  description={transaction.description}
                  paymentMethod={transaction.paymentMethod}
                  amount={formatCurrency(transaction.amount)}
                  typeColor={getTypeColor(transaction.type)}
                  typeBackgroundColor={getTypeBackgroundColor(transaction.type)}
                />
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-500">Tidak ada data untuk kriteria ini.</p>
        )}
      </div>
    </div>
  );
};
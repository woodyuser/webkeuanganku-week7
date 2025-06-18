// src/components/StatistikPage.jsx
"use client";
import React, { useState, useEffect, useRef } from 'react';

import { BarChart } from './BarChart';
import { CalendarDaysIcon, ChevronDownIcon } from '@heroicons/react/24/outline';


export default function StatistikPage() {
    const [chartData, setChartData] = useState([]);
    const [loadingChart, setLoadingChart] = useState(true);
    const [chartError, setChartError] = useState(null);
    const [chartMaxScale, setChartMaxScale] = useState(1000);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [availableYears, setAvailableYears] = useState([]);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    const yearDropdownRef = useRef(null);

    const spreadsheetId = '1blBKvMfDISgM1AA23lSL081wfQCnSSrWdRlpgGNpGGA';
    const apiKey = 'AIzaSyDVv-miQ_1nmTWOO3UwBL78mQX_XCzrXAA';
    const sheetName = 'Sheet1';
    const range = 'A:F'; 

    const parseNominal = (amountString) => {
        let cleanedString = String(amountString).replace(/Rp\s?/g, '').trim().replace(/\./g, '').replace(/,/g, '');
        const numericAmount = parseFloat(cleanedString);
        return isNaN(numericAmount) ? 0 : numericAmount;
    };

    useEffect(() => {
        const fetchAndAggregateData = async () => {
            setLoadingChart(true);
            setChartError(null);
            
            const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}?key=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error(`Gagal mengambil data: ${response.status} ${response.statusText}`);
                const apiData = await response.json();
                const rows = apiData.values;

                if (!rows || rows.length < 2) {
                    setChartData([]);
                    setAvailableYears([]);
                    setChartMaxScale(1000);
                    console.warn("Tidak ada data atau hanya header ditemukan di spreadsheet.");
                    return;
                }

                const headers = rows[0].map(header => header.toLowerCase().replace(/\s|\(|\)/g, ''));
                const tanggalIndex = headers.indexOf('tanggal');
                const jenisIndex = headers.indexOf('jenis');
                const nominalIndex = headers.indexOf('nominalrp');

                if (tanggalIndex === -1 || jenisIndex === -1 || nominalIndex === -1) {
                    throw new Error("Satu atau lebih kolom header penting (Tanggal, Jenis, Nominal (Rp)) tidak ditemukan.");
                }

                const allTransactions = rows.slice(1).map((row, rowIndex) => {
                    const transaction = {
                        date: row[tanggalIndex] || '',
                        type: row[jenisIndex] || '',
                        amount: parseNominal(row[nominalIndex] || '0'),
                    };

                    const txDate = new Date(transaction.date);
                    if (isNaN(txDate.getTime())) return null;
                    if (!['Pemasukan', 'Pengeluaran'].includes(transaction.type)) return null;
                    
                    return transaction;
                }).filter(tx => tx !== null);


                // --- LOGIKA UNTUK BAR CHART ---
                const yearsSet = new Set();
                allTransactions.forEach(tx => { yearsSet.add(new Date(tx.date).getFullYear()); });
                const sortedYears = Array.from(yearsSet).sort((a, b) => b - a);
                setAvailableYears(sortedYears);
                if (sortedYears.length > 0 && !sortedYears.includes(selectedYear)) {
                    setSelectedYear(sortedYears[0]);
                }

                const transactionsForSelectedYear = allTransactions.filter(tx => new Date(tx.date).getFullYear() === selectedYear);
                const monthlyDataMap = new Map();
                transactionsForSelectedYear.forEach(tx => {
                    const txDate = new Date(tx.date);
                    const monthKey = `${txDate.getFullYear()}-${(txDate.getMonth() + 1).toString().padStart(2, '0')}`;
                    if (!monthlyDataMap.has(monthKey)) {
                        monthlyDataMap.set(monthKey, { income: 0, expense: 0 });
                    }
                    const monthSummary = monthlyDataMap.get(monthKey);
                    if (tx.type === 'Pemasukan') monthSummary.income += tx.amount;
                    else if (tx.type === 'Pengeluaran') monthSummary.expense += tx.amount;
                });
                const finalChartBars = [];
                let currentMaxSegmentValue = 0;
                for (let i = 0; i < 12; i++) {
                    const monthKey = `${selectedYear}-${(i + 1).toString().padStart(2, '0')}`;
                    const summary = monthlyDataMap.get(monthKey) || { income: 0, expense: 0 };
                    finalChartBars.push({ series1: summary.income, series2: summary.expense });
                    currentMaxSegmentValue = Math.max(currentMaxSegmentValue, summary.income, summary.expense);
                }
                const roundUpToNearest = (value, roundTo) => Math.ceil(value / roundTo) * roundTo;
                let calculatedMaxScale = currentMaxSegmentValue;
                if (calculatedMaxScale === 0) calculatedMaxScale = 1000;
                else if (calculatedMaxScale < 1000000) calculatedMaxScale = roundUpToNearest(calculatedMaxScale, 50000);
                else calculatedMaxScale = roundUpToNearest(calculatedMaxScale, 100000);
                
                setChartData(finalChartBars);
                setChartMaxScale(calculatedMaxScale);
                // --- AKHIR LOGIKA BAR CHART ---

            } catch (e) {
                console.error("Error fetching or aggregating data:", e);
                setChartError(e.message);
            } finally {
                setLoadingChart(false);
            }
        };
        fetchAndAggregateData();
    }, [selectedYear]);

    const handleYearChange = (year) => {
        setSelectedYear(year);
        setIsYearDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
                setIsYearDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full">
            <div className="mt-9 w-full max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col items-start max-w-full">
                    <div className="text-2xl font-medium leading-none uppercase text-neutral-800">
                        Bagaimana statistik keuangan mu?
                    </div>

                    <div className="mt-12 max-w-full w-full max-md:mt-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Analisis Bulanan</h3>
                            <div className="relative" ref={yearDropdownRef}>
                                <button
                                    onClick={() => setIsYearDropdownOpen(prev => !prev)}
                                    className="flex items-center gap-2 p-2 border rounded-md bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-700">{selectedYear}</span>
                                    <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isYearDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-full min-w-max bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                                        {availableYears.length > 0 ? (
                                            availableYears.map(year => (
                                                <button key={year} onClick={() => handleYearChange(year)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    {year}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 text-sm text-gray-500">Tidak ada data</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {loadingChart ? (
                            <div className="text-gray-600">Memuat data grafik...</div>
                        ) : chartError ? (
                            <div className="text-red-500">Error memuat grafik: {chartError}</div>
                        ) : chartData.length > 0 ? (
                            // <<< INI PERBAIKAN UTAMANYA: Tambahkan prop year={selectedYear}
                            <BarChart chartBars={chartData} maxChartValue={chartMaxScale} year={selectedYear} />
                        ) : (
                            <div className="text-gray-500">Tidak ada data untuk grafik pada tahun {selectedYear}.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
// src/components/BarChart.jsx
import React, { useState, useEffect, useRef } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import * as htmlToImage from 'html-to-image';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const BarChart = ({ chartBars, maxChartValue, year }) => {
    const maxBarVisualHeight = 180;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
    const [isPreparingDownload, setIsPreparingDownload] = useState(false); 
    const menuRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    const handleDownloadPNG = () => {
        // <<< PERBAIKAN 1: Langsung tutup menu agar tidak ikut tergambar.
        setIsMenuOpen(false);

        // Tampilkan tabel data untuk digambar
        setIsPreparingDownload(true);

        setTimeout(async () => {
            if (!chartRef.current) {
                setIsPreparingDownload(false);
                return;
            }
            try {
                const dataUrl = await htmlToImage.toPng(chartRef.current, {
                    backgroundColor: 'white',
                    pixelRatio: 2,
                });
                const link = document.createElement('a');
                link.download = `balance-chart-${year || 'data'}.png`;
                link.href = dataUrl;
                link.click();
            } catch (error) {
                console.error('Gagal membuat file PNG', error);
            } finally {
                // Sembunyikan kembali tabel data setelah selesai
                setIsPreparingDownload(false); 
                // setIsMenuOpen(false) di sini sudah tidak perlu karena sudah dipindah ke atas
            }
        }, 100);
    };

    const handleDownloadCSV = () => {
        // <<< PERBAIKAN 2: Tutup menu juga untuk konsistensi UX.
        setIsMenuOpen(false);

        if (!chartBars || chartBars.length === 0) return;
        
        const headers = ['Bulan', 'Tahun', 'Pemasukan', 'Pengeluaran'];
        const csvRows = [
            headers.join(','),
            ...chartBars.map((bar, index) =>
                [months[index], year || 'N/A', bar.series1, bar.series2].join(',')
            )
        ];
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `balance-data-${year || 'data'}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const scaleValue = (value) => {
        if (maxChartValue === 0) return 0;
        return (value / maxChartValue) * maxBarVisualHeight;
    };

    const numGridLines = 5;
    const yAxisLabels = [];
    const formatYAxisLabel = (value) => {
        if (value === 0) return `Rp 0`;
        if (value >= 1000000) return `Rp ${value / 1000000} jt`;
        if (value >= 1000) return `Rp ${value / 1000} rb`;
        return `Rp ${value}`;
    };

    for (let i = 0; i <= numGridLines; i++) {
        yAxisLabels.push((maxChartValue / numGridLines) * (numGridLines - i));
    }

    return (
        <div ref={chartRef} className="overflow-x-auto p-6 w-full bg-white rounded-md border border-solid shadow border-gray-200 min-h-[420px]">
            <div>
                 <div className="flex justify-between items-center w-full text-lg font-medium text-gray-900">
                     <span>Balance over time{year ? ` - ${year}` : ''}</span>
                     <div className="relative" ref={menuRef}>
                         <button onClick={() => setIsMenuOpen(p => !p)} className="p-1 rounded-full hover:bg-gray-100">
                             <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
                         </button>
                         {isMenuOpen && (
                             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                                 <button onClick={handleDownloadPNG} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                     Download as PNG
                                 </button>
                                 <button onClick={handleDownloadCSV} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                     Download as CSV
                                 </button>
                             </div>
                         )}
                     </div>
                 </div>
                 <div className="flex gap-4 justify-center items-center mt-2 text-sm text-gray-700">
                     <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500"></span><span>Pemasukan</span></div>
                     <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"></span><span>Pengeluaran</span></div>
                 </div>
            </div>

            <div className="mt-24">
                <div className="flex w-full">
                    <div className="flex flex-col justify-between pr-4 text-xs text-gray-500" style={{ height: `${maxBarVisualHeight}px` }}>
                        {yAxisLabels.map((label, index) => <span key={index}>{formatYAxisLabel(label)}</span>)}
                    </div>
                    <div className="flex-grow flex flex-col">
                        <div className="relative w-full" style={{ height: `${maxBarVisualHeight}px` }}>
                            <div className="absolute inset-0 flex flex-col justify-between">
                                {[...Array(numGridLines + 1)].map((_, index) => <div key={index} className="w-full h-px bg-slate-100" />)}
                            </div>
                            <div className="absolute inset-0 flex justify-between items-end px-2">
                                {chartBars.map((bar, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center flex-1 min-w-[40px] relative group"
                                        onMouseEnter={() => setHoveredBarIndex(index)}
                                        onMouseLeave={() => setHoveredBarIndex(null)}
                                    >
                                        {hoveredBarIndex === index && (
                                            <div className="absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg z-10 whitespace-nowrap">
                                                <p>Pemasukan: {formatYAxisLabel(bar.series1)}</p>
                                                <p>Pengeluaran: {formatYAxisLabel(bar.series2)}</p>
                                            </div>
                                        )}
                                        <div className="w-8 rounded-t-md flex flex-col-reverse overflow-hidden">
                                            {bar.series2 > 0 && <div className="bg-red-500" style={{ height: `${scaleValue(bar.series2)}px` }}></div>}
                                            {bar.series1 > 0 && <div className="bg-green-500" style={{ height: `${scaleValue(bar.series1)}px` }}></div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center mt-2 px-2">
                            {months.map(month => (
                                <div key={month} className="text-center text-xs text-gray-500 flex-1 min-w-[40px]">{month}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isPreparingDownload && (
                <div className="mt-8">
                    <h3 className="text-md font-medium text-gray-800 mb-2">Data Ringkas{year ? ` - ${year}` : ''}</h3>
                    <table className="w-full text-xs border-collapse border border-slate-300">
                        <thead>
                            <tr className="bg-slate-100 font-medium">
                                <th className="border border-slate-300 p-2 text-left">Bulan</th>
                                <th className="border border-slate-300 p-2 text-left">Pemasukan</th>
                                <th className="border border-slate-300 p-2 text-left">Pengeluaran</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chartBars.map((bar, index) => (
                                <tr key={index} className="odd:bg-white even:bg-slate-50">
                                    <td className="border border-slate-300 p-2">{months[index]}</td>
                                    <td className="border border-slate-300 p-2">{formatYAxisLabel(bar.series1)}</td>
                                    <td className="border border-slate-300 p-2">{formatYAxisLabel(bar.series2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
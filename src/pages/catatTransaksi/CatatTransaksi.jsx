"use client";
import React from 'react';
// Hapus: import { Sidebar } from './Sidebar';

// Asumsi path komponen ini sudah benar atau bisa disesuaikan nanti
import { PageHeader } from './PageHeader'; 
import { FilterControls } from './FilterControls';

// Nama komponen diubah menjadi Page agar lebih jelas
function CatatTransaksiPage() { 
  const spreadsheetId = '1blBKvMfDISgM1AA23lSL081wfQCnSSrWdRlpgGNpGGA';

  return (
    // Kita hanya mengembalikan konten spesifik untuk halaman ini.
    // Tidak ada lagi <div>, <Sidebar>, atau <footer>.
    <div className="w-full">
      <div className="mt-6">
        <div className="flex flex-col w-full">
          <PageHeader spreadsheetId={spreadsheetId} />
          <FilterControls />
          {/* Di sini Anda bisa menambahkan komponen lain seperti tabel transaksi, dll. */}
        </div>
      </div>
    </div>
  );
}

export default CatatTransaksiPage;
"use client";
import React, { useState } from "react";

export const FAQSection = () => { // className prop dihapus karena parent AboutPage yang akan mengaturnya
  const [openItems, setOpenItems] = useState({
    1: true
  });

  const faqItems = [
    { question: "Apa itu KEUKU?", answer: "KEUKU adalah sebuah website pencatat keuangan pribadi yang dirancang untuk membantu Anda mengelola pemasukan dan pengeluaran dengan mudah. Dengan KEUKU, Anda bisa melihat gambaran lengkap kondisi keuangan Anda, membuat anggaran, dan mencapai tujuan finansial." },
    { question: "Bagaimana cara kerja KEUKU?", answer: "Kamu cukup input transaksi di Google Spreadsheet yang sudah disediakan, lalu data tersebut akan otomatis tersinkronisasi ke dalam aplikasi KEUKU." },
    { question: "Apa saja yang dicatat pada spreadsheet?", answer: "Pada spreadsheet KEUKU, Anda bisa mencatat detail transaksi seperti tanggal transaksi, jenis transaksi (pemasukan atau pengeluaran), kategori transaksi (misalnya makanan, transportasi, gaji, dll.), jumlah uang, dan deskripsi singkat jika diperlukan. Semua kolom ini dirancang untuk memberikan informasi yang lengkap namun tetap mudah diisi." },
    { question: "Apakah KEUKU bisa membaca saldo kartu otomatis?", answer: "Saat ini, KEUKU belum memiliki fitur untuk membaca saldo kartu secara otomatis. Anda perlu menginput transaksi secara manual melalui Google Spreadsheet." },
    { question: "Kenapa KEUKU menggunakan Spreadsheet?", answer: "KEUKU menggunakan Google Spreadsheet karena fleksibilitasnya dalam mengelola data. Spreadsheet memungkinkan pengguna untuk dengan mudah menambahkan, mengedit, dan melihat transaksi keuangan mereka tanpa perlu aplikasi tambahan. Selain itu, Google Spreadsheet juga memungkinkan kolaborasi dan akses dari berbagai perangkat." },
    { question: "Apakah KEUKU bisa dipakai untuk keuangan bisnis?", answer: "KEUKU dirancang untuk keuangan pribadi, namun Anda bisa menggunakannya untuk keuangan bisnis kecil dengan menyesuaikan kategori dan jenis transaksi sesuai kebutuhan bisnis Anda. Pastikan untuk memisahkan transaksi pribadi dan bisnis agar laporan keuangan tetap jelas." },
  ];

  const toggleItem = (index) => {
    setOpenItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="flex relative flex-col gap-16 items-center w-[886px] mx-auto">
      <h2 className="relative self-stretch text-2xl font-medium leading-5 text-center uppercase text-neutral-800">
        Frequently asked question?
      </h2>
      <div className="flex relative flex-col gap-2.5 items-center self-stretch w-full">
        {faqItems.map((item, index) => (
          <div key={index} className="w-full">
            {openItems[index] ? (
              <div className="flex relative flex-col gap-8 items-start self-stretch px-0 py-8 border-b border-solid border-b-neutral-800 w-full">
                <div className="flex relative justify-between items-center self-stretch w-full">
                  <h3 className="relative text-2xl font-medium leading-5 uppercase text-neutral-800">
                    {item.question}
                  </h3>
                  <button onClick={() => toggleItem(index)} className="flex items-center justify-center w-6 h-6" aria-expanded={openItems[index]} aria-controls={`faq-answer-${index}`}>
                    <div dangerouslySetInnerHTML={{ __html: "<svg width=\"25\" height=\"24\" viewBox=\"0 0 25 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M5.5 12H19.5\" stroke=\"#242424\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>", }} />
                  </button>
                </div>
                {item.answer && (
                  <div id={`faq-answer-${index}`} className="relative text-base leading-6 uppercase text-neutral-800 w-full">
                    {item.answer}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex relative justify-between items-center self-stretch px-0 py-8 border-b border-solid border-b-neutral-800 w-full">
                <h3 className="relative text-2xl font-medium leading-5 uppercase text-neutral-800">
                  {item.question}
                </h3>
                <button onClick={() => toggleItem(index)} className="flex items-center justify-center w-6 h-6" aria-expanded={openItems[index]} aria-controls={`faq-answer-${index}`}>
                  <div dangerouslySetInnerHTML={{ __html: "<svg width=\"25\" height=\"24\" viewBox=\"0 0 25 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M12.5 5V19\" stroke=\"#242424\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> <path d=\"M5.5 12H19.5\" stroke=\"#242424\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>", }} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
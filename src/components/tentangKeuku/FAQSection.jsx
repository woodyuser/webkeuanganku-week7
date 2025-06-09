"use client";
import React, { useState } from 'react';

export const FAQSection = () => {
  const [openItems, setOpenItems] = useState({
    1: true // Second item is open by default
  });

  const faqItems = [
    {
      question: "Apa itu KEUKU?",
    },
    {
      question: "Bagaimana cara kerja KEUKU?",
      answer: "Kamu cukup input transaksi di Google Spreadsheet yang sudah disediakan, lalu data tersebut akan otomatis tersinkronisasi ke dalam aplikasi KEUKU.",
    },
    {
      question: "apa saja yang dicatat pada spreadsheet?",
    },
    {
      question: "Apakah KEUKU bisa membaca saldo kartu otomatis?",
    },
    {
      question: "Kenapa KEUKU menggunakan Spreadsheet?",
    },
    {
      question: "Apakah KEUKU bisa dipakai untuk keuangan bisnis?",
    },
  ];

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="flex relative flex-col gap-16 items-center w-[733px]">
      <h2 className="relative self-stretch text-2xl font-medium leading-5 text-center uppercase text-neutral-800">
        Frequently asked question?
      </h2>
      <div className="flex relative flex-col gap-2.5 items-center self-stretch">
        {faqItems.map((item, index) => (
          <div key={index}>
            {openItems[index] ? (
              <div className="flex relative flex-col gap-8 items-start self-stretch px-0 py-8 border-b border-solid border-b-neutral-800 w-[733px]">
                <div className="flex relative justify-between items-center self-stretch">
                  <h3 className="relative text-2xl font-medium leading-5 uppercase text-neutral-800">
                    {item.question}
                  </h3>
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex items-center justify-center w-6 h-6"
                    aria-expanded={openItems[index]}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          "<svg width=\"25\" height=\"24\" viewBox=\"0 0 25 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M5.5 12H19.5\" stroke=\"#242424\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>",
                      }}
                    />
                  </button>
                </div>
                {item.answer && (
                  <div
                    id={`faq-answer-${index}`}
                    className="relative text-base leading-6 uppercase text-neutral-800 w-[541px]"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex relative justify-between items-center self-stretch px-0 py-8 border-b border-solid border-b-neutral-800 w-[733px]">
                <h3 className="relative text-2xl font-medium leading-5 uppercase text-neutral-800">
                  {item.question}
                </h3>
                <button
                  onClick={() => toggleItem(index)}
                  className="flex items-center justify-center w-6 h-6"
                  aria-expanded={openItems[index]}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        "<svg width=\"25\" height=\"24\" viewBox=\"0 0 25 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M12.5 5V19\" stroke=\"#242424\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> <path d=\"M5.5 12H19.5\" stroke=\"#242424\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>",
                    }}
                  />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

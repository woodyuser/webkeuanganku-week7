import React from 'react';

const items = [
  "KEUKU", "KEUANGANKU", "KEUKU", "KEUANGANKU", "KEUKU", "KEUANGANKU",
];

export const ScrollingBanner = ({ className }) => {
  const marqueeItems = [];
  for (let i = 0; i < items.length; i++) {
    marqueeItems.push(
      <div key={`text-${i}`} className="text-3xl font-medium text-center uppercase whitespace-nowrap text-slate-100">
        {items[i]}
      </div>
    );
    marqueeItems.push(
      <div key={`diamond-${i}`} className="text-3xl font-medium text-center uppercase text-slate-100">
        🔹
      </div>
    );
  }

  const fullMarquee = [...marqueeItems, ...marqueeItems];

  return (
    <div className={`relative overflow-hidden w-full bg-neutral-800 py-5 ${className || ''}`}>
      <div
        className="flex gap-16 items-center animate-marquee"
        style={{
          width: "max-content",
          animation: "marquee 15s linear infinite",
        }}
      >
        {fullMarquee}
      </div>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            will-change: transform;
          }
        `}
      </style>
    </div>
  );
};
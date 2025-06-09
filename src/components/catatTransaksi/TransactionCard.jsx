import React from 'react';

export const TransactionCard = React.memo(({
  bankName,
  date,
  description,
  paymentMethod,
  amount
}) => {
  return (
    <article className="flex justify-between items-center px-10 py-11 w-full bg-white shadow-sm max-md:px-6 max-md:py-8 max-sm:flex-col max-sm:gap-5 max-sm:px-4 max-sm:py-5">
      <div className="flex gap-8 items-start max-md:gap-5 max-sm:flex-col max-sm:gap-4 max-sm:w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/14d17258cf4c00222afbff9f17e26d9758cc293c?placeholderIfAbsent=true"
          alt={`${bankName} logo`}
          className="w-60 max-lg:w-44 max-sm:w-32 max-sm:self-center"
          loading="lazy"
        />
        <div className="flex flex-col gap-5 items-start max-sm:gap-4 max-sm:w-full">
          <div className="flex flex-col items-start w-full">
            <h2 className="text-4xl font-bold text-black leading-[60px] max-md:text-3xl max-sm:text-2xl">
              {bankName}
            </h2>
            <time dateTime={date} className="w-full text-base leading-7 text-black max-md:text-sm max-sm:text-xs">
              {date}
            </time>
          </div>
          <p className="w-full text-2xl leading-10 text-black max-md:text-xl max-sm:text-base">
            {description}
          </p>
          <p className="text-2xl font-bold leading-10 text-green-600 max-md:text-xl max-sm:text-base">
            {paymentMethod}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end h-56 max-md:h-auto max-sm:items-center max-sm:w-full max-sm:h-auto">
        <div className="flex gap-8 items-end">
          <div className="flex flex-col items-center">
            <p className="text-2xl leading-7 text-orange-500 max-md:text-xl max-sm:text-lg">
              {amount}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
});

TransactionCard.displayName = 'TransactionCard';

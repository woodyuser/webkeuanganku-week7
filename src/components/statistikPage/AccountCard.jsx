import React from 'react';
import { Badge } from './Badge';

export const AccountCard = ({
  imageSrc,
  title,
  balance,
  percentage,
  isPositive
}) => {
  return (
    <div className="flex flex-wrap gap-6 items-start p-6 w-full bg-white rounded-md border border-solid shadow border-[color:var(--Neutral-200,#E3E8EF)] max-md:px-5 max-md:max-w-full">
      <img
        src={imageSrc}
        className="object-contain shrink-0 aspect-square w-[120px]"
        alt=""
      />
      <div className="flex-1 shrink basis-0 min-w-60 max-md:max-w-full">
        <div className="flex flex-wrap gap-4 items-center w-full text-lg leading-loose text-gray-900 max-md:max-w-full">
          <div className="flex-1 shrink self-stretch my-auto text-gray-900 basis-0 max-md:max-w-full">
            {title}
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/de0e949633fd8c2d813e925ccd8ed722d6d17a65?placeholderIfAbsent=true"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            alt=""
          />
        </div>
        <div className="mt-6 w-full max-md:max-w-full">
          <div className="text-sm leading-none text-gray-500 max-md:max-w-full">
            Current balance
          </div>
          <div className="flex flex-wrap gap-4 items-center mt-2 w-full whitespace-nowrap max-md:max-w-full">
            <div className="flex-1 shrink self-stretch my-auto text-3xl leading-none text-gray-900 basis-[18px] max-md:max-w-full">
              {balance}
            </div>
            <Badge percentage={percentage} isPositive={isPositive} />
          </div>
        </div>
      </div>
    </div>
  );
};

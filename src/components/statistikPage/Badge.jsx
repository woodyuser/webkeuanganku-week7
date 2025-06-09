import React from 'react';

export const Badge = ({ percentage, isPositive }) => {
  const bgColor = isPositive ? 'bg-emerald-50' : 'bg-red-50';
  const textColor = isPositive ? 'text-green-700' : 'text-red-700';
  const iconSrc = isPositive ? 'https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/cc988106d88e3fd890a64ab58d5a110c8fb76f22?placeholderIfAbsent=true' : 'https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/cf91136bf83b890fcda910335020585819b54d39?placeholderIfAbsent=true';

  return (
    <div className={`flex gap-1 justify-center items-center self-stretch py-0.5 pr-2 pl-2.5 my-auto text-sm leading-none ${textColor} ${bgColor} rounded-2xl`}>
      <img
        src={iconSrc}
        className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
        alt=""
      />
      <div className={`self-stretch my-auto ${textColor}`}>
        {percentage}
      </div>
    </div>
  );
};

import React from 'react';

const chartBars = [
  { series1: 39, series2: 28, series3: 32, series4: 80 },
  { series1: 66, series2: 44, series3: 56, series4: 12 },
  { series1: 49, series2: 32, series3: 40, series4: 56 },
  { series1: 60, series2: 40, series3: 48, series4: 28 },
  { series1: 54, series2: 36, series3: 44, series4: 44 },
  { series1: 43, series2: 28, series3: 36, series4: 64 },
  { series1: 56, series2: 40, series3: 48, series4: 36 },
  { series1: 33, series2: 24, series3: 28, series4: 96 },
  { series1: 66, series2: 44, series3: 56, series4: 12 },
  { series1: 56, series2: 40, series3: 48, series4: 36 },
  { series1: 42, series2: 28, series3: 36, series4: 80 },
  { series1: 60, series2: 40, series3: 48, series4: 28 }
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const BarChart = () => {
  return (
    <div className="overflow-hidden p-6 w-full bg-white rounded-md border border-solid shadow border-[color:var(--Neutral-200,#E3E8EF)] min-h-[300px] max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-4 items-center w-full text-lg font-medium leading-loose text-gray-900 max-md:max-w-full">
        <div className="flex-1 shrink self-stretch my-auto text-gray-900 basis-0 max-md:max-w-full">
          Balance over time
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/09cb2280e54a4aa68e1974b236997d01/de0e949633fd8c2d813e925ccd8ed722d6d17a65?placeholderIfAbsent=true"
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          alt=""
        />
      </div>
      <div className="mt-5 w-full max-md:max-w-full">
        <div className="flex z-10 flex-wrap gap-6 justify-between px-5 min-h-[178px] max-md:max-w-full">
          {chartBars.map((bar, index) => (
            <div
              key={index}
              className={`w-8 rounded-md bg-slate-200`}
              style={{ paddingTop: `${bar.series4}px` }}
            >
              <div
                className="bg-blue-300 rounded-md"
                style={{ paddingTop: `${bar.series3}px` }}
              >
                <div
                  className="bg-blue-600 rounded-md"
                  style={{ paddingTop: `${bar.series2}px` }}
                >
                  <div
                    className="flex shrink-0 bg-blue-700 rounded-md"
                    style={{ height: `${bar.series1}px` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-0 w-full min-h-[204px] max-md:max-w-full">
          <div className="flex-1 w-full max-md:max-w-full">
            {[...Array(6)].map((_, index) => (
              <div key={index} className={`w-full max-md:max-w-full ${index > 0 ? 'mt-9' : ''}`}>
                <div className="shrink-0 h-px border border-solid bg-slate-100 border-slate-100 max-md:max-w-full" />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-8 justify-between items-center px-6 mt-2 w-full text-xs text-gray-500 whitespace-nowrap max-md:px-5 max-md:max-w-full">
            {months.map((month) => (
              <div key={month} className="self-stretch my-auto text-gray-500">
                {month}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";
import React, { useState } from 'react';

export const FilterControls = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const filters = ['All', 'Income', 'Expense', 'Transfer'];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setIsDatePickerOpen(false);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex gap-8 items-start max-sm:flex-col max-sm:gap-4 max-sm:w-full">
      <div className="relative">
        <button
          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          className="flex gap-2 justify-end items-start px-4 py-2.5 bg-white rounded-md border shadow-sm border-slate-300 hover:bg-slate-50 transition-colors max-sm:justify-center max-sm:px-3 max-sm:py-2 max-sm:w-full"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
               xmlns="http://www.w3.org/2000/svg"
               className="w-[20px] max-sm:w-[16px] h-[20px] max-sm:h-[16px]">
            <path d="M13.3333 1.66663V4.99996M6.66667 1.66663V4.99996M2.5 8.33329H17.5M4.16667 3.33329H15.8333C16.7538 3.33329 17.5 4.07948 17.5 4.99996V16.6666C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6666V4.99996C2.5 4.07948 3.24619 3.33329 4.16667 3.33329Z"
                  stroke="#364152" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-medium leading-5 text-gray-700 max-sm:text-xs">
            {selectedDate || 'Select date'}
          </span>
        </button>
        {isDatePickerOpen && (
          <div className="absolute top-full mt-1 bg-white rounded-md shadow-lg border border-slate-200 p-2 z-10">
            <input
              type="date"
              onChange={handleDateChange}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex gap-2 justify-center items-center px-4 py-2.5 bg-white rounded-md border shadow-sm border-slate-300 hover:bg-slate-50 transition-colors max-sm:px-3 max-sm:py-2 max-sm:w-full"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
               xmlns="http://www.w3.org/2000/svg"
               className="w-[20px] max-sm:w-[16px] h-[20px] max-sm:h-[16px]">
            <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                  stroke="#364152" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-medium leading-5 text-gray-700 max-sm:text-xs">
            {selectedFilter || 'Filter'}
          </span>
        </button>
        {isFilterOpen && (
          <div className="absolute top-full mt-1 bg-white rounded-md shadow-lg border border-slate-200 w-40 z-10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterSelect(filter)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

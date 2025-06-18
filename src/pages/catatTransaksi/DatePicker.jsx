import React, { useRef, useEffect, useState } from "react";

export const DatePicker = ({ onDateSelect, selectedDate, onClose = () => {} }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const dropdownRef = useRef(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleDateClick = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onDateSelect(newDate);
    onClose();
  };

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`w-8 h-8 text-sm rounded-md hover:bg-blue-100 transition-colors font-poppins ${
            isSelected
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-[280px]"
    >
      {/* Header Month/Year */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigateMonth("prev")}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="text-lg font-semibold font-poppins">
          {months[currentMonth]} {currentYear}
        </h3>

        <button
          onClick={() => navigateMonth("next")}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2 font-poppins"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
        <button
          onClick={() => {
            const today = new Date();
            onDateSelect(today);
            onClose();
          }}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-poppins"
        >
          Today
        </button>
        <button
          onClick={() => {
            onDateSelect(null);
            onClose();
          }}
          className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md transition-colors font-poppins"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

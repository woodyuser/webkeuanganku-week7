import React from "react";

function InputField({ type, placeholder, value, onChange, error }) {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`px-8 py-5 w-full text-base text-gray-500 bg-white rounded-md border border-solid ${
          error ? "border-red-500" : "border-neutral-500 border-opacity-70"
        } outline-none max-sm:px-5 max-sm:py-4`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 ml-2">{error}</p>
      )}
    </div>
  );
}

export default InputField;

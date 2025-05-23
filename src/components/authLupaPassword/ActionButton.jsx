import React from "react";

function ActionButton({ text, type = "button" }) {
  return (
    <button
      type={type}
      className="h-14 text-xl font-semibold text-white rounded-md cursor-pointer bg-neutral-800 flex items-center justify-center hover:bg-neutral-800 transition-colors w-full"
    >
      {text}
    </button>
  );
}

export default ActionButton;

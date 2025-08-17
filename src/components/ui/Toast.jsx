"use client";

import React from "react";

const Toast = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;

  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
        ? "bg-red-600"
        : "bg-blue-600";
  const borderColor =
    type === "success"
      ? "border-green-500"
      : type === "error"
        ? "border-red-500"
        : "border-blue-500";

  return (
    <div
      className={`fixed top-20 left-4 z-50 ${bgColor} ${borderColor} border text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 text-white hover:text-gray-200 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;

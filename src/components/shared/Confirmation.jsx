"use client";
import React from "react";

export default function ConfirmDialog({
  title = "Confirm Action",
  message,
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  const handleClick = () => {
    const confirmed = window.confirm(
      `${title ? title + "\n\n" : ""}${message}`
    );
    if (confirmed) {
      onConfirm();
    } else {
      onCancel && onCancel();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
    >
      {confirmText}
    </button>
  );
}

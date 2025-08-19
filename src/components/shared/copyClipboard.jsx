"use client";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function TeamIdDisplay({ teamId }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (teamId) {
      navigator.clipboard.writeText(teamId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // reset after 1.5s
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <span className="text-white/80 font-mono text-sm">
        Team ID: {teamId}
      </span>
      <button
        onClick={handleCopy}
        className="p-1 rounded-md bg-green-600/70 hover:bg-green-500 transition"
      >
        {copied ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <Copy className="w-4 h-4 text-white" />
        )}
      </button>
    </div>
  );
}

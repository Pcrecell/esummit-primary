"use client";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

export default function TeamHeader({ teamInfo, onDisband }) {
  const [copied, setCopied] = useState(false);
    const { profile } = useAuth();

  const handleCopy = () => {
    if (teamInfo?.teamId) {
      navigator.clipboard.writeText(teamInfo.teamId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="flex items-center justify-between mb-0">
      {/* Left: Team Info */}
      <div>
        <h2 className="text-2xl md:text-4xl font-mono font-bold text-white tracking-wider mb-2">
          {teamInfo?.teamName}
        </h2>

        <div className="flex items-center gap-2">
          <p className="text-green-400 font-mono text-lg">
            Team ID: {teamInfo?.teamId}
          </p>
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
      </div>

      {/* Right: Disband Team Button */}
      {
        teamInfo?.leaderId === profile?.elixir &&  (<div className = "ml-5 md:-translate-y-4"><button
        onClick={onDisband}
        className="px-2 py-1 md:m-5 justify-center rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition"
      >
        Disband Team
      </button>
      </div>
        )
      }
     
    </div>
  );
}

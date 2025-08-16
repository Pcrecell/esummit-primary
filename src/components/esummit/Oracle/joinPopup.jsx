"use client";
import React, { useRef, useEffect, useState } from "react";

const JoinPopup = ({ onClose }) => {
  const modalRef = useRef(null);
  const [teamName, setTeamName] = useState("");
  const [yourElixirId, setYourElixirId] = useState("");
  const [teamLeadElixirId, setTeamLeadElixirId] = useState("");
  const [teamId, setTeamId] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && 
          !modalRef.current.contains(event.target) &&
          !event.target.closest('input, button, label')) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Joining team:", { 
    //   teamName, 
    //   yourElixirId, 
    //   teamLeadElixirId, 
    //   teamId 
    // });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-2 sm:p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl 
                   max-h-[90vh] rounded-xl sm:rounded-2xl shadow-2xl"
      >
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain flex flex-col justify-center items-center px-8 py-6 overflow-auto rounded-xl sm:rounded-2xl"
          style={{
            backgroundImage: `url('https://i.postimg.cc/vmhtZ3Tt/KIITESUMMIT-POPUP-PAY-1.png')`,
            minHeight: "400px",
          }}
        >
          {/* Title */}
          <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl mb-4">
            Join a Team
          </h2>

          {/* Form Inputs */}
          <div className="w-full max-w-sm space-y-3">
            {/* Team Name */}
            <div className="flex items-center gap-2 w-full">
              <label className="text-white font-semibold text-sm w-32 text-left">
                Team Name:
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="flex-1 px-2 py-1.5 bg-yellow-100/90 rounded text-gray-800 placeholder-gray-500 
                          focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm
                          border border-yellow-400/30"
                required
              />
            </div>

            {/* Your Elixir ID */}
            <div className="flex items-center gap-2 w-full">
              <label className="text-white font-semibold text-sm w-32 text-left">
                Your Elixir ID:
              </label>
              <input
                type="text"
                value={yourElixirId}
                onChange={(e) => setYourElixirId(e.target.value)}
                className="flex-1 px-2 py-1.5 bg-yellow-100/90 rounded text-gray-800 placeholder-gray-500 
                          focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm
                          border border-yellow-400/30"
                required
              />
            </div>

            {/* Team Lead Elixir ID */}
            <div className="flex items-center gap-2 w-full">
              <label className="text-white font-semibold text-sm w-32 text-left">
                Team Lead Elixir ID:
              </label>
              <input
                type="text"
                value={teamLeadElixirId}
                onChange={(e) => setTeamLeadElixirId(e.target.value)}
                className="flex-1 px-2 py-1.5 bg-yellow-100/90 rounded text-gray-800 placeholder-gray-500 
                          focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm
                          border border-yellow-400/30"
                required
              />
            </div>

            {/* Team ID */}
            <div className="flex items-center gap-2 w-full">
              <label className="text-white font-semibold text-sm w-32 text-left">
                Team ID:
              </label>
              <input
                type="text"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                placeholder="Enter Team ID"
                className="flex-1 px-2 py-1.5 bg-yellow-100/90 rounded text-gray-800 placeholder-gray-500 
                          focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm
                          border border-yellow-400/30"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-3">
              <button
                type="submit"
                onClick={handleSubmit}
                className="relative w-full max-w-[160px] 
                           cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                <img
                  src="https://i.postimg.cc/4xgHwDWF/KIITESUMMIT-POPUP-PAYButtoon.png"
                  alt="Join Team"
                  className="w-full rounded-md"
                />
                <span className="absolute inset-0 flex items-center justify-center 
                               text-white font-bold text-sm">
                  JOIN TEAM
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPopup;
"use client";
import React, { useRef, useEffect, useState } from "react";

const JoinPopup = ({ onClose }) => {
  const modalRef = useRef(null);
  const [teamCode, setTeamCode] = useState("");
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the modal and not on any form element
      if (modalRef.current && 
          !modalRef.current.contains(event.target) &&
          !event.target.closest('input, button, label, form')) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle join team logic here
    console.log("Joining team:", { teamName, teamCode });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-2 sm:p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl 
                   max-h-[90vh] rounded-xl sm:rounded-2xl shadow-2xl"
      >
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 overflow-auto rounded-xl sm:rounded-2xl"
          style={{
            backgroundImage: `url('https://i.postimg.cc/vmhtZ3Tt/KIITESUMMIT-POPUP-PAY-1.png')`,
            minHeight: "400px",
          }}
        >
          {/* Info Text */}
          <div className="flex flex-col gap-y-0 items-center text-center mb-6 sm:mb-8">
            <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-4">
              Join a Team
            </h2>
            <ul className="list-disc list-inside space-y-2 text-white text-xs sm:text-sm md:text-base">
              <li className="leading-relaxed">TEAM SIZE: 3 TO 5 MEMBERS</li>
              <li className="leading-relaxed">ALL MEMBERS MUST BE KIIT STUDENTS</li>
            </ul>
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
            {/* Team Name Input */}
            <div className="flex items-center gap-4">
              <label className="text-white font-bold w-1/3">Team Name:</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="flex-1 px-4 py-2 bg-white/90 rounded-md text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Team Code Input */}
            <div className="flex items-center gap-4">
              <label className="text-white font-bold w-1/3">Team ID:</label>
              <input
                type="text"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value)}
                placeholder="Enter Team ID"
                className="flex-1 px-4 py-2 bg-white/90 rounded-md text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="relative w-full max-w-[200px] sm:max-w-[180px] md:max-w-[200px] 
                           cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                <img
                  src="https://i.postimg.cc/4xgHwDWF/KIITESUMMIT-POPUP-PAYButtoon.png"
                  alt="Join Team"
                  className="w-full rounded-md"
                />
                <span className="absolute inset-0 flex items-center justify-center 
                               text-white font-bold text-xs sm:text-sm md:text-base">
                  JOIN TEAM
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinPopup;
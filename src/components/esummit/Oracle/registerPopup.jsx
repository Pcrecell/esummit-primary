"use client";
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const RegisterPopup = ({ onClose }) => {
  const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleJoinTeam = () => {
    router.push('/oracle/join'); // Redirect to join team page
    onClose(); // Close the popup
  };

  const handleCreateTeam = () => {
    router.push('/oracle/create'); // Redirect to create team page
    onClose(); // Close the popup
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
          <div className="flex flex-col gap-y-0 items-center text-center mb-2 md:mb-6">
            <ul className="list-disc list-inside space-y-0 md:space-y-2 text-white text-xs sm:text-sm md:text-base">
              <li className="leading-relaxed">TEAM SIZE: 3 TO 5 MEMBERS</li>
              <li className="leading-relaxed">ALL MEMBERS MUST BE KIIT STUDENTS</li>
              <li className="leading-relaxed">
                BRING AN OPEN MIND, QUICK THINKING, <br />
                <span> </span>AND NERVES OF STEEL
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full">
            {/* Join Team Button */}
            <div
              className="relative w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] 
                         cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
              onClick={handleJoinTeam}
            >
              <img
                src="https://i.postimg.cc/4xgHwDWF/KIITESUMMIT-POPUP-PAYButtoon.png"
                alt="Join Team"
                className="w-full rounded-md"
              />
              <span className="absolute inset-0 flex items-center justify-center 
                             text-white font-bold text-[10px] sm:text-sm md:text-base">
                JOIN TEAM
              </span>
            </div>

            {/* Create Team Button */}
            <div
              className="relative w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] 
                         cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
              onClick={handleCreateTeam}
            >
              <img
                src="https://i.postimg.cc/4xgHwDWF/KIITESUMMIT-POPUP-PAYButtoon.png"
                alt="Create Team"
                className="w-full rounded-md"
              />
              <span className="absolute inset-0 flex items-center justify-center 
                             text-white font-bold text-[10px] sm:text-sm md:text-base">
                CREATE TEAM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPopup;
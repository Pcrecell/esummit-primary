"use client";

import React, { useRef, useEffect } from "react";

const RegisterPopup = ({ onClose }) => {
  const modalRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl shadow-2xl"
      >
        <div
          className="w-full max-h-full bg-center bg-no-repeat bg-cover text-white flex flex-col justify-between items-center p-6 overflow-auto"
          style={{
            backgroundImage: `url('https://i.postimg.cc/vmhtZ3Tt/KIITESUMMIT-POPUP-PAY-1.png')`,
          }}
        >
          {/* Info Text */}
          <div className="flex flex-col gap-y-0 items-center text-center mb-4">
            <ul className="list-disc list-inside space-y-2">
              <li>TEAM SIZE: 3 TO 5 MEMBERS</li>
              <li>ALL MEMBERS MUST BE KIIT STUDENTS</li>
              <li>
                    BRING AN OPEN MIND, QUICK THINKING, <br /> AND NERVES OF STEEL
              </li>

            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-around gap-0 w-full mt-4">
            {/* Join Team */}
            <div className="relative w-full sm:w-32 cursor-pointer hover:scale-105 transition-transform">
              <img
                src="https://i.postimg.cc/4xgHwDWF/KIITESUMMIT-POPUP-PAYButtoon.png"
                alt="Join Team"
                className="w-full rounded-md"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                JOIN TEAM
              </span>
            </div>

            {/* Create Team */}
            <div className="relative w-full sm:w-32 cursor-pointer hover:scale-105 transition-transform">
              <img
                src="https://i.postimg.cc/4xgHwDWF/KIITESUMMIT-POPUP-PAYButtoon.png"
                alt="Create Team"
                className="w-full rounded-md"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
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

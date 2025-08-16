"use client";
import Image from "next/image";
import { Cormorant_Garamond, Rakkas } from "next/font/google";
import { useState } from "react";
import RegisterPopup from "./registerPopup";
import {
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rakkas = Rakkas({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Hero() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className="relative h-[100vh] rounded-2xl overflow-hidden shadow-xl"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/1bsukh3d7/KIITESUMMIT_Oracle_hero.webp?updatedAt=1755243863782')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute z-1 top-1/2 left-1/2 w-[100%] h-[100%] -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundImage: "url('https://i.postimg.cc/mZ8VS9zh/Ellipse-1.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center ",
        }}
      ></div>

      <div
        className="absolute w-full h-full object-cover z-5 bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/lzogar7yp/1000145433%20(1).gif?updatedAt=1755244971763')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%", // shifts background downward
        }}
      ></div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div>
          <h1
            className={`text-white text-6xl md:text-8xl font-normal text-center opacity-70 ${rakkas.className}`}
          >
            ORACLE
          </h1>

          <p className="text-white text-md md:text-2xl tracking-[0.2em] mt-4 font-poppins text-center">
            CHAMBER OF SECRETS
          </p>

          <div className="flex justify-center mt-12">
  <div className="group relative w-48 sm:w-72 md:w-48 items-center cursor-pointer" onClick={() => setShowPopup(true)}>
    {/* Image shown when not hovering */}
    <img
      src="https://i.postimg.cc/4xgHwDWF/KIITESUMMIT-POPUP-PAYButtoon.png"
      alt="Pay Now"
      className="w-full z-0 hidden group-hover:block"
    />

    {/* Image shown on hover */}
    <img
      src="https://i.postimg.cc/3x4chbmh/KIITESUMMIT-POPUP-PAYButtoon2.png"
      alt="Pay Now Hover"
      className="w-full z-0 group-hover:hidden"
    />

    <span
      className={`absolute inset-0 z-10 flex items-center justify-center text-[#FFFF] font-semibold text-sm sm:text-base md:text-xl ${cormorantGaramond.className}`}
    >
      REGISTER NOW
    </span>
  </div>
</div>

        </div>

        {/* Darker black fading layer at the bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-1/2 z-5 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
          }}
        ></div>

        {/* Event Details Bar - Single responsive version */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 
            w-full max-w-6xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 z-10 
            flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-4 md:gap-8
            text-white text-sm md:text-base 
            bg-black bg-opacity-50 rounded-xl sm:rounded-full"
        >
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span className="text-center sm:text-left whitespace-nowrap">
              Campus 6 Auditorium
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span className="text-center sm:text-left whitespace-nowrap">
              23rd August, 2025
            </span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span className="text-center sm:text-left whitespace-nowrap">
              8:30 AM
            </span>
          </div>
        </div>
      </div>

      {/* Render Popup */}
      {showPopup && <RegisterPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
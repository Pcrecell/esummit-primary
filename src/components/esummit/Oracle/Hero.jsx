"use client";

import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { useState } from "react";
import RegisterPopup from "./registerPopup";
import { MapPinIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Hero() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className="relative h-[100vh] rounded-2xl overflow-hidden shadow-xl"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/9MfqyX4w/KIITESUMMIT-Oracle-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
<div
  className="absolute z-1 top-1/2 left-1/2 w-[40%] h-[40%] -translate-x-1/2 -translate-y-1/2"
  style={{
    backgroundImage: "url('https://i.postimg.cc/mZ8VS9zh/Ellipse-1.png')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }}
></div>

        <div
  className="absolute w-full h-full object-cover z-5 bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://ik.imagekit.io/lzogar7yp/loop2.gif?updatedAt=1755177318012')",
    backgroundSize: "cover",
    backgroundPosition: "center 30%", // shifts background downward
  }}
></div>


      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div>
          <Image
    src="https://i.postimg.cc/ZR1DW5j4/oracle.png"
    alt="Oracle"
    width={400}
    height={150}
    priority
    className="opacity-70" // reduces boldness
  />
          <p className="text-white text-md md:text-2xl tracking-[0.6em] mt-4 font-poppins">
            CHAMBER OF SECRETS
          </p>

          <div className="flex justify-center mt-12">
            <div className="group relative w-85 items-center">
  {/* Image shown when not hovering */}
  <img
    src="https://i.postimg.cc/4xgHwDWF/KIITESUMMIT-POPUP-PAYButtoon.png"
    alt="Pay Now"
    className="w-full z-0 hidden group-hover:block"
  />

  {/* Image shown on hover */}
  <img
    src="https://i.postimg.cc/3x4chbmh/KIITESUMMIT-POPUP-PAYButtoon2.png" // replace with hover image link
    alt="Pay Now Hover"
    className="w-full z-0  group-hover:hidden"
  />

  <span
    className={`absolute inset-0 z-10 flex items-center justify-center text-[#FFFF] font-semibold text-xl ${cormorantGaramond.className}`}
  >
    REGISTRATION STARTING SOON
  </span>
</div>

          </div>
        </div>
        {/* Darker black fading layer at the bottom */}
<div
  className="absolute bottom-0 left-0 w-full h-1/2 z-5 pointer-events-none"
  style={{
    background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
  }}
></div>


<div className="absolute bottom-4 left-1/2 -translate-x-1/2 
    w-full max-w-6xl px-8 py-4 z-10 
    flex justify-between items-center 
    text-white text-sm md:text-base 
    bg-black bg-opacity-50 rounded-full">

  {/* Location */}
  <div className="flex items-center gap-2">
    <MapPinIcon className="w-5 h-5 text-white" />
    <span>Campus 6 Auditorium</span>
  </div>

  {/* Date */}
<div className="flex items-center gap-2 -ml-20">
  <CalendarIcon className="w-5 h-5 text-white" />
  <span>23rd August, 2025</span>
</div>


  {/* Time */}
  <div className="flex items-center gap-2">
    <ClockIcon className="w-5 h-5 text-white" />
    <span>8:30 AM</span>
  </div>
</div>



      </div>

      {/* Render Popup */}
      {showPopup && <RegisterPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

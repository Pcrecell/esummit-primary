"use client";

import React, {useState, useEffect} from "react";
import Carousel from "./EventCarousel";
import { esummit_hero } from "../../../../public/images/image-links";
import { authAPI } from "@/lib/services/api.js";
import Popup from "./paymentPopup";
function Hero() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        (async () => {
            try {
            const res = await authAPI.verifyToken();
            setIsAuthenticated(res.success);
            } catch {
            setIsAuthenticated(false);
            }
        })();
    }, []);


  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen w-screen bg-center lg:pb-10"
      style={{
        backgroundImage: `url("${esummit_hero.esummit_hero_bg.link}")`,
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-45"></div>
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      <div className="relative z-10 flex flex-col items-center text-white text-center px-4 py-6 w-full pt-14">
        <img
          src={esummit_hero.esummit_logo.link}
          alt={esummit_hero.esummit_logo.alt}
          className="w-[90vw] mb-6 md:w-[60vw] lg:max-w-[40vw]"
        />
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto justify-center items-center">
          <button
            onClick={() => (window.location.href = "/theme")}
            className="bg-black text-white py-2 px-4 rounded-[20px] border border-white hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] transition duration-300 ease-in-out"
          >
            Know More ↗
          </button>

          <button

            onClick={() => (isAuthenticated ? setShowPopup(true) : window.location.href = "/register")}
            className="bg-white text-black py-2 px-4 rounded-[20px] border border-none hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] transition duration-300 ease-in-out"
          >
            Get your ticket ↗
          </button>

        </div>
        <div className="w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[55vw] xl-max-w-[50vw] 2xl:max-w-[55vw] mt-16">
          {/* <Carousel /> */}
        </div>
        <div className="h-20 md:h-30 lg:h-20"></div>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: "100px",
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0) 0%, #000000 100%)",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />
    </div>
  );
}
export default Hero;

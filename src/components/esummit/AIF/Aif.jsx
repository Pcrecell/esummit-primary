"use client";
import React from "react";
import { Cinzel_Decorative, Cinzel } from "next/font/google";
import FlippableRounds from "./Rounds";
import TimeVenue from "./TimeVenue";
import WhatsIt from "./WhatsIt";
import Rules from "./Rules";
import About from "./About";

// Configure fonts
const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel-decorative",
});

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

export default function Aif() {
  return (
    <div className={`${cinzelDecorative.variable} ${cinzel.variable}`}>
      <div
        className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
        style={{
          backgroundColor: "#011209",
          backgroundImage: `url('https://i.ibb.co/vCYRnxjf/Group-17.png')`,
          backgroundSize: "cover",
          backgroundPosition: "-100px 50px",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* First Linear Gradient Overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, #011209 0%, rgba(0,0,0,0)0%, #011209 98%)",
          }}
        />

        {/* Second Linear Gradient Overlay */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to bottom, #011209 0%, rgba(0,0,0,0) 50%)",
          }}
        />

        {/* Main Content */}
        <div className="text-center relative z-10 ml-auto mr-20 mt-20">
          <h1
            className={`${cinzelDecorative.className} text-6xl md:text-6xl font-black mb-8`}
            style={{
              background: "linear-gradient(180deg, #EEC014 0%, #886E0C 100%)",
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              filter: "drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.8))",
              fontSize: "74px",
              fontWeight: "bold",
              lineHeight: "auto",
              letterSpacing: "10%",
            }}
          >
            ALICE IN
            <br />
            FOUNDERLAND
          </h1>

          <div className="mt-12 flex justify-center">
            <button
              className="relative cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => {
                // Add your registration logic here
                window.open("#", "_blank");
              }}
            >
              <img
                src="https://i.ibb.co/Vccv1fBw/Banner-ideas-removebg-preview-1.png"
                alt="Register Here"
                className="w-auto h-20 md:h-28 object-contain"
              />
              <span
                className={`${cinzel.className} absolute inset-0 flex items-center justify-center text-black font-bold text-lg md:text-xl`}
                style={{
                  fontWeight: 600,
                  fontSize: "26px",
                  lineHeight: "100%",
                  letterSpacing: "10%",
                  color: "#44261A",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                }}
              >
                REGISTER
              </span>
            </button>
          </div>
        </div>
      </div>

      <About />
      <TimeVenue />
      <FlippableRounds />
      <WhatsIt />
      <Rules />
    </div>
  );
}

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
        className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 md:px-8"
        style={{
          backgroundColor: "#011209",
          backgroundImage: `url('https://i.ibb.co/vCYRnxjf/Group-17.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Responsive background positioning */}
        <style jsx>{`
          @media (min-width: 1024px) {
            .hero-bg {
              background-position: -100px 50px;
            }
          }
          @media (max-width: 768px) {
            .hero-bg {
              background-position: center center;
              background-size: contain;
            }
          }
        `}</style>

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
        <div className="text-center relative z-10 w-full max-w-4xl mx-auto mt-8 md:mt-20 lg:ml-auto lg:mr-8">
          <h1
            className={`${cinzelDecorative.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 md:mb-8 px-2`}
            style={{
              background: "linear-gradient(180deg, #EEC014 0%, #886E0C 100%)",
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))",
              fontWeight: "bold",
              lineHeight: "1.1",
              letterSpacing: "0.05em",
            }}
          >
            ALICE IN
            <br />
            FOUNDERLAND
          </h1>

          <div className="mt-8 md:mt-12 flex justify-center">
            <button
              className="relative cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => {
                // Add your registration logic here
                // window.open("#", "_blank");
              }}
            >
              <img
                src="https://i.ibb.co/Vccv1fBw/Banner-ideas-removebg-preview-1.png"
                alt="Register Here"
                className="w-auto h-36 lg:h-32 object-contain"
              />
              <span
                className={`${cinzel.className} absolute inset-0 left-15 lg:left-10 flex max-w-48 text-center items-center justify-center text-black font-bold text-sm lg:text-lg`}
                style={{
                  fontWeight: 600,
                  lineHeight: "100%",
                  letterSpacing: "0.05em",
                  color: "#44261A",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                }}
              >
                 REGISTRATION COMING SOON
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

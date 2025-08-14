"use client";
import React from "react";
import { Cinzel_Decorative, Laila } from "next/font/google";

// Configure fonts
const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel-decorative",
});

const laila = Laila({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-laila",
});

export default function About() {
  return (
    <div className={`${cinzelDecorative.variable} ${laila.variable}`}>
      <div
        className="min-h-screen relative overflow-hidden flex items-center"
        style={{
          backgroundColor: "#011209",
        }}
      >
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, #011209 0%, rgba(0,0,0,0)60%, #011209 98%)",
          }}
        />

        {/* Image - positioned differently for mobile vs desktop */}
        <div className="absolute left-0 top-0 h-full flex items-center lg:block hidden">
          <img
            src="https://i.ibb.co/dwpP5YDn/download-96-1.png"
            alt=""
            className="h-4/5 w-auto object-cover"
          />
        </div>

        {/* Mobile background image - faded and full width */}
        <div className="absolute inset-0 lg:hidden">
          <img
            src="https://i.ibb.co/dwpP5YDn/download-96-1.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 flex items-center min-h-screen relative z-10">
          {/* Content container - stacked on mobile, side-by-side on desktop */}
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-start">
            {/* Left Side - About The Event */}
            <div className="w-full lg:flex-1 lg:pr-16 text-center lg:text-left mb-8 lg:mb-0">
              <h1
                className={`${cinzelDecorative.className} text-4xl sm:text-5xl md:text-7xl drop-shadow-2xl text-shadow-2xs text-shadow-black drop-shadow-black font-black`}
                style={{
                  color: "#BCA13A",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  fontWeight: "900",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  lineHeight: "1.5",
                }}
              >
                ABOUT
                <br />
                THE
                <br />
                EVENT
              </h1>
            </div>

            {/* Right Side - Description Text */}
            <div className="w-full lg:flex-1 lg:-ml-16 lg:pr-4">
              <div
                className={`${laila.className} text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-center lg:text-left`}
                style={{
                  color: "#FCE691",
                  fontWeight: 400,
                  lineHeight: "1.6",
                }}
              >
                <p className="mb-6">
                  Alice in Founderland is a fast-paced entrepreneurship
                  simulation where quick thinking beats perfect planning.
                </p>

                <p className="mb-6">
                  Inspired by the four suits - Diamonds, Clubs, Hearts, and
                  Spades - each round tests your ability to navigate risk,
                  strategy, conflict, and chaos.
                </p>

                <p>
                  No scripts. No second takes. Just instinct, pressure, and
                  survival.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

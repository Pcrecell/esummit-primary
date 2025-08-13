"use client";
import React from "react";
import FlippableRounds from "./Rounds";
import TimeVenue from "./TimeVenue";
import WhatsIt from "./WhatsIt";
import Rules from "./Rules";
export default function Aif() {
  return (
    <div>
      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(2, 4, 0, 0) 0%, #011209 96.9%), url('https://i.ibb.co/M5PzM2zM/4884b5eb1620dbacb74e26c1a8ee7ffe87eb86a2.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center 10%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Additional decorative image overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://i.ibb.co/20MH5Hq8/Rectangle-40.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center 10%",
            backgroundRepeat: "no-repeat",
            pointerEvents: "none",
          }}
        />

        {/* About the Event Section */}
        <div className="max-w-2xl mx-auto text-center px-4 relative z-10">
          <h1
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{
              background: "#BCA13A",
              fontFamily: "Firlest",
              fontWeight: 700,
              fontSize: "44px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            ALICE IN FOUNDERLAND
          </h1>

          <div
            className="space-y-4 max-w-lg mx-auto"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "130%",
              letterSpacing: "0%",
              textAlign: "center",
              background: "#6C5D24",
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            <p>
              Alice in Founderland is a fast-paced entrepreneurship simulation
              where quick thinking beats perfect planning. Inspired by the four
              suits - Diamonds, Clubs, Hearts, and Spades - each round tests
              your ability to navigate risk, strategy, conflict, and chaos. No
              scripts. No second takes. Just instinct, pressure, and survival.
            </p>
          </div>
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
                className="absolute inset-0 flex items-center justify-center text-black font-bold text-lg md:text-xl"
                style={{
                  fontFamily: "Cinzel",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "100%",
                  letterSpacing: "10%",
                  background: "#4C2C1F",
                  color: "transparent",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                }}
              >
                REGISTER HERE
              </span>
            </button>
          </div>
        </div>
      </div>
      <TimeVenue />
      <FlippableRounds />
      <WhatsIt />
      <Rules />
    </div>
  );
}

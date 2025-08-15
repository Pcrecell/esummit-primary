"use client"

import React from "react";
import Image from "next/image";
import bgImage from "../../../../../public/images/hackathon/why-us-bg.png";
import bottle from "../../../../../public/images/hackathon/bottle.png";
import BegVsAdvPage from "./BegVsAdvPage";

const Circle = ({ className = "", children, style = {} }) => (
  <div
    className={
      `rounded-full border border-[#D4AF37]/60 bg-[#0a0f0a]/60 backdrop-blur-sm ` +
      `text-[#D4AF37] flex items-center justify-center text-center shadow-[0_0_40px_rgba(212,175,55,0.15)] ` +
      `transition-all duration-500 ease-out will-change-transform hover:scale-[1.06] hover:border-[#FFD54A] ` +
      `hover:shadow-[0_0_26px_rgba(255,213,74,0.55),inset_0_0_10px_rgba(255,213,74,0.35)] ` +
      className
    }
    style={style}
  >
    <div className="px-6 leading-snug">{children}</div>
  </div>
);

const WhyUsScreen = () => {
  return (
    <div>
      <BegVsAdvPage />
    <section
      id="whyus"
      className="relative min-h-[110vh] bg-black flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage.src || bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background loader for Next.js */}
      <Image
        src={bgImage}
        alt=""
        fill
        className="object-cover -z-50 opacity-0 pointer-events-none"
        priority
      />

      {/* Global dim overlay for contrast */}
      <div className="absolute inset-0 bg-black/35 z-10" />

      {/* Overlays */}
      <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-black via-black/60 to-transparent z-20" />
      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black via-black/60 to-transparent z-20" />

      {/* Desktop/tablet composition */}
      <div className="hidden md:block relative z-20 w-full max-w-6xl xl:max-w-7xl mx-auto min-h-[720px]">
        {/* Heading plaque on the left */}
        <div className="absolute left-0 top-16 bg-[#0a0f0a]/70 border border-[#D4AF37]/50 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.4)] w-[240px] xl:w-[340px] px-6 py-8 text-[#D4AF37] relative">
          <Image
            src={bottle}
            alt=""
            width={96}
            height={120}
            className="absolute -top-10 -left-8 drop-shadow-xl pointer-events-none select-none"
            priority
          />
          <div className="text-5xl xl:text-6xl font-serif font-bold tracking-wide md:text-4xl leading-tight">
            <div className="">Why</div>
            <div className="">Paradox?</div>
          </div>
        </div>

        {/* Circles placed around */}
        <Circle
          className="absolute left-[36%] top-[6%] w-64 h-64 text-xl font-serif animate-bubble-1"
          style={{ animation: "bubbleFloat1 10s ease-in-out infinite", animationDelay: "0.2s" }}
        >
          Beyond a<br />
          hackathon
        </Circle>
        <Circle
          className="absolute right-[5%] top-[18%] w-52 h-52 text-xl font-serif animate-bubble-2"
          style={{ animation: "bubbleFloat2 12s ease-in-out infinite", animationDelay: "0.8s" }}
        >
          Two-Tier
          <br />
          Structure
        </Circle>
        <Circle
          className="absolute right-[28%] top-[44%] w-60 h-60 text-xl font-serif animate-bubble-3"
          style={{ animation: "bubbleFloat3 11s ease-in-out infinite", animationDelay: "0.4s" }}
        >
          Expert
          <br />
          Mentorship
        </Circle>
        <Circle
          className="absolute left-[8%] bottom-[4%] w-[22rem] h-[22rem] text-2xl font-serif animate-bubble-4"
          style={{ animation: "bubbleFloat4 13s ease-in-out infinite", animationDelay: "1.1s" }}
        >
          Big Challenges,
          <br />
          Big Rewards
        </Circle>
        <Circle
          className="absolute right-[10%] bottom-[6%] w-36 h-36 text-sm font-serif animate-bubble-5"
          style={{ animation: "bubbleFloat5 9s ease-in-out infinite", animationDelay: "0.6s" }}
        >
          Beginner
          <br />
          Friendly
        </Circle>
      </div>

      {/* Mobile layout: smaller circles, heading on top */}
      <div className="md:hidden relative z-20 w-full max-w-sm mx-auto px-4 py-10">
        <h2 className="text-center text-[#D4AF37] text-5xl font-serif font-bold select-none mb-6">
          Why Paradox?
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Circle
            className="w-32 h-32 text-xs font-serif animate-bubble-1"
            style={{ animation: "bubbleFloat1 10s ease-in-out infinite", animationDelay: "0.2s" }}
          >
            Beyond a<br />
            hackathon
          </Circle>
          <Circle
            className="w-28 h-28 text-xs font-serif animate-bubble-2"
            style={{ animation: "bubbleFloat2 12s ease-in-out infinite", animationDelay: "0.8s" }}
          >
            Two-Tier
            <br />
            Structure
          </Circle>
          <div className="col-span-2 flex justify-center">
            <Circle
              className="w-52 h-52 text-base font-serif animate-bubble-3"
              style={{ animation: "bubbleFloat3 11s ease-in-out infinite", animationDelay: "0.4s" }}
            >
              Big Challenges,
              <br />
              Big Rewards
            </Circle>
          </div>
          <Circle
            className="w-32 h-32 text-xs font-serif animate-bubble-4"
            style={{ animation: "bubbleFloat4 13s ease-in-out infinite", animationDelay: "1.1s" }}
          >
            Expert
            <br />
            Mentorship
          </Circle>
          <Circle
            className="w-24 h-24 text-[10px] font-serif animate-bubble-5"
            style={{ animation: "bubbleFloat5 9s ease-in-out infinite", animationDelay: "0.6s" }}
          >
            Beginner
            <br />
            Friendly
          </Circle>
        </div>
      </div>
      <style jsx global>{`
        @keyframes bubbleFloat1 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(8px, -10px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes bubbleFloat2 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-10px, -6px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes bubbleFloat3 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, 8px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes bubbleFloat4 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-12px, 10px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes bubbleFloat5 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(6px, 6px); }
          100% { transform: translate(0, 0); }
        }
        .animate-bubble-1 { animation: bubbleFloat1 10s ease-in-out infinite; animation-delay: 0.2s; }
        .animate-bubble-2 { animation: bubbleFloat2 12s ease-in-out infinite; animation-delay: 0.8s; }
        .animate-bubble-3 { animation: bubbleFloat3 11s ease-in-out infinite; animation-delay: 0.4s; }
        .animate-bubble-4 { animation: bubbleFloat4 13s ease-in-out infinite; animation-delay: 1.1s; }
        .animate-bubble-5 { animation: bubbleFloat5 9s ease-in-out infinite; animation-delay: 0.6s; }
      `}</style>
    </section>
    </div>
  );
};

export default WhyUsScreen;

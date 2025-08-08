"use client"

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

import Gray from "../../public/images/not-found/Gray Ball.svg";
import Blue from "../../public/images/not-found/Blue Ball.svg";
import Purple from "../../public/images/not-found/Purple Ball.svg";
import Hole from "../../public/images/not-found/Hole.svg";

const ballImages = [Gray, Blue, Purple];

export default function ESummitNotFound() {
  const ballRefs = useRef([]);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(() => {
    const master = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });

    if (!ballRefs.current.length) return;

    ballRefs.current.forEach((ball) => {
      if (!ball) return;
      const tl = gsap.timeline();

      tl.set(ball, { y: "-100%", scale: 1, opacity: 1, zIndex: 30 })
        .to(ball, {
          y: isMobile ? "500%" : "290%",
          duration: 2.5,
          ease: "power2.inOut",
          zIndex: 30,
        });

      master.add(tl, `+=0.5`);
    });
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-black overflow-hidden"
    >
      {/* Clip Paths */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="holeClipPathESummit" clipPathUnits="userSpaceOnUse">
            <path d="M 347 599.524 H 346.988 C 345.925 621.922 269.107 640 174.5 640 C 79.8929 640 3.0747 621.922 2.0117 599.524 H 2 V -1 H 347 V 599.524 Z" />
          </clipPath>
        </defs>
      </svg>

      <svg width="0" height="0">
        <defs>
          <clipPath id="holeClipPathMobileESummit" clipPathUnits="userSpaceOnUse">
            <path d="M 229.02 599.524 H 229.0121 C 228.3105 621.922 177.6106 640 115.17 640 C 52.7293 640 2.0293 621.922 1.3277 599.524 H 1.32 V -1 H 229.02 V 599 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full relative z-10">
        <div className="flex items-center justify-center relative mb-2 gap-0 z-20">
          <span className="text-white translate-x-28 md:translate-x-6 z-30 text-[11rem] md:text-[24rem] font-extrabold leading-none drop-shadow-[0_2px_16px_rgba(0,0,0,1)]">
            4
          </span>

          <div className="relative w-[22rem] h-[12rem] flex items-center justify-center">
            {/* Hole Base */}
            <Image
              src={Hole}
              alt="Hole base"
              className="absolute z-10 w-[14rem] md:w-[48rem] -translate-y-20"
            />

            {/* Ball container */}
            <div className="absolute -top-96 w-96 h-[40rem] overflow-hidden z-30">
              <div
                className="absolute inset-0 h-[40rem]"
                style={{
                  clipPath: `url(#${isMobile ? "holeClipPathMobileESummit" : "holeClipPathESummit"})`,
                  transform: isMobile
                    ? "translateY(-5.5rem) translateX(5rem)"
                    : "translateY(0rem) translateX(1rem)",
                }}
              >
                {/* Balls */}
                {ballImages.map((ball, i) => (
                  <Image
                    key={i}
                    ref={(el) => {
                      if (el) ballRefs.current[i] = el;
                    }}
                    src={ball}
                    alt="Ball"
                    className="w-32 h-32 md:w-56 md:h-56 absolute top-0 left-[3.25rem] md:left-16 mx-auto"
                    style={{
                      opacity: 0,
                      zIndex: 30,
                      willChange: "transform",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Hole Overlay */}
            <Image
              src={Hole}
              alt="Hole overlay"
              className="absolute z-0 w-[14rem] md:w-[48rem] -translate-y-20 pointer-events-none"
            />
          </div>

          <span className="text-white -translate-x-32 md:-translate-x-6 z-30 text-[11rem] md:text-[24rem] font-extrabold leading-none drop-shadow-[0_2px_16px_rgba(0,0,0,1)]">
            4
          </span>
        </div>

        {/* Message - E-Summit themed */}
        <div className="z-50 w-full h-auto flex flex-col">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 text-center mt-4 drop-shadow-[0_2px_16px_rgba(0,0,0,1)]">
            E-Summit Page Not Found
          </h2>
          <p className="text-white/90 mx-auto text-base md:text-lg text-center max-w-[19.65rem] md:max-w-xl mb-5 md:mb-8 drop-shadow-[0_2px_16px_rgba(0,0,0,1)]">
            The E-Summit page you're looking for can't be found.
            <br />
            Double-check the URL and try again. Or click the button below.
          </p>
          <div className="flex gap-0 justify-center">
            <a
              href="/"
              className="bg-white mx-auto text-black font-semibold px-5 py-2 md:px-8 md:py-3 rounded-full shadow transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-sm md:text-base"
            >
              Back To E-Summit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
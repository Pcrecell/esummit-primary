"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

export default function Stages() {
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.8 });
  const lastScrollY = useRef(0);


  const cardStyles =
    "relative w-[300px] h-[450px] [transform-style:preserve-3d]";

  const faceStyles =
    "absolute inset-0 [backface-visibility:hidden]";

  return (
    <div
      ref={ref}
      className="min-h-screen w-full bg-contain bg-center relative"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/5xwmtpwkb/image%201.png?updatedAt=1755165711961')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top Dark Fading Overlay */}
<div
  className="absolute top-0 left-0 w-full h-1/8 z-5 pointer-events-none"
  style={{
    background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
  }}
></div>

      {/* Top title */}
      <div className="absolute top-10 w-full flex flex-col items-center text-white pb-12">
        <p className="text-xl tracking-widest mb-4">PERKS OF</p>
        <Image
          src="https://i.postimg.cc/ZR1DW5j4/oracle.png"
          alt="Oracle"
          width={200}
          height={200}
          priority
        />
        <div className="mt-6"></div>
      </div>

   
    </div>
  );
}

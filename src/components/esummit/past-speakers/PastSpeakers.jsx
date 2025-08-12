"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import "../../components/testimonial-section/TestimonialCarousel.css";
import { useEffect } from "react";
import { esummit_pastspeakers } from "../../../../public/images/image-links/index";
import { useSwipeable } from "react-swipeable";
import { Texturina } from "next/font/google"
import Image from "next/image"; 
import { Cormorant_Garamond } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


const speakers = [
  {
    name: "Shashi Tharoor",
    title: "Member of Parliament",
    company: "Indian National Congress",
    image: esummit_pastspeakers.pastspeaker_1.link,
    alt: esummit_pastspeakers.pastspeaker_1.alt,
  },
  {
    name: "Akshay Gurnani",
    title: "Co-Founder & Former CEO",
    company: "Schbang",
    image: esummit_pastspeakers.pastspeaker_2.link,
    alt: esummit_pastspeakers.pastspeaker_2.alt,
  },
  {
    name: "Trishneet Arora",
    title: "Founder & CEO",
    company: "Tac Security",
    image: esummit_pastspeakers.pastspeaker_7.link,
    alt: esummit_pastspeakers.pastspeaker_7.alt,
  },
  {
    name: "Prabhu Chawla",
    title: "Editorial Director",
    company: "The New Indian Express",
    image: esummit_pastspeakers.pastspeaker_3.link,
    alt: esummit_pastspeakers.pastspeaker_3.alt,
  },
  {
    name: "A Murganantham",
    title: "Real-Life Padman",
    company: "Jayaashree Industries",
    image: esummit_pastspeakers.pastspeaker_6.link,
    alt: esummit_pastspeakers.pastspeaker_6.alt,
  },
  {
    name: "Dan Ram",
    title: "Speaker",
    company: "Ted X",
    image: esummit_pastspeakers.pastspeaker_5.link,
    alt: esummit_pastspeakers.pastspeaker_5.alt,
  },
  {
    name: "Anil Gupta",
    title: "Scholar",
    company: "Honey Bee Network",
    image: esummit_pastspeakers.pastspeaker_4.link,
    alt: esummit_pastspeakers.pastspeaker_4.alt,
  },
];
// Utility hook to detect mobile view - Fixed to prevent SSR issues
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false); // Default to false during SSR

  useEffect(() => {
    // Set initial value after component mounts (client-side only)
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}



const PastSpeakers = () => {
  const [batch, setBatch] = useState(0);
  const isMobile = useIsMobile();
  const BATCH_SIZE = isMobile ? 4 : 4;
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const totalBatches = Math.ceil(speakers.length / BATCH_SIZE);
  const [direction, setDirection] = useState(0); 
  const [fastTransition, setFastTransition] = useState(false);


  const leftColumn = speakers.filter((_, i) => i % 2 === 0);
const rightColumn = speakers.filter((_, i) => i % 2 !== 0);

  const startIdx = batch * BATCH_SIZE;

  return (
    <div 
      className="min-h-screen bg-black flex flex-col items-center justify-start py-4 px-0 overflow-x-hidden overflow-y-hidden relative md:mb-40"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://i.postimg.cc/Jz0pdv9V/download-13-2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      
      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Title */}
        <div className="w-full mb-2 md:mt-40 text-left px-6 md:px-12 lg:pl-24">
         <h1
  className={`${cormorantGaramond.className} font-bold text-[#27ff6a] text-5xl md:text-7xl leading-tighter tracking-wide`}
>
  Past<br />Speakers
</h1>

          <p className="text-white text-xl mt-2 mb-6 font-[texturina]">
            Meet the industry leaders shaping the future
          </p>
<div className="absolute -top-4 left-0 w-full h-20 z-20 pointer-events-none bg-gradient-to-b from-black to-transparent" />  
<div
  className={`absolute fade-mask fade-bottom overflow-hidden ${
    isMobile ? "top-48" : "top-0 right-0"
  }`}
  style={{
    height: "100vh",
    width: isMobile ? "100%" : "auto",
  }}
>
  {/* Black overlay at top */}
  

  {isMobile ? (
    // Mobile View - Single Row Scrolling Horizontally
    <div className="flex scroll-left gap-6">
      {[...speakers, ...speakers].map((speaker, idx) => (
        <div key={`mobile-${idx}`} className="flex-shrink-0">
          <Image
            src={speaker.image}
            alt={speaker.alt}
            width={192}
            height={240}
            className="w-48 h-60 object-cover rounded-lg shadow-lg"
          />
        </div>
      ))}
    </div>
  ) : (
    // Desktop View - Two Columns
    <div className="flex gap-8">
      {/* Left Column - Scroll Up */}
      <div className="flex flex-col scroll-up">
        {[...leftColumn, ...leftColumn].map((speaker, idx) => (
          <div key={`left-${idx}`} className="mb-6">
            <Image
              src={speaker.image}
              alt={speaker.alt}
              width={192}
              height={240}
              className="w-70 h-60 object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>

      {/* Right Column - Scroll Down */}
      <div className="flex flex-col scroll-down">
        {[...rightColumn, ...rightColumn].map((speaker, idx) => (
          <div key={`right-${idx}`} className="mb-6">
            <Image
              src={speaker.image}
              alt={speaker.alt}
              width={192}
              height={240}
              className="w-70 h-60 object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
        <div className="absolute bottom-0 left-0 w-full h-20 z-20 pointer-events-none bg-gradient-to-t from-black to-transparent" />
      </div>
      
    </div>
  )}
  
</div>



           </div>
           
      </div>
    </div>
  );
};

export default PastSpeakers;
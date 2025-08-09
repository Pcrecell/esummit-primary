"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import "../../components/testimonial-section/TestimonialCarousel.css";
import { useEffect } from "react";
import { esummit_pastspeakers } from "../../../../public/images/image-links";
import { useSwipeable } from "react-swipeable";
import { Texturina } from "next/font/google"
import Image from "next/image";



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




  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (expandedIdx < BATCH_SIZE - 1) {
        setExpandedIdx((prev) => prev + 1);
      }
    },
    onSwipedRight: () => {
      if (expandedIdx > 0) {
        setExpandedIdx((prev) => prev - 1);
      }
    },
    trackMouse: true, 
  });


  const handlePrev = () => {
    setDirection(-1);
  setFastTransition(true);
  setBatch((prev) => (prev - 1 + totalBatches) % totalBatches);
  setExpandedIdx(null);
  setTimeout(() => setFastTransition(false), 500);
  };
  const handleNext = () => {
   setDirection(1);
  setFastTransition(true);
  setBatch((prev) => (prev + 1) % totalBatches);
  setExpandedIdx(null);
  setTimeout(() => setFastTransition(false), 500);
  };
  useEffect(() => {
    if (isMobile) {
      setExpandedIdx(0); 
    } else {
      setHoveredIdx(0); 
    }
  }, [batch, isMobile]);


  const startIdx = batch * BATCH_SIZE;
  const batchSpeakers = speakers.slice(startIdx, startIdx + BATCH_SIZE);

  return (
    <div 
      className="min-h-screen bg-black w-screen flex flex-col items-center justify-start py-40 px-0 overflow-x-hidden relative"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/ecellkiit/E-Cell%20Website/Image%20Background%20Past-Speakers%20(1).webp')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black z-1" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Title */}
        <div className="w-full mb-2 mt-4 text-left px-6 md:px-12 lg:pl-24">
          <h1 className="font-[Texturina] font-bold text-[#27ff6a] text-5xl md:text-7xl leading-tighter tracking-wide">
            Past<br />Speakers
          </h1>
          <p className="text-white text-lg mt-2 mb-6 font-poppins">
            Meet the industry leaders shaping the future
          </p>
        </div>
        
        {/* Carousel */}
        <div className="relative w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center justify-center relative rounded-2xl py-8 px-2 md:px-8 overflow-hidden min-h-[250px] md:min-h-[400px]" >
            {/* Left Arrow */}
            <button
              aria-label="Previous"
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-[#27ff6a] text-black hover:bg-[#1ed760] rounded-full transition-colors border border-[#27ff6a] ${isMobile ? 'p-1' : 'p-2'}`}
              onClick={handlePrev}
              style={{ zIndex: 40 }}
            >
              <ChevronLeft size={isMobile ? 20 : 28} />
            </button>
            
            {/* Speaker Images */}
            <div {...(isMobile ? swipeHandlers : {})} className="flex gap-2 md:gap-4 w-full justify-center items-end">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={batch}
                  className="flex gap-2 md:gap-4 w-full justify-center items-end relative z-10"
                  {...(isMobile ? swipeHandlers : {})}
                  initial={{ opacity: 0, x: direction === 1 ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === 1 ? -300 : 300 }}
                transition={{
                  type: "spring",
                  stiffness: fastTransition ? 900 : 300,
                  damping: fastTransition ? 40 : 80,
                  mass: 0.6,
                }}
                >
                  {batchSpeakers.map((speaker, idx) => {
                    const isDesktop = !isMobile;
                    const isSelected = expandedIdx === idx;
                    const isHovered = hoveredIdx === idx || (!isMobile && hoveredIdx === null && idx === 0);
                    let isExpanded = isMobile ? isSelected : isHovered;

                    const baseWidth = isMobile ? 55 : 230;
                    const expandedWidth = isMobile ? 150 : 400;
                    const imgWidth = isExpanded ? expandedWidth : baseWidth;
                    const imgHeight = isMobile ? 150 : 390;

                    return (
                      <div
                        key={speaker.name}
                        className={`flex flex-col items-center cursor-pointer ${isExpanded ? "z-20" : "z-10"}`}
                        onMouseEnter={isDesktop ? () => setHoveredIdx(idx) : undefined}
                        onMouseLeave={isDesktop ? () => setHoveredIdx(null) : undefined}
                        onClick={isMobile ? () => {
                          if (expandedIdx !== idx) {
                            setExpandedIdx(idx);
                          }
                        } : undefined}
                      >
                        <img
                          src={speaker.image}
                          alt={speaker.alt}
                          width={1000}
                          height={1000}
                          className={
                            `${isMobile ? (isExpanded ? "rounded-t-3xl" : "rounded-t-lg") : "rounded-t-3xl"} object-cover shadow-lg border-2 border-[#222] transition-all duration-300 ` +
                            (isExpanded ? "filter-none shadow-[0_8px_32px_#27ff6a44]" : "grayscale shadow-[0_2px_8px_#0008]")
                          }
                          style={{
                            width: imgWidth,
                            height: imgHeight,
                            cursor: "pointer",
                            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                          }}
                        />
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Right Arrow */}
            <button
              aria-label="Next"
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-[#27ff6a] text-black hover:bg-[#1ed760] rounded-full transition-colors border border-[#27ff6a] ${isMobile ? 'p-1' : 'p-2'}`}
              onClick={handleNext}
              style={{ zIndex: 10 }}
            >
              <ChevronRight size={isMobile ? 20 : 28} />
            </button>
            
            {/* Speaker Info (inside grey bg, just below images) */}
            {(() => {
              let infoIdx = 0;
              if (isMobile && expandedIdx !== null && expandedIdx !== undefined) {
                infoIdx = expandedIdx;
              } else if (hoveredIdx !== null && hoveredIdx !== undefined) {
                infoIdx = hoveredIdx;
              }
              const info = batchSpeakers[infoIdx];
              return info ? (
                <motion.div
                  key={info.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full text-left px-6 md:px-12 lg:pl-16 pt-6 pb-2"
                >
                  <h2
                    className={
                      `text-white font-bold font-poppins ` +
                      (isMobile ? "text-lg" : "text-2xl md:text-3xl")
                    }
                  >
                    {info.name}
                  </h2>
                  <p
                    className={
                      `mt-1 text-[#27ff6a] font-semibold tracking-wide font-poppins ` +
                      (isMobile ? "text-xs" : "text-base md:text-lg")
                    }
                  >
                    {info.title}
                    {info.company ? <span className="text-white font-normal">, {info.company}</span> : null}
                  </p>
                </motion.div>
              ) : null;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastSpeakers;
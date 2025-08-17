"use client"

import React, { useState } from "react";
import { esummit_pastspeakers } from "../../../../public/images/image-links/index";
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

// Utility hook to detect mobile view
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

const PastSpeakers = () => {
  const isMobile = useIsMobile();
  const leftColumn = speakers.filter((_, i) => i % 2 === 0);
  const rightColumn = speakers.filter((_, i) => i % 2 !== 0);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start py-4 px-0 overflow-x-hidden overflow-y-hidden relative md:mb-40">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/ecellkiit/E-Cell%20Website/download-13-3-1-1.webp?updatedAt=1755291651464')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Top Fade Overlay */}
      <div className="absolute top-0 left-0 w-full h-32 z-20 pointer-events-none bg-gradient-to-b from-black to-transparent" />

      {/* Bottom Fade Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none bg-gradient-to-t from-black to-transparent" />

      {/* Content Container */}
      <div
        className={`relative z-10 w-full flex flex-col items-center ${
          isMobile ? "pt-16" : "pt-8 sm:pt-12 md:pt-16"
        }`}
      >
        {/* Title */}
        <div className="w-full mb-2 md:mt-40 text-left px-6 md:px-12 lg:pl-24">
          <h1
            className={`${cormorantGaramond.className} font-bold text-transparent bg-clip-text ${
              isMobile
                ? "bg-gradient-to-b from-[#66FF99] to-[#33CC66] text-6xl"
                : "bg-gradient-to-b from-[#00FF3B] to-[#006507] text-5xl md:text-[140px]"
            } leading-none tracking-wide`}
          >
            Past<br />
            <span className="block -mt-4">Speakers</span>
          </h1>

          <p className="text-white text-xl mt-2 mb-6 font-[texturina]">
            Meet the industry leaders shaping the future of ideas,<br />
            technology, and opportunities for tomorrow’s world.
          </p>

          {/* Carousel Container */}
          <div
            className={`absolute fade-mask fade-bottom overflow-hidden ${
              isMobile ? "z-[60]" : "top-0 right-0"
            }`}
            style={{
              height: "100vh",
              width: isMobile ? "100%" : "auto",
            }}
          >
            {isMobile ? (
              // Mobile View - Single Row Scrolling Horizontally
              <div className="relative w-full overflow-hidden">
                <div className="flex gap-6 animate-marquee">
                  {[...speakers, ...speakers].map((speaker, idx) => (
                    <div
                      key={`mobile-${idx}`}
                      className="flex-shrink-0"
                      style={{ width: "12rem" }}
                    >
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

                <style jsx>{`
                  @keyframes marquee {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(-50%);
                    }
                  }
                  .animate-marquee {
                    display: flex;
                    min-width: max-content;
                    animation: marquee 25s linear infinite;
                    will-change: transform;
                  }
                `}</style>
              </div>
            ) : (
              // Desktop View - Two Columns
              <div className="flex gap-8">
                {/* Left Column - Scroll Up */}
                <div className="flex flex-col scroll-up">
                  {[...leftColumn, ...leftColumn].map((speaker, idx) => (
                    <div key={`left-${idx}`} className="mb-6 z-50">
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

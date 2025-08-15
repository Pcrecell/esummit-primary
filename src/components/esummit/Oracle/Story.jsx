"use client";
import { useEffect, useState, useRef } from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Story() {
  const [visibleLines, setVisibleLines] = useState(0);
  const sectionRef = useRef(null);

  const textContent = [
    "ORACLE IS WHERE MYTHS COME ALIVE.",
    "ONLY THE BRAVE SURVIVE ITS MAZE.",
    "TWISTED BY SERPENT COILS, GUARDED BY LADON,",
    "AND HAUNTED BY THE WRATH OF GORGONS.",
    "UNDER MEDUSA'S DEADLY, UNBLINKING GAZE,",
    "EVERY CHOICE COULD BRING GLORY OR DOOM.",
    "THIS ISN’T JUST A GAME—IT’S A TEST OF COURAGE.",
    "DARE TO PLAY, WIN GLORY, LEARN FROM MENTORS,",
    "EARN REWARDS WORTHY OF A CHAMPION.",
    "BUT ONE WRONG MOVE...AND YOU’RE STONE."
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Scroll progress through the section
      let scrollProgress = (windowHeight - rect.top) / (rect.height );
      scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);

      // Determine how many lines should be visible based on scroll
      const linesToShow = Math.floor(scrollProgress * textContent.length);
      setVisibleLines(linesToShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative h-[100vh] w-full overflow-hidden" // taller so scrolling triggers
      ref={sectionRef}
    >
      {/* Video Background */}
     <video
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  className="absolute inset-0 w-full h-full object-cover z-0"
>
  <source
    src="https://ik.imagekit.io/1bsukh3d7/KIITECELL_Aboutus%20(1)%20(1).mp4?updatedAt=1755245327558"
    type="video/mp4"
  />
</video>


      {/* Overlays */}
      <div
        className="absolute top-0 left-0 w-full h-1/3 z-5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-1/3 z-5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
        }}
      ></div>

      {/* Text */}
      {/* Desktop view (hidden on mobile) */}
<div className="hidden md:sticky md:top-0 md:flex h-screen items-center z-10">
  <div className="w-[90%] px-5 py-12 mx-auto text-left space-y-2">
    {textContent.map((text, index) => (
      <p
        key={index}
        className={`transition-all duration-500 ease-out ${cormorantGaramond.className}
          text-2xl lg:text-3xl text-white
          ${index < visibleLines ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{
          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
          fontSize: "clamp(1.5rem, 2vw, 2.7rem)",
          lineHeight: "1.25",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {text}
      </p>
    ))}
  </div>
</div>

{/* Mobile view (hidden on desktop) */}
<div className="md:hidden flex flex-col justify-center items-center h-full p-4">
  {textContent.map((text, index) => (
    <p
      key={index}
      className={`text-center text-lg leading-relaxed transition-all duration-500 ease-out ${cormorantGaramond.className} text-white
        ${index < visibleLines ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{
        animationDelay: `${index * 0.15}s`,
        textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
      }}
    >
      {text}
    </p>
  ))}
</div>

    </div>
  );
}

"use client"

import React, { useEffect, useState, useRef } from "react";

const CustomScrollBar = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percent = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollPercent(percent);

      setIsVisible(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`fixed right-0 top-0 h-full w-2 z-50 pointer-events-none transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="w-full rounded-full"
        style={{
          height: `${scrollPercent * 100}%`,
          background:
            "linear-gradient(to bottom, rgba(0,255,0,0), rgba(0,255,0,0.5) 50%, rgba(0,255,0,1))",
          filter: "blur(4px)",
          transition: "height 0.1s ease-out",
        }}
      />
    </div>
  );
};

export default CustomScrollBar;
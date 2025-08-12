"use client"

import React, { useState, useEffect } from "react";
import ScrollOne from "./ScrollOne";

const ThemeHeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {/* Section 1: Main Hero Section */}
      <section
        className="relative w-full bg-black flex flex-col justify-center min-h-[110vh] items-center text-center text-white px-4 pb-8 overflow-x-hidden"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full z-0"
          style={{
            objectFit: "cover",
            objectPosition: "calc(50% + 10px) center"
          }}
        >
          <source src="https://ik.imagekit.io/ilgcom35w/theme-bg-esummit(1).mp4?updatedAt=1754759095540" type="video/mp4" />
        </video>

        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-32 z-5" style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4), transparent)"
        }} />

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-102 z-5" style={{
          background: "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8), transparent)"
        }} />
      
        {/* Content Container */}
        <div className="relative w-full flex flex-col items-center justify-center pt-20 pb-16 z-10 min-h-screen">
          {/* E-Summit Logo Image - Positioned at Bottom */}
          <img
            src="https://ik.imagekit.io/admr8uj75/Asset%201@4x%203%20(2).png?updatedAt=1754565142707"
            alt="E-Summit"
            className="absolute object-contain z-20"
            style={{
              width: isMobile ? '400px' : '600px',
              bottom: isMobile ? '200px' : '120px',
              left: '50%',
              transform: 'translate(-50%,-20%)',
            }}
          />

          {/* Subtitle with Glass Effect Container - Positioned at Bottom */}
          <div 
            className="absolute rounded-lg w-full sm:max-w-4xl"
            style={{
              padding: isMobile ? '12px 16px' : '16px 32px',
              bottom: isMobile ? '80px' : '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(21, 128, 61, 0.3)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: `
                0 8px 32px rgba(0, 255, 59, 0.2),
                0 4px 16px rgba(0, 0, 0, 0.3),
                inset 0 1px 1px rgba(255, 255, 255, 0.1),
                inset 0 -1px 1px rgba(0, 0, 0, 0.1)
              `,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
            }}
          >
            <h2
              className="font-bold leading-snug text-center text-white"
              style={{
                fontSize: isMobile ? '20px' : '28px',
                fontFamily: "Judson, serif",
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Emerald Empires Building Lasting Legacies
            </h2>
          </div>
        </div>
      </section>

      {/* Section 2: History Image and Timeline */}
      <section
        className="relative w-full bg-black flex flex-col justify-center items-center text-center text-white min-h-[60vh]"
        style={{
          backgroundImage: `url("https://ik.imagekit.io/admr8uj75/Download%20AI%20generated%20tropical%20rainforest,%20with%20towering%20trees%20and%20dense%20greenery,%20providing%20a%20lush%20for%20free%201.png?updatedAt=1754509960696")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-32 z-5" style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7), transparent)"
        }} />

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 z-5" style={{
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4), transparent)"
        }} />
        
        <div className="relative w-full flex flex-col items-center justify-center z-10 h-full">
          {/* History Image - Different for Mobile and Desktop */}
          <img
            src={isMobile 
              ? "https://ik.imagekit.io/ilgcom35w/waves-transparent.png?updatedAt=1754763356561"
              : "https://ik.imagekit.io/admr8uj75/transparent%20(1)%201.png?updatedAt=1753890656393"
            }
            alt="History"
            className="w-screen opacity-50 md:opacity-100 max-w-none h-auto object-cover z-10 mb-8"
            style={{
              position: "relative",
              left: "50%",
              right: "50%",
              transform: isMobile 
                ? "translateX(-30%) translateY(200px) rotate(45deg)" 
                : "translateX(-50%) translateY(-150px)",
              minWidth: isMobile ? "180vw" : "100vw",
            }}
          />

          {/* Timeline Headings and Descriptions Overlapping History Image */}
          <div
            className={`absolute left-0 top-1/2 w-full flex ${isMobile ? 'flex-col gap-6' : 'flex-row justify-between'} items-center px-2 md:px-8 lg:px-16`}
            style={{ zIndex: 50, transform: 'translateY(-50%)', pointerEvents: 'none' }}
          >
            {/* Mobile Layout - Same as before */}
            {isMobile ? (
              <>
                {/* Emerald Empire - First on Mobile */}
                <div 
                  className="flex flex-col items-start sm:items-center" 
                  style={{ 
                    position: 'relative', 
                    top: '80px', 
                    left: '-20px' 
                  }}
                >
                  <h3 
                    className="font-bold mb-2 text-left sm:text-center" 
                    style={{ 
                      fontSize: '30px',
                      color: '#EDBD90' 
                    }}
                  >
                    2025<br />Emerald Empire
                  </h3>
                  <p 
                    className="max-w-64 font-bold text-left sm:text-center" 
                    style={{ 
                      fontSize: '16px',
                      color: '#08fc04'
                    }}
                  >
                    Emerald holds the crown, leading with wisdom and vision as the legacy begins.
                  </p>
                </div>
                
                {/* Ruby Empire - Second on Mobile */}
                <div 
                  className="text-center" 
                  style={{ 
                    position: 'relative', 
                    top: '140px'
                  }}
                >
                  <h3 
                    className="font-bold mb-2" 
                    style={{ 
                      fontSize: '20px',
                      color: '#EDBD90'
                    }}
                  >
                    2026<br />Ruby Empire
                  </h3>
                  <p 
                    className="max-w-64 mx-auto" 
                    style={{ 
                      fontSize: '14px',
                      color: '#FF375B', 
                      fontWeight: 'bold'
                    }}
                  >
                    The crown passes to Ruby - Bold, Fiery and ready to spark a new era of innovation.
                  </p>
                </div>
                
                {/* Sapphire Empire - Third on Mobile */}
                <div 
                  className="flex flex-col items-end sm:items-center" 
                  style={{ 
                    position: 'relative', 
                    top: '270px', 
                    right: '-30px' 
                  }}
                >
                  <h3 
                    className="font-bold mb-2 text-right sm:text-center" 
                    style={{ 
                      fontSize: '20px',
                      color: '#EDBD90' 
                    }}
                  >
                    2027<br />Sapphire Empire
                  </h3>
                  <p 
                    className="max-w-64 font-bold text-right sm:text-center" 
                    style={{ 
                      fontSize: '14px',
                      color: '#5EBFE6' 
                    }}
                  >
                    Sapphire takes the throne, where calm strategy and sharp minds shape the future.
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Desktop Layout - Ruby Left, Emerald Center, Sapphire Right */}
                
                {/* Ruby Empire - Left Side on Desktop */}
                <div 
                  className="flex flex-col items-center" 
                  style={{ 
                    position: 'relative', 
                    top: '-80px', 
                    left: '-50px' 
                  }}
                >
                  <h3 
                    className="font-bold mb-2 text-center" 
                    style={{ 
                      fontSize: '32px',
                      color: '#EDBD90' 
                    }}
                  >
                    2026<br />Ruby Empire
                  </h3>
                  <p 
                    className="max-w-64 font-bold text-center" 
                    style={{ 
                      fontSize: '18px',
                      color: '#FF375B'
                    }}
                  >
                    The crown passes to Ruby - Bold, Fiery and ready to spark a new era of innovation.
                  </p>
                </div>
                
                {/* Emerald Empire - Center on Desktop */}
                <div 
                  className="text-center" 
                  style={{ 
                    position: 'relative', 
                    top: '-325px'
                  }}
                >
                  <h3 
                    className="font-bold mb-2" 
                    style={{ 
                      fontSize: '32px',
                      color: '#EDBD90'
                    }}
                  >
                    2025<br />Emerald Empire
                  </h3>
                  <p 
                    className="max-w-64 mx-auto" 
                    style={{ 
                      fontSize: '18px',
                      color: '#08fc04', 
                      fontWeight: 'bold'
                    }}
                  >
                    Emerald holds the crown, leading with wisdom and vision as the legacy begins.
                  </p>
                </div>
                
                {/* Sapphire Empire - Right Side on Desktop */}
                <div 
                  className="flex flex-col items-center" 
                  style={{ 
                    position: 'relative', 
                    top: '10px', 
                    right: '-50px' 
                  }}
                >
                  <h3 
                    className="font-bold mb-2 text-center" 
                    style={{ 
                      fontSize: '32px',
                      color: '#EDBD90' 
                    }}
                  >
                    2027<br />Sapphire Empire
                  </h3>
                  <p 
                    className="max-w-64 font-bold text-center" 
                    style={{ 
                      fontSize: '18px',
                      color: '#5EBFE6' 
                    }}
                  >
                    Sapphire takes the throne, where calm strategy and sharp minds shape the future.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 2: Image Scroll (one at a time) */}
      {/* <section className="relative w-full bg-black flex items-center justify-center min-h-[100vh]">
        <div className="w-[80%] h-[80vh]">
          <ScrollOne isMobile={isMobile} />
        </div>
      </section>
       */}
      {/* Section 3*/}
      <section
        className="relative w-full bg-black bg-cover bg-center flex flex-col justify-center items-center text-center text-white px-4 py-4 overflow-x-hidden min-h-[60vh]"
        style={{
          backgroundImage: `url("https://ik.imagekit.io/admr8uj75/Download%20AI%20generated%20tropical%20rainforest,%20with%20towering%20trees%20and%20dense%20greenery,%20providing%20a%20lush%20for%20free%201.png?updatedAt=1754509960696")`,
        }}
      >
        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-32 z-5" style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4), transparent)"
        }} />
        {isMobile && <div className="w-full h-80"></div>}
        <div className="w-full h-[90vh]">
          <ScrollOne isMobile={isMobile} />
        </div>

      </section>
    </>
  );
};

export default ThemeHeroSection;
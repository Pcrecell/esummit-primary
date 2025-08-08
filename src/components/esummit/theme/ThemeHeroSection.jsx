import React from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStackItem";

const ThemeHeroSection = () => {
  return (
    <>
      {/* Section 1: Main Hero Section */}
      <section
        className="relative w-full bg-black flex flex-col justify-center items-center text-center text-white px-4 pb-8 overflow-x-hidden"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://ik.imagekit.io/admr8uj75/KIITESummit_Theme.webm/ik-video.mp4?updatedAt=1754569881061" type="video/mp4" />
        </video>
      
        {/* Content Container */}
        <div className="relative w-full flex flex-col items-center justify-center pt-20 pb-16 z-10 min-h-screen">
          {/* E-Summit Logo Image - Positioned at Bottom */}
          <img
            src="https://ik.imagekit.io/admr8uj75/Asset%201@4x%203%20(2).png?updatedAt=1754565142707"
            alt="E-Summit"
            className="absolute w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] object-contain z-20"
            style={{
              bottom: '120px',
              left: '50%',
              transform: 'translate(-50%,-20%)',
            }}
          />

          {/* Subtitle with Glass Effect Container - Positioned at Bottom */}
          <div 
            className="absolute px-8 py-4 rounded-lg"
            style={{
              bottom: '-10px',
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
              className="text-[18px] sm:text-[22px] md:text-[28px] font-bold leading-snug text-center text-white"
              style={{
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
        className="relative w-full bg-black bg-cover bg-center flex flex-col justify-center items-center text-center text-white px-4 py-8 overflow-x-hidden"
        style={{
          backgroundImage: `url("https://ik.imagekit.io/admr8uj75/Download%20AI%20generated%20tropical%20rainforest,%20with%20towering%20trees%20and%20dense%20greenery,%20providing%20a%20lush%20for%20free%201.png?updatedAt=1754509960696")`,
        }}
      >
        <div className="relative w-full flex flex-col items-center justify-center z-10">
          {/* History Image */}
          <img
            src="https://ik.imagekit.io/admr8uj75/transparent%20(1)%201.png?updatedAt=1753890656393"
            alt="History"
            className="w-screen max-w-none h-auto object-cover z-10 mb-8"
            style={{
              position: "relative",
              left: "50%",
              right: "50%",
              transform: "translateX(-50%)",
              minWidth: "100vw",
            }}
          />

          {/* Timeline Headings and Descriptions Overlapping History Image */}
          <div
            className="absolute left-0 top-1/2 w-full flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 px-2 md:px-8 lg:px-16"
            style={{ zIndex: 50, transform: 'translateY(-50%)', pointerEvents: 'none' }}
          >
            {/* Ruby Empire */}
            <div className="flex-1 flex flex-col items-center" style={{ position: 'relative', top: '-100px', left: '-100px' }}>
              <h3 className="text-[28px] md:text-[32px] font-bold mb-2 text-center" style={{ color: '#EDBD90' }}>2026<br />Ruby Empire</h3>
              <p className="text-base md:text-lg max-w-xs text-center" style={{ color: '#FF375B' }}>The crown passes to Ruby—bold, fiery, and ready to spark a new era of innovation.</p>
            </div>
            {/* Emerald Empire */}
            <div className="flex-1 text-center" style={{ position: 'relative', top: '-350px' }}>
              <h3 className="text-[28px] md:text-[32px] font-bold mb-2" style={{ color: '#EDBD90' }}>2025<br />Emerald Empire</h3>
              <p className="text-base md:text-lg max-w-xs mx-auto" style={{ color: '#15A944' }}>Emerald holds the crown, leading with wisdom and vision as the legacy begins.</p>
            </div>
            {/* Sapphire Empire */}
            <div className="flex-1 flex flex-col items-center" style={{ position: 'relative', top: '10px', right: '-100px' }}>
              <h3 className="text-[28px] md:text-[32px] font-bold mb-2 text-center" style={{ color: '#EDBD90' }}>2027<br />Sapphire Empire</h3>
              <p className="text-base md:text-lg max-w-xs text-center" style={{ color: '#5EBFE6' }}>Sapphire takes the throne, where calm strategy and sharp minds shape the future.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Stone Images Container with ScrollStack Animation */}
      <section
        className="relative w-full bg-black bg-cover bg-center flex flex-col justify-center items-center text-center text-white px-4 py-8 overflow-x-hidden"
        style={{
          backgroundImage: `url("https://ik.imagekit.io/admr8uj75/Download%20AI%20generated%20tropical%20rainforest,%20with%20towering%20trees%20and%20dense%20greenery,%20providing%20a%20lush%20for%20free%201.png?updatedAt=1754509960696")`,
        }}
      >
        <div className="relative w-full flex flex-col items-center justify-center z-10">
          {/* Stone Images Container with ScrollStackItem animation - Static positioning */}
          <div className="relative w-[300px] sm:w-[500px] md:w-[700px] lg:w-[900px] h-[300px] sm:h-[400px] md:h-[500px] mb-8">
            <ScrollStack>
              <ScrollStackItem isFirst={true}>
                <img
                  src="https://ik.imagekit.io/admr8uj75/Property%201=Frame%20270%20(1).png?updatedAt=1753470791607"
                  alt="stone 1"
                  className="absolute inset-0 w-full  object-contain z-10"
                  style={{ display: "block", width: "100%", height: "100%" }}
                />
              </ScrollStackItem>
              <ScrollStackItem>
                <img
                  src="https://ik.imagekit.io/admr8uj75/Property%201=Frame%20271%20(1).png?updatedAt=1753470791633"
                  alt="stone 2"
                  className="absolute inset-0 w-full object-contain z-20"
                  style={{ display: "block", width: "100%", height: "100%" }}
                />
              </ScrollStackItem>
              <ScrollStackItem>
                <img
                  src="https://ik.imagekit.io/admr8uj75/Property%201=Frame%20272%20(1).png?updatedAt=1753470791626"
                  alt="stone 3"
                  className="absolute inset-0 w-full h-full object-contain z-30"
                  style={{ display: "block", width: "100%", height: "100%" }}
                />
              </ScrollStackItem>
            </ScrollStack>
          </div>

          {/* Register Now Button */}
          <div className="w-full flex justify-center">
            <a
              href="#register"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full border-4 font-bold text-base sm:text-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
              style={{
                fontFamily: "Judson, serif",
                background: "#145F58",
                color: "#FFFFFF",
                borderColor: "#B1B194",
              }}
            >
              Register Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThemeHeroSection;

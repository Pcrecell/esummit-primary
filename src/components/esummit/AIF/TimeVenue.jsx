import React from "react";
import { Gideon_Roman } from "next/font/google";

const gideonRoman = Gideon_Roman({
  subsets: ["latin"],
  weight: ["400"],
});

const RoundsSection = ({
  round1Image = "https://i.ibb.co/ympzzNm8/download-71-removebg-preview-1.png",
  round2Image = "https://i.ibb.co/4RCWGmY5/wmremove-transformed-removebg-preview-1-1.png",
  round3Image = "https://i.ibb.co/Tqgy0Rdc/download-86-removebg-preview-1.png",
}) => {
  return (
    <div
      className="py-8 md:py-16 px-8 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('https://i.ibb.co/Lz9SwGXR/image-12.png')",
        backgroundColor: "#011209", // Fallback color
      }}
    >
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(to bottom, #011209 0%, rgba(0,0,0,0) 44%, #011209 100%)",
        }}
      />
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6 md:mb-8">
            <img
              src="https://i.ibb.co/nsBFDqTV/Gold-rule-lines-and-ornaments-set-for-elegant-design-decorative-elements-separators-Premium-Vector-r.png"
              alt="Decorative header"
              className="w-48 md:w-64 h-auto"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 md:gap-8 justify-center items-center">
          {/* First Row - Time and Venue */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-32 justify-center items-center w-full max-w-4xl">
            {/* Time Card */}
            <div className="relative w-full max-w-sm">
              <div className="absolute -left-12 md:-left-16 top-1/2 transform -translate-y-1/2 z-10">
                <img
                  src={round1Image}
                  alt="Round 1"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
              </div>

              <div className="flex items-center bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 backdrop-blur-sm border border-yellow-600/30 rounded-2xl p-3 md:p-4 min-w-[250px] pl-16 md:pl-20 hover:scale-105 transition-transform duration-300">
                <div className={`text-white ${gideonRoman.className}`}>
                  <div className="text-lg md:text-xl font-semibold mb-1">
                    23 August 2025
                  </div>
                  <div className="text-white-300 font-medium text-sm md:text-base">
                    9:00 AM - 4:00 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Card */}
            <div className="relative w-full max-w-sm">
              <div className="absolute -left-8 md:-left-16 top-1/2 transform -translate-y-1/2 z-10">
                <img
                  src={round2Image}
                  alt="Round 2"
                  className="w-20x h-20 md:w-36 md:h-36 object-contain"
                />
              </div>

              <div className="flex items-center bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 backdrop-blur-sm border border-yellow-600/30 rounded-2xl p-3 md:p-4 min-w-[250px] pl-16 md:pl-20 hover:scale-105 transition-transform duration-300">
                <div className={`text-white ${gideonRoman.className}`}>
                  <div className="text-lg md:text-xl font-semibold mb-1">
                    Campus 5
                  </div>
                  <div className="text-white-300 font-medium text-sm md:text-base">
                    Auditorium
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Contact Information */}
          <div className="flex justify-center items-center mt-4 md:mt-8 w-full max-w-md">
            <div className="relative w-full">
              <div className="absolute -left-12 md:-left-16 top-1/2 transform -translate-y-1/2 z-10">
                <img
                  src={round3Image}
                  alt="Contact"
                  className="w-28 h-28 md:w-36 md:h-36 object-contain"
                />
              </div>

              <div className="flex items-center bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 backdrop-blur-sm border border-yellow-600/30 rounded-2xl p-3 md:p-4 min-w-[300px] md:min-w-[350px] pl-16 md:pl-20 hover:scale-105 transition-transform duration-300">
                <div className={`text-white ${gideonRoman.className}`}>
                  <div className="text-base md:text-xl font-semibold mb-1 break-all">
                    Armita Patro - Event POC
                  </div>
                  <div className="text-white-300 font-medium text-sm md:text-base">
                    armita.kiitecell@gmail.com
                  </div>
                  <div className="text-white-300 font-medium text-sm md:text-base">
                    9437161944
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundsSection;

import React from "react";

const RoundsSection = ({
  round1Image = "https://i.ibb.co/ympzzNm8/download-71-removebg-preview-1.png",
  round2Image = "https://i.ibb.co/4n9wSX2C/download-73-removebg-preview-1-1.png",
}) => {
  return (
    <div className="py-20 px-4" style={{ backgroundColor: "#011209" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header Decorative Image */}
        <div className="flex justify-center mb-8">
          <img
            src="https://i.ibb.co/nsBFDqTV/Gold-rule-lines-and-ornaments-set-for-elegant-design-decorative-elements-separators-Premium-Vector-r.png"
            alt="Decorative header"
            className="w-64 h-auto"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-4xl font-bold text-yellow-400 mb-12 tracking-wider">
          TIME & VENUE
        </h2>

        {/* Rounds Container */}
        <div className="flex flex-col md:flex-row gap-32 justify-center items-center">
          {/* Round 1 */}
          <div className="relative">
            {/* Clock Image - Overlay */}
            <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 z-10">
              <img
                src={round1Image}
                alt="Round 1"
                className="w-40 h-40 object-contain"
              />
            </div>

            <div className="flex items-center bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 backdrop-blur-sm border border-yellow-600/30 rounded-2xl p-4 min-w-[250px] pl-20 hover:scale-105 transition-transform duration-300">
              {/* Round 1 Details */}
              <div className="text-white">
                <div className="text-xl font-semibold mb-1">23 August 2025</div>
                <div className="text-yellow-300 font-medium">
                  9:00 AM - 3:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Round 2 */}
          <div className="relative">
            {/* Scroll Image - Overlay */}
            <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 z-10">
              <img
                src={round2Image}
                alt="Round 2"
                className="w-36 h-36 object-contain"
              />
            </div>

            <div className="flex items-center bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 backdrop-blur-sm border border-yellow-600/30 rounded-2xl p-4 min-w-[250px] pl-20 hover:scale-105 transition-transform duration-300">
              {/* Round 2 Details */}
              <div className="text-white">
                <div className="text-xl font-semibold mb-1">Campus 5</div>
                <div className="text-yellow-300 font-medium">Auditorium</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundsSection;

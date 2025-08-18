import React from "react";
import { Cinzel, Poppins } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

const Rules = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background */}
      <div
        className="relative w-full h-full p-4"
        style={{
          backgroundImage: `url('https://ik.imagekit.io/ecellkiit/E-Cell%20Website/image-11.webp?updatedAt=1755288296671')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex py-20 flex-col justify-center items-center">
          {/* Image with Content Overlay */}
          <div className="relative flex justify-center items-center">
            <img
              src="https://ik.imagekit.io/ecellkiit/E-Cell%20Website/Group-15-1.webp?updatedAt=1755288297737"
              alt="Rules and Regulations"
              className="w-auto h-auto max-w-xl object-contain drop-shadow-lg"
              style={{
                filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
              }}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-8 py-2">
              {/* Header Text - Moved up */}
              <div className="text-center mb-8 -mt-8">
                <h1
                  className={`${cinzel.className} text-3xl md:text-4xl font-bold text-yellow-400 tracking-wider mb-2`}
                >
                  RULES AND
                </h1>
                <h2
                  className={`${cinzel.className} text-3xl md:text-4xl font-bold text-yellow-400 tracking-wider`}
                >
                  REGULATIONS
                </h2>
              </div>
              <div
                className={`${poppins.className} space-y-3 relative left-14 top-9 text-yellow-100 max-w-sm text-sm -ml-8 mt-12 mb-6`}
              >
                <div className="flex items-start space-x-1">
                  <p>1.Only registered participants may compete.</p>
                </div>

                <div className="flex items-start space-x-1">
                  <p>2.Be on time; latecomers will be disqualified.</p>
                </div>

                <div className="flex items-start space-x-1 max-w-88">
                  <p>3.Maintain discipline and professionalism at all times.</p>
                </div>

                <div className="flex items-start space-x-1 max-w-96 text-pretty">
                  <p>
                    4.Cheating, plagiarism, or disruption leads to
                    disqualification.
                  </p>
                </div>

                <div className="flex items-start space-x-1">
                  <p>
                    5.No phones, laptops, or external help unless permitted.
                  </p>
                </div>

                <div className="flex items-start space-x-1">
                  <p>6.No communication during solo rounds.</p>
                </div>

                <div className="flex items-start space-x-1">
                  <p>7.Eliminated participants must not interfere.</p>
                </div>

                <div className="flex items-start space-x-1">
                  <p>8.Play fair. Respect the game and its players.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;

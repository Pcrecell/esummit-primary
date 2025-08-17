import Image from "next/image";
import bgImage from "../../../../../public/images/hackathon/timeline-bg.png";
import hourglassImage from "../../../../../public/images/hackathon/timeline-hourglass.png";
import locationSignImage from "../../../../../public/images/hackathon/location-sign.png";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // add weights you need
});

const Timeline = () => {
  return (
    <div className="w-full relative overflow-hidden max-h-[120vh] md:min-h-screen py-0 md:py-16 md:py-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Timeline Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </div>

      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Bottom black gradient overlay*/}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

      {/* Top black gradient overlay */}
     <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-10" /> 

      <div className="relative z-[99] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center">
        {/* Title */}
        <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold text-[#D4AF37] text-center mb-16 tracking-wider drop-shadow-2xl`}>
          TIMELINE
        </h1>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-center md:items-center justify-between w-full max-w-6xl gap-12 lg:gap-8">
          
          {/* Hourglass with Timeline Entries */}
          <div className="flex-shrink-0 relative z-[100] -translate-x-23 md:-translate-x-0">
            <Image
              src={hourglassImage}
              alt="Timeline Hourglass"
              width={200}
              height={300}
              className="relative z-[100] w-39 h-75  md:w-56 md:h-80 lg:w-64 lg:h-96 object-contain drop-shadow-2xl"
            />
            
            {/* Timeline Entries placed precisely within the three hourglass blocks */}
            <div className="absolute inset-0 pointer-events-none flex">
              {/* Top block */}
              
              <div
              className="absolute flex items-center z-1 justify-center text-center px-[2%] hover:scale-105 transition-transform duration-300 pointer-events-auto"
              style={{ top: '16%', left: '56%', width: '50%', height: '18%', left: "90%", zIndex: 3 }}
              >
              <div className = "h-20 md:h-25 w-60 absolute rounded-3xl md:opacity-[0.7] bg-[#7D6B3A]"></div>
                <div className="w-full">
                  <p className={`${poppins.className} text-xs sm:text-sm md:text-base font-bold text-amber-100 drop-shadow-2xl leading-tight`}>22 August</p>
                  <p className={`${poppins.className} text-[10px] sm:text-xs md:text-sm text-amber-200 opacity-90 drop-shadow-xl leading-tight`}>9:00 AM - 4:00 PM</p>
                </div>
              </div>

              {/* Middle block */}
              <div
              className="absolute flex z-2 items-center justify-center text-center px-[2%] hover:scale-105 transition-transform duration-300 pointer-events-auto"
              style={{ top: '43%', left: '56%', width: '50%', height: '14%', left: "90%", zIndex: 2 }}
              >
              <div className = "h-20 md:h-25 w-60 absolute rounded-3xl md:opacity-[0.7] bg-[#3E3620]"></div>
                <div className="w-full">
                  <p className={`${poppins.className} text-xs sm:text-sm md:text-base font-bold text-amber-100 drop-shadow-2xl leading-tight`}>23 August</p>
                  <p className={`${poppins.className} text-[10px] sm:text-xs md:text-sm text-amber-200 opacity-90 drop-shadow-xl leading-tight`}>9:00 AM - 4:00 PM</p>
                </div>
              </div>

              {/* Bottom block */}
              <div
              className="absolute flex z-3 items-center justify-center text-center px-[2%] hover:scale-105 transition-transform duration-300 pointer-events-auto"
              style={{ top: '67%', left: '56%', width: '50%', height: '18%', left: "90%", zIndex: 1 }}
              >
              <div className = "h-20 md:h-25 w-60 absolute rounded-3xl md:opacity-[0.7] bg-[#7D6B3A]"></div>
                <div className="w-full">
                  <p className={`${poppins.className} text-xs sm:text-sm md:text-base font-bold text-amber-100 drop-shadow-2xl leading-tight`}>24 August</p>
                  <p className={`${poppins.className} text-[10px] sm:text-xs md:text-sm text-amber-200 opacity-90 drop-shadow-xl leading-tight`}>10:00 AM - 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Section with text on image */}
          <div className="flex-shrink-0 relative justify-center z-[9999] mr-5 md:mr-12">
            <Image
              src={locationSignImage}
              alt="Location Sign"
              width={200}
              height={280}
              className="relative z-[2] ml-40 -translate-y-2 md:ml-56 lg:ml-48 w-48 h-64 md:w-56 md:h-72 lg:w-84 lg:h-100 object-contain drop-shadow-2xl"
            />
            <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center px-[6%] py-[12%]">
            <div className = "h-20 w-60 absolute rounded-3xl md:opacity-[0.7] bg-[#3E3620]"></div>
              <div className="text-center max-w-full">
                <p className={`${poppins.className} text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-amber-100 drop-shadow-xl tracking-wide leading-tight`}>
                  Campus-25
                </p>
                <p className={`${poppins.className} text-xs md:text-sm lg:text-base xl:text-lg text-amber-200 opacity-90 mt-1 leading-tight`}>
                  KIIT University
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
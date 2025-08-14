import Image from "next/image";
import bgImage from "../../assets/images/timeline-bg.png";
import hourglassImage from "../../assets/images/timeline-hourglass.png";
import locationSignImage from "../../assets/images/location-sign.png";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // add weights you need
});

const Timeline = () => {
  return (
    <div className="w-full relative overflow-hidden min-h-screen py-16 md:py-24">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center">
        {/* Title */}
        <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold text-yellow-600 text-center mb-16 tracking-wider drop-shadow-2xl`}>
          TIMELINE
        </h1>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-12 lg:gap-8">
          
          {/* Hourglass with Timeline Entries */}
          <div className="flex-shrink-0 relative">
            <Image
              src={hourglassImage}
              alt="Timeline Hourglass"
              width={200}
              height={300}
              className="w-48 h-72 md:w-56 md:h-80 lg:w-64 lg:h-96 object-contain drop-shadow-2xl"
            />
            
            {/* Timeline Entries placed precisely within the three hourglass blocks */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top block */}
              <div
                className="absolute flex items-center justify-end text-right px-[2%]"
                style={{ top: '16%', left: '56%', width: '38%', height: '18%' }}
              >
                <div className="w-full">
                  <p className={`${poppins.className} text-xs sm:text-sm md:text-base font-bold text-amber-100 drop-shadow-2xl leading-tight`}>22 August</p>
                  <p className={`${poppins.className} text-[10px] sm:text-xs md:text-sm text-amber-200 opacity-90 drop-shadow-xl leading-tight`}>9:00 AM - 4:00 PM</p>
                </div>
              </div>

              {/* Middle block */}
              <div
                className="absolute flex items-center justify-end text-right px-[2%]"
                style={{ top: '43%', left: '56%', width: '38%', height: '14%' }}
              >
                <div className="w-full">
                  <p className={`${poppins.className} text-xs sm:text-sm md:text-base font-bold text-amber-100 drop-shadow-2xl leading-tight`}>23 August</p>
                  <p className={`${poppins.className} text-[10px] sm:text-xs md:text-sm text-amber-200 opacity-90 drop-shadow-xl leading-tight`}>9:00 AM - 4:00 PM</p>
                </div>
              </div>

              {/* Bottom block */}
              <div
                className="absolute flex items-center justify-end text-right px-[2%]"
                style={{ top: '70%', left: '56%', width: '38%', height: '18%' }}
              >
                <div className="w-full">
                  <p className={`${poppins.className} text-xs sm:text-sm md:text-base font-bold text-amber-100 drop-shadow-2xl leading-tight`}>24 August</p>
                  <p className={`${poppins.className} text-[10px] sm:text-xs md:text-sm text-amber-200 opacity-90 drop-shadow-xl leading-tight`}>9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Section with text on image */}
          <div className="flex-shrink-0 relative">
            <Image
              src={locationSignImage}
              alt="Location Sign"
              width={200}
              height={280}
              className="w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 object-contain drop-shadow-2xl"
            />
            
            {/* Campus Text positioned on the location sign */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-[6%] py-[12%]">
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
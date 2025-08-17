
import bgImage from "../../../../../public/images/hackathon/guidelines-bg.png";
import Image from "next/image";


// Guidelines component matching the image layout
const Guidelines = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Guidelines background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      {/* Removed global golden overlays; we'll add a local semi-circle behind the heading */}

      {/* Main Content Container (Desktop and up) */}
      <div className="relative z-10 hidden md:flex items-center justify-between h-screen px-8 md:px-2 lg:px-12">
        {/* Single yellowish background panel behind the left text (desktop only) */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[82vh] w-[65vw] max-w-[1300px] -ml-20 rounded-r-[999px] bg-[#9E8851]/14 border border-[#9E8851]/35 pointer-events-none select-none z-0 overflow-hidden"
        >
          {/* Shine effect */}
          <div
            className="absolute inset-0 opacity-0 animate-shine"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(158, 136, 81, 0.08), transparent)',
              animation: 'shine 3s ease-in-out infinite',
              transform: 'translateX(-100%)'
            }}
          />
        </div>

        {/* Bottom black gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

        {/* Top black gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/60 to-transparent z-10" />

        {/* Left Side - Guidelines Text */}
        <div className="w-1/2 space-y-6 text-[#CDAF5B]">
          <ul className="space-y-4 text-base md:text-sm lg:text-md xl:text-xl font-medium leading-relaxed tracking-wide">
            <li className="flex items-start">
              <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#31B34D] mt-2 mr-4 flex-shrink-0" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,5 10,0 10,10" />
              </svg>
              <span>
                Participants must form teams comprising 3 to 5 members. Collaboration is key - diverse minds bring bold solutions.
              </span>
            </li>

            <li className="flex items-start">
              <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#31B34D] mt-2 mr-4 flex-shrink-0" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,5 10,0 10,10" />
              </svg>
              <span>
                Submissions must be 100% original. Innovative thinking is what we reward. Any instance of plagiarism will lead to disqualification.
              </span>
            </li>

            <li className="flex items-start">
              <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#31B34D] mt-2 mr-4 flex-shrink-0" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,5 10,0 10,10" />
              </svg>
              <span>
                All projects must be aligned with the central theme of Pandora's Paradox. Creativity within the boundaries of the theme is encouraged.
              </span>
            </li>

            <li className="flex items-start">
              <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#31B34D] mt-2 mr-4 flex-shrink-0" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,5 10,0 10,10" />
              </svg>
              <span>
                Teams must submit projects under the chosen track. Solutions should clearly reflect the problem statements within the track they are competing in.
              </span>
            </li>

            <li className="flex items-start">
              <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#31B34D] mt-2 mr-4 flex-shrink-0" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,5 10,0 10,10" />
              </svg>
              <span>
                All submissions must be made within the given deadline. Late entries will not be entertained under any circumstances.
              </span>
            </li>

            <li className="flex items-start">
              <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#31B34D] mt-2 mr-4 flex-shrink-0" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,5 10,0 10,10" />
              </svg>
              <span>
                Submissions should be complete and ready for judging. This includes code repositories, deployment (if any), and a brief project pitch or documentation.
              </span>
            </li>
          </ul>
        </div>

        {/* Right Side - Guidelines Heading */}
        <div className="w-1/2 flex justify-center items-center relative z-10">
          <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl md:pl-[25vw] font-bold text-[#CDAF5B] select-none tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
            GUIDELINES
          </h1>
        </div>

      </div>

      {/* Mobile Responsive Layout (Heading on top, text below) */}
      <div className="md:hidden relative z-10 flex flex-col min-h-screen px-6 py-3 space-y-6">
        {/* Mobile Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#9E8851] select-none tracking-wider mb-4">
          GUIDELINES
        </h1>

        {/* Mobile Guidelines Text */}
        <div className="space-y-4">
          <ul className="space-y-4 text-sm sm:text-base font-medium leading-normal sm:leading-relaxed tracking-wide mobile-shine-text">
            <li className="flex items-start">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#31B34D] mt-1.5 mr-4 flex-shrink-0" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,5 10,0 10,10" />
              </svg>
              <span>
                Participants must form teams comprising 3 to 5 members. Collaboration is key - diverse minds bring bold solutions.
              </span>
            </li>

            <li className="flex items-start">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#31B34D] mt-1.5 mr-4 flex-shrink-0" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,5 10,0 10,10" />
              </svg>
              <span>
                Submissions must be 100% original. Innovative thinking is what we reward. Any instance of plagiarism will lead to disqualification.
              </span>
            </li>

            <li className="flex items-start">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#31B34D] mt-1.5 mr-4 flex-shrink-0" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,5 10,0 10,10" />
              </svg>
              <span>
                All projects must be aligned with the central theme of Pandora's Paradox. Creativity within the boundaries of the theme is encouraged.
              </span>
            </li>

            <li className="flex items-start">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#31B34D] mt-1.5 mr-4 flex-shrink-0" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,5 10,0 10,10" />
              </svg>
              <span>
                Teams must submit projects under the chosen track. Solutions should clearly reflect the problem statements within the track they are competing in.
              </span>
            </li>

            <li className="flex items-start">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#31B34D] mt-1.5 mr-4 flex-shrink-0" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,5 10,0 10,10" />
              </svg>
              <span>
                All submissions must be made within the given deadline. Late entries will not be entertained under any circumstances.
              </span>
            </li>

            <li className="flex items-start">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#31B34D] mt-1.5 mr-4 flex-shrink-0" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,5 10,0 10,10" />
              </svg>
              <span>
                Submissions should be complete and ready for judging. This includes code repositories, deployment (if any), and a brief project pitch or documentation.
              </span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Guidelines;
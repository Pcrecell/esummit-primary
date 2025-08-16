import React from 'react'
import bgImage from "../../../../../public/images/hackathon/why-us-bg.png";
import Image from 'next/image';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // add weights you need
});

const BegVsAdvPage = () => {
  return (
    <div className="min-h-screen py-6 md:py-10 bg-black relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="About background"
          fill
          priority
          className="object-cover opacity-30"
        />
      </div>

      {/* Bottom black gradient overlay*/}
      <div className="absolute bottom-0 left-0 right-0 h-84 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      {/* Top black gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-10" />

      {/* Content Container */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[#D4AF37] text-center py-6 md:py-12 lg:py-15">
          TWO TIER SYSTEM
        </h1>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 md:gap-6 lg:gap-8 max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto ">
          {/* Beginner Track */}
          <div className="flex-1 bg-[#2B2E02] text-xs sm:text-sm md:text-base lg:text-lg flex flex-col rounded-2xl md:rounded-3xl lg:rounded-4xl border-2 border-[#FFD292] p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 hover:scale-101 transition">
            <div className="text-xl sm:text-2xl md:text-3xl text-[#D4AF37] text-center pb-4 md:pb-6 lg:pb-8 xl:pb-10 font-semibold">
              BEGINNER
            </div>

            {/* Mobile */}
            <div className="flex-1 block lg:hidden text-gray-200 font-roboto leading-relaxed text-center">
              The Beginners Track of Pandora's Paradox is a launchpad for aspiring innovators entering the hackathon world. Designed to help you explore, experiment, and learn, it features problem statements that spark creativity and apply it to real-world problems. With mentor led guidance, hands-on workshops, and resources for coding, design, and ideation, you'll build practical skills. Collaboration is key, work in teams, share ideas, and grow together. Whether student, hobbyist, or tech enthusiast, no experience is needed here, learning is your greatest win.
            </div>

            {/*  desktop */}
            <div className="flex-1 hidden lg:block text-gray-200 font-roboto leading-relaxed text-center">
              Pandora's Paradox is the perfect launching pad for aspiring innovators taking their first step into the hackathon world. This beginner friendly track is designed for you to explore, experiment, and learn while creating without competing with experienced professionals. The hackathon will have problem statements written to stimulate creativity as well as help you to apply these creative methods to solve real-world problems. You will have mentor led instruction and hands-on workshops, providing the possible resources for you to develop practical skill sets such as coding, design, and ideation. Collaboration is a fundamental core value of this hackathon, this means that you can work in powerful teams, bounce ideas off each other, and learn from each other. You could be a student, a hobbyist, or just somebody interested in a tech-driven innovation or invention to pursue your curiosity and turn it into something impactful. If you don't have a hackathon experience, no worries! here, learning is the best win.
            </div>
          </div>


          {/* Advanced Track */}
          <div className="flex-1 bg-[#2B2E02] text-xs sm:text-sm md:text-base lg:text-lg flex flex-col border-2 rounded-2xl md:rounded-3xl lg:rounded-4xl border-[#FFD292] p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 hover:scale-101 transition">
            <div className="text-xl sm:text-2xl md:text-3xl text-[#D4AF37] text-center pb-4 md:pb-6 lg:pb-8 xl:pb-10 font-semibold">
              ADVANCED
            </div>

            {/* mobile */}
            <div className="flex-1 block lg:hidden text-gray-200 font-roboto leading-relaxed text-center">
              The Advanced Track of Pandora's Paradox is a high-octane challenge for developers, designers, and entrepreneurs to tackle complex, impact-driven problems. Compete under tight deadlines, showcasing boldness, speed, and vision for real-world applications. With experienced mentors offering insights, you'll engage in rapid prototyping, iteration, and strategy-building to create scalable, viable solutions. Only the most effective, innovative ideas impress judges and industry experts. If you thrive under intense pressure and love building impactful solutions, this is your ultimate battlefield. Ambition meets skill here.
            </div>

            {/* desktop */}
            <div className="flex-1 hidden lg:block text-gray-200 font-roboto leading-relaxed text-center">
              If you consider yourself an experienced problem-solver, Pandora's Paradox is a high-octane challenge to define, explore, and push your innovation limits. The Advanced Track is suited for developers, designers, and entrepreneurs who want to explore complex, impact-driven problem statements. This is your chance to shine and showcase your expertise while developing a viable solution with the potential to develop scalable solutions. You can also impress judges and industry experts with your skills. Along the way, you will tackle real-world challenges that require a range of advanced technical skills, a sound strategy or hypothesis, and a rapid prototyping and iteration process. Although experienced mentors will be available to lend advice and key insights, it is extremely competitive and only the most viable, effective, and innovative solutions will be considered. The advanced track is designed specifically for boldness, speed, and vision about application in the real world. Tight deadlines with high stakes because world-class competitors is when ambition meets skill. If this aligns with your abilities and you thrive under intense pressure and love the thrill of building solutions that impact, this is your battlefield.
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default BegVsAdvPage
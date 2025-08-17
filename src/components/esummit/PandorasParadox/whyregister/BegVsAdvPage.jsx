import React, { useState, useRef } from 'react'
import bgImage from "../../../../../public/images/hackathon/why-us-bg.png";
import Image from 'next/image';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // add weights you need
});

const BegVsAdvPage = () => {
  const [beginnerSpotlight, setBeginnerSpotlight] = useState({ x: 50, y: 50 });
  const [advancedSpotlight, setAdvancedSpotlight] = useState({ x: 50, y: 50 });
  const [beginnerTransform, setBeginnerTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [advancedTransform, setAdvancedTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [beginnerGlow, setBeginnerGlow] = useState({ x: 50, y: 50, intensity: 0 });
  const [advancedGlow, setAdvancedGlow] = useState({ x: 50, y: 50, intensity: 0 });
  const beginnerCardRef = useRef(null);
  const advancedCardRef = useRef(null);

  const handleMouseMove = (e, cardRef, setSpotlight, setTransform, setGlow) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Calculate 3D transform values
      const rotateY = ((x - 50) / 50) * 8; // Max 8 degrees tilt
      const rotateX = ((50 - y) / 50) * 8; // Max 8 degrees tilt (inverted)
      const scale = 1.02; // Slight scale on hover
      
      setSpotlight({ x, y });
      setTransform({ rotateX, rotateY, scale });
      setGlow({ x, y, intensity: 1 });
    }
  };

  const handleMouseLeave = (setSpotlight, setTransform, setGlow) => {
    setSpotlight({ x: 50, y: 50 });
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
    setGlow({ x: 50, y: 50, intensity: 0 });
  };

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
        <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-[#D4AF37] text-center py-6 md:py-12 lg:py-20">
          TWO TIER SYSTEM
        </h1>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 md:gap-6 lg:gap-8 max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto relative">
          {/* Dynamic Background Lighting */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
            style={{
              background: `
                radial-gradient(
                  800px circle at ${beginnerGlow.x < 50 ? beginnerGlow.x + 25 : beginnerGlow.x - 25}% ${beginnerGlow.y}%,
                  rgba(212, 175, 55, ${beginnerGlow.intensity * 0.15}) 0%,
                  rgba(212, 175, 55, ${beginnerGlow.intensity * 0.08}) 30%,
                  transparent 60%
                ),
                radial-gradient(
                  800px circle at ${advancedGlow.x > 50 ? advancedGlow.x - 25 : advancedGlow.x + 25}% ${advancedGlow.y}%,
                  rgba(212, 175, 55, ${advancedGlow.intensity * 0.15}) 0%,
                  rgba(212, 175, 55, ${advancedGlow.intensity * 0.08}) 30%,
                  transparent 60%
                )
              `
            }}
          />
          
          {/* Beginner Track */}
          <div 
            ref={beginnerCardRef}
            onMouseMove={(e) => handleMouseMove(e, beginnerCardRef, setBeginnerSpotlight, setBeginnerTransform, setBeginnerGlow)}
            onMouseLeave={() => handleMouseLeave(setBeginnerSpotlight, setBeginnerTransform, setBeginnerGlow)}
            className="flex-1 bg-[#0a0a0a] text-xs sm:text-sm md:text-base lg:text-lg flex flex-col rounded-2xl md:rounded-3xl lg:rounded-4xl border-2 border-[#FFDF66] p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 transition-all duration-200 ease-out relative overflow-hidden group"
            style={{
              background: beginnerGlow.intensity > 0 ? `
                radial-gradient(
                  600px circle at ${beginnerSpotlight.x}% ${beginnerSpotlight.y}%,
                  rgba(212, 175, 55, 0.15),
                  rgba(212, 175, 55, 0.08) 40%,
                  rgba(10, 10, 10, 0.9) 80%
                ),
                #1a1508
              ` : '#1a1508', // Changed background to almost black for better contrast
              boxShadow: `
                0 0 50px rgba(212, 175, 55, 0.2),
                inset 0 0 100px rgba(212, 175, 55, 0.1)
              `,
              transform: `
                perspective(1000px) 
                rotateX(${beginnerTransform.rotateX}deg) 
                rotateY(${beginnerTransform.rotateY}deg) 
                scale(${beginnerTransform.scale})
              `,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Shine overlay for beginner card */}
            <div className="absolute inset-0 shine-overlay opacity-60 pointer-events-none"></div>
            
            <div className="text-xl sm:text-2xl md:text-3xl text-[#D4AF37] text-center pb-4 md:pb-6 lg:pb-8 xl:pb-10 font-semibold relative z-10">
              BEGINNER
            </div>

            {/* Mobile */}
            <div className="flex-1 block lg:hidden text-gray-200 font-roboto leading-relaxed text-center relative z-10">
              The Beginners Track of Pandora's Paradox is a launchpad for aspiring innovators entering the hackathon world. Designed to help you explore, experiment, and learn, it features problem statements that spark creativity and apply it to real-world problems. With mentor led guidance, hands-on workshops, and resources for coding, design, and ideation, you'll build practical skills. Collaboration is key, work in teams, share ideas, and grow together. Whether student, hobbyist, or tech enthusiast, no experience is needed here, learning is your greatest win.
            </div>

            {/*  desktop */}
            <div className="flex-1 hidden lg:block text-gray-200 font-roboto leading-relaxed text-center relative z-10">
              <ul>
                <li><strong>Pandora's Paradox</strong> is the perfect launchpad for aspiring innovators entering the hackathon world.</li>
                <li>This beginner-friendly track lets you explore, experiment, and learn without competing against experienced professionals.</li>
                <li>Problem statements are crafted to stimulate creativity and help you apply innovative methods to solve real world challenges.</li>
                <li>Mentor-led instruction and hands on workshops provide resources to build practical skills in coding, design, and ideation.</li>
                <li>Collaboration is a core value you’ll work in teams, share ideas, and learn from each other.</li>
                <li>Open to students, hobbyists, or anyone curious about tech-driven innovation or invention.</li>
                <li>No prior hackathon experience required here, learning itself is the best win.</li>
              </ul>

            </div>
          </div>


          {/* Advanced Track */}
          <div 
            ref={advancedCardRef}
            onMouseMove={(e) => handleMouseMove(e, advancedCardRef, setAdvancedSpotlight, setAdvancedTransform, setAdvancedGlow)}
            onMouseLeave={() => handleMouseLeave(setAdvancedSpotlight, setAdvancedTransform, setAdvancedGlow)}
            className="flex-1 bg-[#0a0a0a] text-xs sm:text-sm md:text-base lg:text-lg flex flex-col border-2 rounded-2xl md:rounded-3xl lg:rounded-4xl border-[#FFD292] p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 transition-all duration-200 ease-out relative overflow-hidden group"
            style={{
              background: advancedGlow.intensity > 0 ? `
                radial-gradient(
                  600px circle at ${advancedSpotlight.x}% ${advancedSpotlight.y}%,
                  rgba(212, 175, 55, 0.15),
                  rgba(212, 175, 55, 0.05) 40%,
                  rgba(10, 10, 10, 0.9) 80%
                ),
                #0a0a0a
              ` : '#0a0a0a', // Changed background to almost black for better contrast
              boxShadow: `
                0 0 50px rgba(212, 175, 55, 0.2),
                inset 0 0 100px rgba(212, 175, 55, 0.1)
              `,
              transform: `
                perspective(1000px) 
                rotateX(${advancedTransform.rotateX}deg) 
                rotateY(${advancedTransform.rotateY}deg) 
                scale(${advancedTransform.scale})
              `,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Shine overlay for advanced card */}
            <div className="absolute inset-0 shine-overlay opacity-60 pointer-events-none"></div>
            
            <div className="text-xl sm:text-2xl md:text-3xl text-[#D4AF37] text-center pb-4 md:pb-6 lg:pb-8 xl:pb-10 font-semibold relative z-10">
              ADVANCED
            </div>

            {/* mobile */}
            <div className="flex-1 block lg:hidden text-gray-200 font-roboto leading-relaxed text-center relative z-10">
              The Advanced Track of Pandora's Paradox is a high-octane challenge for developers, designers, and entrepreneurs to tackle complex, impact-driven problems. Compete under tight deadlines, showcasing boldness, speed, and vision for real-world applications. With experienced mentors offering insights, you'll engage in rapid prototyping, iteration, and strategy-building to create scalable, viable solutions. Only the most effective, innovative ideas impress judges and industry experts. If you thrive under intense pressure and love building impactful solutions, this is your ultimate battlefield. Ambition meets skill here.
            </div>

            {/* desktop */}
            <div className="flex-1 hidden lg:block text-gray-200 font-roboto leading-relaxed text-center relative z-10">
              <ul>
                <li><strong>Pandora's Paradox Advanced Track</strong> is a high-octane challenge for experienced problem-solvers to push their innovation limits.</li>
                <li>Designed for developers, designers, and entrepreneurs who want to tackle complex, impact-driven problem statements.</li>
                <li>Showcase your expertise while building scalable, viable solutions that can impress judges and industry experts.</li>
                <li>Work on real world challenges requiring advanced technical skills, sound strategy, and rapid prototyping.</li>
                <li>Mentors will be available to provide advice and insights, but only the most effective and innovative solutions will stand out.</li>
                <li>The track emphasizes boldness, speed, and real-world application under tight deadlines and high stakes.</li>
                <li>Perfect for those who thrive under intense pressure and love the thrill of creating impactful solutions this is your battlefield.</li>
              </ul>

            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default BegVsAdvPage
"use client";
import { useEffect, useState } from 'react';

export default function Story() {
  const [visibleLines, setVisibleLines] = useState(0);
  
  const textContent = [
  { text: "ORACLE IS WHERE MYTHS COME TO LIFE AND .", delay: 0 },
  { text: "ONLY THE BRAVE SURVIVE BEHIND ITS ", delay: 800 },
  { text: "MYSTERIOUS FRONT IS A MAZE OF TRICKY ", delay: 1600 },
  { text: "CHALLENGES...TWISTED BY THE SERPENT'S SLY ", delay: 2400 },
  { text: "COILS, GUARDED BY THE MIGHTY LADON,AND", delay: 3200 },
  { text: "HAUNTED BY THE WRATH OF THE GORGONS...ALL ", delay: 4000 },
  { text: "UNDER THE UNBLINKING, DEADLY GAZE OF ", delay: 4800 },
  { text: "MEDUSA HERSELF.EVERY CHOICE YOU MAKE ", delay: 5600 },
  { text: "COULD LEAD TO VICTORY...OR TRAP YOU FOREVER. ", delay: 6400 },
  { text: "FOREVER. ", delay: 7200 },
  { text: "THIS ISN'T JUST A GAME—IT'S A TEST OF YOUR ", delay: 8000 },
  { text: "BRAIN, COURAGE, AND QUICK THINKING. THOSE", delay: 8800 },
  { text: "WHO DARE TO PLAY CAN WIN GLORY, LEARN", delay: 9600 },
  { text: "FROM MENTORS, AND TAKE HOME REWARDS", delay: 10400 },
  { text: "WORTHY OF A TRUE CHAMPION. BUT BE", delay: 11200 },
  { text: "CAREFUL...ONE WRONG MOVE, AND THE LEGEND", delay: 12000 },
  { text: "MIGHT TURN YOU TO STONE.", delay: 12800 }
];

  useEffect(() => {
    const timers = textContent.map((line, i) => {
      return setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, line.delay);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://ik.imagekit.io/5xwmtpwkb/KIITECELL_Aboutus.mp4?updatedAt=1755100824142"
          type="video/mp4"
        />
      </video>
      {/* Top Dark Fading Overlay */}
<div
  className="absolute top-0 left-0 w-full h-1/3 z-5 pointer-events-none"
  style={{
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
  }}
></div>

       <div
        className="absolute bottom-0 left-0 w-full h-1/3 z-5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
        }}
      ></div>

      {/* Text Overlay - Left Aligned */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-[90%] px-5 py-12 mx-auto text-left">
          <div className="space-y-0.1">
            {textContent.map((line, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 ease-out 
                  ${index < visibleLines ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  fontFamily: '"Times New Roman", Times, serif',
                  fontWeight: 'bold',
                  fontSize: 'clamp(1.5rem, 2vw, 2.7rem)',
                  lineHeight: '1.0',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}
              >
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
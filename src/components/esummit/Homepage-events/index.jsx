"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Dummy event data
const events = [
  {
    id: "1",
    title: "ORACLE",
    date: "23.08.25",
    time:"9.00AM-3.00PM",
    desc: " The signature blind pitching event of KIIT E-Cell that embodies adaptability and creativity.Challenges are revealed seconds before you pitch your idea, heaping a good dose of wit and confidence onto the task.Oracle is all about quick thinking and the art of persuasion, all under the pressure of collaborative performance.Everyone has a chance to win, from gutsy newbies to seasoned professionals.",
    image: "https://i.postimg.cc/63NtY1mf/Group-1000002414.png",
  },
  {
    id: "2",
    title: "ALICE IN FOUNDERLAND",
    date: "23.08.25",
    time:"9.00AM-3.00PM",
    desc: " The elite entrepreneurial survival game with combative and inventive tasks.Players face startup challenges with limited time, limited resources, and fierce competition. Every decision counts - from securing investment, outsmarting your competitors and taking a pivot when faced with uncertainty. Only the fastest thinkers will walk away as an entrepreneur.",
    image: "https://i.postimg.cc/jd9VMFWn/Group-1000002412.png",
  },
  {
    id: "3",
    title: "CASE BATTLE",
    date: "24.08.25",
    time:"9.00AM-3.00PM",
    desc: "The ultimate battleground created by KIIT E-Cell for future strategists and problem solvers.You’ll wrestle with actual business challenges using critical thinking and unique strategies.In a team format, you will illustrate your teamwork, business insight, and consulting vibe in a competitive environment.Each pitch is your breakthrough in the boardroom.",
    date: "AUG 24",
    image: "https://i.ibb.co/wNHKkgvS/Group-1000002419.png",
  },
  {
    id: "4",
    title: "PANDORAS PARADOX",
    date: "22.08.25-24.08.25",
    time:"9.00AM-4.30PM",
    desc: "KIIT E-Cell’s flagship hackathon where ideas meet impact.In 72 hours, participants take on real-world challenges guided by experienced mentors.Our unique two-tier system makes this arena accessible to everyone - from amateurs to experts.Innovation, resources, and rewards - all on one stage.",
    image: "https://i.postimg.cc/7Zs5tD3M/Group-1000002415.png",
  },
  {
    id: "5",
    title: "EXPO",
    date: "22.08.25-23.08.25",
    time:"11.00AM-4.30PM",
    desc: "EXPO 2025 is where vision meets opportunity. This two-day powerhouse event provides a podium for student-led startups, emerging business and established companies to collectively demonstrate innovation, develop collaborative opportunities and attract investments.From mentorship to investment it’s a launchpad for entrepreneurship.Here, visions become ventures.",
    image: "https://i.postimg.cc/T3z634fv/Group-1000002413.png",
  },
];

export const Event = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100 && current < events.length - 1) {
      setCurrent(current + 1);
    } else if (info.offset.x > 100 && current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <div
      className="w-full bg-cover bg-center flex items-center justify-center relative translate-y-40"
      style={{
        backgroundImage: `url('https://i.postimg.cc/tR5Gf4xW/image-2.png')`,
        minHeight: "110vh",
        backgroundSize: "cover",
        backgroundPosition: "calc(50%) center"
      }}
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent z-5"></div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-5"></div>

      <div className="relative w-full max-w-6xl px-4">
        <button
    onClick={prev}
    className="absolute left-4 md:-left-8 md:top-1/2 top-[35%] -translate-y-1/2 z-10 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
  >
    <ChevronLeft size={32} />
  </button>

  {/* Fixed Right Arrow */}
  <button
    onClick={next}
    className="absolute right-4 md:-right-8 md:top-1/2 top-[35%] -translate-y-1/2 z-10 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
  >
    <ChevronRight size={32} />
  </button>
       <AnimatePresence mode="wait">
  <motion.div
    key={events[current].id}
    className="relative w-full flex flex-col md:flex-row items-center justify-between gap-8 md:-mt-40 z-10"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    onDragEnd={handleDragEnd}
  >
    {/* Left Text */}
    <div className="text-white w-full md:w-1/3 flex flex-col items-center justify-center ">
      <h2
        className="text-4xl md:text-5xl font-bold font-poppins mb-2 text-center md:-mt-32 text-[#00FF3B]"
      >
        {events[current].title}
      </h2>
      <p className="text-lg opacity-80 font-inter text-center">
        {events[current].date}        
      </p>
       <p className="text-lg opacity-80 font-inter text-center">
        {events[current].time}        
      </p>
    </div>

    {/* Centered Image */}
    <div className="w-full md:w-1/3 flex justify-center items-center h-[500px] md:h-[600px] relative">
  <img
    src={events[current].image}
    alt={events[current].title}
    className="max-h-full max-w-full object-contain"
  />
</div>


    {/* Right Description */}
    <div className="text-white w-full md:w-1/3 flex flex-col items-center ">
      <h2
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{ fontFamily: 'Teko, sans-serif' }}
      >
        About Event
      </h2>
      <p
        className="text-lg opacity-90 text-center tracking-widest"
        style={{ fontFamily: 'Teko, sans-serif' }}
      >
        {events[current].desc}
      </p>
    </div>
  </motion.div>
</AnimatePresence>

      </div>
    </div>
  );
};
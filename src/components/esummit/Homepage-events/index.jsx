"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Dummy event data
const events = [
  {
    id: "1",
    title: "ORACLE",
    date: "AUG 15",
    desc: "ORACLE is an electrifying ideation and pitch event that challenges participants to think beyond borders. In this unique experience, participants are presented with real-world problem statements concerning various countries and global issues. Their task? To brainstorm innovative solutions, back them up with data, and pitch their ideas in front of a live audience and expert panel.Whether it's tackling environmental challenges in Southeast Asia, improving digital infrastructure in African nations, or reimagining education systems in South America — ORACLE is your gateway to becoming a global change-maker.",
    image: "https://i.postimg.cc/zfGVjDCX/Property-1-Frame-303.png",
  },
  {
    id: "2",
    title: "ALICE IN FOUNDERLAND",
    date: "AUG 15",
    desc: "Welcome to Alice in Founderland, a thrilling entrepreneurial adventure inspired by the hit series Alice in Borderland. In this high-stakes event, participants must navigate through a challenging game, where each level unravels a complex real-world problem demanding smart, scalable solutions.Participants are not just solving problems — they’re playing to win. Every challenge is designed to test your creativity, critical thinking, and entrepreneurial instincts. The deeper you go, the tougher it gets. But only those who crack the code and present the most impactful ideas will emerge victorious.",
    image: "https://i.postimg.cc/jj3CkVc6/Property-1-Frame-301.png",
  },
  {
    id: "3",
    title: "CASE BATTLE",
    date: "AUG 15",
    desc: "Case Battle is the ultimate battleground for problem solvers, strategists, and future leaders. In this intense event, participants are presented with real-world case studies across diverse domains — from business and tech to social impact and governance.Teams must analyze the case, devise practical solutions, and battle it out through presentations that are judged on innovation, feasibility, and clarity. It’s not just about having an idea — it’s about proving it can withstand the heat of competition.",
  },
  {
    id: "4",
    title: "PANDORAS PARADOX",
    date: "AUG 15",
    desc: "Inspired by the mythical tale of Pandora’s Box, Pandora’s Paradox is a gripping ideation challenge where each problem statement is a ‘bad soul’ unleashed into the world — from climate crises and misinformation to ethical dilemmas in tech.But just like the myth, hope remains. It’s up to the participants to transform chaos into solutions — the ‘good souls’. With every round, teams confront darker and more complex challenges, pushing them to think critically, ethically, and creatively.",
    image: "https://i.postimg.cc/kG0JPqR8/Property-1-Frame-300.png",
  },
  {
    id: "5",
    title: "EXPO",
    date: "AUG 15",
    desc: "EXPO is a dynamic showcase of ideas, innovations, and initiatives — a platform where creators, problem solvers, and visionaries come together to exhibit their work and inspire change.From startups and tech demos to social innovations and research models, EXPO brings a diverse range of projects under one roof. It’s not just about displaying; it’s about connecting, collaborating, and sparking conversations that matter.",
    image: "https://i.postimg.cc/bvqm7L2N/Expo-1.png",
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
      className="w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://i.postimg.cc/tR5Gf4xW/image-2.png')`,
        minHeight: "130vh",
      }}
    >
      <div className="relative w-full max-w-6xl px-4">
        <button
    onClick={prev}
    className="absolute left-4 md:-left-8 md:top-1/2 top-[30%] -translate-y-1/2 z-10 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
  >
    <ChevronLeft size={32} />
  </button>

  {/* Fixed Right Arrow */}
  <button
    onClick={next}
    className="absolute right-4 md:-right-8 md:top-1/2 top-[30%] -translate-y-1/2 z-10 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
  >
    <ChevronRight size={32} />
  </button>
       <AnimatePresence mode="wait">
  <motion.div
    key={events[current].id}
    className="relative w-full flex flex-col md:flex-row items-center justify-between gap-8 -mt-32"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    onDragEnd={handleDragEnd}
  >
    {/* Left Text */}
    <div className="text-white w-full md:w-1/3 flex flex-col items-center justify-center md:-mt-48">
      <h2
        className="text-4xl md:text-5xl font-bold font-texturina mb-2 text-center"
        style={{
          background: 'linear-gradient(180deg, #00FF3B 50%, #FFFFFF 50%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {events[current].title}
      </h2>
      <p className="text-lg opacity-80 font-texturina text-center">
        {events[current].date}
      </p>
    </div>

    {/* Centered Image */}
    <div className="w-full md:w-1/3 flex items-center justify-center h-[400px] md:h-[500px] relative">
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
        className="text-lg opacity-90 text-center "
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
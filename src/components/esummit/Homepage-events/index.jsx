"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

async function getBase64(url, fallbackUrl) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:image/webp;base64,${base64}`;
  } catch (error) {
    console.warn(`Failed to fetch tiny URL ${url}, falling back to original image`, error);
    try {
      const fallbackRes = await fetch(fallbackUrl);
      if (!fallbackRes.ok) throw new Error(`HTTP ${fallbackRes.status}`);
      const fallbackBuffer = await fallbackRes.arrayBuffer();
      const fallbackBase64 = Buffer.from(fallbackBuffer).toString('base64');
      return `data:image/webp;base64,${fallbackBase64}`;
    } catch (fallbackError) {
      console.error(`Failed to fetch both tiny and original URLs for ${fallbackUrl}`, fallbackError);
      return null;
    }
  }
}

// Function to generate tiny URL with transformations
function getTinyUrl(originalUrl) {
  return `${originalUrl}?tr=w-20,h-20,bl-6,q-20`;
}

async function addBlurDataUrls(events) {
  const eventsWithBlur = await Promise.all(
    events.map(async (event) => {
      try {
        const tinyUrl = getTinyUrl(event.image);
        const blurDataURL = await getBase64(tinyUrl, event.image);
        return {
          ...event,
          blurDataURL
        };
      } catch (error) {
        console.error(`Failed to generate blur URL for ${event.title}:`, error);
        return {
          ...event,
          blurDataURL: null
        };
      }
    })
  );
  return eventsWithBlur;
}

const initialEvents = [
  {
    id: "1",
    title: "ORACLE",
    date: "23.08.25",
    time: "9.00AM-3.00PM",
    desc: " The signature blind pitching event of KIIT E-Cell that embodies adaptability and creativity.Challenges are revealed seconds before you pitch your idea, heaping a good dose of wit and confidence onto the task.Oracle is all about quick thinking and the art of persuasion, all under the pressure of collaborative performance.Everyone has a chance to win, from gutsy newbies to seasoned professionals.",
    image: "https://ik.imagekit.io/1bsukh3d7/Group-1000002414.webp",
  },
  {
    id: "2",
    title: "ALICE IN FOUNDERLAND",
    date: "23.08.25",
    time: "9.00AM-3.00PM",
    desc: " The elite entrepreneurial survival game with combative and inventive tasks.Players face startup challenges with limited time, limited resources, and fierce competition. Every decision counts - from securing investment, outsmarting your competitors and taking a pivot when faced with uncertainty. Only the fastest thinkers will walk away as an entrepreneur.",
    image: "https://ik.imagekit.io/1bsukh3d7/Group-1000002412.webp",
  },
  {
    id: "3",
    title: "CASE X",
    date: "24.08.25",
    time: "9.00AM-3.00PM",
    desc: "The ultimate battleground created by KIIT E-Cell for future strategists and problem solvers.You'll wrestle with actual business challenges using critical thinking and unique strategies.In a team format, you will illustrate your teamwork, business insight, and consulting vibe in a competitive environment.Each pitch is your breakthrough in the boardroom.",
    image: "https://ik.imagekit.io/1bsukh3d7/Group-1000002419.webp",
  },
  {
    id: "4",
    title: "PANDORA'S PARADOX",
    date: "22.08.25-24.08.25",
    time: "9.00AM-4.30PM",
    desc: "KIIT E-Cell's flagship hackathon where ideas meet impact.In 72 hours, participants take on real-world challenges guided by experienced mentors.Our unique two-tier system makes this arena accessible to everyone - from amateurs to experts.Innovation, resources, and rewards - all on one stage.",
    image: "https://ik.imagekit.io/1bsukh3d7/Group-1000002415.webp",
  },
  {
    id: "5",
    title: "FOUNDER'S ARENA",
    date: "22.08.25-23.08.25",
    time: "11.00AM-4.30PM",
    desc: "EXPO 2025 is where vision meets opportunity. This two-day powerhouse event provides a podium for student-led startups, emerging business and established companies to collectively demonstrate innovation, develop collaborative opportunities and attract investments.From mentorship to investment it's a launchpad for entrepreneurship.Here, visions become ventures.",
    image: "https://ik.imagekit.io/1bsukh3d7/Group-1000002413.webp",
  },
];

export const Event = () => {
  const [current, setCurrent] = useState(0);
  const [events, setEvents] = useState(initialEvents);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeBlurUrls = async () => {
      setIsLoading(true);
      try {
        const eventsWithBlur = await addBlurDataUrls(initialEvents);
        setEvents(eventsWithBlur);
      } catch (error) {
        console.error('Failed to initialize blur URLs:', error);
        setEvents(initialEvents); // Fallback to original events
      } finally {
        setIsLoading(false);
      }
    };

    initializeBlurUrls();
  }, []);

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

  if (isLoading) {
    return (
      <div className="w-full bg-cover bg-center flex items-center justify-center relative translate-y-40 min-h-screen">
        <div className="text-white text-2xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-cover bg-center flex items-center justify-center relative md:translate-y-40"
      style={{
        backgroundImage: `url('https://ik.imagekit.io/1bsukh3d7/image-2.webp?updatedAt=1755242219835')`,
        minHeight: "110vh",
        backgroundSize: "cover",
        backgroundPosition: "calc(50%) center"
      }}
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent z-5"></div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-5"></div>

      <div className="relative w-full max-w-6xl px-4">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-4 md:-left-8 md:top-1/2 top-[35%] -translate-y-1/2 z-20 text-white bg-black/60 hover:bg-black/80 rounded-full p-3 touch-manipulation"
          style={{ pointerEvents: 'auto' }}
        >
          <ChevronLeft size={24} className="md:w-8 md:h-8" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-4 md:-right-8 md:top-1/2 top-[35%] -translate-y-1/2 z-20 text-white bg-black/60 hover:bg-black/80 rounded-full p-3 touch-manipulation"
          style={{ pointerEvents: 'auto' }}
        >
          <ChevronRight size={24} className="md:w-8 md:h-8" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={events[current].id}
            className="relative w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 px-4 md:-mt-40 z-10 py-8 md:py-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            {/* Left Text */}
            <div className="text-white w-full md:w-1/3 flex flex-col items-center justify-center">
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
              <Image
                src={events[current].image}
                alt={events[current].title}
                className="max-h-full max-w-full object-contain"
                width={1000}
                height={1000}
                placeholder="blur"
                blurDataURL={events[current].blurDataURL}
              />
            </div>

            {/* Right Description */}
            <div className="text-white w-full md:w-1/3 flex flex-col items-center">
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
"use client"

import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const handleChange = () => {
      setMatches(mediaQueryList.matches);
    };

    handleChange();

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

const EventCarousel = () => {
  const events = [
    {
      id: 1,
      time: "9:00 AM",
      date: "August 22",
      title: "Pandora's Paradox",
      subtitle: "Join Pandora’s Paradox — Hack Chaos into Innovation!",
    },
    {
      id: 2,
      time: "11:00 AM",
      date: "August 22",
      title: "Founder's Arena",
      subtitle: "Join Founder's Arena: Showcase Your Ideas, Inspire the Future!",
    },
    {
      id: 3,
      time: "09:00 AM",
      date: "August 23",
      title: "Oracle",
      subtitle: "Join ORACLE: Pitch Ideas, Shape the World!",
    },
    {
      id: 4,
      time: "09:00 AM",
      date: "August 23",
      title: "Alice in Founderland",
      subtitle: "Enter Alice in Founderland: Play, Solve, Conquer!",
    },
    {
      id: 5,
      time: "09:00 AM",
      date: "August 24",
      title: "CaseX",
      subtitle: "Join Case Battle: Solve, Strategize, Succeed!",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const isMdOrLarger = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [events.length]);

  const dotPositions = events.map(
    (_, i) => ((i + 1) * 100) / (events.length + 1)
  );
  const indicatorLeft = dotPositions[activeIndex];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col items-center">
        <div
          className={`
            ${isMdOrLarger
              ? 'relative w-full md:max-w-xl lg:max-w-4xl mx-auto md:min-h-24'
              : 'w-[80vw] max-w-md mx-auto'
            }
          `}
        >
          <div
            className={`
              w-full max-w-xs md:max-w-md lg:max-w-lg
              ${isMdOrLarger
                ? 'absolute'
                : 'mx-auto'
              }
            `}
            style={
              isMdOrLarger
                ? {
                    left: `${indicatorLeft}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    transition: 'left 0.5s ease-out',
                  }
                : {}
            }
          >
            <EventCard
              time={events[activeIndex].time}
              date={events[activeIndex].date}
              title={events[activeIndex].title}
              subtitle={events[activeIndex].subtitle}
              onKnowMore={() => {
                // console.log("Clicked event", events[activeIndex].id)
              }}
            />
          </div>
        </div>

        <div className="relative mt-8 lg:mt-3 w-[95vw] max-w-md md:max-w-xl lg:max-w-3xl mx-auto h-6 sm:h-8">
          <div className="absolute top-1/2 left-0 w-full h-[1.5px] sm:h-[2px] bg-white -translate-y-1/2"></div>

          <div
            className="absolute top-1/2 transform -translate-y-1/2 h-[4px] rounded-full"
            style={{
              width: `${indicatorLeft}%`,
              background:
                "linear-gradient(to right, rgba(0,255,0,0), rgba(0,255,0,0.5) 50%, rgba(0,255,0,1))",
              filter: "blur(4px)",
              transition: "width 0.5s ease-out",
            }}
          ></div>

          {dotPositions.map((left, i) => (
            <div
              key={events[i].id}
              className="absolute top-1/2 cursor-pointer"
              style={{
                left: `${left}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setActiveIndex(i)}
            >
              <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            </div>
          ))}
          <div
            className="absolute top-1/2 w-2 h-2 rounded-full bg-green-500"
            style={{
              left: `${indicatorLeft}%`,
              transform: "translate(-50%, -50%)",
              transition: "left 0.5s ease-out",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EventCarousel;
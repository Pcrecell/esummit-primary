"use client";

import React, { useRef, useState, useEffect } from "react";
// framer-motion not needed for the desktop carousel version
import EventCard from "./EventCard";
import { useRouter } from "next/navigation";
import EventsCalendar from "./EventsCalendar";
import EventsMap from "./EventsMap";
import HeroSection from "./HeroSection";
import MobileTabs from "./MobileTabs";
import { useAuth } from "@/lib/context/AuthContext";

const EventsPage = () => {
  const desktopScrollRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(22);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { userData, setUserData, profile, setProfile, loading} = useAuth();
  // note: scroll listeners are attached after events are derived

  const tabs = [
    { date: 22, label: "22nd Friday" },
    { date: 23, label: "23rd Saturday" },
    { date: 24, label: "24th Sunday" },
  ];

  const eventsByDate = {
    22: [
      {
        title: "PANDORA'S PARADOX",
        time: "9:00AM - 4:30PM",
        venue: "CAMPUS-25",
        coordinates: [20.36444610634588, 85.81695856641474],
        description:
          "Pandora's Paradox is a challenge where teams turn complex global problems into creative, ethical solutions.",
        image: "https://ik.imagekit.io/1bsukh3d7/hack-r.webp?updatedAt=1755242215568",
        route: "/pandoras-paradox",
      },
      {
        title: "EXPO",
        time: "11:00AM - 4:30PM",
        venue: "CAMPUS-06",
        coordinates: [20.353523760924087, 85.8195440597536],
        description:
          "EXPO is a showcase where innovators present projects from tech to social impact, fostering connection, collaboration, and change.",
        image: "https://ik.imagekit.io/1bsukh3d7/expo-l.webp?updatedAt=1755242215588",
        route: "/expo",
      },
    ],
    23: [
      {
        title: "ORACLE",
        time: "9:00AM - 3:00PM",
        venue: "CAMPUS-17",
        coordinates: [20.34919541378971, 85.81945496655301],
        description:
          "ORACLE is a pitch event where participants present innovative, data-backed solutions to global challenges.",
        image: "https://ik.imagekit.io/1bsukh3d7/oracle-r.webp?updatedAt=1755242215530",
        route: "/oracle",
      },
      {
        title: "ALICE IN FOUNDERLAND",
        time: "9:00AM - 3:00PM",
        venue: "CAMPUS-05",
        coordinates: [20.352904448394906, 85.81402616826391],
        description:
          "Alice in Founderland is an entrepreneurial challenge where players solve real-world problems with creativity and innovation to win.",
        image: "https://ik.imagekit.io/1bsukh3d7/aif-l.webp?updatedAt=1755242215528",
        route: "/AIF",
      },
      {
        title: "EXPO",
        time: "9:00AM - 3:00PM",
        venue: "CAMPUS-06",
        coordinates: [20.353523760924087, 85.8195440597536],
        description:
          "EXPO is a showcase where innovators present projects from tech to social impact, fostering connection, collaboration, and change.",
        image: "https://ik.imagekit.io/1bsukh3d7/expo-r.webp?updatedAt=1755242215505",
        route: "/expo",
      },
      {
        title: "PANDORA'S PARADOX",
        time: "9:00AM - 4:00PM",
        venue: "CAMPUS-25",
        coordinates: [20.36444610634588, 85.81695856641474],
        description:
          "Pandora's Paradox is a challenge where teams turn complex global problems into creative, ethical solutions.",
        image: "https://ik.imagekit.io/1bsukh3d7/hack-l.webp?updatedAt=1755242215665",
        route: "/pandoras-paradox",
      },
    ],
    24: [
      {
        title: "CASEX",
        time: "9:00AM - 3:00PM",
        venue: "CAMPUS-07",
        coordinates: [20.350485952792063, 85.82069263354178],
        description:
          "Case Battle is a contest where teams solve real-world cases with innovative, practical solutions and defend them before judges.",
        image: "https://ik.imagekit.io/1bsukh3d7/casex-r.webp?updatedAt=1755242215640",
        route: "/case-x",
      },
      {
        title: "PANDORA'S PARADOX",
        time: "9:00AM - 3:00PM",
        venue: "CAMPUS-25",
        coordinates: [20.36444610634588, 85.81695856641474],
        description:
          "Pandora's Paradox is a challenge where teams turn complex global problems into creative, ethical solutions.",
        image: "https://ik.imagekit.io/1bsukh3d7/hack-l.webp?updatedAt=1755242215665",
        route: "/pandoras-paradox",
      },
    ],
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCurrentCardIndex(0); // Reset to first card when date changes
  };
  const handleKnowMore = (route) => {
    if (route && userData) {
      router.push(route);
    }
    else {
      // Redirect to login page if not logged in
      router.push("/login");
    }
  };

  // Smoothly scroll desktop carousel to a specific index (RAF-based)
  const desktopAnimRef = useRef(null);
  const scrollDesktopToIndex = (idx) => {
    const el = desktopScrollRef.current;
    if (!el) return;
    const maxIdx = Math.max(0, (currentEvents?.length || 0) - 1);
    const targetIdx = Math.min(maxIdx, Math.max(0, idx));
    const start = el.scrollTop;
    const slideH = el.clientHeight;
    const end = targetIdx * slideH;
    if (Math.abs(end - start) < 1) return;
    const duration = 450;
    const startTime = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    // Temporarily disable snap so we can animate freely
    const prevSnap = el.style.scrollSnapType;
    el.style.scrollSnapType = "none";
    if (desktopAnimRef.current) cancelAnimationFrame(desktopAnimRef.current);
    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const y = start + (end - start) * ease(t);
      el.scrollTop = y;
      if (t < 1) {
        desktopAnimRef.current = requestAnimationFrame(step);
      } else {
        // Re-enable snap after landing on target
        el.style.scrollSnapType = prevSnap || "";
      }
    };
    desktopAnimRef.current = requestAnimationFrame(step);
  };

  const currentEvents = eventsByDate[selectedDate] || [];
  const currentEvent = currentEvents[currentCardIndex];

  // Desktop carousel scroll listener (vertical)
  useEffect(() => {
    const el = desktopScrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardHeight = el.offsetHeight;
      const idx = Math.round(el.scrollTop / Math.max(cardHeight, 1));
      setCurrentCardIndex(idx);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [selectedDate, currentEvents.length]);

  // Mobile carousel scroll listener
  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.offsetWidth;
      const idx = Math.round(el.scrollLeft / Math.max(cardWidth, 1));
      setCurrentCardIndex(idx);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [selectedDate, currentEvents.length]);

  // Reset scroll position on date change
  useEffect(() => {
    setCurrentCardIndex(0);
  if (desktopScrollRef.current) desktopScrollRef.current.scrollTo({ top: 0 });
    if (mobileScrollRef.current) mobileScrollRef.current.scrollTo({ left: 0 });
  }, [selectedDate]);

  return (
    <div className="w-full">
      <HeroSection />
      {/* Desktop Layout as Carousel (same behavior as mobile) */}
      <div
        className="lg:flex hidden relative"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(24, 28, 13, 1) 0%, rgba(24, 28, 13, 0.3) 70%, rgba(0, 0, 0, 1) 100%), url(\"https://ik.imagekit.io/fhervghik/E-Cell%20Website/Events_Image_Background_Desktop.png?updatedAt=1754584353201\")",
          backgroundSize: "100%",
        }}
      >
        {/* Left: Vertical Scroll Container */}
        <div className="w-full lg:w-[67%] h-screen px-6 py-8 relative flex items-center justify-center">
          <div className="relative z-10 w-full h-full">
            {/* Vertical Pagination (left side) */}
            {currentEvents.length > 1 && (
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
        {currentEvents.map((_, index) => (
                  <button
                    key={`v-dot-${index}`}
          onClick={() => scrollDesktopToIndex(index)}
                    aria-label={`Go to event ${index + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentCardIndex
                        ? "bg-[#f8d6a4] scale-125"
                        : "bg-[#edbd90] opacity-40 hover:opacity-70"
                    }`}
                  />
                ))}
              </div>
            )}
            <div
              ref={desktopScrollRef}
              className="flex flex-col h-full overflow-x-hidden scrollbar-hide snap-y snap-mandatory"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {currentEvents.map((eventData, index) => (
                <div
                  key={`desktop-${selectedDate}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center h-full snap-center"
                >
                    <div className="w-full max-w-4xl mx-auto">
                    <EventCard left={index % 2 === 0} eventData={eventData} />
                    <div className="w-full flex justify-center mt-4 rounded-full">
                      <button
                        onClick={() => handleKnowMore(eventData.route)}
                        className="py-1 px-6 cursor-pointer hover:scale-110 transition-all duration-300 text-black bg-[#e3a57d] border-2 border-yellow-400 rounded-full"
                      >
                        Know More
                      </button>
                    </div>
                      {/* Up/Down controls (right side) */}
                      {currentEvents.length > 1 && (
                        <div className="hidden lg:flex flex-col gap-2 absolute -right-8 top-1/2 -translate-y-1/2 z-20">
                          <button
                            aria-label="Previous event"
                            onClick={() => scrollDesktopToIndex(Math.max(0, currentCardIndex - 1))}
                            disabled={currentCardIndex === 0}
                            className={`w-9 h-9 rounded-full border border-[#edbd90] bg-[#edbd90] text-[140%] text-black hover:bg-transparent hover:text-[gray] transition ${
                              currentCardIndex === 0 ? "opacity-40 cursor-not-allowed" : ""
                            }`}
                          >
                            ↑
                          </button>
                          <button
                            aria-label="Next event"
                            onClick={() => scrollDesktopToIndex(Math.min(currentEvents.length - 1, currentCardIndex + 1))}
                            disabled={currentCardIndex >= currentEvents.length - 1}
                            className={`w-9 h-9 rounded-full border border-[#edbd90] bg-[#edbd90] text-[140%] text-black hover:bg-transparent hover:text-[gray] transition ${
                              currentCardIndex >= currentEvents.length - 1 ? "opacity-40 cursor-not-allowed" : ""
                            }`}
                          >
                            ↓
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Static Section (sticky) */}
        <div className="w-[35%] p-8 bg-none h-screen flex flex-col scale-75 justify-center">
          <div className="translate-y-3">
            <h1 className="text-3xl font-cormorant-infant text-center text-[#f8d6a4] font-semibold">
              Events Calendar
            </h1>
            <EventsCalendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
            <p className="text-[#edbd90] text-base font-cormorant-infant flex items-center justify-center">
              August {selectedDate}, 2025 - {currentEvents.length} event
              {currentEvents.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="mt-3 flex flex-col">
            <h1 className="text-3xl font-cormorant-infant text-center translate-y-5 text-[#f8d6a4] font-semibold">
              Map Of The Emerald Empire
            </h1>
            <EventsMap
              coordinates={currentEvent?.coordinates || [20.3534, 85.8195]}
              label={currentEvent?.title || "Event Location"}
              campus={currentEvent?.venue}
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div
        className="lg:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(24, 28, 13, 1) 0%, rgba(24, 28, 13, 0.3) 70%, rgba(0, 0, 0, 1) 100%), url(\"https://ik.imagekit.io/fhervghik/E-Cell%20Website/Events_Image_Background_Mobile.png?updatedAt=1754584353312\")",
          backgroundSize: "100%",
          backgroundPositionY: "",
          backgroundPositionX: "",
        }}
      >
        {/* Calendar Section - Above events on mobile */}
        <div className="bg-none p-6">
          <h2 className="text-2xl font-bold text-[#edbd90] text-center font-cormorant-infant mb-2">
            Events Calendar
          </h2>
          <div className="">
            <MobileTabs selectedDate={selectedDate} onDateSelect={handleDateSelect} tabs={tabs} />
            <p className="text-[#edbd90] text-base font-cormorant-infant text-center">
              August {selectedDate}, 2025 - {currentEvents.length} event
              {currentEvents.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="relative py-8">
          {/* Background Decorative */}
          <div className="absolute inset-0 pointer-events-none z-0" />

          {/* Horizontal Scroll Container */}
          <div className="relative z-10 px-4">
            <div
              ref={mobileScrollRef}
              className="flex overflow-x-auto scrollbar-hide"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {currentEvents.map((eventData, index) => (
                <div
                  key={`mobile-${selectedDate}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{
                    width: `calc(100vw - 2rem)`,
                    scrollSnapAlign: "center",
                  }}
                >
                  <div className="w-full max-w-sm mx-auto">
                    <EventCard left={index % 2 === 0} eventData={eventData} />
                    <div className="w-full flex justify-center mt-6 rounded-full">
                      <button
                        onClick={() => handleKnowMore(eventData.route)}
                        className="py-1 px-6 cursor-pointer hover:scale-110 transition-all duration-300 text-black bg-[#e3a57d] border-2 border-yellow-400 rounded-full"
                      >
                        Know More
                      </button>
                    </div>  
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator Dots */}
            {currentEvents.length > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {currentEvents.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentCardIndex
                        ? "bg-[#f8d6a4] opacity-100 scale-125"
                        : "bg-[#edbd90] opacity-30"
                    }`}
                  />
                ))}
              </div>
            )}

            {currentEvents.length === 0 && (
              <div className="text-center text-[#edbd90] font-cormorant-infant text-xl py-12">
                No events scheduled for this date
              </div>
            )}
          </div>
        </div>

        {/* Map Section - Right below the cards */}
        <div className="bg-none p-6">
          <h1 className="text-2xl md:pb-0 pb-10 font-cormorant-infant text-center text-[#f8d6a4] font-semibold">
            MAP OF EMERALD EMPIRE
          </h1>
          <EventsMap
            coordinates={currentEvent?.coordinates || [20.3534, 85.8195]}
            label={currentEvent?.title || "Event Location"}
            campus={currentEvent?.venue}
          />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;

"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import EventCard from "./EventCard";
import { useRouter } from "next/navigation";
import EventsCalendar from "./EventsCalendar";
import EventsMap from "./EventsMap";
import HeroSection from "./HeroSection";
import MobileTabs from "./MobileTabs";
import { authAPI } from "@/lib/services/api"; // make sure you have this

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EventsPage = () => {
  const desktopLayoutRef = useRef(null);
  const leftSectionRef = useRef(null);
  const cardRefs = useRef([]);
  const mobileScrollRef = useRef(null);
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(22);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

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
        image: "https://i.ibb.co/7xWdGYwv/hack-r.png",
        route: "/pandoras-paradox",
      },
      {
        title: "EXPO",
        time: "11:00AM - 4:30PM",
        venue: "CAMPUS-06",
        coordinates: [20.353523760924087, 85.8195440597536],
        description:
          "EXPO is a showcase where innovators present projects from tech to social impact, fostering connection, collaboration, and change.",
        image: "https://i.ibb.co/QFJHRt47/expo-l.png",
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
        image: "https://i.ibb.co/gZQgcF5j/oracle-r.png",
        route: "/oracle",
      },
      {
        title: "ALICE IN FOUNDERLAND",
        time: "9:00AM - 3:00PM",
        venue: "CAMPUS-05",
        coordinates: [20.352904448394906, 85.81402616826391],
        description:
          "Alice in Founderland is an entrepreneurial challenge where players solve real-world problems with creativity and innovation to win.",
        image: "https://i.ibb.co/YFnnwgGP/aif-l.png",
        route: "/aif",
      },
      {
        title: "EXPO",
        time: "9:00AM - 3:00PM",
        venue: "CAMPUS-06",
        coordinates: [20.353523760924087, 85.8195440597536],
        description:
          "EXPO is a showcase where innovators present projects from tech to social impact, fostering connection, collaboration, and change.",
        image: "https://i.ibb.co/4Rky463J/expo-r.png",
        route: "/expo",
      },
      {
        title: "PANDORA'S PARADOX",
        time: "9:00AM - 4:00PM",
        venue: "CAMPUS-25",
        coordinates: [20.36444610634588, 85.81695856641474],
        description:
          "Pandora's Paradox is a challenge where teams turn complex global problems into creative, ethical solutions.",
        image: "https://i.ibb.co/twjYHtFw/hack-l.png",
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
        image: "https://i.ibb.co/jPCnVcs0/casex-r.png",
        route: "/case-x",
      },
      {
        title: "PANDORA'S PARADOX",
        time: "9:00AM - 3:00PM",
        venue: "CAMPUS-25",
        coordinates: [20.36444610634588, 85.81695856641474],
        description:
          "Pandora's Paradox is a challenge where teams turn complex global problems into creative, ethical solutions.",
        image: "https://i.ibb.co/twjYHtFw/hack-l.png",
        route: "/pandoras-paradox",
      },
    ],
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCurrentCardIndex(0); // Reset to first card when date changes
  };

  const currentEvents = eventsByDate[selectedDate] || eventsByDate[21];
  const currentEvent = currentEvents[currentCardIndex];

  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const cardWidth = scrollContainer.offsetWidth;
      const currentIndex = Math.round(scrollLeft / cardWidth);
      setCurrentCardIndex(currentIndex);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [currentEvents]);

  useEffect(() => {
    setCurrentCardIndex(0);
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollLeft = 0;
    }
  }, [selectedDate]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (
        !desktopLayoutRef.current ||
        !leftSectionRef.current ||
        cardRefs.current.length === 0
      )
        return;

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      const cards = cardRefs.current.filter((card) => card !== null);
      const totalCards = cards.length;

      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, {
            y: "0vh",
            opacity: 1,
          });
        } else {
          gsap.set(card, {
            y: "100vh",
            opacity: 0,
          });
        }
      });

      const pinTrigger = ScrollTrigger.create({
        trigger: desktopLayoutRef.current,
        start: "top top",
        end: `+=${window.innerHeight * totalCards}`,
        pin: true,
        markers: false, //----------------------------------------
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const cardProgress = progress * totalCards;

          cards.forEach((card, index) => {
            // Card 0: 0-1, Card 1: 1-2, Card 2: 2-3, etc.
            const cardStart = index;
            const cardEnd = index + 1;

            if (index === 0) {
              if (cardProgress <= 1) {
                if (cardProgress <= 0.8) {
                  gsap.set(card, {
                    y: "0vh",
                    opacity: 1,
                  });
                } else {
                  const outProgress = (cardProgress - 0.8) / 0.2;
                  gsap.set(card, {
                    y: gsap.utils.interpolate("0vh", "-100vh", outProgress),
                    opacity: gsap.utils.interpolate(1, 0, outProgress),
                  });
                }
              } else {
                gsap.set(card, {
                  y: "-100vh",
                  opacity: 0,
                });
              }
            } else {
              if (cardProgress >= cardStart && cardProgress <= cardEnd) {
                if (index === totalCards - 1) {
                  // Last card: comes in and stays
                  if (cardProgress <= cardStart + 0.2) {
                    const inProgress = (cardProgress - cardStart) / 0.2;
                    gsap.set(card, {
                      y: gsap.utils.interpolate("100vh", "0vh", inProgress),
                      opacity: gsap.utils.interpolate(0, 1, inProgress),
                    });
                  } else {
                    gsap.set(card, {
                      y: "0vh",
                      opacity: 1,
                    });
                  }
                } else {
                  // Middle cards: come in, stay, then go out
                  if (cardProgress <= cardStart + 0.2) {
                    const inProgress = (cardProgress - cardStart) / 0.2;
                    gsap.set(card, {
                      y: gsap.utils.interpolate("100vh", "0vh", inProgress),
                      opacity: gsap.utils.interpolate(0, 1, inProgress),
                    });
                  } else if (cardProgress <= cardStart + 0.8) {
                    gsap.set(card, {
                      y: "0vh",
                      opacity: 1,
                    });
                  } else {
                    const outProgress = (cardProgress - cardStart - 0.8) / 0.2;
                    gsap.set(card, {
                      y: gsap.utils.interpolate("0vh", "-100vh", outProgress),
                      opacity: gsap.utils.interpolate(1, 0, outProgress),
                    });
                  }
                }
              } else if (cardProgress < cardStart) {
                gsap.set(card, {
                  y: "100vh",
                  opacity: 0,
                });
              } else if (cardProgress > cardEnd) {
                if (index === totalCards - 1) {
                  gsap.set(card, {
                    y: "0vh",
                    opacity: 1,
                  });
                } else {
                  gsap.set(card, {
                    y: "-100vh",
                    opacity: 0,
                  });
                }
              }
            }
          });
        },
        onComplete: () => {
          if (cards[totalCards - 1]) {
            gsap.set(cards[totalCards - 1], {
              y: "0vh",
              opacity: 1,
            });
          }
        },
      });

      return () => {
        pinTrigger.kill();
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [currentEvents, selectedDate]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, currentEvents.length);
  }, [currentEvents]);

  const handleKnowMore = (route) => {
    // Check login status before navigating
    if (localStorage.getItem("login") === "true") {
      if (route) router.push(route);
    } else {
      // Redirect to login page if not logged in
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <HeroSection />
      {/* Desktop Layout */}
      <div
        ref={desktopLayoutRef}
        className="lg:h-[110vh] lg:flex hidden relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(24, 28, 13, 1) 0%, rgba(24, 28, 13, 0.3) 70%, rgba(0, 0, 0, 1) 100%), url("https://ik.imagekit.io/fhervghik/E-Cell%20Website/Events_Image_Background_Desktop.png?updatedAt=1754584353201")`,
          backgroundSize: "100%",
        }}
      >
        {/* Left Scrollable Section */}
        <div
          ref={leftSectionRef}
          className="w-full lg:w-3/5 h-[120vh] px-6 py-8 relative flex items-center justify-center"
        >
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Background decorative elements can be added here */}
          </div>

          {/* Card Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {currentEvents.map((eventData, index) => (
              <div
                key={`${selectedDate}-${index}`}
                ref={(el) => (cardRefs.current[index] = el)}
                className="absolute w-full max-w-4xl z-10"
                style={{
                  top: "30%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <EventCard left={index % 2 === 0} eventData={eventData} />

                <div className="w-full flex justify-center mt-9 rounded-full">
                  <button
                    className="py-1 px-6 cursor-pointer hover:scale-110 transition-all duration-300 text-black bg-[#e3a57d] border-2 border-yellow-400 rounded-full"
                    onClick={() => handleKnowMore(eventData.route)}
                  >
                    Know More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Static Section */}
        <div className="w-[35%] p-8 bg-none h-[60vh] scale-75 my-auto flex flex-col justify-center">
          <div className="translate-y-3">
            <h1 className="text-3xl font-cormorant-infant text-center text-[#f8d6a4] font-semibold">
              Events Calendar
            </h1>
            <EventsCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
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
          backgroundImage: `linear-gradient(to bottom, rgba(24, 28, 13, 1) 0%, rgba(24, 28, 13, 0.3) 70%, rgba(0, 0, 0, 1) 100%), url("https://ik.imagekit.io/fhervghik/E-Cell%20Website/Events_Image_Background_Mobile.png?updatedAt=1754584353312")`,
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
            <MobileTabs
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              tabs={tabs}
            />
            <p className="text-[#edbd90] text-base font-cormorant-infant text-center">
              August {selectedDate}, 2025 - {currentEvents.length} event
              {currentEvents.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="relative py-8">
          {/* Background Decorative */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* <div 
                            className="absolute top-0 left-0 w-full h-full opacity-80"
                            style={{
                                backgroundImage: `url(${EventDecorative})`,
                                backgroundSize: '100%',
                                backgroundRepeat: 'repeat-y',
                                backgroundPosition: 'left center'
                            }}
                        /> */}
          </div>

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

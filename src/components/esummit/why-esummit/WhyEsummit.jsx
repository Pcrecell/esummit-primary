"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Anton, Poppins } from "next/font/google";
import {Event} from "@/components/esummit/Homepage-events/index"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

const cards = [
  {
    image: "https://ik.imagekit.io/d73k0qzwc/image%20(22).png",
    number: "15+",
    label: "Speakers",
  },
  {
    image: "https://ik.imagekit.io/d73k0qzwc/image%20(22).png",
    number: "150k",
    label: "prize pool",
  },
  {
    image: "https://ik.imagekit.io/d73k0qzwc/image%20(22).png",
    number: "5+",
    label: "events",
  },
  {
    image: "https://ik.imagekit.io/d73k0qzwc/image%20(22).png",
    number: "3+",
    label: "powerpacked\ndays",
  },
];

const cornerOutline = "https://i.ibb.co/G4ncFvvd/small-top-right-bracket-1.png";

const rotationAngles = [-3, 15, -1, 15];
const textRotationAngles = [-5, -5, -6, -5];

const WhyEsummit = () => {
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const transition1 = useRef(null);
  const transition2 = useRef(null);
  const transition3 = useRef(null);
  const eventRef = useRef(null);
  const sectionRef = useRef(null);

  // Card hover animations
  useGSAP(
    () => {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.set(card, {
            rotation: rotationAngles[index],
            scale: 1,
          });
          const cardImage = card.querySelector(".card-image");
          if (cardImage) {
            gsap.set(cardImage, { opacity: 1 });
          }
        }
      });

      cardRefs.current.forEach((card, hoveredIndex) => {
        if (card) {
          const handleMouseEnter = () => {
            cardRefs.current.forEach((otherCard, index) => {
              if (otherCard) {
                const cardImage = otherCard.querySelector(".card-image");
                if (index === hoveredIndex) {
                  gsap.to(otherCard, {
                    rotation: 8,
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                  if (cardImage) {
                    gsap.to(cardImage, {
                      opacity: 1,
                      duration: 0.3,
                      ease: "power2.out",
                    });

                    const corners = otherCard.querySelectorAll(".corner-outline");
                    gsap.to(corners, {
                      opacity: 1,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }
                } else {
                  gsap.to(otherCard, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                  if (cardImage) {
                    gsap.to(cardImage, {
                      opacity: 0.7,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }
                }
              }
            });
          };

          const handleMouseLeave = () => {
            cardRefs.current.forEach((otherCard, index) => {
              if (otherCard) {
                const cardImage = otherCard.querySelector(".card-image");
                gsap.to(otherCard, {
                  rotation: rotationAngles[index],
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
                if (cardImage) {
                  gsap.to(cardImage, {
                    opacity: 0.7,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }
              }
            });

            cardRefs.current.forEach((otherCard) => {
              if (otherCard) {
                const corners = otherCard.querySelectorAll(".corner-outline");
                gsap.to(corners, {
                  opacity: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }
            });
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
          };
        }
      });
    },
    { scope: cardsContainerRef }
  );

  // Parallax scroll animations
  useGSAP(() => {
    if (window.innerWidth < 1024) {
      return;
    }

    // Make sure elements exist before creating animations
    if (!sectionRef.current || !transition1.current || !transition2.current || !transition3.current || !eventRef.current) {
      return;
    }

    // Create a context for cleanup
    let ctx = gsap.context(() => {
      
      // Transition 1 - Move upward
      gsap.to(transition1.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
          markers: false
        },
      });

      // Event section - Scale and move
      gsap.fromTo(eventRef.current,
        { 
          scale: 1.1,
          y: 0
        },
        {      
          // yPercent: -20,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=300 bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          }
        }
      );

      // Transition 2 - Left side movement
      gsap.fromTo(transition2.current,
        {
          xPercent: 0,
          yPercent: 0,
          rotation: 0
        },
        {
          yPercent: 30,
          xPercent: -150,
          rotation: 60,
          duration: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      // Transition 3 - Right side movement
      gsap.fromTo(transition3.current,
        {
          xPercent: 0,
          yPercent: 0,
          rotation: 0
        },
        {
          yPercent: 30,
          xPercent: 150,
          rotation: 60,
          duration: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => {
      ctx.revert(); // Clean up
    };
  }, []); 

  return (
    <div>
      <section
        className="min-h-screen py-16 px-4 text-white text-center flex flex-col justify-center relative"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/ecellkiit/E-Cell%20Website/Group%201000002405%20(1)%201.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        
        {/* Content with higher z-index */}
        <div className="relative z-10">
          <h2
            className="text-[40px] sm:text-[70px] font-[Poppins] font-bold mb-36"
            // style={{ fontFamily: "Texturina, serif" }}
          >
            Why Join <span style={{ color: "#2EB24C" }}>E-Summit ?</span>
          </h2>
    
        <div
  ref={cardsContainerRef}
  className="grid grid-cols-2 gap-6 md:gap-8 lg:flex lg:flex-wrap lg:justify-center lg:gap-28 max-w-7xl mx-auto"
>
  {cards.map((card, index) => (
    <div
      key={index}
      ref={(el) => (cardRefs.current[index] = el)}
      className="group relative w-[156px] h-[204px] sm:w-[200px] sm:h-[260px] cursor-pointer"
    >
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.label}
                    className="card-image w-full h-full opacity-100 object-contain absolute inset-0 z-0"
                  />

                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-black px-2 text-center z-10"
                    style={{ transform: `rotate(${textRotationAngles[index]}deg)` }}
                  >
                    <div
                      className={`text-4xl sm:text-7xl font-extrabold leading-none ${anton.className}`}
                    >
                      {card.number}
                    </div>
                    <div className="text-base sm:text-2xl font-medium mt-2 whitespace-pre-line leading-tight">
                      {card.label}
                    </div>
                  </div>

                  <div className="absolute inset-0 z-30 pointer-events-none">
                    <img
                      src={cornerOutline}
                      alt="corner"
                      className="corner-outline absolute top-8 left-[-12] w-6 sm:w-8 rotate-[270deg] opacity-0"
                    />
                    <img
                      src={cornerOutline}
                      alt="corner"
                      className="corner-outline absolute top-5 right-[-3] w-6 sm:w-8 rotate-0 opacity-0"
                    />
                    <img
                      src={cornerOutline}
                      alt="corner"
                      className="corner-outline absolute bottom-4 left-[2] w-6 sm:w-8 rotate-180 opacity-0"
                    />
                    <img
                      src={cornerOutline}
                      alt="corner"
                      className="corner-outline absolute bottom-8 right-[-5] w-6 sm:w-8 rotate-90 opacity-0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/0 to-transparent z-0"></div>
      </section>

      {/* Parallax section with proper structure */}
      <div ref={sectionRef} className="h-[120vh] z-60 hidden lg:block"
        style={{
          // backgroundImage: "url('https://ik.imagekit.io/ecellkiit/E-Cell%20Website/Group%201000002405%20(1)%201.webp?updatedAt=1755000413347')"
        }}
      >
        <div ref={transition1} className="translate-y-48 z-[40] relative">
          <img
            src="https://ik.imagekit.io/ecellkiit/E-Cell%20Website/asset1.png?updatedAt=1754770554602"
            alt=""
          />
        </div>
        <div className="flex flex-row justify-between -translate-y-[20rem] lg:-translate-y-[44rem] relative z-[60]">
          <div ref={transition2} className="-translate-x-12 z-[60] absolute w-[600px] lg:w-[800px]">
              <img src="https://ik.imagekit.io/ecellkiit/E-Cell%20Website/asset4.png?updatedAt=1754770554613" alt="" />
          </div>
          <div ref={transition3} className="translate-x-[32rem] lg:translate-x-[39rem] z-[60] absolute w-[600px] lg:w-[800px]">
              <img src="https://ik.imagekit.io/ecellkiit/E-Cell%20Website/asset4.png?updatedAt=1754770554613" alt="" />
          </div>
        </div>
      </div> 
      <div ref={eventRef} className="bottom-[0rem] lg:bottom-[20rem] z-10 relative hidden lg:block">
        <Event />
        <div className="h-[10vh] bg-black"></div>
      </div>
    </div>
  );
};

export default WhyEsummit;
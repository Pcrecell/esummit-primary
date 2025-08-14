"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cards = [
  {
    image: "https://ik.imagekit.io/d73k0qzwc/image%20(22).png",
    number:
      "The Coveted Grand Trophy for the Ultimate Champions-Seize the prestigious Grand Trophy–an exclusive symbol of unmatched victory and glory!",
    label: "Speakers",
  },
  {
    image: "https://ik.imagekit.io/d73k0qzwc/image%20(22).png",
    number:
      "Walk away with exclusive merchandise, vouchers, and surprises from our partner brands.",
    label: "prize pool",
  },
  {
    image: "https://ik.imagekit.io/d73k0qzwc/image%20(22).png",
    number:
      "Every participant receives a certificate to recognise their creativity, effort, and spirit of competition.",
    label: "events",
  },
  {
    image: "https://ik.imagekit.io/d73k0qzwc/image%20(22).png",
    number:
      "Get rare, direct access to a top industry expert–gain insider strategies, ask your questions, and learn real-world lessons you won't find in books.",
    label: "powerpacked\ndays",
  },
];

const cornerOutline = "https://i.ibb.co/G4ncFvvd/small-top-right-bracket-1.png";

const rotationAngles = [-10, 15, -8, 15];
const textRotationAngles = [-1, 0, -1, 0];

export default function Stages() {
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.8 });
  const lastScrollY = useRef(0);

  gsap.registerPlugin(ScrollTrigger);

  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

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
                    rotation: 0,
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

                    const corners =
                      otherCard.querySelectorAll(".corner-outline");
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

  const cardStyles =
    "relative w-[300px] h-[450px] [transform-style:preserve-3d]";

  const faceStyles = "absolute inset-0 [backface-visibility:hidden]";

  return (
    <div
      ref={ref}
      className="min-h-screen w-full h-[100vh] bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/5xwmtpwkb/image%201.png?updatedAt=1755165711961')",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top title */}
      <div className="absolute top-10 w-full flex flex-col items-center text-white mb-20">
        <p className="text-xl tracking-widest mb-4">PERKS OF</p>
        <Image
          src="https://i.postimg.cc/ZR1DW5j4/oracle.png"
          alt="Oracle"
          width={200}
          height={200}
          priority
        />
      </div>

      {/* Main content section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-6">
        {/* Content with higher z-index */}
        <div className="relative z-10">
          <div
            ref={cardsContainerRef}
            className="grid grid-cols-2 gap-6 xs:gap-8 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-16 sm:flex md:flex justify-center lg:flex lg:flex-wrap max-w-7xl mx-auto mt-20 px-2"
          >
            {cards.map((card, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="group relative w-[140px] h-[180px] xs:w-[150px] xs:h-[200px] sm:w-[180px] sm:h-[240px] md:w-[200px] md:h-[260px] lg:w-[220px] lg:h-[280px] cursor-pointer"
              >
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.label}
                    className="card-image w-full h-full opacity-100 object-contain absolute inset-0 z-0"
                  />

                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-black px-1 xs:px-2 sm:px-3 text-center z-10"
                    style={{
                      transform: `rotate(${textRotationAngles[index]}deg)`,
                    }}
                  >
                    <div className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm lg:text-base font-bold leading-tight xs:leading-normal font-poppins break-words hyphens-auto">
                      {card.number}
                    </div>
                  </div>

                  <div className="absolute inset-0 z-30 pointer-events-none">
                    <img
                      src={cornerOutline}
                      alt="corner"
                      className="corner-outline absolute top-4 sm:top-6 left-[-8px] sm:left-[-10px] w-4 sm:w-6 md:w-8 rotate-[270deg] opacity-0"
                    />
                    <img
                      src={cornerOutline}
                      alt="corner"
                      className="corner-outline absolute top-3 sm:top-5 right-[-2px] sm:right-[-3px] w-4 sm:w-6 md:w-8 rotate-0 opacity-0"
                    />
                    <img
                      src={cornerOutline}
                      alt="corner"
                      className="corner-outline absolute bottom-4 sm:bottom-6 left-[-2px] sm:left-[-4px] w-4 sm:w-6 md:w-8 rotate-180 opacity-0"
                    />
                    <img
                      src={cornerOutline}
                      alt="corner"
                      className="corner-outline absolute bottom-4 sm:bottom-6 right-[-3px] sm:right-[-5px] w-4 sm:w-6 md:w-8 rotate-90 opacity-0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top fade overlay */}
        <div
          className="absolute top-0 left-0 w-full h-1/3 z-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0))",
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/0 to-transparent z-0"></div>
      </section>
    </div>
  );
}

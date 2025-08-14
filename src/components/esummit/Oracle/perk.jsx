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
    number: "The Coveted Grand Trophy for the Ultimate Champions-Seize the prestigious Grand Trophy–an exclusive symbol of unmatched victory and glory!",
    label: "Speakers",
  },
  {
    image: "https://ik.imagekit.io/d73k0qzwc/image%20(22).png",
    number: "Walk away with exclusive merchandise, vouchers, and surprises from our partner brands.",
    label: "prize pool",
  },
  {
    image: "https://ik.imagekit.io/d73k0qzwc/image%20(22).png",
    number: "Every participant receives a certificate to recognise their creativity, effort, and spirit of competition.",
    label: "events",
  },
  {
    image: "https://ik.imagekit.io/d73k0qzwc/image%20(22).png",
    number: "Get rare, direct access to a top industry expert–gain insider strategies, ask your questions, and learn real-world lessons you won’t find in books.",
    label: "powerpacked\ndays",
  },
];

const cornerOutline = "https://i.ibb.co/G4ncFvvd/small-top-right-bracket-1.png";

const rotationAngles = [-3, 15, -1, 15];
const textRotationAngles = [-5, -5, -6, -5];

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

  const faceStyles =
    "absolute inset-0 [backface-visibility:hidden]";

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
            className="grid grid-cols-2 sm:pl-5 sm:item-center sm:gap-6 md:gap-10 sm:flex md:flex justify-center lg:flex lg:flex-wrap lg:gap-28 max-w-7xl mx-auto mt-20"
          >
            {cards.map((card, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="group relative w-[150px] h-[200px] sm:w-[200px] sm:h-[260px] cursor-pointer"
              >
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.label}
                    className="card-image w-full h-full opacity-100 object-contain absolute inset-0 z-0"
                  />

                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-[#4A2F0B] px-2 text-center z-10"
                    style={{
                      transform: `rotate(${textRotationAngles[index]}deg)`,
                    }}
                  >
                    <div className="text-md sm:text-md font-bold leading-none font-poppins">
                      {card.number}
                    </div>
                  </div>

                  <div className="absolute inset-0 z-30 pointer-events-none">
                    <img
                      src={cornerOutline}
                      alt="corner"
                      className="corner-outline absolute top-6 left-[-10] w-6 sm:w-8 rotate-[270deg] opacity-0"
                    />
                    <img
                      src={cornerOutline}
                      alt="corner"
                      className="corner-outline absolute top-5 right-[-3] w-6 sm:w-8 rotate-0 opacity-0"
                    />
                    <img
                      src={cornerOutline}
                      alt="corner"
                      className="corner-outline absolute bottom-6 left-[-4] w-6 sm:w-8 rotate-180 opacity-0"
                    />
                    <img
                      src={cornerOutline}
                      alt="corner"
                      className="corner-outline absolute bottom-6 right-[-5] w-6 sm:w-8 rotate-90 opacity-0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Top fade overlay */}
<div className="absolute top-0 left-0 w-full h-1/3 z-0 pointer-events-none"
  style={{
    background: "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0))",
  }}
></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/0 to-transparent z-0"></div>
      </section>


    </div>
  );
}
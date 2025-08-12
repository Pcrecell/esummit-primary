"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

const cards = [
  {
    image: "https://i.ibb.co/pBskSWZh/image-22-2.png",
    number: "15+",
    label: "Speakers",
  },
  {
    image: "https://i.ibb.co/pBskSWZh/image-22-2.png",
    number: "150k",
    label: "prize pool",
  },
  {
    image: "https://i.ibb.co/pBskSWZh/image-22-2.png",
    number: "5+",
    label: "events",
  },
  {
    image: "https://i.ibb.co/pBskSWZh/image-22-2.png",
    number: "3+",
    label: "powerpacked\ndays",
  },
];

const cornerOutline = "https://i.ibb.co/G4ncFvvd/small-top-right-bracket-1.png";

const rotationAngles = [-3, 15, -1, 15];
const textRotationAngles = [-5, -5, -6, -5]; // Customize these angles for text rotation

const WhyEsummit = () => {
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.set(card, {
            rotation: rotationAngles[index],
            scale: 1,
          });
          // Set initial opacity to 54%
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
                // Reset to default opacity (54%)
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

  return (
    <section
      className="min-h-screen py-16 px-4 text-white text-center flex flex-col justify-center"
      style={{
        backgroundImage: "url(https://i.ibb.co/QFW0KL1c/Group-1000002404.png)",
        backgroundSize: "90%",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundColor: "black"
      }}
    >
    {/* <div className="absolute inset-0 bottom-0 left-0 bg-black opacity-100 z-0"></div> */}
      <h2
        className="text-[40px] sm:text-[50px] font-serif font-bold mb-36 mt-[-220px]"
        style={{ fontFamily: "Texturina, serif" }}
      >
        Why Join <span style={{ color: "#2EB24C" }}>E-Summit ?</span>
      </h2>
      <div
        ref={cardsContainerRef}
        className="flex flex-wrap justify-between gap-6 md:gap-28 max-w-6xl mx-auto ml-auto mr-8"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="group relative w-[156px] h-[204px] sm:w-[200px] sm:h-[260px] cursor-pointer"
          >
            <div className="absolute inset-0">
              {/* Image Layer */}
              <img
                src={card.image}
                alt={card.label}
                className="card-image w-full h-full opacity-100 object-contain absolute inset-0 z-0"
              />

              {/* Text Layer */}
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

              {/* Corner Outline Layer */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                {/* Top Left Corner */}
                <img
                  src={cornerOutline}
                  alt="corner"
                  className="corner-outline absolute top-8 left-[-12] w-6 sm:w-8 rotate-[270deg] opacity-0"
                />
                {/* Top Right Corner */}
                <img
                  src={cornerOutline}
                  alt="corner"
                  className="corner-outline absolute top-5 right-[-3] w-6 sm:w-8 rotate-0 opacity-0"
                />
                {/* Bottom Left Corner */}
                <img
                  src={cornerOutline}
                  alt="corner"
                  className="corner-outline absolute bottom-4 left-[2] w-6 sm:w-8 rotate-180 opacity-0"
                />
                {/* Bottom Right Corner */}
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
    </section>
  );
};

export default WhyEsummit;

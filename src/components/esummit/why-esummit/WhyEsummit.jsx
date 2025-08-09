"use client"

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";

const cards = [
  {
    image: "https://i.ibb.co/8gkHmS3b/image-22.png",
    number: "15+",
    label: "Speakers",
  },
  {
    image: "https://i.ibb.co/8gkHmS3b/image-22.png",
    number: "150k",
    label: "prize pool",
  },
  {
    image: "https://i.ibb.co/8gkHmS3b/image-22.png",
    number: "5+", 
    label: "events",
  },
  {
    image: "https://i.ibb.co/8gkHmS3b/image-22.png",
    number: "3+",
    label: "powerpacked\ndays",
  },
];

const cornerOutline = "https://i.ibb.co/G4ncFvvd/small-top-right-bracket-1.png";

const rotationAngles = [-3, 10, -1, 15];

const WhyEsummit = () => {
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(() => {
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, {
          rotation: rotationAngles[index],
          scale: 1,
        });
      }
    });

    cardRefs.current.forEach((card, hoveredIndex) => {
      if (card) {
        const handleMouseEnter = () => {

          cardRefs.current.forEach((otherCard, index) => {
            if (otherCard) {
              const cardImage = otherCard.querySelector('.card-image');
              if (index === hoveredIndex) {
                gsap.to(otherCard, {
                  rotation: 8,
                  scale: 1.1,
                  duration: 0.3,
                  ease: "power2.out"
                });
                if (cardImage) {
                  gsap.to(cardImage, {
                    filter: "brightness(1.3) contrast(1) saturate(1.3)",
                    duration: 0.3,
                    ease: "power2.out"
                  });

                  const corners = otherCard.querySelectorAll('.corner-outline');
                  gsap.to(corners, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              } else {
                gsap.to(otherCard, {
                  // rotation: 8,
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
                if (cardImage) {
                  gsap.to(cardImage, {
                    filter: "brightness(1) contrast(1)",
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              }
            }
          });

          // cardRefs.current.forEach((otherCard) => {
          //   if (otherCard) {
          //     const corners = otherCard.querySelectorAll('.corner-outline');
          //     gsap.to(corners, {
          //       opacity: 1,
          //       duration: 0.3,
          //       ease: "power2.out"
          //     });
          //   }
          // });
        };

        const handleMouseLeave = () => {
          cardRefs.current.forEach((otherCard, index) => {
            if (otherCard) {
              const cardImage = otherCard.querySelector('.card-image');
              gsap.to(otherCard, {
                rotation: rotationAngles[index],
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
              });
              // Reset brightness and contrast
              if (cardImage) {
                gsap.to(cardImage, {
                  filter: "brightness(1) contrast(1)",
                  duration: 0.3,
                  ease: "power2.out"
                });
              }
            }
          });

          cardRefs.current.forEach((otherCard) => {
            if (otherCard) {
              const corners = otherCard.querySelectorAll('.corner-outline');
              gsap.to(corners, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });
  }, { scope: cardsContainerRef });

  return (
    <section className="bg-black py-16 px-4 text-white text-center">
      <h2
        className="text-[40px] sm:text-[70px] font-serif font-bold mb-12"
        style={{ fontFamily: "Texturina, serif" }}
      >
        Why Join E-Summit?
      </h2>
      <div 
        ref={cardsContainerRef}
        className="flex flex-wrap justify-between gap-6 md:gap-28 max-w-6xl mx-4"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            ref={el => cardRefs.current[index] = el}
            className="group relative w-[156px] h-[204px] sm:w-[200px] sm:h-[260px] cursor-pointer bg-black"
          >
            {/* Hover to straighten effect */}
            <div className="absolute inset-0">
              {/* Image Layer */}
              <img
                src={card.image}
                alt={card.label}
                className="card-image max-w-[400px] h-full object-contain absolute inset-0 z-0"
              />

              {/* Text Layer */}
              <div className="absolute inset-3 left-16 flex flex-col items-center justify-center text-black px-2 text-center z-10">
                <div className="text-3xl sm:text-5xl font-extrabold leading-none">
                  {card.number}
                </div>
                <div className="text-sm sm:text-xl font-medium mt-2 whitespace-pre-line leading-tight">
                  {card.label}
                </div>
              </div>

              {/* Corner Outline Layer */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                <img
                  src={cornerOutline}
                  alt="corner"
                  className="corner-outline absolute top-[10px] left-[-8px] w-5 sm:w-9 rotate-[270deg] opacity-0"
                />
                <img
                  src={cornerOutline}
                  alt="corner"
                  className="corner-outline absolute top-[-10px] right-[-40px] w-5 sm:w-9 rotate-[-5deg] opacity-0"
                />
                <img
                  src={cornerOutline}
                  alt="corner"
                  className="corner-outline absolute bottom-[-10px] left-[10px] w-5 sm:w-9 rotate-180 opacity-0"
                />
                <img
                  src={cornerOutline}
                  alt="corner"
                  className="corner-outline absolute bottom-[10px] right-[-70px] w-5 sm:w-9 rotate-90 opacity-0"
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
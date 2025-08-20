"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import RegisteredMap from "./registeredMap";
import { Amarante } from "next/font/google"
import Link from "next/link";


const events = [
  {
    id: "Oracle",
    title: "ORACLE",
    image:
      "https://ik.imagekit.io/ecellkiit/E-Cell%20Website/oracle.png?updatedAt=1755628892778",
    coordinates: [20.3534, 85.8195],
    mapLabel: "ORACLE - Campus 6",
  },
  {
    id: "AIF",
    title: "ALICE IN FOUNDERLAND",
    image:
      "https://ik.imagekit.io/ecellkiit/E-Cell%20Website/Alice-in-founderland.png?updatedAt=1755628890005",
    coordinates: [20.3544, 85.8205],
    mapLabel: "Alice in Founderland - Campus 17",
  },
  {
    id: "case-x",
    title: "CASE BATTLE",
    image: "https://ik.imagekit.io/wlknxcf5m/casex.png?updatedAt=1755594314805",
    coordinates: [20.3524, 85.8185],
    mapLabel: "Case Battle - Campus 17",
  },
  {
    id: "Hackathon",
    title: "PANDORAS PARADOX",
    image:
      "https://ik.imagekit.io/ecellkiit/E-Cell%20Website/pandoras-paradox.png?updatedAt=1755628892886",
    coordinates: [20.3554, 85.8215],
    mapLabel: "Pandora's Paradox - Campus 25",
  },
  {
    id: "EXPO",
    title: "Founder's Arena",
    image:
      "https://ik.imagekit.io/ecellkiit/E-Cell%20Website/Expo-1.png?updatedAt=1755628891663",
    coordinates: [20.3514, 85.8175],
    mapLabel: "Expo - Campus 6 Banquet Hall",
  },
];

function PaymentEnd({ eventId, onPaymentComplete, onBack }) {
  const [isMobile, setIsMobile] = useState(false);

  // Use the passed eventId or fallback to useParams for direct URL access
  const params = useParams?.() || {};
  const urlId =
    typeof params === "object"
      ? params.id || params.eventId || params.slug
      : undefined;

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is Tailwind's md breakpoint
    };

    // Check on initial load
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Only support the five known values, with case-insensitive match
  const inputId = eventId ?? urlId;
  const lc = (v) => (v || "").toString().toLowerCase();
  const finalEventId = inputId;
  const event =
    events.find((e) => e.id === finalEventId) ||
    events.find((e) => lc(e.id) === lc(finalEventId));

  if (!event) {
    return (
      <div className="text-white p-10 min-h-screen bg-black flex items-center justify-center">
        <div>
          Event not found. Event ID:{" "}
          {String(finalEventId || "").trim() || "(none)"}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[40vh] text-white flex flex-col items-center py-10 px-4">
        {/* Header Section */}
        <div className="relative mb-8">
          <img
            src="https://ik.imagekit.io/wlknxcf5m/Group%2018457%20(1).png"
            alt="Main Heading"
            className="w-64 md:w-96 h-auto"
          />
        </div>

        <div className="h-full">
          <div className="w-full flex items-center justify-between mx-auto">
            <img
              src="https://ik.imagekit.io/ecellkiit/E-Cell%20Website/Celtic%20Ornament%202%20(1).webp?updatedAt=1755629651693"
              alt="Left Ornament"
              className="w-[70vw] md:w-[50vw]"
              style={{
                rotate: isMobile ? "90deg" : "0deg",
              }}
            />
          </div>
          <div className="flex flex-col -space-y-64 items-center justify-between mb-0">
            <div className="flex flex-col md:flex-row scale-75 md:scale-90 relative bottom-64 md:bottom-94">
              <div className="w-32 h-40 md:w-80 md:h-80 bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-32 h-40 md:w-80 md:h-80 bg-gray-800 rounded-lg overflow-hidden">
                <RegisteredMap
                  coordinates={event.coordinates}
                  label={event.mapLabel}
                />
              </div>
            </div>
          <div className="text-center">
            <div className="max-w-48 md:max-w-full items-center justify-center flex">
              <Link
                href={(() => {
                  const id = (finalEventId || "").toString().toLowerCase();
                  if (id === "oracle") return "/oracle";
                  if (id === "aif") return "/aif";
                  if (id === "case-x") return "/case-x";
                  if (id === "hackathon") return "/pandoras-paradox";
                  if (id === "expo") return "/expo";
                  return "/";
                })()}
                className="block bg-gradient-to-t from-[#191b19] to-[#1d5524] font-[Amarante] text-sm md:text-base text-[#ffde79] border-1 border-[#987f49] font-semibold px-4 py-2 rounded hover:scale-110 transition-all"
              >
                Go to {event.title}
              </Link>
            </div>
          </div>
          </div>
        </div>

        {/* Event Details Section */}
        {/* Event Info */}
      </div>
    </>
  );
}

export default PaymentEnd;
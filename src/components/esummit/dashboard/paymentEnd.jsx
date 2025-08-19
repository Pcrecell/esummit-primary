"use client";

import React from "react";
import { useParams } from "next/navigation";
import RegisteredMap from "./registeredMap";
import Link from "next/link";

const events = [
   {
    id:"Oracle",
    title: "ORACLE",
    image:"https://i.postimg.cc/pyx86WsG/oracle-1.png",
    coordinates: [20.3534, 85.8195],
    mapLabel: "ORACLE - Campus 6"
  },
  {
    id:"AIF",
    title: "ALICE IN FOUNDERLAND",
    image: "https://i.postimg.cc/ts7FNBB9/Alice-in-founderland-1.png",
    coordinates: [20.3544, 85.8205],
    mapLabel: "Alice in Founderland - Campus 17"
  },
  {
    id:"case-x",
    title: "CASE BATTLE",
    image: "https://ik.imagekit.io/wlknxcf5m/casex.png?updatedAt=1755594314805",
    coordinates: [20.3524, 85.8185],
    mapLabel: "Case Battle - Campus 17"
  },
  {
    id:"Hackathon",
    title: "PANDORAS PARADOX",
    image: "https://i.postimg.cc/2LzZbGqR/pandoras-paradox-1.png",
    coordinates: [20.3554, 85.8215],
    mapLabel: "Pandora's Paradox - Campus 25"
  },
  {
    id:"EXPO",
    title: "EXPO",
    image:"https://i.postimg.cc/hzGqwqxJ/Expo.png",
    coordinates: [20.3514, 85.8175],
    mapLabel: "Expo - Campus 6 Banquet Hall"
  },
];

function PaymentEnd({ eventId, onPaymentComplete, onBack }) {
  // Use the passed eventId or fallback to useParams for direct URL access
  const params = useParams?.() || {};
  const urlId = typeof params === 'object' ? (params.id || params.eventId || params.slug) : undefined;

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
        <div>Event not found. Event ID: {String(finalEventId || "").trim() || "(none)"}</div>
      </div>
    );
  }

  return (
    <>
     <div className="min-h-screen text-white flex flex-col items-center py-10 px-4">
       
       {/* Header Section */}
       <div className="relative mb-8">
         <img
           src="https://i.postimg.cc/kg5f2ngP/Necrolord-themed-Stream-Overlay-A-Custom-Design-for-Zach-Fischer-removebg-preview-2.png"
           alt="Main Heading"
           className="w-64 md:w-96 h-auto"
         />
         <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-[#0B160E] text-xl md:text-2xl font-regular text-center font-mystery">
           Your Registered Event
         </div>
         <img
           src="https://i.postimg.cc/rFypVFnN/download-49-removebg-preview-1.png"
           alt="Overlay"
           className="absolute top-0 left-0 w-32 md:w-auto h-auto"
         />
       </div>

       {/* Event Details Section */}
       <div className="flex flex-col md:flex-row items-center justify-center mb-10">
         <img
           src="https://i.postimg.cc/L4thY3XR/Celtic-Ornament-5.png"
           alt="Left Ornament"
           className="w-8 h-56 md:w-10 md:h-80 transform rotate-90 md:rotate-0 -mb-24 md:mb-0"
         />
         
         <div className="flex flex-col md:flex-row">
           <div className="w-56 h-60 md:w-80 md:h-80 bg-gray-800 rounded-lg overflow-hidden">
             <img
               src={event.image}
               alt={event.title}
               className="w-full h-full object-cover"
             />
           </div>
           <div className="w-56 h-60 md:w-80 md:h-80 bg-gray-800 rounded-lg overflow-hidden">
             <RegisteredMap 
               coordinates={event.coordinates} 
               label={event.mapLabel} 
             />
           </div>
         </div>
         
         <img
           src="https://i.postimg.cc/4yvCqPhG/Celtic-Ornament-4.png"
           alt="Right Ornament"
           className="w-8 h-56 md:w-10 md:h-80 rotate-90 md:rotate-0 -mt-26 md:mt-0"
         />
       </div>

       {/* Event Info */}
       <div className="text-center">
         <div className="mt-6">
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
             className="inline-block bg-[#00FF3A] text-black font-semibold px-4 py-2 rounded hover:bg-[#00e835] transition-colors"
           >
             Go to {event.title}
           </Link>
         </div>
       </div>
     </div>
    </>
  );
}

export default PaymentEnd;
import React from "react";
import { useRouter } from "next/router";
import RegisteredMap from "./registeredMap";

const events = [
   {
    id:"1",
    title: "ORACLE",
    image:"https://i.postimg.cc/pyx86WsG/oracle-1.png",
    coordinates: [20.3534, 85.8195],
    mapLabel: "ORACLE Event Venue"
  },
  {
    id:"2",
    title: "ALICE IN FOUNDERLAND",
    image: "https://i.postimg.cc/ts7FNBB9/Alice-in-founderland-1.png",
    coordinates: [20.3544, 85.8205],
    mapLabel: "Alice in Founderland Arena"
  },
  {
    id:"3",
    title: "CASE BATTLE",
    date: "AUG 15",
    desc: "An opportunity for aspiring entrepreneurs sdbfjshdjfbjsdnbfmndb fmnmnsdbfnbfnsbfb.",
    coordinates: [20.3524, 85.8185],
    mapLabel: "Case Battle Conference Hall"
  },
  {
    id:"4",
    title: "PANDORAS PARADOX",
    image: "https://i.postimg.cc/2LzZbGqR/pandoras-paradox-1.png",
    coordinates: [20.3554, 85.8215],
    mapLabel: "Pandora's Paradox Theater"
  },
  {
    id:"5",
    title: "EXPO",
    image:"https://i.postimg.cc/hzGqwqxJ/Expo.png",
    coordinates: [20.3514, 85.8175],
    mapLabel: "Expo Exhibition Center"
  },
];

function PaymentEnd({ eventId, onPaymentComplete, onBack }) {
  // Use the passed eventId or fallback to useParams for direct URL access
  const { id: urlId } = useParams();
  const finalEventId = eventId || urlId;
  const event = events.find((e) => e.id === finalEventId);


  if (!event) {
    return <div className="text-white p-10 min-h-screen bg-black flex items-center justify-center">
      <div>Event not found. Event ID: {finalEventId}</div>
    </div>;
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
           className="w-8 h-32 md:w-10 md:h-80"
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
           className="w-8 h-32 md:w-10 md:h-80"
         />
       </div>

       {/* Event Info */}
       <div className="text-center">
         <h2 className="text-2xl md:text-3xl font-bold mb-2">{event.title}</h2>
         <p className="text-gray-300">{event.mapLabel}</p>
       </div>
     </div>
    </>
  );
}

export default PaymentEnd;
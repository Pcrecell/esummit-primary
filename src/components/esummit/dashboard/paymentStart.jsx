import React, { useState } from 'react';
import { LayoutGroup } from "framer-motion";
const events = [
   {
    id:"1",
    title: "ORACLE",
    date: "AUG 15",
    desc: "An opportunity for aspiring entrepreneurs jhdsbfgshdvf hgsdvfhsgdfvsndbvnbs.",
    image: "https://i.postimg.cc/Z0tk56H5/oracle.png",
  },
  {
    id:"2",
    title: "ALICE IN FOUNDERLAND",
    date: "AUG 15",
    desc: "An opportunity for aspiring entrepreneurs jfrjkerfjkesrdfbjesrfb nbdfjebfjebjferjhrfbehjrbjh .",
    image: "https://i.postimg.cc/Bn8WGHyd/Alice-in-founderland.png",
    
  },
  {
    id:"3",
    title: "CASE BATTLE",
    date: "AUG 15",
    desc: "An opportunity for aspiring entrepreneurs sdbfjshdjfbjsdnbfmndb fmnmnsdbfnbfnsbfb.",
  },
  {
    id:"4",
    title: "PANDORAS PARADOX",
    date: "AUG 15",
    desc: "An opportunity for aspiring entrepreneurs dcfbhjdfjhdfdhfd vhfhdvfjdhvsdnbf nsdbfndbfbdnd.",
    image: "https://i.postimg.cc/RVcfmJyp/pandoras-paradox.png",
  
  },
  {
    id:"5",
    title: "EXPO",
    date: "AUG 15",
    desc: "An opportunity for aspiring entrepreneurs sdvfghsdvfg sbdvfnsbdvfn nbdvnbsdvnbsvc.",
    image:"https://i.postimg.cc/bvqm7L2N/Expo-1.png",
  },
];

const EventCard = ({id, title, date, venue, time, desc, image, onEventSelect, paymentEnabled, onPaymentRequired }) => (
  <div 
    onClick={() => {
      if (paymentEnabled && onEventSelect) {
        onEventSelect(id);
      } else if (!paymentEnabled && onPaymentRequired) {
        onPaymentRequired();
      }
    }} 
    className="relative cursor-pointer hover:scale-105 transition-transform duration-300"
  >
  <div className="bg-black rounded-3xl shadow-md overflow-hidden w-full h-[320px] flex flex-col justify-between">
    {/* Disabled overlay */}
    {!paymentEnabled}
    {/* Top image */}
    <div className="h-[70%] w-full">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>

    {/* Bottom Content */}
    <div className="relative w-full h-[30%] md:h-[30%] overflow-hidden rounded-b-2xl -mt-[1px]">
      <img
        src="https://i.postimg.cc/66mVR2gN/Group-10-1.png"
        alt="Ticket Background"
        className="absolute inset-0 w-full h-full object-cover z-0 shadow-[0_0_40px_#00FF00]"
      />

      <div className="relative z-10 flex h-full w-full px-3 gap-3">
        <div className="flex flex-col py-2 items-center leading-tight">
          <span className="text-[10px] font-bold text-white">AUG</span>
          <span className="text-[20px] font-bold text-white">15</span>
        </div>
        <div className="flex flex-col text-sm leading-tight">
          <h3 className="font-bold text-base text-[#00FF3A] pt-2">{title}</h3>
          <p className="text-[11px] text-white hidden sm:block">{desc}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
);

function PaymentStart({ onEventSelect, onBack, paymentEnabled = false, onPayNow }) {
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const handlePaymentRequired = () => {
    setShowPaymentPopup(true);
  };

  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false);
  };

  return (
    <>
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center px-4"
    >
  {/* First (main) image */}
  <div className="relative mb-8">
    <img
      src="https://i.postimg.cc/kg5f2ngP/Necrolord-themed-Stream-Overlay-A-Custom-Design-for-Zach-Fischer-removebg-preview-2.png"
      alt="Main Heading"
      className="w-64 md:w-96 h-auto"
    />
  <div className="absolute top-14 md:top-24 left-1/2 transform -translate-x-1/2 z-30 text-[#0B160E] text-3xl md:text-4xl font-regular text-center font-mystery">
      Events
    </div>
    <img
      src="https://i.postimg.cc/rFypVFnN/download-49-removebg-preview-1.png"
      alt="Overlay"
      className="absolute top-0 left-0 w-32 md:w-auto h-auto"
    />
  </div>
  <LayoutGroup>
  <div className="max-w-7xl mx-auto">
    {/* Grid Layout */}
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-6">
      {/* Card 1: top left on mobile, col 2-3 on desktop */}
      <div className="md:col-start-2 md:col-span-2 col-span-1">
        <div className="w-full max-w-[280px] mx-auto">
          <EventCard {...events[0]} onEventSelect={onEventSelect} paymentEnabled={paymentEnabled} onPaymentRequired={handlePaymentRequired} />
        </div>
      </div>

      {/* Card 2: top right on mobile, col 4-5 on desktop */}
      <div className="md:col-start-4 md:col-span-2 col-span-1">
        <div className="w-full max-w-[280px] mx-auto">
          <EventCard {...events[1]} onEventSelect={onEventSelect} paymentEnabled={paymentEnabled} onPaymentRequired={handlePaymentRequired} />
        </div>
      </div>

      {/* Card 3: second row left on mobile, col 1-2 on desktop */}
      <div className="md:col-start-1 md:col-span-2 md:row-start-2 col-span-1">
        <div className="w-full max-w-[280px] mx-auto">
          <EventCard {...events[2]} onEventSelect={onEventSelect} paymentEnabled={paymentEnabled} onPaymentRequired={handlePaymentRequired} />
        </div>
      </div>

      {/* Card 4: second row right on mobile, col 3-4 on desktop */}
      <div className="md:col-start-3 md:col-span-2 md:row-start-2 col-span-1">
        <div className="w-full max-w-[280px] mx-auto">
          <EventCard {...events[3]} onEventSelect={onEventSelect} paymentEnabled={paymentEnabled} onPaymentRequired={handlePaymentRequired} />
        </div>
      </div>

      {/* Card 5: full width on mobile, centered, col 5-6 on desktop */}
      <div className="md:col-start-5 md:col-span-2 md:row-start-2 col-span-2 flex justify-center">
        <div className="w-1/2 md:w-full max-w-[280px] mx-auto">
          <EventCard {...events[4]} onEventSelect={onEventSelect} paymentEnabled={paymentEnabled} onPaymentRequired={handlePaymentRequired} />
        </div>
      </div>
    </div>
  </div>
</LayoutGroup>
    </div>

    {/* Payment Required Popup */}
    {showPaymentPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-md mx-4">
          <h3 className="text-xl font-bold text-black mb-4">Payment Required</h3>
          <p className="text-gray-700 mb-6">
            You need to complete the payment before registering for events.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-end">
              <button 
                onClick={handleClosePaymentPopup}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  handleClosePaymentPopup();
                  if (onPayNow) onPayNow();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Pay Now
              </button>
            </div>
            
            {/* FAQ Link */}
            <div className="text-center">
              <a
                href="/faq"
                className="text-green-600 hover:text-green-700 underline text-sm transition-colors duration-300"
              >
                Have questions? Check our FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default PaymentStart;
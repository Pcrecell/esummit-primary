"use client";

import React, { useState, useEffect } from "react";
// import DashBoardCard from "./DashBoardCard";
import MapComponent from "./MapComponent";
import { authAPI } from "../../../lib/services/api";
import DashBoardCard from "../../../../public/images/esummit/dashboard/Dashboard Card.svg";
import QuestionMark from "../../../../public/images/esummit/dashboard/Question-Mark.svg";
import PaymentStart from "./paymentStart";
import PaymentEnd from "./paymentEnd";
import Particles from "./Particles";
import Image from "next/image";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

const EsummitDashBoard = () => {
  const { userData, profile, loading } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [userDataState, setUserDataState] = useState(null);
  const [registeredEventId, setRegisteredEventId] = useState(null);
  const qrCode =
    "https://ik.imagekit.io/fhervghik/E-Cell%20Website/Group%2013.png";
  const router = useRouter();


  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!userData) {
        router.replace("/login");
      }
    }
  }, [userData, profile, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-green-900 text-white text-2xl font-bold tracking-widest animate-pulse">
        Loading...
      </div>
    );
  }
  const handleEventClick = (eventId) => {
    setSelectedEventId(eventId);
    setShowConfirmationPopup(true);
  };

  // Handle payment action from PaymentStart popup
  const handlePaymentFromPopup = () => {
    setPaymentDone(true);
  };

  // Handle registration confirmation
  const handleConfirmRegistration = () => {
    setRegisteredEventId(selectedEventId);
    setShowConfirmationPopup(false);
  };

  // Handle popup cancellation
  const handleCancelRegistration = () => {
    setSelectedEventId(null);
    setShowConfirmationPopup(false);
  };

  return (
    <div>
      {/* Scrolling Message at Top */}
      {/* <div className="fixed top-16 left-0 w-full bg-gradient-to-r from-green-600 to-black text-white py-2 sm:py-3 z-50 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap min-w-full">
          <span className="text-sm sm:text-lg font-bold mx-4 sm:mx-8 inline-block min-w-max">
            Your payment will reflect within 6 hours. Please avoid multiple transactions, as we are not responsible for duplicate payments.
          </span>
          <span className="text-sm sm:text-lg font-bold mx-4 sm:mx-8 inline-block min-w-max">
            Your payment will reflect within 6 hours. Please avoid multiple transactions, as we are not responsible for duplicate payments.
          </span>
          <span className="text-sm sm:text-lg font-bold mx-4 sm:mx-8 inline-block min-w-max">
            Your payment will reflect within 6 hours. Please avoid multiple transactions, as we are not responsible for duplicate payments.
          </span>
        </div>
      </div> */}
      
      <div className="relative mt-12">
        <div
          className="absolute inset-0 z-10 "
          style={{ width: "100%", height: "100%" }}
        >
          <Particles
            particleColors={["#b3d11c", "#b3d11c"]}
            particleCount={2000}
            particleSpread={10}
            speed={0.2}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={true}
          />
        </div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-[-1] bg-[#010b04]"
          style={{
            objectPosition: "calc(50% + 23px) center",
          }}
        >
          <source
            src="https://ik.imagekit.io/ilgcom35w/theme-bg-esummit.mp4?updatedAt=1754759044375"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-20 w-full pointer-events-none">
          <div className="flex flex-col font-bold w-full justify-center pt-24 sm:pt-[35vh] ml-4 pointer-events-auto">
            <h1
              className="font-tourney text-4xl md:text-5xl text-start"
              style={{
                color: "#FFFFFF",
                WebkitTextStroke: "1px #FFFFFF",
                paintOrder: "stroke fill",
              }}
            >
              Hey!
            </h1>
            <h1
              className={`font-tourney text-start ${
                (profile?.firstname?.length || 0) > 8
                  ? "text-5xl md:text-6xl" // smaller if > 8 chars
                  : "text-6xl md:text-8xl" // normal size otherwise
              }`}
              style={{
                color: "#FFFFFF",
                WebkitTextStroke: "2px #FFFFFF",
                paintOrder: "stroke fill",
              }}
            >
              {profile?.firstname || "User"}
            </h1>
          </div>
        </div>
        <div className="relative min-h-[80vh] font-sans text-white hero-container" />

        {/* UUID Section - Only show when payment is done - Positioned just above QR */}
        {profile?.payment && (
          <div className="absolute top-[93vh] sm:top-[103vh] left-1/2 -translate-x-1/2 z-40 w-64">
            <div
              className="bg-black/90 backdrop-blur-sm border-b-3 p-4 shadow-lg"
              style={{ borderBottomColor: "#D8BA5F" }}
            >
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p
                    className="text-white tracking-wider text-center"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    <span className="text-sm font-medium uppercase tracking-wide mr-2">
                      {" "}
                      UID:
                    </span>
                    <span className="text-xl">
                      {profile?.elixir ||
                        profile?.email?.substring(0, 10) ||
                        "0123456789"}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      profile?.elixir ||
                        profile?.email?.substring(0, 10) ||
                        "0123456789"
                    )
                  }
                  className="p-2 hover:bg-green-600/20 rounded-md transition-colors duration-200 ml-2"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-white hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Username Section - Only show when payment is done - Positioned under QR */}
        {profile?.payment && (
          <div className="absolute top-[135vh] sm:top-[145vh] left-1/2 -translate-x-1/2 z-40 w-64">
            <div
              className="bg-black/90 backdrop-blur-sm border-t-3 p-4 shadow-lg"
              style={{ borderTopColor: "#D8BA5F" }}
            >
              <div className="text-center">
                <p
                  className="text-white font-semibold text-center"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  <span className="text-sm font-medium uppercase tracking-wide mr-2">
                    NAME:
                  </span>
                  <span className="text-xl">
                    {profile?.firstname
                      ? `${profile?.firstname} ${profile?.lastname || ""}`.trim()
                      : "USER NAME"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-[120vh] sm:top-[130vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-80">
          <div className="relative">
            <div className="relative">
              <Image src={DashBoardCard} alt="card" className="w-full" />
              {!profile?.payment && (
                <div
                  className="absolute inset-0 bg-black/50 rounded-lg"
                  style={{
                    top: "21%",
                    left: "0",
                    right: "0",
                    bottom: "0",
                  }}
                ></div>
              )}
            </div>

            <div className="absolute bottom-[10vh]">
              {profile?.payment ? (
                // <Image src={qrCode} alt="qr-code" className="scale-75"  width={400} height={400}
                //   style={{
                //     transition: "all",
                //     animationDuration: "500ms"
                //   }}
                <div className="text-white text-3xl flex justify-center items-center text-center -translate-y-32 backdrop-blur-lg">
                  <p className="shadow shadow-black">
                    You will get your QR code shortly
                  </p>
                </div>
              ) : (
                <Image
                  src={QuestionMark}
                  alt="Question Mark"
                  className="scale-100"
                  style={{
                    transition: "all",
                    animationDuration: "500ms",
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-8">
        
            <button
              onClick={() => router.replace("/payment")}
              hidden={(profile?.payment)}
              disabled={(profile?.payment)}
              className="py-4 px-8 bg-gradient-to-br font-poppins from-black to-green-600 text-white shadow-lg shadow-[#abd65d] border-b-2 border-white text-2xl rounded-2xl hover:shadow-[#abd65d] hover:shadow-2xl transition-all duration-[1000ms]"
            >
              Pay Now
            </button>

            {/* FAQ Link */}
            <div className="mt-4">
              <a
                href="/faq"
                className="text-white hover:text-green-400 underline font-poppins font-bold text-sm transition-colors duration-300"
              >
                Have questions? Check our FAQ
              </a>
            </div>
          </div>
        </div>

        <div className="relative min-h-[80vh] sm:min-h-[50vh] font-sans text-white background-container"></div>

        {/* Black overlay at the bottom of the dashboard */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>
      </div>
      {/* {console.log("Current registeredEventId:", registeredEventId)}
      {registeredEventId ? (
        <div>
          <PaymentEnd eventId={registeredEventId} />
        </div>
      ) : (
        <div>
          <PaymentStart 
            onEventSelect={handleEventClick} 
            paymentEnabled={paymentDone}
            onPayNow={handlePaymentFromPopup}
          />
        </div>
      )} */}

      {/* Confirmation Popup */}
      {/* Confirmation Popup */}
      {/* {showConfirmationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md mx-4">
            <h3 className="text-xl font-bold text-black mb-4">Confirm Registration</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to register for this event?
            </p>
            <div className="flex gap-4 justify-end">
              <button 
                onClick={handleCancelRegistration}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmRegistration}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default EsummitDashBoard;

"use client";
import React, { useState, useEffect } from "react";
import { Cinzel_Decorative, Cinzel } from "next/font/google";
import FlippableRounds from "./Rounds";
import TimeVenue from "./TimeVenue";
import WhatsIt from "./WhatsIt";
import Rules from "./Rules";
import About from "./About";
import EventRegistration from "./EventRegistration";
import RegistrationSuccess from "./RegistrationSuccess";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";

// Configure fonts
const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel-decorative",
});

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

export default function Aif() {
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [registeredUserData, setRegisteredUserData] = useState(null);
  const { userData, setUserData, profile, setProfile, loading} = useAuth();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const router = useRouter();
  const paymentDone = profile?.payment;

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

  const openRegistration = () => {
    if (!paymentDone) {
      showError("Please complete your payment to register for the event.");
      setTimeout(() => router.replace("/dashboard"), 2000);
      return;
    }
    
    setIsRegistrationPopupOpen(true);
    setShowSuccessPage(false); 
  };

  const closeRegistration = () => {
    setIsRegistrationPopupOpen(false);
    setShowSuccessPage(false);
    setRegisteredUserData(null);
  };

  const handleRegistrationSuccess = (userData) => {
    setRegisteredUserData(userData);
    setShowSuccessPage(true);
  };

  const handleJoinDiscord = () => {
    // Replace with your actual Discord invite link
    const discordInviteLink = "https://discord.gg/your-server-invite";
    window.open(discordInviteLink, "_blank", "noopener,noreferrer");
  };

  const handleBackToForm = () => {
    setShowSuccessPage(false);
  };

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    // Only close if clicking on the backdrop itself, not on child elements
    if (e.target === e.currentTarget) {
      closeRegistration();
    }
  };

  return (
    <div className={`${cinzelDecorative.variable} ${cinzel.variable}`}>
      <div
        className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 md:px-8"
        style={{
          backgroundColor: "#011209",
          backgroundImage: `url('https://ik.imagekit.io/ecellkiit/E-Cell%20Website/Group-17.webp?updatedAt=1755288302456')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Responsive background positioning */}
        <style jsx>{`
          @media (min-width: 1024px) {
            .hero-bg {
              background-position: -100px 50px;
            }
          }
          @media (max-width: 768px) {
            .hero-bg {
              background-position: center center;
              background-size: contain;
            }
          }
        `}</style>

        {/* First Linear Gradient Overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, #011209 0%, rgba(0,0,0,0)0%, #011209 98%)",
          }}
        />

        {/* Second Linear Gradient Overlay */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to bottom, #011209 0%, rgba(0,0,0,0) 50%)",
          }}
        />

        {/* Main Content */}
        <div className="text-center relative z-10 w-full max-w-4xl mx-auto mt-8 md:mt-20 lg:ml-auto lg:mr-8">
          <h1
            className={`${cinzelDecorative.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 md:mb-8 px-2`}
            style={{
              background: "linear-gradient(180deg, #EEC014 0%, #886E0C 100%)",
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))",
              fontWeight: "bold",
              lineHeight: "1.1",
              letterSpacing: "0.05em",
            }}
          >
            ALICE IN
            <br />
            FOUNDERLAND
          </h1>

          <div className="mt-8 md:mt-12 flex justify-center">
            <button
              className="relative cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={openRegistration}
              // disabled={isPaymentDone}
            >
              <img
                src="https://ik.imagekit.io/ecellkiit/E-Cell%20Website/Banner-ideas-removebg-preview-1.webp?updatedAt=1755288301404"
                alt="Register Here"
                className="w-auto h-36 lg:h-32 object-contain"
              />
              <span
                className={`${cinzel.className} absolute inset-0 left-15 lg:left-10 flex max-w-48 text-center items-center justify-center text-black font-bold text-sm lg:text-lg`}
                style={{
                  fontWeight: 600,
                  lineHeight: "100%",
                  letterSpacing: "0.05em",
                  color: "#44261A",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                }}
              >
                REGISTER NOW
              </span>
            </button>
          </div>
        </div>
      </div>

      <About />
      <TimeVenue />
      <FlippableRounds />
      <WhatsIt />
      <Rules />

      {/* If profile?.payment == true then only open the popup or else redriect using route.push("/dashboard") */}

      {/* Registration Popup Modal */}
      {isRegistrationPopupOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black md:bg-black/50 cursor-pointer"
          onClick={handleBackdropClick}
        >
          <div 
            className="bg-transparent rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[95vh] md:max-h-[95vh] overflow-y-auto cursor-default"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="relative">
              <button
                onClick={closeRegistration}
                className="absolute top-0 right-0 md:top-8 md:right-4 z-60 text-gray-500 bg-white hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <p className="pb-2 font-medium">x</p>
              </button>
              
              {/* Conditionally render either registration form or success page */}
              {!showSuccessPage ? (
                <EventRegistration 
                  onClose={closeRegistration}
                  onRegistrationSuccess={handleRegistrationSuccess}
                />
              ) : (
                <RegistrationSuccess
                  onClose={closeRegistration}
                  onJoinDiscord={handleJoinDiscord}
                  userData={registeredUserData}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={hideToast} 
      />
    </div>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import heroBg from "../../../../../public/images/hackathon/kiitecell-hero-bg.png";
import Image from "next/image";
import heroRegisterButton from "../../../../../public/images/hackathon/hero-register-button.png";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const HeroSection = () => {
  const router = useRouter();
  const { userData, profile } = useAuth();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const [deviceType, setDeviceType] = useState("desktop");
  const paymentDone = profile?.payment;
  // console.log("Payment status from profile:", paymentDone);
  useEffect(() => {
    if (!userData) {
      router.replace("/login");
    }
  }, [userData, router]);
  
  const handleRegisterClick = () => {
    if (!paymentDone) {
      showError("Please complete your payment to register for the event.");
      setTimeout(() => router.replace("/dashboard"), 2000);
      return;
    }
    router.push("/pandoras-paradox/dashboard");
  };

  useEffect(() => {
    // Guard against SSR: only access window on client
    const computeType = () => {
      if (typeof window !== "undefined") {
        setDeviceType(window.innerWidth < 768 ? "mobile" : "desktop");
      }
    };
    computeType();
    window.addEventListener("resize", computeType);
    return () => window.removeEventListener("resize", computeType);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroBg}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Gradient Overlay at Bottom */}
      <div
        className="absolute bottom-0 left-0 w-full h-64 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0))",
        }}
      />

      {/* Top black gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-32 sm:h-42 bg-gradient-to-b from-black via-black/80 to-transparent z-20" />
      
      {/* Bottom black gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

      {/* Main Content - Positioned at Bottom */}
      <div className="relative z-20 text-center px-4 justify-end sm:px-6 md:px-8 w-full max-w-6xl mx-auto pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        {/* Main Title */}
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold select-none text-[#F1B824] mb-3 sm:mb-4 md:mb-6 tracking-wide sm:tracking-wider leading-tight`}>
          <span className="block">PANDORA'S PARADOX</span>
        </h1>

        {/* Subtitle */}
        <h2 className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl select-none text-[#F6E540] font-medium tracking-wide mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2 sm:px-4 leading-relaxed`}>
          Unlocking the Unknown - Are we Ready for What we Unleash?
        </h2>

        {/* Register Now Button */}
        <div className="w-full flex justify-center">
          <button onClick={handleRegisterClick} type="button" className="inline-block group">
            {/* Outer glow that blooms on hover */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-amber-300/0 blur-2xl transition duration-500 group-hover:bg-amber-300/25" />
              {/* Button visual with shine sweep clipped to image bounds */}
              <div className="relative overflow-hidden">
                <Image
                  src={heroRegisterButton}
                  alt="Register Now"
                  width={deviceType === "mobile" ? 250 : 350}
                  height={deviceType === "mobile" ? 70 : 100}
                  className="relative z-10 cursor-pointer transition-transform duration-500 ease-out group-hover:scale-102 group-hover:-translate-y-0.5"
                />
                
                <div className="absolute inset-0 z-30 flex items-center justify-center">
                  <span className={`${poppins.className} text-white font-semibold text-xs sm:text-xs md:text-base lg:text-xl transition-all duration-500 group-hover:scale-102 group-hover:-translate-y-0.5 group-hover:bg-amber-300/25 px-4 py-2 rounded-full tracking-wide pointer-events-none select-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]`} style={{background: 'transparent'}}>
                    Register
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={hideToast} 
      />
    </section>
  );
};

export default HeroSection;
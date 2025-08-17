"use client"

import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import { Bayon } from "next/font/google"

const bayon = Bayon({
  subsets: ["latin"],
  weight: "400",
}
)

const HeroSection = () => {
  const router = useRouter();
  // Scroll to registration section
  const handleRegisterClick = () => {
    const regSection = document.getElementById('registration-section');
    if (regSection) {
      regSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // Navigate to expo contact page
  const handleContactClick = () => {
    router.push('/EXPO/contact');
  };
  return (
    <div
      className="relative w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden sm:w-full"
      style={{
        backgroundImage: "url('https://ik.imagekit.io/admr8uj75/Frame%20253.png?updatedAt=1755027940841')"
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 w-full h-full pointer-events-none"></div>
      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="absolute top-0 left-0 w-full h-60 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <img 
          src="https://ik.imagekit.io/admr8uj75/Founders%20Arena.png?updatedAt=1755003598419" 
          alt="Expo Hero" 
          className="mx-auto mb-8 sm:mb-12 hidden lg:block lg:max-w-full h-auto"
          style={{ maxHeight: '120px' }}
        />
        <img 
          src="https://ik.imagekit.io/ecellkiit/E-Cell%20Website/Frame%20264.png?updatedAt=1755199715811" 
          alt="Expo Hero" 
          className="mx-auto sm:mb-12 translate-y-16 block lg:hidden lg:max-w-full h-auto"
          style={{ maxHeight: '120px' }}
        />

        <div className='relative lg:absolute -left-28 top-20 lg:top-[16.5rem] text-shadow-2xs text-shadow-black'>
          <p className='font-[Bayon] text-2xl lg:text-5xl lg:rotate-[-5deg]'>22K<br/>PRIZE POOL</p>
        </div>

        <div className='relative lg:absolute -right-32 lg: top-6 lg:top-[17.5rem]'>
          <p className='font-[Bayon] text-2xl lg:text-5xl lg:rotate-[10deg]'>23<br/>AUGUST</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 -translate-y-24 lg:translate-y-8 sm:gap-6 justify-center items-center mt-72 sm:mt-80 md:mt-96 lg:mt-72">
          {/* Contact Us Button */}
          <button
            className="bg-green-600 hover:bg-green-700 text-black font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base min-w-[160px] sm:min-w-[180px] cursor-pointer"
            style={{ backgroundColor: '#058A4C' }}
            onClick={handleContactClick}
          >
            <span>Contact Us</span>
            <p style={{ fontFamily: 'Arial, sans-serif' }}>&#x2197;</p>
          </button>
          {/* Register Button */}
          <button
            className="bg-gray-200 hover:bg-green-700 text-black font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base min-w-[160px] sm:min-w-[180px] cursor-pointer"
            onClick={handleRegisterClick}
          >
            <span>Registration</span>
            <p style={{ fontFamily: 'Arial, sans-serif' }}>&#x2197;</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

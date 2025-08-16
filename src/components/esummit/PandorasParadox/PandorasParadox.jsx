"use client"

import React, {useEffect} from 'react'
import HeroSection from './hero/HeroSection'
import AboutPage from './about/AboutPage'
import Timeline from './timeline/Timeline'
import WhyUsScreen from './whyregister/WhyUs'
import Guidelines from './guidelines/Guidelines'
import ContactUs from './contactus/ContactUs'
import { useRouter } from 'next/navigation'
import { useAuth } from "@/lib/context/AuthContext";





const PandorasParadox = () => {

    const { userData, profile, loading } = useAuth();
    const router = useRouter();

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
  return (
    <div>
      <HeroSection />
      <AboutPage />
      <Timeline />
      <WhyUsScreen />
      <Guidelines />
      <ContactUs />
    </div>
  )
}

export default PandorasParadox

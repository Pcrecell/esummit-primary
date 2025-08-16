"use client"

import { useRef, useEffect } from "react";
// import Navbar from "@/components/esummit/expo/Navbar";
import Footer from "@/components/esummit/expo/Footer";
import HeroSection from "@/components/esummit/expo/HeroSection";
import About from "@/components/esummit/expo/About";
import MoreInfo from "@/components/esummit/expo/MoreInfo";
import Registration from "@/components/esummit/expo/Registration";
import Query from "@/components/esummit/expo/Query";
import { useRouter } from 'next/navigation'
import { useAuth } from "@/lib/context/AuthContext";



export default function HomePage() {
  const aboutRef = useRef(null);
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

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <HeroSection />
      <div ref={aboutRef}>
        <About />
      </div>
      <MoreInfo />
      {/* <div id="registration-section">
        <Registration />
      </div> */}
      <Footer />
    </div>
  );
}
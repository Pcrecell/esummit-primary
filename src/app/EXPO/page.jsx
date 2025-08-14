"use client"

import { useRef } from "react";
// import Navbar from "@/components/esummit/expo/Navbar";
import Footer from "@/components/esummit/expo/Footer";
import HeroSection from "@/components/esummit/expo/HeroSection";
import About from "@/components/esummit/expo/About";
import MoreInfo from "@/components/esummit/expo/MoreInfo";
import Registration from "@/components/esummit/expo/Registration";
import Query from "@/components/esummit/expo/Query";




export default function HomePage() {
    const aboutRef = useRef(null);

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
"use client"

import React, {useEffect} from "react";
import Hero from "@/components/esummit/Oracle/Hero";
import Story from "@/components/esummit/Oracle/Story";
import Stages from "@/components/esummit/Oracle/Stages";
import Perk from "@/components/esummit/Oracle/perk";
import Footer from "@/components/esummit/Oracle/Footer"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/lib/context/AuthContext";

export default function oracle() {

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
    <>
      <Hero />
      <Story />
      <Stages/>
      <Perk />
      <Footer/>
    </>
  );
}

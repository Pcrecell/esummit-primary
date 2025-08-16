// Import Case-X code from @/components/CaseX to over here
"use client"

import React, {useEffect} from "react";
import CaseX from "@/components/esummit/CaseX/CaseX";
import { useRouter } from 'next/navigation'
import { useAuth } from "@/lib/context/AuthContext";

export default function HomePage() {
    const { userData, setUserData, profile, setProfile, loading} = useAuth();
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
            <CaseX />
        </>
    );
}
"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

const PaymentChoice = () => {
  const router = useRouter();
  const modalRef = useRef(null);
  const { userData, profile, loading } = useAuth();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !userData) {
      router.replace("/login");
    }
  }, [userData, loading, router]);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        router.back();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-green-900 text-white text-2xl font-bold tracking-widest animate-pulse">
        Loading...
      </div>
    );
  }

  // Check if payment should be disabled
  const isPaymentDisabled = profile?.email?.startsWith("25");

  const handlePaymentLater = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black">
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-2xl shadow-2xl"
      >
        <div
          className="w-full h-[700px] bg-center bg-no-repeat bg-contain text-white flex items-center justify-center"
          style={{
            backgroundImage: `url('https://ik.imagekit.io/ilgcom35w/KIITESUMMIT-POPUP-PAY.webp?updatedAt=1755353166962')`,
          }}
        >
          <div className="flex flex-col md:gap-y-2 items-center">
            <p className="text-md text-center max-w-md font-bold font-poppins">
              Secure your spot at E-Summit <br />– but don’t miss out!
            </p>
            <p className="text-md text-center max-w-md font-bold font-poppins">
              Price: {profile?.college === "KIIT"
                ? "₹ 249"
                : "₹ 349"
              }
            </p>

            {/* Pay Now Button */}
            {/* {!isPaymentDisabled ? (
              
              <a                             commentng the previous logic for backup
                href="https://payments.billdesk.com/bdcollect/bd/kalingainstituteofindustrialtechnology/17972"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="group relative w-40 cursor-pointer">
                  <img
                    src="https://ik.imagekit.io/ilgcom35w/KIITESUMMIT-POPUP-PAYButtoon.webp?updatedAt=1755353301612"
                    alt="Pay Now"
                    className="w-full transition duration-300 group-hover:brightness-50 z-0"
                  />
                  <span className="absolute inset-0 z-10 flex items-center justify-center text-white font-bold text-sm font-poppins">
                    PAY NOW
                  </span>
                </div>
              </a>
            ) : (
              <div className="w-40 text-center text-red-500 font-bold">
                Payment is disabled for first year
              </div>
            )} */}

            {!isPaymentDisabled ? (
              <a
                href={
                  profile?.college === "KIIT"
                    ? "https://payments.billdesk.com/bdcollect/bd/kalingainstituteofindustrialtechnology/17972"
                    : "https://payments.billdesk.com/bdcollect/bd/kalingainstituteofindustrialtechnology/17796"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="group relative w-40 cursor-pointer">
                  <img
                    src="https://ik.imagekit.io/ilgcom35w/KIITESUMMIT-POPUP-PAYButtoon.webp?updatedAt=1755353301612"
                    alt="Pay Now"
                    className="w-full transition duration-300 group-hover:brightness-50 z-0"
                  />
                  <span className="absolute inset-0 z-10 flex items-center justify-center text-white font-bold text-sm font-poppins">
                    PAY NOW
                  </span>
                </div>
              </a>
            ) : (
              <div className="w-40 text-center text-red-500 font-bold">
                Payment is disabled for first year
              </div>
            )}

            {/* Walk Away Button */}
            <div
              className="group relative w-40 cursor-pointer transition duration-300 mt-4"
              onClick={handlePaymentLater}
            >
              <img
                src="https://ik.imagekit.io/ilgcom35w/KIITESUMMIT-POPUP-PAYButtoon2.webp?updatedAt=1755353301688"
                alt="Walk Away"
                className="w-full transition duration-300 group-hover:brightness-50 z-0"
              />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-white font-bold text-sm font-poppins">
                WALK AWAY
              </span>
            </div>

            {/* FAQ Link */}
            <div className="translate-y-24">
              <a
                href="/faq"
                className="text-green-400 hover:text-green-300 underline font-poppins text-sm transition-colors duration-300"
              >
                Have questions? Check our FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentChoice;

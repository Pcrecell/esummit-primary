"use client";

import React, { useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentChoice = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalRef = useRef(null);

  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";
  const uid = searchParams.get("uid") || "";

  const userData = { name, email, phone, uid };

   useEffect(() => {
    if (!name || !email || !phone || !uid) {
      router.replace("/dashboard"); // or login page
    }
  }, [name, email, phone, uid, router]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        router.back();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [router]);

  const handlePayment = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/initiate-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (data.status === "success") {
      window.location.assign(data.paymentUrl);
    } else {
      console.error("Payment initiation failed:", data.message);
      alert("Payment initiation failed. Please try again.");
    }
  };

  const handlePaymentLater = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div ref={modalRef} className="relative w-full max-w-md rounded-2xl shadow-2xl">
        <div
          className="w-full h-[700px] bg-center bg-no-repeat bg-contain text-white flex items-center justify-center"
          style={{
            backgroundImage: `url('https://i.postimg.cc/9fnRYv6K/KIITESUMMIT-POPUP-PAY.png')`,
          }}
        >
          <div className="flex flex-col gap-y-2 items-center">
            <p className="text-md text-center max-w-md font-bold font-poppins">
              Secure your spot at E-Summit <br />– but don’t miss out!
            </p>
            <p className="text-md text-center max-w-md font-bold font-poppins">
              Price: Rs.249
            </p>            
       <div
  className="group relative w-40 cursor-pointer"
  onClick={handlePayment}
>
  <img
    src="https://i.postimg.cc/4xgHwDWF/KIITESUMMIT-POPUP-PAYButtoon.png"
    alt="Pay Now"
    className="w-full transition duration-300 group-hover:brightness-50 z-0"
  />
  <span className="absolute inset-0 z-10 flex items-center justify-center text-white font-bold text-sm font-poppins">
    PAY NOW
  </span>
</div>
          <div
  className="group relative w-40 cursor-pointer transition duration-300"
  onClick={handlePaymentLater}
>
  <img
    src="https://i.postimg.cc/3x4chbmh/KIITESUMMIT-POPUP-PAYButtoon2.png"
    alt="Walk Away"
    className="w-full transition duration-300 group-hover:brightness-50 z-0"
  />
  <span className="absolute inset-0 z-10 flex items-center justify-center text-white font-bold text-sm font-poppins">
    WALK AWAY
  </span>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentChoice;

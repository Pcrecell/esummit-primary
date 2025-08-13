"use client"

import React from "react";
// import { Link } from "react-router-dom";
import { user_auth_pages } from "../../../../public/images/image-links";
import Image from "next/image";

export default function AuthLayout({ children, hideGreenBox = false }) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-r from-[#181818] to-black relative">
      <div className={`w-full ${hideGreenBox ? '' : 'md:w-[64vw]'} flex flex-col items-center justify-center z-10 p-4 pt-28 md:pt-24 flex-grow md:flex-grow-0`}>
        <div className="w-full max-w-lg mb-auto mt-auto">{children}</div>

        <footer className="w-full max-w-lg text-center text-xs text-gray-400 py-4 mt-4">
          <a href="/tos" className="hover:text-white hover:underline">Terms and conditions</a>
          <span className="mx-2">•</span>
          <a href="/pp" className="hover:text-white hover:underline">Privacy policy</a>
        </footer>
      </div>

      {!hideGreenBox && (
        <div className="hidden md:block absolute right-0 top-0 h-full bg-none translate-y-1 w-[36vw] z-0">
          <div className="relative w-full h-full">
            <Image
              src={"https://ik.imagekit.io/ecellkiit/E-Cell%20Website/ChatGPT%20Image%20Aug%207,%202025,%2007_23_04%20PM.png"}
              alt="Auth Page"
              width={1000}
              height={1200}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/70 to-transparent pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
}
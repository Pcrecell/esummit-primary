"use client";
import Image from "next/image";
import { Cinzel, Cinzel_Decorative } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const cinzel_decrovative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: "900",
  display: "swap"
})

export default function FounderlandCard() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#011209] px-4 py-8">
      {/* Mobile Scroll - Small size at top on mobile */}
      <div className="lg:hidden mb-4 z-20 flex-shrink-0">
         <p className={`text-[#D4AF37] ${cinzel_decrovative.className} text-center text-4xl font-extrabold`}>WHAT'S IN IT FOR YOU?</p>
      </div>

      {/* Container for card and scroll */}
      <div className="relative flex items-center justify-center w-full max-w-6xl">
        {/* Desktop Scroll Overlay - As overlay on the left side of the card */}
        <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 h-[400px] w-[420px] z-20 pointer-events-none">
          <Image
            src="https://i.ibb.co/HDp97W96/Spell-Scroll-2-removebg-preview-2.png"
            alt="Scroll"
            width={700}
            height={700}
            className="object-contain opacity-90"
          />
          <div>
            <p className={`text-[#5b3b31] ${cinzel_decrovative.className} text-center text-4xl absolute top-48 left-40 font-extrabold rotate-[-17deg]`}>WHAT'S<br/>IN IT<br/>FOR YOU?</p>
          </div>
        </div>

        {/* Card */}
        <div className="relative bg-[#001F11] border border-[#BCA13A] rounded-lg px-6 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-10 md:py-12 lg:py-14 max-w-2xl w-full text-[#BCA13A] z-10">
          {/* Content - Positioned to the right on desktop */}
          <div className="relative z-10 lg:ml-32">
            <ol className="list-decimal list-inside space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl leading-relaxed">
              <li className="pl-2">
                Step into the most thrilling entrepreneurial game of E-Summit
                2025.
              </li>
              <li className="pl-2">
                Face real challenges, rapid twists, and high-pressure decisions.
              </li>
              <li className="pl-2">
                Build ideas, break alliances, and prove your instincts.
              </li>
              <li className="pl-2">Win exciting goodies, certificates.</li>
            </ol>
            <p className="mt-4 sm:mt-6 text-[#D4AF37] text-base sm:text-lg md:text-xl text-center">
              One champion walks away with the title:
              <br />
              <span
                className={`${cinzel.className} font-semibold text-lg sm:text-xl md:text-2xl`}
              >
                ACE OF FOUNDERLAND
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

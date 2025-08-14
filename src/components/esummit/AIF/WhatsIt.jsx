"use client";
import Image from "next/image";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
export default function FounderlandCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#011209]">
      {/* Card */}
      <div className="relative bg-[#001F11] border border-[#BCA13A] rounded-lg px-26 py-14 max-w-2xl w-full text-[#BCA13A] left-30">
        {/* Scroll Overlay */}
        <div className="absolute -left-74 top-3/7 -translate-y-3/5 h-[400px] w-[420px]">
          <Image
            src="https://i.ibb.co/HDp97W96/Spell-Scroll-2-removebg-preview-2.png"
            alt="Scroll"
            width={700}
            height={700}
            className="object-contain"
          />
        </div>

        {/* Content */}
        <ol className="list-decimal list-inside space-y-4 text-lg leading-relaxed">
          <li>
            Step into the most thrilling entrepreneurial game of E-Summit 2025.
          </li>
          <li>
            Face real challenges, rapid twists, and high-pressure decisions.
          </li>
          <li>Build ideas, break alliances, and prove your instincts.</li>
          <li>Win exciting goodies, certificates.</li>
        </ol>

        <p className="mt-6 ml-22 text-[#D4AF37] text-lg">
          One champion walks away with the title: <br></br>
          <span className={cinzel.className} >ACE OF FOUNDERLAND</span>
        </p>
      </div>
    </div>
  );
}

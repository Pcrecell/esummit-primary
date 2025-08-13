import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose the weights you need
});

export default function Home() {
  return (
    <div
      className="relative h-[100vh] rounded-2xl overflow-hidden shadow-xl"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/9MfqyX4w/KIITESUMMIT-Oracle-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-center z-10">
        <div>
          <Image
            src="https://i.postimg.cc/ZR1DW5j4/oracle.png"
            alt="Oracle"
            width={600}
            height={200}
            priority
          />
          <p className="text-white text-lg md:text-2xl tracking-[0.6em] mt-4 font-poppins">
            CHAMBER OF SECRETS
          </p>

          {/* Centered PAY NOW button */}
          <div className="flex justify-center mt-8">
            <div className="group relative w-60 cursor-pointer items-center">
              <img
                src="https://i.postimg.cc/4xgHwDWF/KIITESUMMIT-POPUP-PAYButtoon.png"
                alt="Pay Now"
                className="w-full transition duration-300 group-hover:brightness-50 z-0"
              />
               <span
                className={`absolute inset-0 z-10 flex items-center justify-center text-[#3A2D07] font-semibold text-xl ${cormorantGaramond.className}`}
              >
                REGISTER NOW
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

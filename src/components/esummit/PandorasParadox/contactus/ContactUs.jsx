import Image from "next/image";
import ContactMap from "./ContactMap";
import bgImage from "../../../../../public/images/hackathon/contact-us-bg.png";
import { Poppins, Arima } from "next/font/google";

const arima = Arima({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ContactUs = () => {
  return (
    <section id="contactus" 
    className="relative w-full min-h-[120vh] bg-black flex items-center justify-center py-8 px-2 overflow-hidden">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt="Contact Us Background"
        fill
        style={{ objectFit: "cover" , opacity:0.6}}
        className="z-0"
        priority
      />

      {/* Bottom black gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

      {/* Top black gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/60 to-transparent z-10" />

      {/* Content */}
      <div
        className="relative z-20 w-full border-2 border-[#6e550f] max-w-7xl bg-[#0B1F1D] rounded-2xl overflow-hidden shadow-lg"
        style={{ minHeight: 420 }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left: Form */}
          <div className="flex-1 flex flex-col justify-center px-8 py-10 md:py-10">
            <h2 className={`${arima.className} text-white text-5xl md:text-6xl font-bold mb-2 select-none`}>
              CONTACT US
            </h2>
            <p className="text-[10px] md:text-xs text-gray-300 mb-8 tracking-widest select-none">
              FOR YOUR ANY QUERIES, FEEL FREE TO ASK YOUR DOUBTS
            </p>
            <form className="flex flex-col gap-6">
              <div className="flex gap-8">
                <div className="flex-1 flex flex-col">
                  <label className="text-[10px] text-gray-300 mb-1 tracking-widest select-none">
                    NAME
                  </label>
                  <input
                    className="bg-transparent border-b-2 border-[#9DB59F] outline-none text-white py-1"
                    type="text"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-[10px] text-gray-300 mb-1 tracking-widest select-none">
                    PHONE NO.
                  </label>
                  <input
                    className="bg-transparent border-b-2 border-[#9DB59F] outline-none text-white py-1"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-300 mb-1 tracking-widest select-none">
                  E-MAIL
                </label>
                <input
                  className="bg-transparent border-b-2 border-[#9DB59F] outline-none text-white py-1"
                  type="email"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-[10px] text-gray-300 mb-2 tracking-widest select-none">
                  MESSAGE
                </label>
                <textarea className="bg-transparent border border-[#9DB59F] outline-none text-white p-3 min-h-[110px] resize-none" style={{ borderTopRightRadius: '16px', borderBottomLeftRadius: '16px', borderTopLeftRadius: 0, borderBottomRightRadius: 0 }} />
                <div className="mt-5 w-full flex justify-end">
                  <a href="">
                  <button
                    className="inline-flex items-center gap-2 rounded-full bg-[#9DB59F] text-black px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-semibold shadow-[0_4px_14px_0_rgba(157,181,159,0.35)] hover:shadow-[0_6px_20px_rgba(157,181,159,0.45)] hover:bg-[#B4C9B7] focus:outline-none focus:ring-2 focus:ring-[#9DB59F]/60 active:translate-y-[1px] transition-all duration-200"
                  >
                    <span>Send</span>
                    
                  </button>
                  </a>
                </div>
              </div>
              
            </form>
          </div>

          {/* Right: Map */}
          <div
            className="flex-1 flex items-center justify-center p-4 md:p-8"
            style={{ minHeight: 320 }}
          >
            <div
              className="w-full h-72 md:h-96 rounded-2xl overflow-hidden"
              style={{ background: "#181818" }}
            >
              <ContactMap />
            </div>
          </div>
        </div>

        {/* Footer Contacts */}
        <div className="px-8 pb-8 md:pb-6">
          <div className="border-t border-[#9DB59F] pt-4 md:pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-[#9DB59F]">
              <div className="flex flex-col items-center justify-center py-4 md:py-2">
                <h3 className="text-white text-sm md:text-base tracking-widest font-semibold">SUJAY KUMAR</h3>
                <p className="text-gray-300 text-[10px] md:text-xs">Event Lead</p>
                <p className="text-gray-300 text-[10px] md:text-xs mt-2">+91-7750015353</p>
                <p className="text-gray-300 text-[10px] md:text-xs">sujay.kiitecell@gmail.com</p>
              </div>
              <div className="flex flex-col items-center justify-center py-4 md:py-2">
                <h3 className="text-white text-sm md:text-base tracking-widest font-semibold">RUPAM DAS</h3>
                <p className="text-gray-300 text-[10px] md:text-xs">Event POC</p>
                <p className="text-gray-300 text-[10px] md:text-xs mt-2">+91-7908473621</p>
                <p className="text-gray-300 text-[10px] md:text-xs">rupam.kiitecell@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

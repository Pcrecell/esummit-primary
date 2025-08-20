"use client";

import Image from "next/image";
import ContactMap from "./ContactMap";
import bgImage from "../../../../../public/images/hackathon/contact-us-bg.png";
import { Poppins, Arima } from "next/font/google";
import { useState } from "react";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";

const arima = Arima({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ContactUs = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  
    // Form status state
    const [formStatus, setFormStatus] = useState({
      loading: false,
      error: null,
      success: false,
    });
  
    // Use centralized toast system
    const { toast, showSuccess, showError, showLoading, hideToast } = useToast();
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
  
      // Clear form status when user starts typing
      setFormStatus({ loading: false, error: null, success: false });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Prevent multiple submissions
      if (formStatus.loading) {
        return;
      }
  
      // Basic validation
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.phone.trim() ||
        !formData.message.trim()
      ) {
        showError("Please fill in all fields");
        return;
      }
  
      // Email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        showError("Please enter a valid email address");
        return;
      }
  
      // Phone validation (basic)
      if (formData.phone.length < 10) {
        showError("Phone number must be at least 10 digits");
        return;
      }
  
      // Set loading state and show loading toast
      setFormStatus({ loading: true, error: null, success: false });
      showLoading("Sending your message...");
  
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/contact`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              countryCode: "+91", // You can make this dynamic if needed
              message: formData.message,
            }),
          }
        );
  
        const result = await response.json();
  
        if (response.ok) {
          setFormStatus({
            loading: false,
            error: null,
            success: true,
          });
          setFormData({ name: "", email: "", phone: "", message: "" });
          hideToast(); // Hide loading toast
          showSuccess("Message sent successfully! We'll get back to you soon.");
        } else {
          setFormStatus({
            loading: false,
            error: result.error || "Failed to send message. Please try again.",
            success: false,
          });
          hideToast(); // Hide loading toast
          showError(result.error || "Failed to send message. Please try again.");
        }
      } catch (err) {
        setFormStatus({
          loading: false,
          error:
            "Something went wrong. Please check your connection and try again.",
          success: false,
        });
        hideToast(); // Hide loading toast
        showError("Something went wrong. Please check your connection and try again.");
      }
    };
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
        style={{ 
          minHeight: 420,
          boxShadow: "0 0 50px rgba(255, 204, 0, 0.2), 0 0 100px rgba(255, 204, 0, 0.15)"
        }}
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
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-transparent border-b-2 border-[#9DB59F] outline-none text-white py-1 focus:border-[#B4C9B7] transition-colors"
                    type="text"
                    disabled={formStatus.loading}
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-[10px] text-gray-300 mb-1 tracking-widest select-none">
                    PHONE NO.
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-transparent border-b-2 border-[#9DB59F] outline-none text-white py-1 focus:border-[#B4C9B7] transition-colors"
                    type="tel"
                    disabled={formStatus.loading}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-300 mb-1 tracking-widest select-none">
                  E-MAIL
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-transparent border-b-2 border-[#9DB59F] outline-none text-white py-1 focus:border-[#B4C9B7] transition-colors"
                  type="email"
                  disabled={formStatus.loading}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-[10px] text-gray-300 mb-2 tracking-widest select-none">
                  MESSAGE
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-transparent border border-[#9DB59F] outline-none text-white p-3 min-h-[110px] resize-none focus:border-[#B4C9B7] transition-colors" 
                  style={{ borderTopRightRadius: '16px', borderBottomLeftRadius: '16px', borderTopLeftRadius: 0, borderBottomRightRadius: 0 }}
                  disabled={formStatus.loading}
                />
                <div className="mt-5 w-full flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={formStatus.loading}
                    className={`inline-flex items-center gap-2 rounded-full bg-[#9DB59F] text-black px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-semibold 
                      ${formStatus.loading 
                        ? 'opacity-70 cursor-not-allowed' 
                        : 'shadow-[0_4px_14px_0_rgba(157,181,159,0.35)] hover:shadow-[0_6px_20px_rgba(157,181,159,0.45)] hover:bg-[#B4C9B7] active:translate-y-[1px]'
                      } focus:outline-none focus:ring-2 focus:ring-[#9DB59F]/60 transition-all duration-200`}
                  >
                    {formStatus.loading ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <span>Send</span>
                    )}
                  </button>
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
      {toast && <Toast />}
    </section>
  );
};

export default ContactUs;

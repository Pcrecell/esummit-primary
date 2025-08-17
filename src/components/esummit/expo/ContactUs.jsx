"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../contact/ContactMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-lg">Loading map...</div>
    </div>
  ),
});

function ExpoContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    console.log("Query submitted:", { name, email, query });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/expo/submit-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, query }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Query submitted successfully!");
          resetForm();
        } else {
          alert("Failed to submit query. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error submitting query:", error);
        alert("An error occurred while submitting your query.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      {/* Contact Section - Exactly 100vh */}
      <div className="h-screen relative">
        {/* Full Width Map Behind Everything */}
        <div className="absolute inset-0 w-full z-[1]">
          <Map disableDragging={false} />
        </div>

        {/* Contact Form - Positioned on Right */}
        <div className="absolute right-0 left-0 lg:left-auto lg:right-0 top-[8vh] md:top-[5vh] lg:top-[3vh] h-full flex items-center justify-center z-20 px-4 sm:px-6 md:px-8">
          <div
            className="relative contact-scroll h-[88vh] sm:h-[90vh] md:h-[92vh] lg:h-[94vh] max-w-full bg-contain bg-no-repeat bg-center"
            style={{
              width: "clamp(360px, 90vw, 700px)",
              aspectRatio: "3/4",
              backgroundImage:
                'url("https://ik.imagekit.io/admr8uj75/download%20(24)%20(2).png?updatedAt=1754907656143")',
              filter:
                "drop-shadow(0 10px 25px rgba(139, 69, 19, 0.4)) drop-shadow(0 4px 10px rgba(101, 67, 33, 0.3))",
            }}
          >
            {/* Form Container - Better responsive positioning */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
              {/* Content wrapper with proper spacing */}
              <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[480px] h-full flex flex-col justify-center">
                {/* Title */}
                <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#251B16] leading-tight">
                    Contact Us
                  </h1>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="w-full space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7"
                >
                  {/* Name Field */}
                  <div>
                    <label className="block text-[#251B16] font-semibold mb-2 sm:mb-2.5 md:mb-3 text-sm sm:text-base md:text-lg">
                      NAME
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#F5E8C8] text-[#251B16] placeholder-[#A0845C] tracking-wide focus:outline-none transition-colors text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 border border-[#251B16] rounded-sm shadow-inner"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-[#251B16] font-semibold mb-2 sm:mb-2.5 md:mb-3 text-sm sm:text-base md:text-lg">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-[#F5E8C8] text-[#251B16] placeholder-[#A0845C] tracking-wide focus:outline-none transition-colors text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 border border-[#251B16] rounded-sm shadow-inner"
                      required
                    />
                  </div>

                  {/* Query Field */}
                  <div>
                    <label className="block text-[#251B16] font-semibold mb-2 sm:mb-2.5 md:mb-3 text-sm sm:text-base md:text-lg">
                      QUERY
                    </label>
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter your query or message"
                      className="w-full bg-[#F5E8C8] text-[#251B16] placeholder-[#A0845C] focus:outline-none transition-colors resize-none text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 h-20 sm:h-24 md:h-28 lg:h-32 border border-[#251B16] rounded-sm shadow-inner"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4 sm:pt-6 md:pt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`font-bold tracking-wider cursor-pointer transition-all duration-200 flex items-center justify-center rounded-md px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-b from-[#251B16] to-[#1A0F09] text-[#F5E8C8] shadow-lg border border-[#1A0F09] ${
                        isSubmitting
                          ? "opacity-75 cursor-not-allowed"
                          : "hover:scale-105 hover:shadow-xl transform active:scale-95"
                      }`}
                    >
                      {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpoContactUs;

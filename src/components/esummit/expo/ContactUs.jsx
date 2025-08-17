"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";

const Map = dynamic(() => import("../contact/ContactMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-lg">Loading map...</div>
    </div>
  ),
});

function ExpoContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
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

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setFormStatus({ loading: false, error: null, success: false });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) return `${name === "firstName" ? "First" : "Last"} name is required`;
        if (value.trim().length < 2) return `${name === "firstName" ? "First" : "Last"} name must be at least 2 characters`;
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return `${name === "firstName" ? "First" : "Last"} name should only contain letters`;
        return "";
      
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return "";
      
      case "phone":
        if (!value.trim()) return "Phone number is required";
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length < 10) return "Phone number must be at least 10 digits";
        if (digitsOnly.length > 15) return "Phone number cannot exceed 15 digits";
        if (!/^[6-9]/.test(digitsOnly)) return "Please enter a valid Indian phone number";
        return "";
      
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        if (value.trim().length > 500) return "Message cannot exceed 500 characters";
        return "";
      
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formStatus.loading) return;

    if (!validateForm()) {
      showError("Please fix the errors below");
      return;
    }

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
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            countryCode: "+91",
            message: formData.message,
            source: "expo",
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setFormStatus({ loading: false, error: null, success: true });
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        setErrors({});
        hideToast();
        showSuccess("Message sent successfully! We'll get back to you soon.");
      } else {
        setFormStatus({
          loading: false,
          error: result.error || "Failed to send message. Please try again.",
          success: false,
        });
        hideToast();
        showError(result.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setFormStatus({
        loading: false,
        error: "Something went wrong. Please check your connection and try again.",
        success: false,
      });
      hideToast();
      showError("Something went wrong. Please check your connection and try again.");
    }
  };

  return (
    <div>
      {/* Toast Component */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

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
                <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#251B16] leading-tight">
                    Contact Us
                  </h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                  {/* First Name and Last Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    <div>
                      <label className="block text-[#251B16] font-semibold mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base">
                        FIRST NAME
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-[#F5E8C8] text-[#251B16] placeholder-[#A0845C] tracking-wide focus:outline-none transition-colors text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 border border-[#251B16] rounded-sm shadow-inner"
                        placeholder=""
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#251B16] font-semibold mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base">
                        LAST NAME
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-[#F5E8C8] text-[#251B16] placeholder-[#A0845C] tracking-wide focus:outline-none transition-colors text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 border border-[#251B16] rounded-sm shadow-inner"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-[#251B16] font-semibold mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-full bg-[#F5E8C8] text-[#251B16] placeholder-[#A0845C] tracking-wide focus:outline-none transition-colors text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 border border-[#251B16] rounded-sm shadow-inner"
                      required
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label className="block text-[#251B16] font-semibold mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-full bg-[#F5E8C8] text-[#251B16] placeholder-[#A0845C] tracking-wide focus:outline-none transition-colors text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 border border-[#251B16] rounded-sm shadow-inner"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-[#251B16] font-semibold mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base">
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-full bg-[#F5E8C8] text-[#251B16] placeholder-[#A0845C] focus:outline-none transition-colors resize-none text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 h-16 sm:h-18 md:h-20 lg:h-24 border border-[#251B16] rounded-sm shadow-inner"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-2 sm:pt-4 md:pt-6">
                    <button
                      type="submit"
                      disabled={formStatus.loading}
                      className={`font-bold tracking-wider cursor-pointer transition-all duration-200 flex items-center justify-center rounded-md px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base lg:text-lg bg-gradient-to-b from-[#251B16] to-[#1A0F09] text-[#F5E8C8] shadow-lg border border-[#1A0F09] ${
                        formStatus.loading
                          ? "opacity-75 cursor-not-allowed"
                          : "hover:scale-105 hover:shadow-xl transform active:scale-95"
                      }`}
                    >
                      {formStatus.loading ? "SUBMITTING..." : "SUBMIT"}
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

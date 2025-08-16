"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./ContactMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-lg">Loading map...</div>
    </div>
  ),
});

// Toast Component
const Toast = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;

  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
        ? "bg-red-600"
        : "bg-blue-600";
  const borderColor =
    type === "success"
      ? "border-green-500"
      : type === "error"
        ? "border-red-500"
        : "border-blue-500";

  return (
    <div
      className={`fixed top-20 left-4 z-50 ${bgColor} ${borderColor} border text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 text-white hover:text-gray-200 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

function App() {
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

  // Toast state
  const [toast, setToast] = useState({
    message: "",
    type: "", // 'success', 'error', 'loading'
    isVisible: false,
  });

  const showToast = (message, type) => {
    setToast({ message, type, isVisible: true });

    // Auto hide toast after 4 seconds for success/error messages
    if (type !== "loading") {
      setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }));
      }, 4000);
    }
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

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
      showToast("Please fill in all fields", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    // Phone validation (basic)
    if (formData.phone.length < 10) {
      showToast("Phone number must be at least 10 digits", "error");
      return;
    }

    // Set loading state and show loading toast
    setFormStatus({ loading: true, error: null, success: false });
    showToast("Sending your message...", "loading");

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
        showToast(
          "Message sent successfully! We'll get back to you soon.",
          "success"
        );
      } else {
        setFormStatus({
          loading: false,
          error: result.error || "Failed to send message. Please try again.",
          success: false,
        });
        hideToast(); // Hide loading toast
        showToast(
          result.error || "Failed to send message. Please try again.",
          "error"
        );
      }
    } catch (err) {
      setFormStatus({
        loading: false,
        error:
          "Something went wrong. Please check your connection and try again.",
        success: false,
      });
      hideToast(); // Hide loading toast
      showToast(
        "Something went wrong. Please check your connection and try again.",
        "error"
      );
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
        <div className="absolute right-0 left-0 lg:left-auto lg:right-0 top-[13vh] md:top-[3vh] h-full flex items-center justify-center z-20">
          <div
            className="relative contact-scroll h-[95vh] max-w-full bg-contain bg-no-repeat bg-center"
            style={{
              width: "clamp(470px, 90vw, 700px)",
              backgroundImage:
                'url("https://ik.imagekit.io/wlknxcf5m/Group%201000002410%20(1)_1_.png")',
              filter:
                "drop-shadow(0 10px 25px rgba(0, 142, 28, 0.39)) drop-shadow(0 4px 10px rgba(1, 1, 0, 1))",
            }}
          >
            {/* Form Container - Responsive positioning */}
            <div className="absolute flex flex-col items-center justify-center top-[15%] left-[15%] right-[15%] bottom-[12%] sm:top-[20%] sm:left-[10%] sm:right-[10%] sm:bottom-[15%] md:top-[120px] md:left-[80px] md:right-[80px] md:bottom-[100px] px-2 sm:px-4">
              {/* Title */}
              <div className="w-full flex justify-center mb-2 sm:mb-3 md:mb-4">
                <div className="text-center">
                  <span className="font-light tracking-wider text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent">
                    Talk
                  </span>
                  <span className="font-bold tracking-wider text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent">
                    {" "}
                    with us!
                  </span>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-[320px] sm:max-w-[320px] md:max-w-[320px]"
              >
                {/* Name Field */}
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <label className="block font-normal tracking-wide mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full bg-transparent text-white placeholder-gray-400 tracking-wide focus:outline-none transition-colors text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 md:py-2 border border-transparent"
                    style={{
                      borderImage:
                        "linear-gradient(180deg, #F5E34C 0%, #DDAB3C 22.84%, #8A5F1C 100%) 1",
                    }}
                    required
                  />
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4">
                  <div>
                    <label className="block font-normal tracking-wide mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email ID"
                      className="w-full bg-transparent text-white placeholder-gray-400 tracking-wide focus:outline-none transition-colors text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 border border-transparent"
                      style={{
                        borderImage:
                          "linear-gradient(180deg, #F5E34C 0%, #DDAB3C 22.84%, #8A5F1C 100%) 1",
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-normal tracking-wide mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent">
                      Phone No.
                    </label>
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your Phone No."
                      className="w-full bg-transparent text-white placeholder-gray-400 tracking-wide focus:outline-none transition-colors text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 border border-transparent"
                      style={{
                        borderImage:
                          "linear-gradient(180deg, #F5E34C 0%, #DDAB3C 22.84%, #8A5F1C 100%) 1",
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="mb-2 sm:mb-4 md:mb-6">
                  <label className="block font-normal tracking-wide mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder=""
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none transition-colors resize-none text-[10px] sm:text-xs md:text-sm p-2 sm:p-3 h-12 sm:h-16 md:h-20 lg:h-24 border border-transparent"
                    style={{
                      borderImage:
                        "linear-gradient(180deg, #F5E34C 0%, #DDAB3C 22.84%, #8A5F1C 100%) 1",
                    }}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={formStatus.loading}
                    className={`font-bold tracking-wide cursor-pointer transition-all duration-200 flex items-center justify-center rounded px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-[10px] sm:text-xs md:text-sm bg-gradient-to-b from-[#016241] to-[#014d32] ${
                      formStatus.loading
                        ? "opacity-75 cursor-not-allowed"
                        : "hover:scale-110 hover:bg-green-700"
                    }`}
                  >
                    <span className="bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent">
                      {formStatus.loading ? "SENDING..." : "SEND"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

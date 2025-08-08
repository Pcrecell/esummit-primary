"use client"

import { useState } from "react";
import Map from "./ContactMap";
// import './ContactUs.css'; 

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
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
        <div className="absolute right-0 left-0 lg:left-auto lg:right-0 top-[13vh] md:top-[3vh] h-full flex items-center justify-center z-20">
          <div
            className="relative contact-scroll h-[95vh] max-w-full bg-contain bg-no-repeat bg-center"
            style={{
              width: 'clamp(470px, 90vw, 700px)',
              backgroundImage: 'url("https://ik.imagekit.io/wlknxcf5m/Group%201000002410%20(1)_1_.png")',
              filter: 'drop-shadow(0 10px 25px rgba(0, 142, 28, 0.39)) drop-shadow(0 4px 10px rgba(1, 1, 0, 1))'
            }}
          >
            {/* Form Container - Responsive positioning */}
            <div 
              className="absolute flex flex-col items-center justify-center top-[15%] left-[15%] right-[15%] bottom-[12%] sm:top-[20%] sm:left-[10%] sm:right-[10%] sm:bottom-[15%] md:top-[120px] md:left-[80px] md:right-[80px] md:bottom-[100px] px-2 sm:px-4"
            >
              {/* Title */}
              <div className="w-full flex justify-center mb-2 sm:mb-3 md:mb-4">
                <div className="text-center">
                  <span 
                    className="font-light tracking-wider text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent"
                  >
                    Talk
                  </span>
                  <span 
                    className="font-bold tracking-wider text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent"
                  >
                    {' '}with us!
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px]">
                {/* Name Field */}
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <label 
                    className="block font-normal tracking-wide mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full bg-transparent text-white placeholder-gray-400 tracking-wide focus:outline-none transition-colors text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 border border-transparent"
                    style={{
                      borderImage: 'linear-gradient(180deg, #F5E34C 0%, #DDAB3C 22.84%, #8A5F1C 100%) 1'
                    }}
                    required
                  />
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4">
                  <div>
                    <label 
                      className="block font-normal tracking-wide mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent"
                    >
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
                        borderImage: 'linear-gradient(180deg, #F5E34C 0%, #DDAB3C 22.84%, #8A5F1C 100%) 1'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label 
                      className="block font-normal tracking-wide mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent"
                    >
                      Phone No.
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your Phone No."
                      className="w-full bg-transparent text-white placeholder-gray-400 tracking-wide focus:outline-none transition-colors text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 border border-transparent"
                      style={{
                        borderImage: 'linear-gradient(180deg, #F5E34C 0%, #DDAB3C 22.84%, #8A5F1C 100%) 1'
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="mb-2 sm:mb-4 md:mb-6">
                  <label 
                    className="block font-normal tracking-wide mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent"
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder=""
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none transition-colors resize-none text-[10px] sm:text-xs md:text-sm p-2 sm:p-3 h-12 sm:h-16 md:h-20 lg:h-24 border border-transparent"
                    style={{
                      borderImage: 'linear-gradient(180deg, #F5E34C 0%, #DDAB3C 22.84%, #8A5F1C 100%) 1'
                    }}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="font-bold tracking-wide transition-colors duration-200 hover:bg-green-700 flex items-center justify-center rounded px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-[10px] sm:text-xs md:text-sm bg-gradient-to-b from-[#016241] to-[#014d32]"
                  >
                    <span className="bg-gradient-to-b from-[#F5E34C] via-[#DDAB3C] to-[#8A5F1C] bg-clip-text text-transparent">
                      SEND
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
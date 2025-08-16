import React, { useState } from "react";

const EventRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    elixirId: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Full name is required";
        } else if (value.trim().length < 2) {
          error = "Full name must be at least 2 characters";
        }
        break;

      case "contactNumber":
        if (!value.trim()) {
          error = "Contact number is required";
        } else if (!/^\d{10}$/.test(value.trim())) {
          error = "Contact number must be exactly 10 digits";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (
          !/^\d+@(kiit\.ac\.in|kims\.ac\.in|kls\.ac\.in|ksom\.ac\.in|kiss\.ac\.in)$/.test(
            value.trim()
          )
        ) {
          error = "Please enter a valid email ID";
        }
        break;

      case "elixirId":
        if (!value.trim()) {
          error = "Elixir ID is required";
        } else if (value.trim().length < 3) {
          error = "Elixir ID must be at least 3 characters";
        }
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    // For contact number, only allow digits
    if (name === "contactNumber" && value && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (key !== "agreeTerms") {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Registration submitted successfully!");
      // Reset form after successful submission
      setFormData({
        fullName: "",
        contactNumber: "",
        email: "",
        elixirId: "",
        agreeTerms: false,
      });
      setErrors({});
    }
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() &&
      formData.contactNumber.trim() &&
      /^\d{10}$/.test(formData.contactNumber.trim()) &&
      formData.email.trim() &&
      /^\d+@(kiit\.ac\.in|kims\.ac\.in|kls\.ac\.in|ksom\.ac\.in|kiss\.ac\.in)$/.test(
        formData.email.trim()
      ) &&
      formData.elixirId.trim() &&
      formData.agreeTerms &&
      Object.keys(errors).every((key) => !errors[key])
    );
  };

  return (
    <div className="relative flex items-center justify-center w-full bg-black/0 "

    >
      {/* Image container */}
      <div className="relative max-w-2xl w-full hidden md:flex items-center justify-center md:min-h-[600px] bg-transparent">
        <img
          src="https://i.ibb.co/qMjzxJcd/download-70-removebg-preview-cleanup-1.png"
          alt="Decorative Frame"
          className="absolute inset-0 w-full h-full hidden md:block object-contain pointer-events-none select-none"
        />

        {/* Title */}
        <div className="absolute top-28 left-0 right-0 z-20 text-center px-4">
          <h1
            className="text-2xl font-bold uppercase tracking-widest text-white drop-shadow-lg"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Join The Event
          </h1>
        </div>

        {/* Form container */}
        <div className="relative z-10 flex justify-center h-full items-center w-full max-w-md mx-auto px-8 py-0 pt-0">
              <p className="relative text-3xl flex justify-center top-6 items-center">Registration Starting Soon!!</p>
        </div>
        {/* <div className="relative z-10 w-full max-w-md mx-auto px-8 py-12 pt-48">
          <div className="space-y-4">
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-1 ${
                    errors.fullName
                      ? "border-red-500 focus:border-red-400 focus:ring-red-400/50"
                      : "border-yellow-500/80 focus:border-yellow-300 focus:ring-yellow-400/50"
                  }`}
                  style={{ fontFamily: "Inria Serif, serif" }}
                  required
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  maxLength="10"
                  className={`w-full px-4 py-2 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-1 ${
                    errors.contactNumber
                      ? "border-red-500 focus:border-red-400 focus:ring-red-400/50"
                      : "border-yellow-500/80 focus:border-yellow-300 focus:ring-yellow-400/50"
                  }`}
                  style={{ fontFamily: "Inria Serif, serif" }}
                  required
                />
                {errors.contactNumber && (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    {errors.contactNumber}
                  </p>
                )}
              </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-1 ${
                    errors.email
                      ? "border-red-500 focus:border-red-400 focus:ring-red-400/50"
                      : "border-yellow-500/80 focus:border-yellow-300 focus:ring-yellow-400/50"
                  }`}
                  style={{ fontFamily: "Inria Serif, serif" }}
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="elixirId"
                  placeholder="Elixir ID"
                  value={formData.elixirId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-1 ${
                    errors.elixirId
                      ? "border-red-500 focus:border-red-400 focus:ring-red-400/50"
                      : "border-yellow-500/80 focus:border-yellow-300 focus:ring-yellow-400/50"
                  }`}
                  style={{ fontFamily: "Inria Serif, serif" }}
                  required
                />
                {errors.elixirId && (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    {errors.elixirId}
                  </p>
                )}
              </div>
            </div>

            
            <div className="flex items-start space-x-3 mt-12">
              <input
                type="checkbox"
                name="agreeTerms"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-yellow-500 bg-yellow-600/80 border-yellow-500/60 rounded focus:ring-yellow-400 focus:ring-1"
                required
              />
              <label
                htmlFor="agreeTerms"
                className="text-white text-sm leading-relaxed"
                style={{ fontFamily: "Inria Serif, serif" }}
              >
                I confirm that I am a KIIT student and agree to abide by the
                event rules and decisions.
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-red-400 text-xs mt-1 font-medium pl-7">
                {errors.agreeTerms}
              </p>
            )}

          
            <div className="flex justify-center mt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className="group disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-110 disabled:hover:scale-100 disabled:hover:translate-y-0 relative"
              >
                <img
                  src="https://i.ibb.co/C3kCrrPy/The-PNG-Stock-removebg-preview-1.png"
                  alt="Submit"
                  className={`h-32 w-auto transition-all duration-300 ${
                    isFormValid()
                      ? "hover:brightness-110 hover:drop-shadow-2xl filter drop-shadow-lg"
                      : "opacity-50 grayscale"
                  }`}
                />
                <span
                  className={`absolute inset-0 flex items-center justify-center text-white font-bold text-lg tracking-wider transition-all duration-300 ${
                    isFormValid() ? "opacity-100" : "opacity-30"
                  }`}
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  SUBMIT
                </span>
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden w-full max-w-sm mx-auto">
        {/* Mobile Title with gradient background */}
        <div className="text-center mb-8">
          <div className="relative">
            <h1
              className="text-2xl font-bold uppercase tracking-widest text-white drop-shadow-lg relative z-10 py-4"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Join The Event
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 via-yellow-500/30 to-yellow-600/20 rounded-lg blur-sm"></div>
          </div>
        </div>

        {/* Mobile Form */}
        <div className="bg-gradient-to-b from-gray-900/50 to-black/80 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30 shadow-2xl">
          <div>
            <p className="flex justify-center items-center">Registration Starting Soon!</p>
          </div>
          {/* <div className="space-y-4">

            <div className="space-y-4">
  
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? "border-red-500 focus:border-red-400 focus:ring-red-400/50"
                      : "border-yellow-500/80 focus:border-yellow-300 focus:ring-yellow-400/50"
                  }`}
                  style={{ fontFamily: "Inria Serif, serif" }}
                  required
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

  
              <div>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  maxLength="10"
                  className={`w-full px-4 py-3 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-2 ${
                    errors.contactNumber
                      ? "border-red-500 focus:border-red-400 focus:ring-red-400/50"
                      : "border-yellow-500/80 focus:border-yellow-300 focus:ring-yellow-400/50"
                  }`}
                  style={{ fontFamily: "Inria Serif, serif" }}
                  required
                />
                {errors.contactNumber && (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:border-red-400 focus:ring-red-400/50"
                      : "border-yellow-500/80 focus:border-yellow-300 focus:ring-yellow-400/50"
                  }`}
                  style={{ fontFamily: "Inria Serif, serif" }}
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    {errors.errors}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="elixirId"
                  placeholder="Elixir ID"
                  value={formData.elixirId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-2 ${
                    errors.elixirId
                      ? "border-red-500 focus:border-red-400 focus:ring-red-400/50"
                      : "border-yellow-500/80 focus:border-yellow-300 focus:ring-yellow-400/50"
                  }`}
                  style={{ fontFamily: "Inria Serif, serif" }}
                  required
                />
                {errors.elixirId && (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    {errors.elixirId}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3 mt-6">
              <input
                type="checkbox"
                name="agreeTerms"
                id="agreeTermsMobile"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-yellow-500 bg-yellow-600/80 border-yellow-500/60 rounded focus:ring-yellow-400 focus:ring-2 flex-shrink-0"
                required
              />
              <label
                htmlFor="agreeTermsMobile"
                className="text-white text-sm leading-relaxed"
                style={{ fontFamily: "Inria Serif, serif" }}
              >
                I confirm that I am a KIIT student and agree to abide by the
                event rules and decisions.
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-red-400 text-xs mt-1 font-medium pl-7">
                {errors.agreeTerms}
              </p>
            )}

            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className={`px-8 py-3 rounded-full font-bold text-lg tracking-wider transition-all duration-300 transform hover:scale-105 ${
                  isFormValid()
                    ? "bg-gradient-to-r from-yellow-600 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-400 hover:shadow-lg hover:shadow-yellow-500/25"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
                style={{ fontFamily: "Cinzel, serif" }}
              >
                SUBMIT
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
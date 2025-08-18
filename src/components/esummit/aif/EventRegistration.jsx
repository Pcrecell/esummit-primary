import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

const EventRegistration = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    elixirId: "",
    agreeTerms: false,
  });



  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);
  const [checkingRegistration, setCheckingRegistration] = useState(true);
  const { userData, setUserData, profile, setProfile, loading} = useAuth();
  const { toast, showError, showSuccess, hideToast } = useToast();

  const checkAlreadyRegistered = async (elixirId) => {
    if (!elixirId) {
      setCheckingRegistration(false);
      return;
    }
    
    setCheckingRegistration(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/aif/${encodeURIComponent(elixirId)}`
      );
      if (res.ok) {
        const data = await res.json();
        setAlreadyRegistered(true);
        setRegisteredData(data);
        // Populate form with existing data
        setFormData({
          fullName: data.name || "",
          contactNumber: data.phone || "",
          email: data.email || "",
          elixirId: data.elixir || elixirId,
          agreeTerms: false,
        });
      } else {
        setAlreadyRegistered(false);
        setRegisteredData(null);
        // Set elixirId from profile if available
        setFormData(prev => ({
          ...prev,
          elixirId: elixirId
        }));
      }
    } catch (err) {
      console.error("Error checking registration:", err);
      setAlreadyRegistered(false);
      setRegisteredData(null);
    } finally {
      setCheckingRegistration(false);
    }
  };


  useEffect(() => {
    if (profile?.elixir) {
      checkAlreadyRegistered(profile.elixir);
    }
  }, [profile?.elixir])

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

  const handleJoinDiscord = () => {
    // Replace with your actual Discord invite link
    const discordInviteLink = "https://discord.gg/ZFRdAcxay8";
    window.open(discordInviteLink, "_blank", "noopener,noreferrer");
    if (onJoinDiscord) onJoinDiscord();
  };

  const handleSubmit = async () => {
    if (alreadyRegistered) {
      showError("You are already registered for this event.");
      return;
    }

    if (validateForm()) {
      try {
        // Prepare data for API call
        const registrationData = {
          name: formData.fullName,
          email: formData.email,
          phone: formData.contactNumber,
          elixir: formData.elixirId,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/aif/aif_registration`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registrationData),
          }
        );

        const result = await response.json();

        if (response.ok) {
          // Reset form
          setFormData({
            fullName: "",
            contactNumber: "",
            email: "",
            elixirId: "",
            agreeTerms: false,
          });
          setErrors({});

          // Call the success callback to show registration success popup
          if (onRegistrationSuccess) {
            onRegistrationSuccess(formData);
          }
        } else {
          showError(result.message || "Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Registration error:", error);
        showError("An error occurred. Please try again.");
      }
    }
  };

  const handleDelete = async (elixirId) => {
    if(alreadyRegistered) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/aif/delete/${encodeURIComponent(elixirId)}`,
          {method: "DELETE"}
        );
        if (res.ok) {
          const data = await res.json();
          setAlreadyRegistered(false);
          setRegisteredData(null);
          // Populate form with existing data
          setFormData({
            fullName: "",
            contactNumber: "",
            email: "",
            elixirId: elixirId,
            agreeTerms: false,
          });
        } 
    } catch (err) {
      console.error("Error deleteing User:", err);
    } 
    }
  }

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

  // Show loading state while checking registration
  if (checkingRegistration) {
    return (
      <div className="relative flex items-center justify-center w-full bg-black/0 min-h-[400px]">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium">Checking registration status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-full bg-black/0 ">
      {/* Toast component */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      
      {/* Image container */}
      <div className="relative max-w-2xl w-full hidden md:flex items-center justify-center md:min-h-[600px] bg-transparent">
        <img
          src="https://i.ibb.co/qMjzxJcd/download-70-removebg-preview-cleanup-1.png"
          alt="Decorative Frame"
          className="absolute inset-0 w-full h-full hidden md:block object-contain pointer-events-none select-none"
        />

        {/* Title */}
        <div className={`absolute ${alreadyRegistered ? "top-33" : "top-28"} left-0 right-0 z-20 text-center px-4`}>
          <h1
            className="text-2xl font-bold uppercase tracking-widest text-white drop-shadow-lg"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            {alreadyRegistered ? "Already Registered" : "Join The Event"}
          </h1>
        </div>

        {/* Form container */}
        <div className="relative z-10 w-full max-w-md mx-auto px-8 py-12 pt-48">
          <div className="w-full h-full">
            {!alreadyRegistered ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-6">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={alreadyRegistered}
                      className={`w-full px-4 py-2 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-1 ${
                        alreadyRegistered 
                          ? "opacity-60 cursor-not-allowed" 
                          : errors.fullName
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
                      disabled={alreadyRegistered}
                      maxLength="10"
                      className={`w-full px-4 py-2 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-1 ${
                        alreadyRegistered 
                          ? "opacity-60 cursor-not-allowed" 
                          : errors.contactNumber
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
                      disabled={alreadyRegistered}
                      className={`w-full px-4 py-2 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-1 ${
                        alreadyRegistered 
                          ? "opacity-60 cursor-not-allowed" 
                          : errors.email
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
                      placeholder="UID"
                      value={formData.elixirId}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={alreadyRegistered}
                      className={`w-full px-4 py-2 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-1 ${
                        alreadyRegistered 
                          ? "opacity-60 cursor-not-allowed" 
                          : errors.elixirId
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

                
                <div className="flex justify-center -translate-y-7">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!isFormValid()}
                      className="group disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-110 disabled:hover:scale-100 disabled:hover:translate-y-0 relative"
                    >
                      <img
                        src="https://i.ibb.co/C3kCrrPy/The-PNG-Stock-removebg-preview-1.png"
                        alt="Submit"
                        className={`h-28 w-auto transition-all duration-300 ${
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
              ) :
              <div className="flex flex-col w-full items-center justify-start mb-24">
                <div>
                  <b>Name:</b> {registeredData.name}
                </div>
                <div>
                  <b>Email:</b> {registeredData.email}
                </div>
                <div>
                  <b>Phone:</b> {registeredData.phone}
                </div>
                <div>
                  <b>UID:</b> {registeredData.elixir}
                </div>
                <div>
                  <b>Registered At:</b> {new Date(registeredData.registeredAt).toLocaleString('en-US', {
                                          year: 'numeric',
                                          month: 'long', 
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                    })}
                </div>
                  <div className="mt-10 w-full flex flex-col gap-3 justify-center items-center">
                    <p className="text-center">Join our Discord server to participate in the event and for any queries or support.</p>
                    <button
                      onClick={handleJoinDiscord}
                      className="group transform transition-all duration-300 hover:scale-110 relative mb-6"
                    >
                      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-600 rounded-xl px-8 py-4 flex items-center space-x-3 shadow-lg hover:shadow-2xl transition-all duration-300">
                        {/* Discord icon */}
                        <svg
                          className="w-6 h-6 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                        <span
                          className="text-white font-bold text-lg tracking-wider"
                          style={{ fontFamily: "Cinzel, serif" }}
                        >
                          Join Discord
                        </span>
                      </div>
                    </button>
                  </div>
                  <div onClick={() => {
                    handleDelete(profile?.elixir);
                    router.refresh()
                  }}>
                    <p className="text-xs text-[#e5b913] -translate-y-2 underline cursor-pointer hover:text-[#b5971b] transition-colors duration-300">Unregister from this event</p>
                  </div>
              </div>     
            }
          </div>
        </div>
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
              {alreadyRegistered ? "Already Registered" : "Join The Event"}
            </h1>
            {alreadyRegistered && (
              <p className="text-yellow-400 text-sm mt-2 font-medium relative z-10">
                You have already registered for this event
              </p>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 via-yellow-500/30 to-yellow-600/20 rounded-lg blur-sm"></div>
          </div>
        </div>

        {/* Mobile Form */}
        <div className="bg-gradient-to-b from-gray-900/50 to-black/80 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30 shadow-2xl">
          <div className="space-y-4">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  disabled={alreadyRegistered}
                  className={`w-full px-4 py-3 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-2 ${
                    alreadyRegistered 
                      ? "opacity-60 cursor-not-allowed" 
                      : errors.fullName
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
                  disabled={alreadyRegistered}
                  maxLength="10"
                  className={`w-full px-4 py-3 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-2 ${
                    alreadyRegistered 
                      ? "opacity-60 cursor-not-allowed" 
                      : errors.contactNumber
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
                  disabled={alreadyRegistered}
                  className={`w-full px-4 py-3 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-2 ${
                    alreadyRegistered 
                      ? "opacity-60 cursor-not-allowed" 
                      : errors.email
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
                  placeholder="UID"
                  value={formData.elixirId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  disabled={alreadyRegistered}
                  className={`w-full px-4 py-3 bg-[#BCA13A] text-black placeholder-black/70 rounded-lg border transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-2 ${
                    alreadyRegistered 
                      ? "opacity-60 cursor-not-allowed" 
                      : errors.elixirId
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

            {!alreadyRegistered && (
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
            )}
            {errors.agreeTerms && (
              <p className="text-red-400 text-xs mt-1 font-medium pl-7">
                {errors.agreeTerms}
              </p>
            )}

            <div className="flex justify-center mt-8">
              {alreadyRegistered ? (
                <div>
                  <div className="text-center">
                    <div className="bg-green-600/20 border border-green-500/50 rounded-xl p-4 mb-4">
                      <p className="text-green-400 font-bold text-lg" style={{ fontFamily: "Cinzel, serif" }}>
                        ✓ ALREADY REGISTERED
                      </p>
                      <p className="text-green-300 text-sm mt-2">
                        Registration Date: {registeredData?.registeredAt ? new Date(registeredData.registeredAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long', 
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                      }) : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div onClick={() => {
                      handleDelete(profile?.elixir);
                      router.refresh()
                    }}>
                      <p className="text-xs text-[#e5b913] translate-x-22 underline cursor-pointer hover:text-[#b5971b] transition-colors duration-300">Unregister from this event</p>
                  </div>

                </div>
                
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EventRegistration;

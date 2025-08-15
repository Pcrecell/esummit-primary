"use client";
import React, { useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import { useRouter } from "next/navigation";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CreateTeamPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    elixirId: '',
    teamName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.elixirId.trim()) newErrors.elixirId = "Elixir ID is required";
    if (!formData.teamName.trim()) newErrors.teamName = "Team name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if form is invalid

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/oracle'); // Change to your desired route
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-2 ">
      <div 
        className="relative w-full max-w-full sm:max-w-sm md:max-w-lg lg:max-w-xl max-h-[90vh] rounded-xl sm:rounded-2xl shadow-2xl"
      >
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 overflow-auto rounded-xl sm:rounded-2xl"
          style={{
            backgroundImage: `url('https://i.postimg.cc/vmhtZ3Tt/KIITESUMMIT-POPUP-PAY-1.png')`,
            minHeight: "400px",
          }}
        >
          <h2 className={`${cormorantGaramond.className} text-3xl font-bold text-[#C0A869] md:mb-6 text-center`}>
            Create a Team
          </h2>

          <div className="flex flex-col gap-2 md:gap-4 items-center">
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 md:gap-4">
                <label className={`${cormorantGaramond.className} font-semibold text-white w-auto`}>
                  Your Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="flex-1 rounded md:px-3 md:py-2 bg-[#C0A869] text-black focus:outline-none"
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 md:gap-4">
                <label className={`${cormorantGaramond.className} font-semibold text-white w-auto`}>
                  Your Elixir ID:
                </label>
                <input
                  type="text"
                  name="elixirId"
                  value={formData.elixirId}
                  onChange={handleInputChange}
                  className="flex-1 rounded md:px-3 md:py-2 bg-[#C0A869] text-black focus:outline-none"
                  disabled={isSubmitting}
                />
              </div>
              {errors.elixirId && <p className="text-red-500 text-xs">{errors.elixirId}</p>}
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 md:gap-4">
                <label className={`${cormorantGaramond.className} font-semibold text-white w-auto`}>
                  Team Name:
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  className="flex-1 rounded md:px-3 md:py-2 bg-[#C0A869] text-black focus:outline-none"
                  disabled={isSubmitting}
                />
              </div>
              {errors.teamName && <p className="text-red-500 text-xs">{errors.teamName}</p>}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 w-full mt-2 md:mt-6">
            <button
              onClick={handleCreateTeam}
              disabled={isSubmitting}
              className="relative w-full max-w-[140px] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              <img
                src="https://i.postimg.cc/4xgHwDWF/KIITESUMMIT-POPUP-PAYButtoon.png"
                alt="Create Team"
                className="w-full rounded-md"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                {isSubmitting ? 'CREATING...' : 'CREATE TEAM'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamPage;

"use client";
import React, { useState, useEffect } from "react";
import { Cormorant_Garamond } from "next/font/google";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";


const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CreateTeamPage = () => {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    yourEid: "",
    teamName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { userData, setUserData, profile, setProfile, loading} = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!userData) {
        router.replace("/login");
        return; // Exit early to prevent further checks
      }
      
      if (!profile?.payment) {
        router.replace("/dashboard");
        return;
      }
    }
  }, [userData, profile, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-green-900 text-white text-2xl font-bold tracking-widest animate-pulse">
        Loading...
      </div>
    );
   }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.yourEid.trim()) newErrors.yourEid = "UID is required";
    if (!formData.teamName.trim()) newErrors.teamName = "Team name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // console.log("Submitting create team request with data:", formData);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oracle/oracle_registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          elixir: formData.yourEid.trim(),
          mode: "create_team",
          teamName: formData.teamName.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error creating team");
      }

      showSuccess(`${data.message} Your Team ID: ${data.teamId}`);

      // after successful create, move to oracle page
      router.push("/oracle");
    } catch (err) {
      console.error(err);
      showError(err.message || "Error creating team");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/90 p-2 ">
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

          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex items-center md:w-full">
              <div className="flex items-center gap-2 md:gap-4">
                <label className={`${cormorantGaramond.className} text-sm font-semibold text-white w-auto`}>
                  Your Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="flex-1 rounded md:px-3 md:py-2 bg-[#C0A869] text-black focus:outline-none"
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 md:gap-4">
                <label className={`${cormorantGaramond.className} text-sm font-semibold text-white w-auto`}>
                  Your UID:
                </label>
                <input
                  type="text"
                  name="UId"
                  value={formData.yourEid}
                  onChange={(e) => handleChange("yourEid", e.target.value)}
                  className="flex-1 rounded md:px-3 md:py-2 bg-[#C0A869] text-black focus:outline-none"
                  disabled={isSubmitting}
                />
              </div>
              {errors.UId && <p className="text-red-500 text-xs">{errors.UId}</p>}
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 md:gap-4">
                <label className={`${cormorantGaramond.className} text-sm font-semibold text-white w-auto`}>
                  Team Name:
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={(e) => handleChange("teamName", e.target.value)}
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
      <Toast />
    </div>
  );
};

export default CreateTeamPage;

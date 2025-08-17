"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import { useAuth } from "@/lib/context/AuthContext";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";


const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const JoinTeamPage = () => {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  // ✅ align with pandoras logic -> use formData instead of multiple states
  const [formData, setFormData] = useState({
    teamName: "",
    yourEid: "",
    teamLeadEid: "",
    teamId: "",
  });

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

  const validateForm = () => {
    let newErrors = {};
    if (!formData.teamName.trim()) newErrors.teamName = "Team Name is required.";
    if (!formData.yourEid.trim()) newErrors.yourEid = "Your UID is required.";
    if (!formData.teamLeadEid.trim()) newErrors.teamLeadEid = "Lead UID is required.";
    if (!formData.teamId.trim()) newErrors.teamId = "Team ID is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ aligned submit with fetch (pandoras style)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // console.log("Joining team:", formData);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oracle/oracle_registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.teamName.trim(), // using teamName as display name
          elixir: formData.yourEid.trim(),
          mode: "join_team",
          teamId: formData.teamId.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error joining team");
      }

      showSuccess(`${data.message} Joined Team ID: ${data.teamId}`);
      router.push("/success");
    } catch (err) {
      // console.error("Error joining team:", err);
      showError(err.message);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen backdrop-blur-sm bg-black/40 flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl 
                     max-h-[90vh] rounded-xl sm:rounded-2xl shadow-2xl">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain flex flex-col justify-center items-center px-8 py-6 overflow-auto rounded-xl sm:rounded-2xl"
          style={{
            backgroundImage: `url('https://i.postimg.cc/vmhtZ3Tt/KIITESUMMIT-POPUP-PAY-1.png')`,
            minHeight: "400px",
          }}
        >
          <h2 className={`${cormorantGaramond.className} md:text-3xl text-2xl font-bold text-[#C0A869] md:mb-2 text-center`}>
            Join a Team
          </h2>

          <form onSubmit={handleSubmit} className={`${cormorantGaramond.className} w-full max-w-sm md:space-y-3 space-y-1`}>
            <div className="flex flex-col">
              <div className="flex items-center md:w-full">
                <label className="text-white font-semibold text-sm w-32 text-left">
                  Team Name:
                </label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) => handleChange("teamName", e.target.value)}
                  className="flex-1 md:px-2 md:py-1.5 bg-[#AA9762] rounded text-gray-800"
                />
              </div>
              {errors.teamName && <span className="text-red-400 text-xs">{errors.teamName}</span>}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 md:w-full">
                <label className="text-white font-semibold text-sm w-32 text-left">
                  Your UID:
                </label>
                <input
                  type="text"
                  value={formData.yourEid}
                  onChange={(e) => handleChange("yourEid", e.target.value)}
                  className="flex-1 md:px-2 md:py-1.5 bg-[#AA9762] rounded text-gray-800 "
                />
              </div>
              {errors.yourUId && <span className="text-red-400 text-xs">{errors.yourUId}</span>}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 md:w-full">
                <label className="text-white font-semibold text-sm w-32 text-left">
                 Lead UID:
                </label>
                <input
                  type="text"
                  value={formData.teamLeadEid}
                  onChange={(e) => handleChange("teamLeadEid", e.target.value)}
                  className="flex-1 md:px-2 md:py-1.5 bg-[#AA9762] rounded text-gray-800 "
                />
              </div>
              {errors.teamLeadUId && <span className="text-red-400 text-xs">{errors.teamLeadUId}</span>}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 md:w-full">
                <label className="text-white font-semibold text-sm w-32 text-left">
                  Team ID:
                </label>
                <input
                  type="text"
                  value={formData.teamId}
                  onChange={(e) => handleChange("teamId", e.target.value)}
                  className="flex-1 md:px-2 md:py-1.5 bg-[#AA9762] rounded text-gray-800"
                />
              </div>
              {errors.teamId && <span className="text-red-400 text-xs">{errors.teamId}</span>}
            </div>

            <div className="flex justify-center ">
              <button
                type="submit"
                className="relative w-full max-w-[160px] 
                           cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                <img
                  src="https://i.postimg.cc/4xgHwDWF/KIITESUMMIT-POPUP-PAYButtoon.png"
                  alt="Join Team"
                  className="w-full rounded-md"
                />
                <span className="absolute inset-0 flex items-center justify-center 
                               text-white font-bold text-sm">
                  JOIN TEAM
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default JoinTeamPage;

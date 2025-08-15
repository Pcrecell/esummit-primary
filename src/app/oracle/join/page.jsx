"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const JoinTeamPage = () => {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [yourElixirId, setYourElixirId] = useState("");
  const [teamLeadElixirId, setTeamLeadElixirId] = useState("");
  const [teamId, setTeamId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Joining team:", { 
      teamName, 
      yourElixirId, 
      teamLeadElixirId, 
      teamId 
    });
    // Add your submission logic here
    router.push('/success'); // Redirect after submission
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl 
                     max-h-[90vh] rounded-xl sm:rounded-2xl shadow-2xl">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain flex flex-col justify-center items-center px-8 py-6 overflow-auto rounded-xl sm:rounded-2xl"
          style={{
            backgroundImage: `url('https://i.postimg.cc/vmhtZ3Tt/KIITESUMMIT-POPUP-PAY-1.png')`,
            minHeight: "400px",
          }}
        >
          {/* Title */}
          <h2 className={`${cormorantGaramond.className} text-3xl font-bold text-[#C0A869] md:mb-6 text-center`}>
            Join a Team
          </h2>

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="w-full max-w-sm md:space-y-3 space-y-1">
            {/* Team Name */}
            <div className="flex items-center gap-2 md:w-full">
              <label className="text-white font-semibold text-sm w-32 text-left">
                Team Name:
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="flex-1 md:px-2 md:py-1.5 bg-[#AA9762] rounded text-gray-800"
                required
              />
            </div>

            {/* Your Elixir ID */}
            <div className="flex items-center gap-2 md:w-full">
              <label className="text-white font-semibold text-sm w-32 text-left">
                Your Elixir ID:
              </label>
              <input
                type="text"
                value={yourElixirId}
                onChange={(e) => setYourElixirId(e.target.value)}
                className="flex-1 md:px-2 md:py-1.5 bg-[#AA9762] rounded text-gray-800 "
                required
              />
            </div>

            {/* Team Lead Elixir ID */}
            <div className="flex items-center gap-2 md:w-full">
              <label className="text-white font-semibold text-sm w-32 text-left">
               Lead Elixir ID:
              </label>
              <input
                type="text"
                value={teamLeadElixirId}
                onChange={(e) => setTeamLeadElixirId(e.target.value)}
                className="flex-1 md:px-2 md:py-1.5 bg-[#AA9762] rounded text-gray-800 "
                required
              />
            </div>

            {/* Team ID */}
            <div className="flex items-center gap-2 md:w-full">
              <label className="text-white font-semibold text-sm w-32 text-left">
                Team ID:
              </label>
              <input
                type="text"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className="flex-1 md:px-2 md:py-1.5 bg-[#AA9762] rounded text-gray-800"
                required
              />
            </div>

            {/* Submit Button */}
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
    </div>
  );
};

export default JoinTeamPage;
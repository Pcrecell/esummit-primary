"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import bgImage from "../../../../../public/images/hackathon/dashboard-bg.png";
import { useAuth } from "@/lib/context/AuthContext";

const Dashboard = () => {
  const [action, setAction] = useState("idle");
  const [selectedTrack, setSelectedTrack] = useState("beginner");

  const { userData, setUserData, profile, setProfile, loading} = useAuth();

  useEffect(() => {
      if (!loading) {
        if (!userData) {
          router.replace("/login");
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

  const [joinTeamData, setJoinTeamData] = useState({
    yourName: "",
    yourEid: "",
    teamName: "",
    teamId: "",
  });

  const [createTeamData, setCreateTeamData] = useState({
    yourName: "",
    yourElixer: "",
    teamName: "",
  });

  const [teammate1Name, setTeammate1Name] = useState("-");
  const [teammate1Id, setTeammate1Id] = useState("");
  const [teammate2Name, setTeammate2Name] = useState("-");
  const [teammate2Id, setTeammate2Id] = useState("");
  const [teammate3Name, setTeammate3Name] = useState("-");
  const [teammate3Id, setTeammate3Id] = useState("");
  const [teammate4Name, setTeammate4Name] = useState("-");
  const [teammate4Id, setTeammate4Id] = useState("");
  const [newTeammateName, setNewTeammateName] = useState("");
  const [newTeammateId, setNewTeammateId] = useState("");
  const [isAddingMember, setIsAddingMember] = useState(false);

  const [teamInfo, setTeamInfo] = useState({
    teamName: "Team",
    teamId: "Random Team ID",
    registered: false,
  });

  const members = [
    { name: teammate1Name, id: teammate1Id },
    { name: teammate2Name, id: teammate2Id },
    { name: teammate3Name, id: teammate3Id },
    { name: teammate4Name, id: teammate4Id },
  ];

  const handleJoinTeamChange = (field, value) => {
    setJoinTeamData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateTeamChange = (field, value) => {
    setCreateTeamData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackToInitial = () => {
    setAction("idle");
  };

  const handleSubmitJoin = () => {
    // Validation for joining a team
    if (
      !joinTeamData.yourName.trim() ||
      !joinTeamData.yourEid.trim() ||
      !joinTeamData.teamName.trim() ||
      !joinTeamData.teamId.trim()
    ) {
      alert("Please fill out all fields to join a team.");
      return; // Stop execution if validation fails
    }

    setTeamInfo((prev) => ({
      ...prev,
      teamName: joinTeamData.teamName || prev.teamName,
      teamId: joinTeamData.teamId || prev.teamId,
      registered: false,
    }));

    // if (joinTeamData.yourName && joinTeamData.yourEid) {
    //   setTeammate1Name(joinTeamData.yourName);
    //   setTeammate1Id(joinTeamData.yourEid);
    // }

    setAction("details");
  };

  const handleSubmitCreate = () => {
    // Validation for creating a team
    if (
      !createTeamData.yourName.trim() ||
      !createTeamData.yourElixer.trim() ||
      !createTeamData.teamName.trim()
    ) {
      alert("Please fill out all fields to create a team.");
      return; // Stop execution if validation fails
    }

    setTeamInfo((prev) => ({
      ...prev,
      teamName: createTeamData.teamName || prev.teamName,
      teamId: prev.teamId,
      registered: false,
    }));

    // Don't automatically add the team creator as a teammate
    // The teammates list will remain empty initially

    setAction("details");
  };

  const handleAddMemberButton = async () => {
    if (!newTeammateName.trim() || !newTeammateId.trim()) {
      alert("Please fill in both name and ID fields");
      return;
    }

    // Check if team is full
    const filledSlots = members.filter((member) => member.name !== "-").length;
    if (filledSlots >= 4) {
      alert("Team is full! Maximum 4 members allowed.");
      return;
    }

    setIsAddingMember(true);

    try {
      // Prepare data for API call
      const memberData = {
        name: newTeammateName.trim(),
        elixirId: newTeammateId.trim(),
        teamName: teamInfo.teamName,
        teamId: teamInfo.teamId,
      };

      // Make API call
      const response = await axios.post("/users/add-member", memberData, {
        headers: {
          "Content-Type": "application/json",
        },
      });


      // Find the first empty slot and add the new teammate
      if (teammate1Name === "-") {
        setTeammate1Name(newTeammateName);
        setTeammate1Id(newTeammateId);
      } else if (teammate2Name === "-") {
        setTeammate2Name(newTeammateName);
        setTeammate2Id(newTeammateId);
      } else if (teammate3Name === "-") {
        setTeammate3Name(newTeammateName);
        setTeammate3Id(newTeammateId);
      } else if (teammate4Name === "-") {
        setTeammate4Name(newTeammateName);
        setTeammate4Id(newTeammateId);
      }

      // Clear the form fields
      setNewTeammateName("");
      setNewTeammateId("");

      // Show success message (optional)
      alert("Member added successfully!");
    } catch (error) {
      console.error("Error adding member:", error);

      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        alert(`Error: ${error.response.data.message || "Failed to add member"}`);
      } else if (error.request) {
        // Request was made but no response received
        alert("Network error: Please check your connection and try again");
      } else {
        // Something else happened
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsAddingMember(false);
    }
  };

  return (
    <section
      id="dashboard"
      className="relative min-h-[100vh] md:min-h-[120vh] flex flex-col items-center text-white overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt="Dashboard Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Bottom black gradient overlay*/}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      {/* Top black gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-44 bg-gradient-to-b from-black via-black/80 to-transparent z-10" />

      {/* Greeting (top-left) */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-6 md:left-20 z-20 select-none">
        <div className="text-sm sm:text-base md:text-2xl font-mono text-white/90">Hey,</div>
        <div className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-mono font-extrabold text-green-400 drop-shadow">
          Saksham
        </div>
      </div>

      {/* Track toggle (always visible) */}
      <div className="absolute top-20 md:top-24 sm:top-30 right-4 sm:right-8 md:right-12 z-20">
        <div className="flex items-center gap-1 sm:gap-2 rounded-full bg-black/40 border border-green-400/60 px-1 sm:px-2 md:px-1 py-1 shadow-lg backdrop-blur">
          <button
            onClick={() => setSelectedTrack("beginner")}
            className={`${
              selectedTrack === "beginner"
                ? "bg-green-600/90 text-white"
                : "text-green-200 hover:bg-white/5"
            } px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-mono font-bold transition-colors`}
          >
            Beginner
          </button>
          <button
            onClick={() => setSelectedTrack("advanced")}
            className={`${
              selectedTrack === "advanced"
                ? "bg-green-600/90 text-white"
                : "text-green-200 hover:bg-white/5"
            } px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-mono font-bold transition-colors`}
          >
            Advanced
          </button>
        </div>
      </div>

      {/* Center actions and content */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto flex flex-col items-center transition-all duration-700 ease-in-out ${
          action === "idle"
            ? "mt-[50vh]"
            : "mt-30 md:mt-24 sm:mt-32 xl:mt-40 pt-8 sm:pt-12"
        }`}
      >
        {/* Join / Create buttons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 w-full">
          <button
            onClick={() => setAction("join")}
            className={`${
              action === "join"
                ? "ring-2 ring-green-400/60"
                : "hover:bg-white/5"
            } px-4 sm:px-6 md:px-8 py-2 rounded-full border-2 border-green-400/60 text-white font-mono font-bold text-xs sm:text-sm backdrop-blur flex-1 max-w-[120px] sm:max-w-none`}
          >
            JOIN TEAM
          </button>
          <button
            onClick={() => setAction("create")}
            className={`${
              action === "create"
                ? "bg-green-600/90"
                : "bg-green-700/70 hover:bg-green-600/80"
            } px-4 sm:px-6 md:px-8 py-2 rounded-full border-2 border-green-400/60 text-white font-mono font-bold text-xs sm:text-sm shadow flex-1 max-w-[120px] sm:max-w-none`}
          >
            CREATE TEAM
          </button>
        </div>

        {/* Dynamic content under buttons with fade in/out */}
        <div
          className={`relative w-full mx-auto transition-all duration-300 ${
            action === "join" || action === "create"
              ? "min-h-[300px] sm:min-h-[360px]"
              : "min-h-0 h-0 overflow-hidden"
          }`}
        >
          {/* Join card */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              action === "join"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="w-full bg-black/40 border-2 border-green-400/60 rounded-lg p-4 sm:p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono font-bold text-white text-sm sm:text-base">
                  Join a Team
                </h3>
                <button
                  onClick={handleBackToInitial}
                  className="text-white/80 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/90 text-xs sm:text-sm font-mono mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={joinTeamData.yourName}
                    onChange={(e) =>
                      handleJoinTeamChange("yourName", e.target.value)
                    }
                    className="placeholder-gray-700 w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                    placeholder="ENTER YOUR NAME"
                  />
                </div>
                <div>
                  <label className="block text-white/90 text-xs sm:text-sm font-mono mb-2">
                    Your UID
                  </label>
                  <input
                    type="text"
                    value={joinTeamData.yourEid}
                    onChange={(e) =>
                      handleJoinTeamChange("yourEid", e.target.value)
                    }
                    className="placeholder-gray-700 w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                    placeholder="Enter UID"
                  />
                </div>
                <div>
                  <label className="block text-white/90 text-xs sm:text-sm font-mono mb-2">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={joinTeamData.teamName}
                    onChange={(e) =>
                      handleJoinTeamChange("teamName", e.target.value)
                    }
                    className="placeholder-gray-700 w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                    placeholder="Enter team name"
                  />
                </div>
                <div>
                  <label className="block text-white/90 text-xs sm:text-sm font-mono mb-2">
                    Team ID
                  </label>
                  <input
                    type="text"
                    value={joinTeamData.teamId}
                    onChange={(e) =>
                      handleJoinTeamChange("teamId", e.target.value)
                    }
                    className="placeholder-gray-700 w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                    placeholder="Enter Team ID"
                  />
                </div>
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleSubmitJoin}
                    className="bg-green-600/90 hover:bg-green-500 border-2 border-green-400/60 px-6 sm:px-8 py-2 rounded-md font-mono font-bold text-white text-xs sm:text-sm transition-all"
                  >
                    JOIN TEAM
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Create card */}
          <div
            className={`absolute inset-0  ${
              action === "create"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="w-full bg-black/10 border-2 border-green-400/60 transition-all duration-500 ease-out rounded-lg p-4 sm:p-6 backdrop-blur-md max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono font-bold text-white text-center text-sm sm:text-base">
                  Do you want to create your own paradox?
                </h3>
                <button
                  onClick={handleBackToInitial}
                  className="text-white/80 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/90 text-xs sm:text-sm font-mono mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={createTeamData.yourName}
                    onChange={(e) =>
                      handleCreateTeamChange("yourName", e.target.value)
                    }
                    className="placeholder-gray-700 w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                    placeholder="ENTER YOUR NAME"
                  />
                </div>
                <div>
                  <label className="block text-white/90 text-xs sm:text-sm font-mono mb-2">
                    YOUR UID
                  </label>
                  <input
                    type="text"
                    value={createTeamData.yourElixer}
                    onChange={(e) =>
                      handleCreateTeamChange("yourElixer", e.target.value)
                    }
                    className="placeholder-gray-700 w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                    placeholder="ENTER YOUR UID"
                  />
                </div>
                <div>
                  <label className="block text-white/90 text-xs sm:text-sm font-mono mb-2">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={createTeamData.teamName}
                    onChange={(e) =>
                      handleCreateTeamChange("teamName", e.target.value)
                    }
                    className="placeholder-gray-700 w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                    placeholder="ENTER TEAM NAME"
                  />
                </div>
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleSubmitCreate}
                    className="bg-green-600/90 hover:bg-green-500 border-2 border-green-400/60 px-6 sm:px-8 py-2 rounded-md font-mono font-bold text-white text-xs sm:text-sm transition-all"
                  >
                    CREATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {action === "details" && (
          <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Left side - Team details */}
            <div className="lg:w-1/2 space-y-6">
              {/* Team Name Title */}
              <div className="text-left">
                <h2 className="text-2xl md:text-4xl font-mono font-bold text-white tracking-wider">
                  {teamInfo.teamName}
                </h2>
              </div>

              {/* Your Teammates Section */}
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-mono font-bold text-white">
                  Your Teammates
                </h3>

                <div className="space-y-3">
                  {members.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-white font-mono"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-green-400 font-bold text-lg">
                          {member.name}
                        </span>
                        {member.id && (
                          <span className="text-white/80 text-sm">
                            {member.id}
                          </span>
                        )}
                      </div>
                      <span className="text-white/60 text-sm">-</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Add teammate form */}
            <div className="lg:w-1/2">
              <div className="bg-black/40 border-2 border-green-400/60 rounded-lg p-6 backdrop-blur-md">
                <div className="text-center mb-6">
                  <h3 className="font-mono font-bold text-white text-lg">
                    Add Members to your team
                  </h3>
                  <p className="text-white/80 font-mono text-sm mt-2">
                    A minimum of 3 players are requied to register your team
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white/90 text-sm font-mono mb-2 tracking-wider">
                      YOUR TEAMMATE NAME:
                    </label>
                    <input
                      type="text"
                      value={newTeammateName}
                      onChange={(e) => setNewTeammateName(e.target.value)}
                      className="placeholder-gray-700 w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-3 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                      placeholder="ENTER TEAMMATE'S NAME"
                      disabled={isAddingMember}
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-mono mb-2 tracking-wider">
                      YOUR TEAMMATE UID:
                    </label>
                    <input
                      type="text"
                      value={newTeammateId}
                      onChange={(e) => setNewTeammateId(e.target.value)}
                      className="placeholder-gray-700 w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-3 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                      placeholder="ENTER YOUR TEAMMATE'S UID"
                      disabled={isAddingMember}
                    />
                  </div>
                  {/* Add Member Button */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleAddMemberButton}
                      disabled={isAddingMember}
                      className={`${
                        isAddingMember
                          ? "bg-gray-600/90 cursor-not-allowed"
                          : "bg-green-600/90 hover:bg-green-500"
                      } border-2 border-green-400/60 px-6 py-2 rounded-md font-mono font-bold text-white text-sm transition-all flex items-center gap-2`}
                    >
                      {isAddingMember ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          ADDING...
                        </>
                      ) : (
                        "+ ADD MEMBER"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {action === "registered" && (
          <div className="w-full bg-green-600/90 border-2 border-green-400/60 rounded-lg p-4 sm:p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono font-bold text-white text-sm sm:text-base">
                Registration Complete
              </h3>
              <button
                onClick={handleBackToInitial}
                className="text-white/90 hover:text-white text-xl"
              >
                ×
              </button>
            </div>
            <p className="font-mono text-white text-xs sm:text-sm leading-relaxed">
              Your team <span className="font-bold">{teamInfo.teamName}</span> is
              successfully registered. Team ID:{" "}
              <span className="font-bold">{teamInfo.teamId}</span>
            </p>
          </div>
        )}
      </div>

      {/* Register Button */}
      {action === "details" && (
        <div className="pt-8 left-1/2 transform  z-30">
          <button
            disabled={members.filter(member => member.name !== "-").length < 2}
            className={`px-8 py-3 rounded-full font-mono font-bold text-lg transition-all duration-300 ${
              members.filter(member => member.name !== "-").length >= 2
                ? "bg-green-600/90 hover:bg-green-500 border-2 border-green-400/60 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-600/50 border-2 border-gray-500/50 text-gray-400 cursor-not-allowed"
            }`}
          >
            REGISTER TEAM
          </button>
        </div>
      )}

      {/* Small helper text showing selected track */}
      <div className="absolute md:bottom-20 right-4 sm:right-8 text-lg sm:text-2xl md:text-3xl text-right text-green-400/70 font-mono z-20">
        {selectedTrack === "beginner" ? "Beginner" : "Advanced"}
      </div>

      <style jsx>{`
        @keyframes matrixRain {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        .matrix-char {
          animation: matrixRain 3s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default Dashboard;
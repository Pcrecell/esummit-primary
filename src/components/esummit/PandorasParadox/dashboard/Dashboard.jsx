"use client";

import React, { useState } from "react";
import Image from "next/image";
import bgImage from "../../../../../public/images/hackathon/dashboard-bg.png";

const Dashboard = () => {
  // action: 'idle' | 'join' | 'create' | 'details' | 'registered'
  const [action, setAction] = useState("idle");
  const [selectedTrack, setSelectedTrack] = useState("beginner");

  const [joinTeamData, setJoinTeamData] = useState({
    teamName: "",
    teamId: "",
  });

  const [createTeamData, setCreateTeamData] = useState({
    teamName: "",
    teammates: ["", "", "", "", ""],
  });

  const [teamInfo, setTeamInfo] = useState({
    teamName: "Never Store",
    teamId: "PP-7N2K3",
    members: [
      { name: "You", role: "Leader" },
      { name: "Member 2", role: "Member" },
      { name: "Member 3", role: "Member" },
      { name: "Member 4", role: "Member" },
      { name: "Member 5", role: "Member" },
    ],
    registered: false,
  });

  const handleJoinTeamChange = (field, value) => {
    setJoinTeamData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateTeamChange = (field, value) => {
    if (field === "teamName") {
      setCreateTeamData((prev) => ({ ...prev, teamName: value }));
    }
  };

  const handleTeammateChange = (index, value) => {
    setCreateTeamData((prev) => ({
      ...prev,
      teammates: prev.teammates.map((teammate, i) =>
        i === index ? value : teammate
      ),
    }));
  };

  const handleBackToInitial = () => {
    setAction("idle");
  };

  const handleSubmitJoin = () => {
    setTeamInfo((prev) => ({
      ...prev,
      teamName: joinTeamData.teamName || prev.teamName,
      teamId: joinTeamData.teamId || prev.teamId,
      registered: false,
    }));
    setAction("details");
  };

  const handleSubmitCreate = () => {
    setTeamInfo((prev) => ({
      ...prev,
      teamName: createTeamData.teamName || prev.teamName,
      teamId: prev.teamId,
      registered: false,
    }));
    setAction("details");
  };

  const handleRegister = () => {
    setTeamInfo((prev) => ({ ...prev, registered: true }));
    setAction("registered");
  };

  return (
    <section
      id="dashboard"
      className="relative min-h-screen flex flex-col items-center text-white overflow-hidden"
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
      <div className="absolute top-20 left-6 md:left-20 z-20 select-none">
        <div className="text-base md:text-2xl font-mono text-white/90">Hey,</div>
        <div className="text-2xl md:text-6xl font-mono font-extrabold text-green-400 drop-shadow">
          Saksham
        </div>
      </div>

      {/* Track toggle (always visible) */}
      <div className="absolute top-30 right-0 md:-translate-x-1/2 z-20">
        <div className="flex items-center gap-2 rounded-full bg-black/40 border border-green-400/60 px-1 md:px-15 py-1 shadow-lg backdrop-blur">
          <button
            onClick={() => setSelectedTrack("beginner")}
            className={`${selectedTrack === "beginner"
                ? "bg-green-600/90 text-white"
                : "text-green-200 hover:bg-white/5"
              } px-6 py-2 rounded-full text-sm font-mono font-bold transition-colors`}
          >
            Beginner
          </button>
          <button
            onClick={() => setSelectedTrack("advanced")}
            className={`${selectedTrack === "advanced"
                ? "bg-green-600/90 text-white"
                : "text-green-200 hover:bg-white/5"
              } px-6 py-2 rounded-full text-sm font-mono font-bold transition-colors`}
          >
            Advanced
          </button>
        </div>
      </div>

      {/* Center actions and content */}
      <div
        className={`relative z-20 w-full max-w-xl md:max-w-2xl pb-10 mx-auto flex flex-col items-center transition-all duration-700 ease-in-out ${action === "idle" ? "mt-[30vh]" : "mt-0 pt-30"
          }`}
      >
        {/* Join / Create buttons */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <button
            onClick={() => setAction("join")}
            className={`${action === "join"
                ? "ring-2 ring-green-400/60"
                : "hover:bg-white/5"
              } px-6 md:px-8 py-2 rounded-full border-2 border-green-400/60 text-white font-mono font-bold text-xs md:text-sm backdrop-blur`}
          >
            JOIN TEAM
          </button>
          <button
            onClick={() => setAction("create")}
            className={`${action === "create"
                ? "bg-green-600/90"
                : "bg-green-700/70 hover:bg-green-600/80"
              } px-6 md:px-8 py-2 rounded-full border-2 border-green-400/60 text-white font-mono font-bold text-xs md:text-sm shadow`}
          >
            CREATE TEAM
          </button>
        </div>

        {/* Dynamic content under buttons with fade in/out */}
        <div
          className={`relative w-full max-w-lg mx-auto transition-all duration-300 ${action === "join" || action === "create" ? "min-h-[360px]" : "min-h-0 h-0 overflow-hidden"
            }`}
        >
          {/* Join card */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-out ${action === "join"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
          >
            <div className="w-full h-full bg-black/40 border-2 border-green-400/60 rounded-lg p-4 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono font-bold text-white">Join a Team</h3>
                <button
                  onClick={handleBackToInitial}
                  className="text-white/80 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-white/90 text-sm font-mono mb-1">Team Name</label>
                  <input
                    type="text"
                    value={joinTeamData.teamName}
                    onChange={(e) => handleJoinTeamChange("teamName", e.target.value)}
                    className="w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                    placeholder="Enter team name"
                  />
                </div>
                <div>
                  <label className="block text-white/90 text-sm font-mono mb-1">Team ID</label>
                  <input
                    type="text"
                    value={joinTeamData.teamId}
                    onChange={(e) => handleJoinTeamChange("teamId", e.target.value)}
                    className="w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                    placeholder="Enter team ID"
                  />
                </div>
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleSubmitJoin}
                    className="bg-green-600/90 hover:bg-green-500 border-2 border-green-400/60 px-8 py-2 rounded-md font-mono font-bold text-white text-sm transition-all"
                  >
                    JOIN TEAM
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Create card */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-out ${action === "create"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
          >
            <div className="w-full h-full bg-black/40 border-2 border-green-400/60 rounded-lg p-4 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono font-bold text-white">Create your Team</h3>
                <button
                  onClick={handleBackToInitial}
                  className="text-white/80 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-white/90 text-sm font-mono mb-1">Team Name</label>
                  <input
                    type="text"
                    value={createTeamData.teamName}
                    onChange={(e) => handleCreateTeamChange("teamName", e.target.value)}
                    className="w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                    placeholder="Enter team name"
                  />
                </div>
                <div>
                  <label className="block text-white/90 text-sm font-mono mb-1">Teammates E-ID</label>
                  <div className="space-y-2">
                    {createTeamData.teammates.map((teammate, index) => (
                      <input
                        key={index}
                        type="text"
                        value={teammate}
                        onChange={(e) => handleTeammateChange(index, e.target.value)}
                        className="w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                        placeholder={`Teammate ${index + 1} E-ID`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleSubmitCreate}
                    className="bg-green-600/90 hover:bg-green-500 border-2 border-green-400/60 px-8 py-2 rounded-md font-mono font-bold text-white text-sm transition-all"
                  >
                    CREATE TEAM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {action === "details" && (
          <div className="w-full max-w-lg bg-black/40 border-2 border-green-400/60 rounded-lg p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono font-bold text-white">Team Details</h3>
              <button
                onClick={handleBackToInitial}
                className="text-white/80 hover:text-white text-xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-white/90 font-mono">Team Name:</div>
                <div className="text-black/90 bg-green-100/90 border-2 border-green-600/50 rounded px-2 py-1">
                  {teamInfo.teamName}
                </div>
                <div className="text-white/90 font-mono">Team ID:</div>
                <div className="text-black/90 bg-green-100/90 border-2 border-green-600/50 rounded px-2 py-1">
                  {teamInfo.teamId}
                </div>
              </div>
              <div>
                <div className="text-white/90 font-mono mb-1">Members</div>
                <div className="grid grid-cols-1 gap-1">
                  {teamInfo.members.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-green-100/90 border-2 border-green-600/50 rounded px-2 py-1 text-gray-900"
                    >
                      <span>{m.name}</span>
                      <span className="text-green-800 font-semibold">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 pt-1">
                <button
                  onClick={handleRegister}
                  className="bg-green-600/90 hover:bg-green-500 border-2 border-green-400/60 px-6 py-2 rounded-md font-mono font-bold text-white transition-all"
                >
                  REGISTER TEAM
                </button>
                <button className="bg-transparent hover:bg-white/10 border-2 border-green-400/60 px-6 py-2 rounded-md font-mono font-bold text-white transition-all">
                  LEAVE TEAM
                </button>
              </div>
            </div>
          </div>
        )}

        {action === "registered" && (
          <div className="w-full max-w-lg bg-green-600/90 border-2 border-green-400/60 rounded-lg p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono font-bold text-white">Registration Complete</h3>
              <button
                onClick={handleBackToInitial}
                className="text-white/90 hover:text-white text-xl"
              >
                ×
              </button>
            </div>
            <p className="font-mono text-white text-sm">
              Your team <span className="font-bold">{teamInfo.teamName}</span> is
              successfully registered. Team ID: <span className="font-bold">{teamInfo.teamId}</span>
            </p>
          </div>
        )}

        
      </div>
      {/* Small helper text showing selected track */}
      <div className="text-3xl text-right text-yellow-200/90 font-mono">
          {selectedTrack === "beginner" ? "Beginner" : "Advanced"}
        </div>

      <style jsx>{`
        @keyframes matrixRain {
          0% { transform: translateY(-100vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .matrix-char {
          animation: matrixRain 3s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default Dashboard;
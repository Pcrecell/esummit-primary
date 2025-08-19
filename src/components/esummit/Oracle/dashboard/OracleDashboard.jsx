"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";
import TeamHeader from "@/components/shared/disbandButton";

const OracleDashboard = () => {
  const router = useRouter();
  const { userData, profile, loading } = useAuth();
  const paymentDone = profile?.payment;
    const handleDisbandTeam = async () => {
      // Multiple validations before disbanding
      if (!profile?.elixir) {
        showError("Authentication required");
        return;
      }
      
      if (teamInfo.leaderId !== profile.elixir) {
        showError("Only team leader can disband the team.");
        return;
      }
  
      if (!teamInfo.teamId) {
        showError("No team found to disband");
        return;
      }
  

  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oracle/disband-team`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leaderelixir: profile.elixir,
          }),
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to disband team");
        }
  
        showSuccess("Team disbanded successfully");
        router.replace("/oracle"); // Redirect to Oracle page after disbanding
      } catch (error) {
        console.error("Error disbanding team:", error);
        showError(error.message || "Failed to disband team");
      }
    };


  const [teamInfo, setTeamInfo] = useState({
    teamName: "",
    teamId: "",
    leaderId: "",
    members: []
  });
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEid, setNewMemberEid] = useState("");

  const { toast, showSuccess, showError } = useToast();

  const fetchTeamInfo = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oracle/team-info/${profile.elixir}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setTeamInfo(data);
    } catch (error) {
      console.error("Error fetching team info:", error);
      showError("Failed to load team information. Please refresh the page.");
    }
  };

  const handleAddMember = async () => {
    if (!newMemberName.trim() || !newMemberEid.trim()) {
      showError("Please fill in both member name and UID");
      return;
    }

    setIsAddingMember(true);
    try {
      // Check if member is in the team already
      if (teamInfo.members.some(member => member.elixir === newMemberEid.trim())) {
        throw new Error("This member is already in your team");
      }

      // Check if member is already registered in another event
      if (userData.isEventRegistered && userData.eventName !== "oracle") {
        throw new Error(`This user is already registered for ${userData.eventName}. Cannot add to Oracle.`);
      }

      // If validation passes, proceed with adding the member
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oracle/add-member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leaderelixir: profile.elixir,
          name: newMemberName.trim(),
          elixir: newMemberEid.trim(),
        }),
      });

      const data = await response.json();

      if (!response.status === 200) {
        showError(data.message || "Failed to add team member");
        return;
      }

      showSuccess(`Successfully added ${newMemberName} to the team`);
      setNewMemberName("");
      setNewMemberEid("");
      await fetchTeamInfo(); // Refresh team info
    } catch (error) {
      console.error("Error adding member:", error);
      showError(error.message || "Failed to add team member. Please try again.");
    } finally {
      setIsAddingMember(false);
    }
  };

  const handleRemoveMember = async (memberElixir, memberName) => {
    try {
      showSuccess("Please confirm to remove " + memberName, null, true);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay for toast to show

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oracle/remove-member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leaderelixir: profile.elixir,
          memberelixir: memberElixir,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove team member");
      }

      showSuccess(`Successfully removed ${memberName} from the team`);
      await fetchTeamInfo(); // Refresh team info
    } catch (error) {
      console.error("Error removing member:", error);
      showError(error.message || "Failed to remove team member. Please try again.");
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!userData) {
        router.replace("/login");
        return;
      }
      if (!paymentDone) {
        router.replace("/dashboard");
        return;
      }
    }
    if (userData && paymentDone) {
      if (profile?.elixir) {
        fetchTeamInfo();
      }
    }
  }, [userData, paymentDone, loading, router, profile?.elixir]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-green-900 text-white text-2xl font-bold tracking-widest animate-pulse">
        Loading...
      </div>
    );
  }

  if (!userData || !paymentDone) {
    return null;
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center text-white overflow-hidden px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <button
        onClick={() => router.push("/oracle")}
        className="absolute top-4 left-4 z-30 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
            clipRule="evenodd" 
          />
        </svg>
        <span className="font-mono text-sm">Back</span>
      </button>

      {/* Greeting (top-left) */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-6 md:left-20 z-20 select-none">
        <div className="text-sm sm:text-base md:text-2xl font-mono text-white/90">
          Hey,
        </div>
        <div className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-mono font-extrabold text-green-400 drop-shadow">
          {profile?.firstname || "Participant"}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto mt-32">
        {teamInfo.teamId ? (
          <div className="bg-black/40 border-2 border-green-400/60 rounded-lg p-6 backdrop-blur-md">
            <div className="space-y-6">
              {/* Team Information */}
              <TeamHeader
                teamInfo={teamInfo}
                onDisband={() => handleDisbandTeam()}
              />


              {/* Team Members */}
              <div className="space-y-8">
                {/* Team Members List */}
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-mono font-bold text-white">
                    Team Members
                  </h3>
                  <div className="space-y-3">
                    {teamInfo.members.map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-black/30 p-4 rounded-lg border border-green-400/30"
                      >
                        <div className="flex flex-col">
                          <span className="text-green-400 font-mono font-bold">
                            {member.name}
                          </span>
                          <span className="text-white/60 font-mono text-sm">
                            UID: {member.elixir}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {member.elixir === teamInfo.leaderId && (
                            <span className="bg-green-600/50 px-3 py-1 rounded-full text-xs font-mono">
                              Team Leader
                            </span>
                          )}
                          {profile?.elixir === teamInfo.leaderId && member.elixir !== teamInfo.leaderId && (
                            <button
                              onClick={() => handleRemoveMember(member.elixir, member.name)}
                              className="bg-red-600/80 hover:bg-red-500 border border-red-400/60 px-3 py-1 rounded text-white text-xs font-mono"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Member Form - Only visible to team leader */}
                {profile?.elixir === teamInfo.leaderId && teamInfo.members.length < 5 && (
                  <div className="bg-black/30 p-6 rounded-lg border border-green-400/30 space-y-4">
                    <h3 className="text-lg font-mono font-bold text-white">
                      Add Team Member
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/90 text-sm font-mono mb-2">
                          Member Name
                        </label>
                        <input
                          type="text"
                          value={newMemberName}
                          onChange={(e) => setNewMemberName(e.target.value)}
                          className="w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                          placeholder="Enter member's name"
                          disabled={isAddingMember}
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-mono mb-2">
                          Member UID
                        </label>
                        <input
                          type="text"
                          value={newMemberEid}
                          onChange={(e) => setNewMemberEid(e.target.value)}
                          className="w-full bg-green-100/90 border-2 border-green-600/50 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 font-mono text-sm"
                          placeholder="Enter member's UID"
                          disabled={isAddingMember}
                        />
                      </div>
                      <button
                        onClick={handleAddMember}
                        disabled={isAddingMember}
                        className={`w-full ${
                          isAddingMember
                            ? "bg-gray-600/90 cursor-not-allowed"
                            : "bg-green-600/90 hover:bg-green-500"
                        } border-2 border-green-400/60 py-2 rounded-md font-mono font-bold text-white text-sm transition-all flex items-center justify-center gap-2`}
                      >
                        {isAddingMember ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Adding Member...
                          </>
                        ) : (
                          "Add Member"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-black/40 border-2 border-green-400/60 rounded-lg p-6 backdrop-blur-md text-center">
            <p className="text-lg font-mono text-white/90">
              You haven&apos;t joined or created a team yet.
            </p>
            <div className="mt-6">
              <button
                onClick={() => router.push("/oracle")}
                className="bg-green-600/90 hover:bg-green-500 border-2 border-green-400/60 px-6 py-2 rounded-md font-mono font-bold text-white text-sm transition-all"
              >
                Join or Create Team
              </button>
            </div>
          </div>
        )}
      </div>

      {toast && <Toast />}
    </section>
  );
};

export default OracleDashboard;

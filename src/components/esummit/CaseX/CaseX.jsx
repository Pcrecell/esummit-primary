"use client";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";

export default function CaseX() {
    const router = useRouter();
    const { userData, profile, loading } = useAuth();
    const { toast, showSuccess, showError, hideToast } = useToast();
    const paymentDone = profile?.payment;

    // Popup & tab UI state
    const [showPopup, setShowPopup] = useState(false);
    const [activeTab, setActiveTab] = useState("join"); // 'join' or 'create'


    // Carousel state
    const [evalIndex, setEvalIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const touchStartX = useRef(null);
    const slidesRef = useRef(null);

    // Team management state (REAL data from backend)
    const [action, setAction] = useState("idle");
    const [formData, setFormData] = useState({
        name: "",
        yourEid: "",
        teamName: "",
        teamId: "",
    });
    const [teamInfo, setTeamInfo] = useState({
        teamName: "",
        teamId: "",
        leaderId: "",
        members: [],
        role: "",
    });

    console.log("Team Info:", teamInfo);

    const [newTeammateName, setNewTeammateName] = useState("");
    const [newTeammateId, setNewTeammateId] = useState("");
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [joinError, setJoinError] = useState("");
    const [addMemberError, setAddMemberError] = useState("");

    // Helper: is current user the team lead?
    const isCurrentUserLead = () => {
        const roleLeader = (teamInfo?.role || "").toLowerCase() === "leader";
        const idLeader = Boolean(
            profile?.elixir && (
                teamInfo?.leaderId === profile.elixir || teamInfo?.leaderElixir === profile.elixir
            )
        );
        return roleLeader || idLeader;
    };

    // Handle popup opening
    const handlePopupOpen = () => setShowPopup(true);

    // Fetch team info by Elixir
    const fetchTeamInfo = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/case-x/team-info/${profile.elixir}`
            );
            if (!response.ok) throw new Error(`Error ${response.status}`);
            const data = await response.json();
            setTeamInfo(data);
        } catch (err) {
            console.error("Error fetching team info:", err);
        }
    };

    useEffect(() => {
        if (profile?.elixir) fetchTeamInfo();
    }, [profile]);

    useEffect(() => {
        if (!loading) {
            if (!userData) {
                router.replace("/login");
                return;
            }
        }
        if (userData && paymentDone && profile?.elixir) {
            fetchTeamInfo();
        }
    }, [userData, paymentDone, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                Loading...
            </div>
        );
    }
    if (!userData) return null;

    // ---- Team Actions ----
    const handleChange = (field, value) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    const handleSubmitCreate = async () => {
        if (!formData.name || !formData.yourEid || !formData.teamName) {
            showError("Fill all fields to create a team");
            return;
        }
        if (!(formData.name === profile.name) && !(formData.yourEid === profile.elixir)) {
            showError("You can only create team for yourself");
            return;
        }
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/case-x/case-x_registration`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.name.trim(),
                        elixir: formData.yourEid.trim(),
                        mode: "create_team",
                        teamName: formData.teamName.trim(),
                    }),
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setTeamInfo({
                teamName: formData.teamName.trim(),
                teamId: data.teamId,
                leaderId: formData.yourEid.trim(),
                role: "leader",
                members: [{ name: formData.name.trim(), elixir: formData.yourEid.trim() }],
            });
            showSuccess("Team created successfully");
            setTimeout(() => router.replace('/dashboard'), 2000);
            setAction("details");
        } catch (err) {
            showError(err.message || "Error creating team");
        }
    };

    const handleSubmitJoin = async () => {
        if (!formData.name || !formData.yourEid || !formData.teamId) {
            setJoinError("Fill all fields to join a team");
            return;
        }
        if (!(formData.name === profile.name) && !(formData.yourEid === profile.elixir)) {
            showError("You can only join team for yourself");
            return;
        }
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/case-x/case-x_registration`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.name.trim(),
                        elixir: formData.yourEid.trim(),
                        mode: "join_team",
                        teamId: formData.teamId.trim(),
                    }),
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setTeamInfo((prev) => ({
                ...prev,
                teamId: data.teamId,
                role: "member",
            }));
            showSuccess("Joined team successfully");
            setTimeout(() => router.replace('/dashboard'), 2000);
            setAction("details");
        } catch (err) {
            setJoinError(err.message || "Error joining team");
        }
    };

    const handleAddMemberButton = async () => {
        // Must be team leader
        if (!isCurrentUserLead()) {
            showError("Only team leader can add members.");
            return;
        }
        // Validate inputs
        if (!newTeammateName.trim() || !newTeammateId.trim()) {
            setAddMemberError("Please fill both fields.");
            return;
        }
        if ((teamInfo.members?.length || 0) >= 4) {
            setAddMemberError("Team is full (maximum 4 members).");
            return;
        }
        setAddMemberError("");
        setIsAddingMember(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/case-x/add-member`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    leaderelixir: profile.elixir,
                    name: newTeammateName.trim(),
                    elixir: newTeammateId.trim(),
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data?.message || "Error adding member");
            setTeamInfo((prev) => ({
                ...prev,
                members: [...(prev.members || []), { name: newTeammateName.trim(), elixir: newTeammateId.trim() }],
            }));
            setNewTeammateName("");
            setNewTeammateId("");
            showSuccess("Member added");
        } catch (err) {
            showError(err.message || "Error adding member");
        } finally {
            setIsAddingMember(false);
        }
    };

    const handleRemoveMember = async (memberelixir) => {
        if (memberelixir === profile.elixir) {
            showError("Leader cannot remove themselves.");
            return;
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/case-x/remove-member`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ leaderelixir: profile.elixir, memberelixir }),
            });
            if (!res.ok) throw new Error("Error removing member");
            setTeamInfo((prev) => ({
                ...prev,
                members: prev.members.filter((m) => m.elixir !== memberelixir),
            }));
        } catch (err) {
            showError(err.message);
        }
    };

    // ---- Carousel Logic (unchanged) ----
    const evalCriteria = [
        { label: "Strategic\nThinking", img: "https://ik.imagekit.io/wlknxcf5m/Group%206.png?updatedAt=1755024969106" },
        { label: "Data-Driven\nInsights", img: "https://ik.imagekit.io/wlknxcf5m/Group%206.png?updatedAt=1755024969106" },
        { label: "Innovation &\nFeasibility", img: "https://ik.imagekit.io/wlknxcf5m/Group%206.png?updatedAt=1755024969106" },
        { label: "Delivery and\nTeam\nThinking", img: "https://ik.imagekit.io/wlknxcf5m/Group%206.png?updatedAt=1755024969106" },
    ];

    const goTo = (newIdx, dir) => {
        if (animating || newIdx === evalIndex) return;
        setDirection(dir);
        setAnimating(true);
        setTimeout(() => {
            setEvalIndex(newIdx);
            setAnimating(false);
            setDragX(0);
        }, 300);
    };

    const snapToNearest = () => {
        const cardWidth = slidesRef.current ? slidesRef.current.offsetWidth * 0.8 : 0;
        if (Math.abs(dragX) > cardWidth * 0.2) {
            if (dragX < 0 && evalIndex < evalCriteria.length - 1) goTo(evalIndex + 1, 1);
            else if (dragX > 0 && evalIndex > 0) goTo(evalIndex - 1, -1);
        }
        setAnimating(false);
        setDragX(0);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    };
    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setDragX(clientX - touchStartX.current);
    };
    const handleTouchEnd = () => {
        setIsDragging(false);
        snapToNearest();
    };

    return (
        <div className="bg-[#000C00] relative">
            {/* HERO */}
            {/* Mobile view */}
            <div className="md:hidden w-full min-h-screen bg-cover bg-center relative flex flex-col items-center justify-center z-0"
                style={{
                    backgroundImage: "url('https://ik.imagekit.io/wlknxcf5m/CaseXHeroBG.png')"
                }}
            >
                <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent to-[#000C00]" />
                <div className="relative w-[95%] mt-[25vh] max-w-[600px] min-h-[60vh] bg-lime-950/20 rounded-2xl border-b border-[#D6C466] flex flex-col items-center justify-center p-4 z-10">
                    {/* Book image positioned on top border */}
                    <img
                        src="https://ik.imagekit.io/wlknxcf5m/Group%2014.png"
                        alt="Book"
                        className="absolute max-h-[50vh] left-1/2 -translate-x-1/2 -top-[27vh] z-20 pointer-events-none"
                    />
                    <p className="text-white text-xl font-bold font-leage-spartan text-center mb-2 mt-[120px]">
                        Got sharp ideas? Love cracking real-world problems?
                    </p>
                    <p className="text-white text-lg font-light font-leage-spartan text-center mb-4">
                        Case Battle is your chance to step out of the classroom and into the boardroom. Tackle actual industry challenges, battle it out with the brightest teams, and pitch your solution live to real experts.
                        <br />Top 10 teams make it to the finale at E-Summit 2025, where strategy, creativity, and confidence will decide who takes the crown.
                        <br />Think you've got what it takes?
                    </p>
                    <p className="text-white text-xl font-bold font-leage-spartan text-center mb-8">
                        This is not a case study. This is war.
                    </p>
                    {/* Register / Manage button positioned on bottom border (mobile) */}
                    {profile.isEventRegistered ? (
                        <button
                            onClick={() => {
                                if (!paymentDone) {
                                    showError("Please complete your payment to manage your team.");
                                    setTimeout(() => router.replace("/dashboard"), 2000);
                                    return;
                                }
                                setShowPopup(true);
                            }}
                            className="absolute left-1/2 -translate-x-1/2 -bottom-8 z-30"
                        >
                            <img
                                src="https://ik.imagekit.io/wlknxcf5m/Group%2015.png?updatedAt=1755336258984"
                                alt="Manage Team"
                                className="w-48 hover:scale-105 transition-transform duration-300 cursor-pointer"
                            />
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                if (!paymentDone) {
                                    showError("Please complete your payment to register for the event.");
                                    setTimeout(() => router.replace("/dashboard"), 2000);
                                    return;
                                }
                                setShowPopup(true);
                            }}
                            className="absolute left-1/2 -translate-x-1/2 -bottom-8 z-30"
                        >
                            <img
                                src="https://ik.imagekit.io/wlknxcf5m/CaseXRegisterbutton%20(1).png"
                                alt="Register"
                                className="w-48 hover:scale-105 transition-transform duration-300 cursor-pointer"
                            />
                        </button>
                    )}
                </div>
            </div>
            {/* Desktop view unchanged */}
            <div className="hidden md:block">
                <div
                    className="w-full h-screen bg-cover bg-center relative flex items-center justify-start z-0"
                    style={{
                        backgroundImage: "url('https://ik.imagekit.io/wlknxcf5m/CaseXHeroBG.png')"
                    }}
                >
                    <div
                        className="absolute inset-0 z-1"
                        style={{
                            background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000C00 100%)",
                        }}
                    />
                    <div className="w-[90vw] h-[70vh] bg-lime-950/20 rounded-r-2xl border-b-1 border-[#D6C466] flex items-center justify-start z-10 relative">

                        <img
                            src="https://ik.imagekit.io/wlknxcf5m/Group%2014.png"
                            alt="Book"
                            className="absolute left-[2vw] max-w-[35vw] h-auto z-12"
                            style={{ pointerEvents: "none" }}
                        />
                        <div className="w-[85vw] pl-[35vw] text-center justify-start"><span className="text-white text-[2vw] lg:text-2xl font-bold font-leage-spartan">Got sharp ideas? Love cracking real-world problems?<br /><br /></span><span className="text-white text-[2vw] lg:text-2xl font-light font-leage-spartan">Case-X is your chance to step out of the classroom and into the boardroom. Tackle actual industry challenges, battle it out with the brightest teams, and pitch your solution live to real experts.<br />Top 10 teams make it to the finale at E-Summit 2025, where strategy, creativity, and confidence will decide who takes the crown.<br />Think you've got what it takes?<br /><br /></span><span className="text-white text-[2vw] lg:text-2xl font-bold font-leage-spartan">This is not a case study. This is war.</span></div>
                        <div className="absolute left-[60vw] -translate-x-1/2 bottom-[-32px] z-20">
                            {/* Conditional register/manage buttons based on registration status */}
                            {profile.isEventRegistered ? (
                                <button
                                    onClick={() => {
                                        if (!paymentDone) {
                                            showError("Please complete your payment to manage your team.");
                                            setTimeout(() => router.replace("/dashboard"), 2000);
                                            return;
                                        }
                                        setShowPopup(true);
                                    }}
                                >
                                    <img
                                        src="https://ik.imagekit.io/wlknxcf5m/Group%2015.png?updatedAt=1755336258984"
                                        alt="Manage Team"
                                        className="w-48 h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
                                    />
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        if (!paymentDone) {
                                            showError("Please complete your payment to register for the event.");
                                            setTimeout(() => router.replace("/dashboard"), 2000);
                                            return;
                                        }
                                        setShowPopup(true);
                                    }}
                                >
                                    <img
                                        src="https://ik.imagekit.io/wlknxcf5m/CaseXRegisterbutton%20(1).png"
                                        alt="Register"
                                        className="w-48 h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-8">
                    <img
                        src="https://ik.imagekit.io/wlknxcf5m/WhatsApp_Image_2025-08-12_at_01.07.11_040c8e40-removebg-preview__1__cleanup-removebg-preview%201.png"
                        alt="Divider"
                        className="h-16"
                    />
                </div>


                {/* ABOUT SECTION */}
                <section id="about" className="w-full max-w-[1200px] mx-auto px-6 md:px-8 mt-10 md:mt-16">
                    <h2 className="text-4xl md:text-6xl font-normal font-girassol text-[#1D8301] mb-16 text-center">About Us</h2>
                    <div className="flex justify-center">
                        <p className="text-2xl md:text-3xl leading-9 max-w-4xl text-center">
                            <span className="font-medium font-leage-spartan">Case-X</span>
                            <span className="font-light font-leage-spartan"> is a flagship case competition at E-Summit 2025, designed to bridge the gap between academic learning and real-world business challenges. The competition unfolds in two key stages:</span>
                        </p>
                    </div>
                </section>

                {/* STAGES SECTION - with positioned labyrinths and connecting path */}
                <section className="w-full max-w-[1250px] mx-auto px-6 md:px-8 mt-10 md:mt-16">
                    {/* Desktop layout */}
                    <div className="relative hidden lg:block min-h-[720px]">
                        {/* Labyrinth 1 */}
                        <div className="absolute left-0 -top-12 z-10">
                            <img src="https://ik.imagekit.io/wlknxcf5m/stage-labyrinth.png" alt="Stage 1 Labyrinth" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-orange-300 text-4xl font-bold font-leage-spartan [text-shadow:_2px_4px_4px_rgb(0_0_0_/_0.25)]">Stage 1</span>
                            </div>
                        </div>

                        {/* Labyrinth 2 */}
                        <div className="absolute right-2 -bottom-32 z-10">
                            <img src="https://ik.imagekit.io/wlknxcf5m/stage-labyrinth.png" alt="Stage 2 Labyrinth" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-orange-300 text-4xl font-bold font-leage-spartan [text-shadow:_2px_4px_4px_rgb(0_0_0_/_0.25)]">Stage 2</span>
                            </div>
                        </div>

                        {/* Connecting path */}
                        <img
                            src="https://ik.imagekit.io/wlknxcf5m/stage-path.png"
                            alt="Path between stages"
                            className="absolute left-[18%] top-[2%] w-[65%] rotate-12 xl:rotate-0 z-4"
                        />

                        {/* Stage 1 content box */}
                        <div className="absolute right-0 top-8 w-[37vw] max-w-[550px]">
                            <div className="bg-lime-950/60 border border-lime-950/75 rounded-2xl p-6">
                                <h3 className="text-[#958324] text-3xl font-bold font-leage-spartan pb-2">Preliminary Submission</h3>
                                <ul className="text-[#D6C466] text-xl font-normal font-leage-spartan list-disc pl-5">
                                    <li>Participants will receive a real industry-based marketing or business problem</li>
                                    <li>The case will be released before E-Summit.</li>
                                    <li>Teams must analyze the case and submit a detailed solution.</li>
                                    <li>A panel will evaluate submissions and shortlist the top 10 teams.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Stage 2 content box */}
                        <div className="absolute left-0 bottom-0 w-[37vw] max-w-[550px]">
                            <div className="bg-lime-950/60 border border-lime-950/75 rounded-2xl p-6">
                                <h3 className="text-[#958324] text-3xl font-bold font-leage-spartan pb-2">The Final Battle</h3>
                                <ul className="text-[#D6C466] text-xl font-normal font-leage-spartan list-disc pl-5">
                                    <li>Finalists will present their refined solution live at the Campus 7 Auditorium on Day 3 of E-Summit.</li>
                                </ul>
                                <p className="text-[#D6C466] text-xl font-normal font-leage-spartan list-disc pt-3 pb-3 pl-5">Each team will get:</p>
                                <ul className="text-[#D6C466] text-xl font-normal font-leage-spartan list-disc pl-5">
                                    <li>10 minutes to present</li>
                                    <li>2 minutes for Q&amp;A with the jury</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Mobile layout */}
                    <div className="lg:hidden grid items-center">
                        {/* Stage 1 */}
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <img src="https://ik.imagekit.io/wlknxcf5m/stage-labyrinth.png" alt="Stage 1 Labyrinth" className="w-96 h-auto rounded-full" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[#D6C466] text-3xl font-bold font-leage-spartan [text-shadow:_2px_4px_4px_rgb(0_0_0_/_0.25)]">Stage 1</span>
                                </div>
                            </div>
                            <div className="bg-lime-950/20 border border-lime-950/75 rounded-2xl p-5 w-full">
                                <h3 className="text-[#958324] text-2xl font-bold font-leage-spartan">Preliminary Submission</h3>
                                <ul className="mt-3 text-[#D6C466] text-lg font-normal font-leage-spartan list-disc pl-5 space-y-1">
                                    <li>Participants will receive a real industry-based marketing or business problem</li>
                                    <li>The case will be released before E-Summit.</li>
                                    <li>Teams must analyze the case and submit a detailed solution.</li>
                                    <li>A panel will evaluate submissions and shortlist the top 10 teams.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Stage 2 */}
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <img src="https://ik.imagekit.io/wlknxcf5m/stage-labyrinth.png" alt="Stage 2 Labyrinth" className="w-96 h-auto rounded-full" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-orange-300 text-3xl font-bold font-leage-spartan [text-shadow:_2px_4px_4px_rgb(0_0_0_/_0.25)]">Stage 2</span>
                                </div>
                            </div>
                            <div className="bg-lime-950/20 border border-lime-950/75 rounded-2xl p-6">
                                <h3 className="text-[#958324] text-2xl font-bold font-leage-spartan pb-2">The Final Battle</h3>
                                <ul className="text-[#D6C466] text-lg font-normal font-leage-spartan list-disc pl-5">
                                    <li>Finalists will present their refined solution live at the Campus 7 Auditorium on Day 3 of E-Summit.</li>
                                </ul>
                                <p className="text-[#D6C466] text-lg font-normal font-leage-spartan list-disc pt-3 pb-3 pl-5">Each team will get:</p>
                                <ul className="text-[#D6C466] text-lg font-normal font-leage-spartan list-disc pl-5">
                                    <li>10 minutes to present</li>
                                    <li>2 minutes for Q&amp;A with the jury</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="w-full flex justify-center mt-24">
                    <img
                        src="https://ik.imagekit.io/wlknxcf5m/WhatsApp_Image_2025-08-12_at_01.07.11_040c8e40-removebg-preview__1__cleanup-removebg-preview%201.png"
                        alt="Divider"
                        className="h-16"
                    />
                </div>

                {/* VENUE AND TIME */}
                <section id="venue" className="w-full max-w-[1200px] mx-auto px-6 md:px-8 mt-14 md:mt-20">
                    <h2 className="text-4xl md:text-6xl font-normal font-girassol text-[#1C8201] mb-10 text-center">Venue and Time</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <img src="https://ik.imagekit.io/wlknxcf5m/clock.png" alt="Clock" className="w-[40vw] md:w-[15vw] h-auto drop-shadow-[0_4px_24px_rgba(214,196,102,0.4)]" />
                            <div>
                                <p className="text-2xl md:text-3xl font-leage-spartan text-white">24 August 2025</p>
                                <p className="text-lg md:text-xl font-leage-spartan text-white opacity-90">9:00 AM - 4:00 PM</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4 text-center">
                            <img src="https://ik.imagekit.io/wlknxcf5m/calendar.png" alt="Calendar" className="w-[48vw] md:w-[18vw] h-auto drop-shadow-[0_4px_24px_rgba(214,196,102,0.4)]" />
                            <div>
                                <p className="text-3xl md:text-4xl font-leage-spartan text-white">Campus 17</p>
                                <p className="text-lg md:text-xl font-leage-spartan text-white opacity-90">Auditorium</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="w-full flex justify-center mt-24">
                    <img
                        src="https://ik.imagekit.io/wlknxcf5m/WhatsApp_Image_2025-08-12_at_01.07.11_040c8e40-removebg-preview__1__cleanup-removebg-preview%201.png"
                        alt="Divider"
                        className="h-16"
                    />
                </div>

                {/* EVALUATION CRITERIA */}
                <section
                    id="evaluation"
                    className="w-full mt-14 md:mt-20 bg-cover bg-center py-16 md:py-20 relative"
                    style={{ backgroundImage: "url('https://ik.imagekit.io/wlknxcf5m/EvalCriteriaHero.png')" }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000C00] via-transparent to-[#000C00] pointer-events-none" />
                    <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 z-10">
                        <h2 className="text-center text-4xl md:text-6xl font-normal font-girassol text-[#1C8201] mb-12">Evaluation Criteria</h2>
                        {/* Desktop/tablet grid */}
                        <div className="hidden md:grid grid-cols-2 md:gap-12 justify-items-center">
                            {evalCriteria.map((item, idx) => (
                                <div key={idx} className="relative w-[23rem] h-[14rem]">
                                    <img
                                        src={item.img}
                                        alt="Decorative frame"
                                        className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center px-6">
                                        <p className="text-center text-[#D6C466] text-2xl md:text-3xl font-leage-spartan leading-9 font-normal whitespace-pre-line">
                                            {item.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Mobile horizontal carousel with left/right arrows, animation, and touch drag (multi-card, snap) */}
                        <div className="md:hidden flex flex-col items-center">
                            <div className="flex w-full justify-center items-center relative max-w-[90vw] mx-auto" style={{ minHeight: '3.5rem' }}>
                                {/* Left arrow button */}
                                <button
                                    aria-label="Previous"
                                    onClick={() => goTo(Math.max(evalIndex - 1, 0), -1)}
                                    className="flex items-center justify-center z-15 w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-full bg-[#D6C466]/20 hover:bg-[#D6C466]/40 text-[#D6C466] text-2xl"
                                    style={{ boxSizing: 'content-box' }}
                                    disabled={evalIndex === 0}
                                >
                                    <span className="flex items-center justify-center w-full h-full">&#8592;</span>
                                </button>
                                {/* Carousel frame with live drag and snap animation */}
                                <div
                                    ref={slidesRef}
                                    className="relative w-[80vw] h-[14rem] flex-shrink flex-grow z-10"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    onMouseDown={handleTouchStart}
                                    onMouseMove={e => isDragging && handleTouchMove(e)}
                                    onMouseUp={handleTouchEnd}
                                    onMouseLeave={() => isDragging && handleTouchEnd()}
                                    style={{ touchAction: 'pan-y', cursor: isDragging ? 'grabbing' : 'grab' }}
                                >
                                    {/* Slides wrapper: flex row, translateX for movement */}
                                    <div
                                        className={`flex h-full transition-transform ${animating && !isDragging ? 'duration-300' : 'duration-0'}`}
                                        style={{
                                            width: `calc(80vw * ${evalCriteria.length})`,
                                            maxWidth: `calc(16rem * ${evalCriteria.length})`,
                                            transform: `translateX(calc(${-evalIndex * 80}vw + ${dragX}px))`,
                                        }}
                                    >
                                        {evalCriteria.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex-shrink-0 w-[80vw] max-w-sm h-full px-2 relative"
                                                style={{ opacity: Math.abs(idx - evalIndex) > 1 ? 0.3 : 1, transition: 'opacity 0.2s' }}
                                            >
                                                <img
                                                    src={item.img}
                                                    alt="Decorative frame"
                                                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center px-6">
                                                    <p className="text-center text-[#D6C466] text-2xl font-leage-spartan leading-9 font-normal whitespace-pre-line">
                                                        {item.label}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Right arrow button */}
                                <button
                                    aria-label="Next"
                                    onClick={() => goTo(Math.min(evalIndex + 1, evalCriteria.length - 1), 1)}
                                    className="flex items-center justify-center z-15 w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-full bg-[#D6C466]/20 hover:bg-[#D6C466]/40 text-[#D6C466] text-2xl"
                                    style={{ boxSizing: 'content-box' }}
                                    disabled={evalIndex === evalCriteria.length - 1}
                                >
                                    <span className="flex items-center justify-center w-full h-full">&#8594;</span>
                                </button>
                            </div>
                            {/* Carousel dots */}
                            <div className="flex items-center justify-center gap-2 mt-6">
                                {evalCriteria.map((_, idx) => (
                                    <button
                                        key={idx}
                                        className={`w-3 h-3 rounded-full ${evalIndex === idx ? 'bg-[#D6C466]' : 'bg-[#D6C466]/40'}`}
                                        onClick={() => goTo(idx, idx > evalIndex ? 1 : -1)}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                <div className="w-full flex justify-center mt-8">
                    <img
                        src="https://ik.imagekit.io/wlknxcf5m/WhatsApp_Image_2025-08-12_at_01.07.11_040c8e40-removebg-preview__1__cleanup-removebg-preview%201.png"
                        alt="Divider"
                        className="h-16"
                    />
                </div>
                <section
                    id="speaker"
                    className="w-full mt-14 md:mt-20 bg-cover bg-center py-10 sm:py-14 md:py-20 relative flex items-start justify-center px-4"
                    style={{
                        backgroundImage:
                            "url('https://ik.imagekit.io/wlknxcf5m/WhatsApp%20Image%202025-08-12%20at%2001.07.11_ac122249%201%20(1).png')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000C00] via-transparent to-[#000C00] pointer-events-none" />
                    <img
                        src="https://ik.imagekit.io/wlknxcf5m/Group%207%20(1).png"
                        className="absolute h-[20vh] sm:h-[25vh] md:h-[50vh] w-auto -top-[2vh] sm:-top-[4vh] md:-top-[5vh] z-15"
                    />
                    <div className="relative mt-[22vh] sm:mt-[26vh] md:mt-[35vh] w-[90%] md:w-[60vw] text-center text-white text-sm sm:text-base md:text-2xl font-light font-leage-spartan z-15">
                        In today’s fast-paced tech landscape, product management is where vision
                        meets execution. Whether it’s creating products people love, launching
                        innovative features, or scaling solutions to millions, product managers are
                        the bridge between business, technology, and users.
                        <br /><br />
                        Road to Product is your chance to dive into this exciting, high-impact
                        role, understand what it takes, why it matters, and how you can get there,
                        no matter your background.
                        <br /><br />
                        With India’s product industry booming and global demand rising, there’s no
                        better time to explore the path of ideation, design, and delivery.
                    </div>
                </section>

                <div className="w-full mt-12 sm:mt-16 md:mt-20 bg-cover py-10 sm:py-14 md:py-20 flex items-center justify-center relative px-4">
                    <div className="w-[90%] md:w-[60vw] text-center text-white text-sm sm:text-base md:text-2xl font-light font-leage-spartan z-15">
                        <span className="text-white text-2xl sm:text-3xl md:text-6xl font-girassol">
                            Be Ready to Learn from<br /> Industry Experts
                        </span>
                        <br /><br /><br />
                        Get insights straight from a Head of Product, who brings real-world product
                        experience, user-first thinking, and deep knowledge of the product
                        lifecycle.
                        <br />
                        From defining product vision to launching successful releases, he will walk
                        you through:
                        <br /><br />
                        <span className="text-white text-lg sm:text-xl md:text-2xl font-bold font-leage-spartan">
                            How to think like a product manager?<br /> What top companies really look
                            for?<br /><br />
                        </span>
                        <span className="text-white text-sm sm:text-base md:text-2xl font-light font-leage-spartan">
                            And why college is the perfect place to start your product journey.
                        </span>
                    </div>
                </div>


                <section className="w-full mt-14 md:mt-32 border-t bg-black border-[#D6C466]">
                    <div className="w-[82vw] mx-auto py-10">
                        <h3 className="text-xl text-center font-bold font-['Cinzel_Decorative']">Event POC</h3>
                        <div className="mt-3 space-y-1 text-center text-xl md:text-xl font-light font-['Poppins']">
                            <p>Aarish Aabdi - 9907086720</p>
                            <p>aarish.kiitecell@gmail.com</p>
                        </div>
                    </div>
                </section>

                {/* POPUP FORM */}
                {/* STARTING SOON POPUP */}
                {/* POPUP TO BE ENABLED */}
                {showPopup && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="relative w-[95vw] max-w-[835px] md:min-h-[494px] bg-[#1B0D00] rounded-3xl border-4 border-[#CFB43C] max-h-[90vh] overflow-y-auto overscroll-contain">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="absolute top-4 right-4 text-[#CFB43C] hover:text-[#CFB43C]/80 text-2xl font-bold"
                            >
                                ×
                            </button>

                            {profile.isEventRegistered ? (
                                // Manage Team UI for registered users
                                <>
                                    <div className="w-full h-full flex flex-col items-center justify-start pt-6 md:pt-8 px-4 md:px-16">
                                        <p className="text-2xl md:text-3xl font-light font-leage-spartan text-[#CFB43C] text-center mb-4">
                                            Manage Team
                                        </p>

                                        {/* Team Info Section */}
                                        <div className="w-full">
                                            <div className="bg-[#786C34]/20 border border-[#786C34] rounded-2xl p-3 md:p-4 mb-6">
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                                    <div>
                                                        <p className="text-[#CFB43C] text-lg md:text-xl font-leage-spartan font-bold">{teamInfo.teamName}</p>
                                                        <p className="text-[#CFB43C]/80 text-base md:text-lg font-leage-spartan">Team ID: {teamInfo.teamId}</p>
                                                    </div>
                                                    <p className="text-[#CFB43C]/80 text-base md:text-lg font-leage-spartan">{teamInfo.members?.length || 0}/4 members</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Add Teammate Section - Only for team leads */}
                                        {isCurrentUserLead() && (
                                            <div className="w-full mb-6">
                                                <p className="text-xl md:text-2xl font-light font-leage-spartan text-[#CFB43C] mb-4">Add Teammate:</p>
                                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                                    <input
                                                        type="text"
                                                        placeholder="First Name"
                                                        value={newTeammateName}
                                                        onChange={(e) => setNewTeammateName(e.target.value)}
                                                        className="flex-1 w-full h-12 md:h-14 bg-[#786C34] rounded-2xl px-4 md:px-6 text-[#1B0D00] text-lg md:text-xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Elixir ID"
                                                        value={newTeammateId}
                                                        onChange={(e) => setNewTeammateId(e.target.value)}
                                                        className="flex-1 w-full h-12 md:h-14 bg-[#786C34] rounded-2xl px-4 md:px-6 text-[#1B0D00] text-lg md:text-xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                                    />
                                                    <button
                                                        onClick={handleAddMemberButton}
                                                        className="self-center sm:self-auto w-12 h-12 md:w-14 md:h-14 bg-[#786C34] rounded-2xl text-[#1B0D00] text-xl md:text-2xl font-bold hover:bg-[#CFB43C]/90"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                {addMemberError && (
                                                    <p className="mt-2 text-red-400 text-sm md:text-base font-leage-spartan">{addMemberError}</p>
                                                )}
                                            </div>
                                        )}

                                        <div className="w-full">
                                            <p className="text-xl md:text-2xl font-light font-leage-spartan text-[#CFB43C] mb-4">Manage Teammates:</p>
                                            <div className="space-y-3">
                                                {teamInfo.members?.map((member) => (
                                                    <div key={member.elixir} className="flex items-center justify-between rounded-lg px-1 md:px-3">
                                                        <div className="flex items-center min-w-0 gap-2 md:gap-4">
                                                            {member.elixir === teamInfo.leaderId && (
                                                                <span className="bg-[#786C34] text-[#1B0D00] px-2 py-1 rounded text-xs md:text-sm font-bold md:w-12 text-center">
                                                                    Lead
                                                                </span>
                                                            )}
                                                            <div className="flex flex-col md:flex-row md:items-center md:gap-6 min-w-0">
                                                                <span className="text-[#CFB43C] text-base md:text-xl font-leage-spartan block truncate max-w-[48vw] md:max-w-none">
                                                                    {member.name}
                                                                </span>
                                                                <span className="text-[#CFB43C]/80 text-sm md:text-lg font-leage-spartan block">
                                                                    {member.elixir}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {member.elixir !== teamInfo.leaderId && isCurrentUserLead() && (
                                                            <button
                                                                onClick={() => handleRemoveMember(member.elixir)}
                                                                className="text-[#CFB43C] hover:text-red-400 text-xl md:text-2xl font-bold pl-2"
                                                            >
                                                                -
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            {(teamInfo.members?.length || 0) >= 4 && (
                                                <p className="text-[#CFB43C]/80 text-base md:text-lg font-leage-spartan mt-2">
                                                    Maximum team size reached (4 members)
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                // Registration UI for new users
                                <>
                                    <div className="flex flex-col sm:flex-row justify-center mt-6 md:mt-8 gap-4 sm:gap-12 px-4 md:px-16">
                                        <button
                                            onClick={() => {
                                                setActiveTab('join');
                                                setJoinError('');
                                            }}
                                            className={`text-2xl md:text-3xl font-light font-leage-spartan text-[#CFB43C] cursor-pointer`}
                                        >
                                            Join a Team
                                        </button>
                                        <button
                                            onClick={() => {
                                                setActiveTab('create');
                                                setJoinError('');
                                            }}
                                            className={`text-2xl md:text-3xl font-light font-leage-spartan text-[#CFB43C] cursor-pointer`}
                                        >
                                            Create a Team
                                        </button>
                                    </div>

                                    <div className="hidden sm:flex justify-center mt-2">
                                        {activeTab === 'join' && (
                                            <div className="w-32 h-0 border-b border-[#CFB43C] ml-[-220px]"></div>
                                        )}
                                        {activeTab === 'create' && (
                                            <div className="w-32 h-0 border-b border-[#CFB43C] ml-[200px]"></div>
                                        )}
                                    </div>

                                    <div className="px-4 md:px-16 mt-6 md:mt-8">
                                        {activeTab === 'create' ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="First Name"
                                                        value={formData.name}
                                                        onChange={(e) => handleChange("name", e.target.value)}
                                                        className="w-full h-12 md:h-14 bg-[#786C34] rounded-2xl px-4 md:px-6 text-[#1B0D00] text-lg md:text-2xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Elixir ID"
                                                        value={formData.yourEid}
                                                        onChange={(e) => handleChange("yourEid", e.target.value)}
                                                        className="w-full h-12 md:h-14 bg-[#786C34] rounded-2xl px-4 md:px-6 text-[#1B0D00] text-lg md:text-2xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                                    />
                                                </div>
                                                <div className="relative md:col-span-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Team Name"
                                                        value={formData.teamName}
                                                        onChange={(e) => handleChange("teamName", e.target.value)}
                                                        className="w-full h-12 md:h-14 bg-[#786C34] rounded-2xl px-4 md:px-6 text-[#1B0D00] text-lg md:text-2xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                                <div className="space-y-4 md:space-y-6">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="First Name"
                                                            value={formData.name}
                                                            onChange={(e) => handleChange("name", e.target.value)}
                                                            className="w-full h-12 md:h-14 bg-[#786C34] rounded-2xl px-4 md:px-6 text-[#1B0D00] text-lg md:text-2xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Team Name"
                                                            value={formData.teamName}
                                                            onChange={(e) => handleChange("teamName", e.target.value)}
                                                            className="w-full h-12 md:h-14 bg-[#786C34] rounded-2xl px-4 md:px-6 text-[#1B0D00] text-lg md:text-2xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-4 md:space-y-6">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Elixir ID"
                                                            value={formData.yourEid}
                                                            onChange={(e) => handleChange("yourEid", e.target.value)}
                                                            className="w-full h-12 md:h-14 bg-[#786C34] rounded-2xl px-4 md:px-6 text-[#1B0D00] text-lg md:text-2xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Team ID"
                                                            value={formData.teamId}
                                                            onChange={(e) => handleChange("teamId", e.target.value)}
                                                            className="w-full h-12 md:h-14 bg-[#786C34] rounded-2xl px-4 md:px-6 text-[#1B0D00] text-lg md:text-2xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Error message for join team */}
                                        {activeTab === 'join' && joinError && (
                                            <div className="mt-4">
                                                <p className="text-red-400 text-base md:text-lg font-leage-spartan text-center">
                                                    {joinError}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex justify-center mt-8 mb-6">
                                            <button
                                                onClick={() => (activeTab === 'create' ? handleSubmitCreate() : handleSubmitJoin())}
                                                className="hover:scale-105 transition-transform cursor-pointer"
                                            >
                                                <img
                                                    src="https://ik.imagekit.io/wlknxcf5m/Group%208.png"
                                                    alt="Register"
                                                    className="w-48 md:w-64 h-auto"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
                <Toast 
                    message={toast.message}
                    type={toast.type}
                    isVisible={toast.isVisible}
                    onClose={hideToast}
                />
            </div>
        </div>
    );
}
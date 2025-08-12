"use client";
import React, { useState } from "react";

export default function CaseX() {
    const [showPopup, setShowPopup] = useState(false);
    const [activeTab, setActiveTab] = useState('join'); // 'join' or 'create'

    return (
        <div className="bg-[#000C00] relative">
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
                    <div className="w-[15vw] h-[35vh] left-[6vw] top-[15vh] opacity-50 bg-orange-300 rounded-full shadow-[0px_4px_100px_50px_rgba(115,70,37,1.00)] relative z-11">
                        
                    </div>
                    <img
                            src="https://ik.imagekit.io/wlknxcf5m/CaseXHeroBook.png"
                            alt="Book"
                            className="absolute left-[2vw] top-[1vh] h-[85vh] z-12"
                            style={{ pointerEvents: "none" }}
                    />
                    <div className="w-[70vw] pl-[15vw] text-center justify-start"><span class="text-white text-2xl font-bold font-['League_Spartan']">Got sharp ideas? Love cracking real-world problems?<br/><br/></span><span class="text-white text-2xl font-light font-['League_Spartan']">Case Battle is your chance to step out of the classroom and into the boardroom. Tackle actual industry challenges, battle it out with the brightest teams, and pitch your solution live to real experts.<br/>Top 10 teams make it to the finale at E-Summit 2025, where strategy, creativity, and confidence will decide who takes the crown.<br/>Think you've got what it takes?<br/><br/></span><span class="text-white text-2xl font-bold font-['League_Spartan']">This is not a case study. This is war.</span></div>
                    <div className="absolute left-[58vw] -translate-x-1/2 bottom-[-32px] z-20">
                        <button onClick={() => setShowPopup(true)}>
                            <img
                                src="https://ik.imagekit.io/wlknxcf5m/CaseXRegisterbutton%20(1).png"
                                alt="Register"
                                className="w-48 h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
                            />
                        </button>
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
                <h2 className="text-4xl md:text-6xl font-normal font-['Girassol'] text-[#1C8201] mb-16 text-center">About Us</h2>
                <div className="flex justify-center">
                    <p className="text-2xl md:text-3xl leading-9 max-w-4xl text-center">
                        <span className="font-medium font-['League_Spartan']">Case Battle</span>
                        <span className="font-light font-['League_Spartan']"> is a flagship case competition at E-Summit 2025, designed to bridge the gap between academic learning and real-world business challenges. The competition unfolds in two key stages:</span>
                    </p>
                </div>
            </section>

            {/* STAGES SECTION - with positioned labyrinths and connecting path */}
            <section className="w-full max-w-[1200px] mx-auto px-6 md:px-8 mt-10 md:mt-16">
                {/* Desktop layout */}
                <div className="relative hidden md:block min-h-[720px]">
                    {/* Labyrinth 1 */}
                    <div className="absolute left-0 -top-12 z-10">
                        <img src="https://ik.imagekit.io/wlknxcf5m/stage-labyrinth.png" alt="Stage 1 Labyrinth" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-orange-300 text-4xl font-bold font-['League_Spartan'] [text-shadow:_2px_4px_4px_rgb(0_0_0_/_0.25)]">Stage 1</span>
                        </div>
                    </div>

                    {/* Labyrinth 2 */}
                    <div className="absolute right-2 -bottom-32 z-10">
                        <img src="https://ik.imagekit.io/wlknxcf5m/stage-labyrinth.png" alt="Stage 2 Labyrinth" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-orange-300 text-4xl font-bold font-['League_Spartan'] [text-shadow:_2px_4px_4px_rgb(0_0_0_/_0.25)]">Stage 2</span>
                        </div>
                    </div>

                    {/* Connecting path */}
                    <img
                        src="https://ik.imagekit.io/wlknxcf5m/stage-path.png"
                        alt="Path between stages"
                        className="absolute left-[22%] top-[13%] w-[56%] rotate-6 z-4"
                    />

                    {/* Stage 1 content box */}
                    <div className="absolute right-0 md:right-2 top-8 w-[37vw]">
                        <div className="bg-lime-950/20 border border-lime-950/75 rounded-2xl p-6">
                            <h3 className="text-[#958324] text-3xl font-bold font-['League_Spartan'] pb-2">Preliminary Submission</h3>
                            <ul className="text-[#D6C466] text-xl font-normal font-['League_Spartan'] list-disc pl-5">
                                <li>Participants will receive a real industry-based marketing or business problem</li>
                                <li>The case will be released 10 days before E-Summit.</li>
                                <li>Teams must analyze the case and submit a detailed solution.</li>
                                <li>A panel will evaluate submissions and shortlist the top 10 teams.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Stage 2 content box */}
                    <div className="absolute left-0 bottom-0 w-[37vw]">
                        <div className="bg-lime-950/20 border border-lime-950/75 rounded-2xl p-6">
                            <h3 className="text-[#958324] text-3xl font-bold font-['League_Spartan'] pb-2">The Final Battle</h3>
                            <ul className="text-[#D6C466] text-xl font-normal font-['League_Spartan'] list-disc pl-5">
                                <li>Finalists will present their refined solution live at the Campus 7 Auditorium on Day 3 of E-Summit.</li>
                            </ul>
                            <p className="text-[#D6C466] text-xl font-normal font-['League_Spartan'] list-disc pl-5">Each team will get:</p>
                            <ul className="text-[#D6C466] text-xl font-normal font-['League_Spartan'] list-disc pl-5">
                                <li>10 minutes to present</li>
                                <li>2 minutes for Q&amp;A with the jury</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Mobile layout */}
                <div className="md:hidden grid gap-6 items-center">
                    {/* Stage 1 */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                            <img src="https://ik.imagekit.io/wlknxcf5m/stage-labyrinth.png" alt="Stage 1 Labyrinth" className="w-48 h-48 rounded-full" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-orange-300 text-3xl font-bold font-['League_Spartan'] [text-shadow:_2px_4px_4px_rgb(0_0_0_/_0.25)]">Stage 1</span>
                            </div>
                        </div>
                        <div className="bg-lime-950/20 border border-lime-950/75 rounded-2xl p-5 w-full">
                            <h3 className="text-yellow-700 text-2xl font-bold font-['League_Spartan']">Preliminary Submission</h3>
                            <ul className="mt-3 text-orange-300 text-lg font-normal font-['League_Spartan'] list-disc pl-5 space-y-1">
                                <li>Participants will receive a real industry-based problem</li>
                                <li>Case released 10 days before E-Summit</li>
                                <li>Analyze and submit a detailed solution</li>
                                <li>Top 10 teams shortlisted by panel</li>
                            </ul>
                        </div>
                    </div>

                    {/* Path image */}
                    <div className="flex justify-center">
                        <img src="https://ik.imagekit.io/wlknxcf5m/stage-path.png" alt="Path" className="w-3/4 rotate-[-8deg]" />
                    </div>

                    {/* Stage 2 */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                            <img src="https://ik.imagekit.io/wlknxcf5m/stage-labyrinth.png" alt="Stage 2 Labyrinth" className="w-48 h-48 rounded-full" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-orange-300 text-3xl font-bold font-['League_Spartan'] [text-shadow:_2px_4px_4px_rgb(0_0_0_/_0.25)]">Stage 2</span>
                            </div>
                        </div>
                        <div className="bg-lime-950/20 border border-lime-950/75 rounded-2xl p-5 w-full">
                            <h3 className="text-yellow-700 text-2xl font-bold font-['League_Spartan']">The Final Battle</h3>
                            <p className="mt-3 text-orange-300 text-lg font-normal font-['League_Spartan']">
                                Finalists present live on Day 3 at Campus 7 Auditorium.
                            </p>
                            <ul className="mt-2 text-orange-300 text-lg font-normal font-['League_Spartan'] list-disc pl-5">
                                <li>10 minutes to present</li>
                                <li>2 minutes for Q&amp;A</li>
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
                <h2 className="text-4xl md:text-6xl font-normal font-['Girassol'] text-[#1C8201] mb-10 text-center">Venue and Time</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <img src="https://ik.imagekit.io/wlknxcf5m/calendar.png" alt="Calendar" className="w-[15vw] h-auto drop-shadow-[0_4px_24px_rgba(214,196,102,0.4)]" />
                        <div>
                            <p className="text-2xl md:text-3xl font-['League_Spartan'] text-white">24 August 2025</p>
                            <p className="text-lg md:text-xl font-['League_Spartan'] text-white opacity-90">9:00 AM - 4:00 PM</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 text-center">
                        <img src="https://ik.imagekit.io/wlknxcf5m/clock.png" alt="Clock" className="w-[12vw] h-auto drop-shadow-[0_4px_24px_rgba(214,196,102,0.4)]" />
                        <div>
                            <p className="text-3xl md:text-4xl font-['League_Spartan'] text-white">Campus 17</p>
                            <p className="text-lg md:text-xl font-['League_Spartan'] text-white opacity-90">Auditorium</p>
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
                    <h2 className="text-center text-4xl md:text-6xl font-normal font-['Girassol'] text-[#1C8201] mb-12">Evaluation Criteria</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 justify-items-center">
                        
                        <div className="relative w-[23rem] h-[14rem]">
                            <img
                                src="https://ik.imagekit.io/wlknxcf5m/Group%206.png"
                                alt="Decorative frame"
                                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                            />
                            <div className="absolute inset-0 flex items-center justify-center px-6">
                                <p className="text-center text-[#D6C466] text-2xl md:text-3xl font-['League_Spartan'] leading-9 font-normal">
                                    Strategic<br />Thinking
                                </p>
                            </div>
                        </div>
                        <div className="relative w-[23rem] h-[14rem]">
                            <img
                                src="https://ik.imagekit.io/wlknxcf5m/Group%206.png"
                                alt="Decorative frame"
                                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                            />
                            <div className="absolute inset-0 flex items-center justify-center px-6">
                                <p className="text-center text-[#D6C466] text-2xl md:text-3xl font-['League_Spartan'] leading-9 font-normal">
                                    Data-Driven<br />Insights
                                </p>
                            </div>
                        </div>
                        <div className="relative w-[23rem] h-[14rem]">
                            <img
                                src="https://ik.imagekit.io/wlknxcf5m/Group%206.png"
                                alt="Decorative frame"
                                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                            />
                            <div className="absolute inset-0 flex items-center justify-center px-6">
                                <p className="text-center text-[#D6C466] text-2xl md:text-3xl font-['League_Spartan'] leading-9 font-normal">
                                    Innovation &<br />Feasibility
                                </p>
                            </div>
                        </div>
                        <div className="relative w-[23rem] h-[14rem]">
                            <img
                                src="https://ik.imagekit.io/wlknxcf5m/Group%206.png"
                                alt="Decorative frame"
                                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                            />
                            <div className="absolute inset-0 flex items-center justify-center px-6">
                                <p className="text-center text-[#D6C466] text-2xl md:text-3xl font-['League_Spartan'] leading-9 font-normal">
                                    Delivery and<br />Team<br />Thinking
                                </p>
                            </div>
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
                className="h-screen w-full mt-14 md:mt-20 bg-cover bg-center py-16 md:py-20 relative flex items-start justify-center"
                style={{ backgroundImage: "url('https://ik.imagekit.io/wlknxcf5m/WhatsApp%20Image%202025-08-12%20at%2001.07.11_ac122249%201%20(1).png')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#000C00] via-transparent to-[#000C00] pointer-events-none" />
                <img src="https://ik.imagekit.io/wlknxcf5m/Group%207.png" className="absolute h-[50vh] -top-[5vh] z-15" />
                <div className="absolute w-[60vw] top-[50vh] text-center justify-start text-white text-2xl font-light font-['League_Spartan'] z-15">In a world driven by innovation and analytics, consulting is where smart thinking meets real-world impact. Whether it’s solving business puzzles or shaping billion-dollar decisions, consultants are problem-solvers at heart.<br/><br/>Road to Consulting is your chance to dive into this high-stakes world—understand what it takes, why it matters, and how you can get there, no matter your background.<br/>With India’s consulting industry set to triple by 2025, there’s no better time to explore the path of strategy, structure, and success.</div>
            </section>
            <div className="w-screen px-[15vw] mt-[10vh] text-center justify-center"><span class="text-white text-5xl font-normal font-['Girassol']">Be Ready to Learn from [Speaker Name]<br/><br/></span><span class="text-white text-2xl font-light font-['League_Spartan']"><br/><br/>Get insights straight from [Speaker Name], a consultant from [Firm Name, e.g., McKinsey & Company], who brings real client experience, interview expertise, and insider knowledge of the consulting world.<br/>From cracking live cases to building leadership skills early, [Speaker Name] will walk you through:<br/><br/> </span><span class="text-white text-2xl font-bold font-['League_Spartan']">How to think like a consultant?<br/> What top firms really look for?<br/><br/></span><span class="text-white text-2xl font-light font-['League_Spartan']">And how college is the best place to start preparing</span></div>
            <section className="w-full mt-14 md:mt-32 border-t bg-black border-[#D6C466]">
                <div className="w-[82vw] mx-auto py-10">
                    <h3 className="text-2xl font-bold font-['Cinzel_Decorative']">Contact Us</h3>
                    <div className="mt-3 space-y-1 text-xl md:text-2xl font-light font-['Poppins']">
                        <p>9907086720 (Syed Aarish Aabdi)</p>
                        <p>aarish.kiitecell@gmail.com</p>
                    </div>
                </div>
            </section>

            {/* POPUP FORM */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="relative w-[835px] h-[494px] bg-[#1B0D00] rounded-3xl border-4 border-[#CFB43C]">
                        {/* Close button */}
                        <button 
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 text-[#CFB43C] hover:text-[#CFB43C]/80 text-2xl font-bold"
                        >
                            ×
                        </button>

                        {/* Tab Headers */}
                        <div className="flex justify-center mt-8 gap-12">
                            <button 
                                onClick={() => setActiveTab('join')}
                                className={`text-3xl font-light font-['League_Spartan'] text-[#CFB43C] cursor-pointer`}
                            >
                                Join a Team
                            </button>
                            <button 
                                onClick={() => setActiveTab('create')}
                                className={`text-3xl font-light font-['League_Spartan'] text-[#CFB43C] cursor-pointer`}
                            >
                                Create a Team
                            </button>
                        </div>

                        {/* Tab Underline */}
                        <div className="flex justify-center mt-2">
                            {activeTab === 'join' && (
                                <div className="w-32 h-0 border-b border-[#CFB43C] ml-[-220px]"></div>
                            )}
                            {activeTab === 'create' && (
                                <div className="w-32 h-0 border-b border-[#CFB43C] ml-[200px]"></div>
                            )}
                        </div>

                        {/* Form Fields */}
                        <div className="px-16 mt-8">
                            <div className="grid grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full h-14 bg-[#CFB43C] rounded-2xl px-6 text-[#1B0D00] text-2xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Team Name" 
                                            className="w-full h-14 bg-[#CFB43C] rounded-2xl px-6 text-[#1B0D00] text-2xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Elixir ID"
                                            className="w-full h-14 bg-[#CFB43C] rounded-2xl px-6 text-[#1B0D00] text-2xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                        />
                                    </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Team ID"
                                                className="w-full h-14 bg-[#CFB43C] rounded-2xl px-6 text-[#1B0D00] text-2xl font-light font-['Inria_Serif'] placeholder-[#1B0D00]/70"
                                            />
                                        </div>
                                    
                                </div>
                            </div>

                            {/* Register Button */}
                            <div className="flex justify-center mt-46">
                                <button className="hover:scale-105 transition-transform cursor-pointer">
                                    <img
                                        src="https://ik.imagekit.io/wlknxcf5m/Group%208.png"
                                        alt="Register"
                                        className="w-64 h-auto"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
import React from "react";

export default function CaseX() {
    return (
        <div className="bg-[#000C00]">
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
                <div className="w-[85vw] h-[70vh] bg-lime-950/20 rounded-r-2xl border-b-1 border-[#D6C466] flex items-center justify-start z-10 relative">
                    <div className="w-56 h-64 left-18 opacity-50 bg-orange-300 rounded-full shadow-[0px_4px_100px_50px_rgba(115,70,37,1.00)] relative z-11">
                        
                    </div>
                    <img
                            src="https://ik.imagekit.io/wlknxcf5m/CaseXHeroBook.png"
                            alt="Book"
                            className="absolute z-12"
                            style={{ pointerEvents: "none" }}
                    />
                    <div className="w-[60vw] pl-[15vw] text-center justify-start"><span class="text-white text-2xl font-bold font-['League_Spartan']">Got sharp ideas? Love cracking real-world problems?<br/><br/></span><span class="text-white text-2xl font-light font-['League_Spartan']"> Case Battle is your chance to step out of the classroom and into the boardroom. Tackle actual industry challenges, battle it out with the brightest teams, and pitch your solution live to real experts.<br/>Top 10 teams make it to the finale at E-Summit 2025, where strategy, creativity, and confidence will decide who takes the crown.<br/>Think you've got what it takes?<br/><br/></span><span class="text-white text-2xl font-bold font-['League_Spartan']"> This is not a case study. This is war.</span></div>
                    <div className="absolute left-[61%] -translate-x-1/2 bottom-[-32px] z-20">
                        <button>
                            <img
                                src="https://ik.imagekit.io/wlknxcf5m/CaseXRegisterbutton%20(1).png"
                                alt="Register"
                                className="w-48 h-auto hover:scale-105 transition-transform duration-300"
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
                <h2 className="text-4xl md:text-6xl font-normal font-['Girassol'] text-lime-800 mb-6 text-center">About Us</h2>
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
                    <div className="absolute left-0 top-4">
                        <div className="absolute -z-10 -left-6 -top-6 w-40 h-40 rounded-full bg-green-900/20 blur-2xl" />
                        <img src="https://ik.imagekit.io/wlknxcf5m/stage-labyrinth.png" alt="Stage 1 Labyrinth" className="w-72 h-72 rounded-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-orange-300 text-4xl font-bold font-['League_Spartan'] [text-shadow:_2px_4px_4px_rgb(0_0_0_/_0.25)]">Stage 1</span>
                        </div>
                    </div>

                    {/* Labyrinth 2 */}
                    <div className="absolute right-2 bottom-2">
                        <div className="absolute -z-10 -right-6 -bottom-6 w-40 h-40 rounded-full bg-green-900/20 blur-2xl" />
                        <img src="https://ik.imagekit.io/wlknxcf5m/stage-labyrinth.png" alt="Stage 2 Labyrinth" className="w-72 h-72 rounded-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-orange-300 text-4xl font-bold font-['League_Spartan'] [text-shadow:_2px_4px_4px_rgb(0_0_0_/_0.25)]">Stage 2</span>
                        </div>
                    </div>

                    {/* Connecting path */}
                    <img
                        src="https://ik.imagekit.io/wlknxcf5m/stage-path.png"
                        alt="Path between stages"
                        className="absolute left-[22%] top-[38%] w-[56%] rotate-[-10deg] opacity-90"
                    />

                    {/* Stage 1 content box */}
                    <div className="absolute right-0 md:right-2 top-8 w-[420px]">
                        <div className="bg-lime-950/20 border border-lime-950/75 rounded-2xl p-6">
                            <h3 className="text-yellow-700 text-3xl font-bold font-['League_Spartan']">Preliminary Submission</h3>
                            <ul className="mt-3 text-orange-300 text-xl font-normal font-['League_Spartan'] list-disc pl-5 space-y-1">
                                <li>Participants will receive a real industry-based marketing or business problem</li>
                                <li>The case will be released 10 days before E-Summit.</li>
                                <li>Teams must analyze the case and submit a detailed solution.</li>
                                <li>A panel will evaluate submissions and shortlist the top 10 teams.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Stage 2 content box */}
                    <div className="absolute left-0 bottom-8 w-[420px]">
                        <div className="bg-lime-950/20 border border-lime-950/75 rounded-2xl p-6">
                            <h3 className="text-yellow-700 text-3xl font-bold font-['League_Spartan']">The Final Battle</h3>
                            <p className="mt-3 text-orange-300 text-xl font-normal font-['League_Spartan']">
                                Finalists will present their refined solution live at the Campus 7 Auditorium on Day 3 of E-Summit.
                            </p>
                            <p className="mt-3 text-orange-300 text-xl font-normal font-['League_Spartan']">Each team will get:</p>
                            <ul className="text-orange-300 text-xl font-normal font-['League_Spartan'] list-disc pl-5">
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

            {/* VENUE AND TIME */}
            <section id="venue" className="w-full max-w-[1200px] mx-auto px-6 md:px-8 mt-14 md:mt-20">
                <h2 className="text-4xl md:text-6xl font-normal font-['Girassol'] text-lime-800 mb-6">Venue and Time</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-black/40 border border-orange-300/30 rounded-2xl p-6">
                        <p className="text-2xl font-['League_Spartan']">24 August 2025</p>
                        <p className="text-lg md:text-2xl font-['League_Spartan'] opacity-90">9:00 AM - 4:00 PM</p>
                    </div>
                    <div className="bg-black/40 border border-orange-300/30 rounded-2xl p-6">
                        <p className="text-3xl md:text-4xl font-['League_Spartan']">Campus 17</p>
                        <p className="text-lg md:text-2xl font-['League_Spartan'] opacity-90">Auditorium</p>
                    </div>
                </div>
            </section>

            {/* EVALUATION CRITERIA */}
            <section id="evaluation" className="w-full max-w-[1200px] mx-auto px-6 md:px-8 mt-14 md:mt-20">
                <h2 className="text-center text-4xl md:text-6xl font-normal font-['Girassol'] text-lime-800 mb-8">Evaluation Criteria</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    {[
                        { title: "Strategic Thinking" },
                        { title: "Data-Driven Insights" },
                        { title: "Innovation & Feasibility" },
                        { title: "Delivery and Team Collaboration" },
                    ].map((c) => (
                        <div key={c.title} className="bg-yellow-950/70 rounded-xl p-6 border border-orange-300/10">
                            <p className="text-center text-orange-300 text-2xl md:text-3xl font-['League_Spartan'] leading-9">
                                {c.title}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CONTACT */}
            <section className="w-full mt-14 md:mt-20 border-t border-orange-300/30">
                <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-10">
                    <h3 className="text-2xl font-bold font-['Cinzel_Decorative']">Contact Us</h3>
                    <div className="mt-3 space-y-1 text-xl md:text-2xl font-light font-['Poppins']">
                        <p>9907086720 (Syed Aarish Aabdi)</p>
                        <p>aarish.kiitecell@gmail.com</p>
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
        </div>
    );
}
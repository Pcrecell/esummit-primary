"use client";
import React, { useState, useRef } from "react";

export default function CaseX() {
    const [showPopup, setShowPopup] = useState(false);
    const [activeTab, setActiveTab] = useState('join'); // 'join' or 'create'
    // Carousel state for mobile evaluation criteria
    const [evalIndex, setEvalIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const [dragX, setDragX] = useState(0); // current drag offset
    const [isDragging, setIsDragging] = useState(false);
    const touchStartX = useRef(null);
    const lastEvalIndex = useRef(0);

    const evalCriteria = [
        {
            label: "Strategic\nThinking",
            img: "https://ik.imagekit.io/wlknxcf5m/Group%206.png"
        },
        {
            label: "Data-Driven\nInsights",
            img: "https://ik.imagekit.io/wlknxcf5m/Group%206.png"
        },
        {
            label: "Innovation &\nFeasibility",
            img: "https://ik.imagekit.io/wlknxcf5m/Group%206.png"
        },
        {
            label: "Delivery and\nTeam\nThinking",
            img: "https://ik.imagekit.io/wlknxcf5m/Group%206.png"
        },
    ];

    // Carousel navigation with animation
    const goTo = (newIdx, dir) => {
        if (animating || newIdx === evalIndex) return;
        setDirection(dir);
        setAnimating(true);
        setTimeout(() => {
            setEvalIndex(newIdx);
            setAnimating(false);
            setDragX(0);
        }, 300); // match transition duration
    };

    // Touch/drag handlers for mobile carousel
    const handleTouchStart = (e) => {
        setIsDragging(true);
        touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
        lastEvalIndex.current = evalIndex;
    };
    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setDragX(clientX - touchStartX.current);
    };
    const handleTouchEnd = () => {
        setIsDragging(false);
        if (dragX > 60) {
            // Dragged right, go to previous, direction -1
            goTo((evalIndex === 0 ? evalCriteria.length - 1 : evalIndex - 1), -1);
        } else if (dragX < -60) {
            // Dragged left, go to next, direction 1
            goTo((evalIndex === evalCriteria.length - 1 ? 0 : evalIndex + 1), 1);
        } else {
            // Snap back
            setDirection(0);
            setAnimating(true);
            setTimeout(() => {
                setAnimating(false);
                setDragX(0);
            }, 200);
        }
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
                <div className="relative w-[95%] mt-[20vh] max-w-[600px] min-h-[50vh] bg-lime-950/20 rounded-2xl border-b border-[#D6C466] flex flex-col items-center justify-center p-4 z-10">
                    {/* Book image positioned on top border */}
                    <img
                        src="https://ik.imagekit.io/wlknxcf5m/CaseXHeroBook.png"
                        alt="Book"
                        className="absolute max-h-[50vh] left-1/2 -translate-x-1/2 -top-[65%] z-20 pointer-events-none"
                    />
                    <p className="text-white text-xl font-bold font-['League_Spartan'] text-center mb-2 mt-[60px]">
                        Got sharp ideas? Love cracking real-world problems?
                    </p>
                    <p className="text-white text-lg font-light font-['League_Spartan'] text-center mb-4">
                        Case Battle is your chance to step out of the classroom and into the boardroom...
                    </p>
                    <p className="text-white text-xl font-bold font-['League_Spartan'] text-center mb-4">
                        This is not a case study. This is war.
                    </p>
                    {/* Register button positioned on bottom border */}
                    <button
                        onClick={() => setShowPopup(false)}
                        className="absolute left-1/2 -translate-x-1/2 -bottom-8 z-30"
                    >
                        <img
                            src="https://ik.imagekit.io/wlknxcf5m/CaseXRegisterbutton%20(1).png"
                            alt="Register"
                            className="w-48 hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                    </button>
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
                        <div className="w-[15vw] h-[35vh] left-[10vw] top-[6vh] opacity-50 bg-orange-300 rounded-full shadow-[0px_4px_100px_50px_rgba(115,70,37,1.00)] relative z-11">
                            
                        </div>
                        <img
                                src="https://ik.imagekit.io/wlknxcf5m/CaseXHeroBook.png"
                                alt="Book"
                                className="absolute left-[2vw] max-w-[35vw] h-auto z-12"
                                style={{ pointerEvents: "none" }}
                        />
                        <div className="w-[70vw] pl-[25vw] text-center justify-start"><span class="text-white text-[2vw] lg:text-2xl font-bold font-['League_Spartan']">Got sharp ideas? Love cracking real-world problems?<br/><br/></span><span class="text-white text-[2vw] lg:text-2xl font-light font-['League_Spartan']">Case Battle is your chance to step out of the classroom and into the boardroom. Tackle actual industry challenges, battle it out with the brightest teams, and pitch your solution live to real experts.<br/>Top 10 teams make it to the finale at E-Summit 2025, where strategy, creativity, and confidence will decide who takes the crown.<br/>Think you've got what it takes?<br/><br/></span><span class="text-white text-[2vw] lg:text-2xl font-bold font-['League_Spartan']">This is not a case study. This is war.</span></div>
                        <div className="absolute left-[62vw] -translate-x-1/2 bottom-[-32px] z-20">
                            <button onClick={() => setShowPopup(false)}>
                                <img
                                    src="https://ik.imagekit.io/wlknxcf5m/CaseXRegisterbutton%20(1).png"
                                    alt="Register"
                                    className="w-48 h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
                                />
                            </button>
                        </div>
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
                        className="absolute left-[22%] top-[13%] w-[56%] rotate-14 md:rotate-14 xl:rotate-6 z-4"
                    />

                    {/* Stage 1 content box */}
                    <div className="absolute right-0 md:right-2 top-8 w-[37vw]">
                        <div className="bg-lime-950/60 border border-lime-950/75 rounded-2xl p-6">
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
                        <div className="bg-lime-950/60 border border-lime-950/75 rounded-2xl p-6">
                            <h3 className="text-[#958324] text-3xl font-bold font-['League_Spartan'] pb-2">The Final Battle</h3>
                            <ul className="text-[#D6C466] text-xl font-normal font-['League_Spartan'] list-disc pl-5">
                                <li>Finalists will present their refined solution live at the Campus 7 Auditorium on Day 3 of E-Summit.</li>
                            </ul>
                            <p className="text-[#D6C466] text-xl font-normal font-['League_Spartan'] list-disc pt-3 pb-3 pl-5">Each team will get:</p>
                            <ul className="text-[#D6C466] text-xl font-normal font-['League_Spartan'] list-disc pl-5">
                                <li>10 minutes to present</li>
                                <li>2 minutes for Q&amp;A with the jury</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Mobile layout - labyrinths and path in the middle, text boxes above and below */}
                <div className="md:hidden flex flex-col items-center relative py-8">
                    {/* Stage 1 content box (top) */}
                    <div className="w-full mb-4 z-20">
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
                    {/* Labyrinths and path in the middle */}
                    <div className="relative w-full flex-1 flex items-center justify-center min-h-[220px] my-2" style={{minHeight:'220px', height:'220px'}}>
                        {/* Labyrinth 1 - top left */}
                        <div className="absolute left-0 top-0 z-10 w-42 h-42">
                            <img src="https://ik.imagekit.io/wlknxcf5m/stage-labyrinth.png" alt="Stage 1 Labyrinth" className="w-full h-full rounded-full" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-orange-300 text-xl font-bold font-['League_Spartan'] [text-shadow:_2px_4px_4px_rgb(0_0_0_/_0.25)]">Stage 1</span>
                            </div>
                        </div>
                        {/* Labyrinth 2 - bottom right */}
                        <div className="absolute right-0 bottom-0 z-10 w-42 h-42">
                            <img src="https://ik.imagekit.io/wlknxcf5m/stage-labyrinth.png" alt="Stage 2 Labyrinth" className="w-full h-full rounded-full" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-orange-300 text-xl font-bold font-['League_Spartan'] [text-shadow:_2px_4px_4px_rgb(0_0_0_/_0.25)]">Stage 2</span>
                            </div>
                        </div>
                        {/* Path between labyrinths */}
                        <img
                            src="https://ik.imagekit.io/wlknxcf5m/stage-path.png"
                            alt="Path between stages"
                            className="absolute left-[18%] -top-[4%] w-[64%] -rotate-12 z-5 pointer-events-none"
                            style={{ minWidth: '180px', maxWidth: '90vw' }}
                        />
                    </div>
                    {/* Stage 2 content box (bottom) */}
                    <div className="w-full px-4 mt-4 z-20">
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
                        <img src="https://ik.imagekit.io/wlknxcf5m/clock.png" alt="Clock" className="w-[40vw] md:w-[15vw] h-auto drop-shadow-[0_4px_24px_rgba(214,196,102,0.4)]" />
                        <div>
                            <p className="text-2xl md:text-3xl font-['League_Spartan'] text-white">24 August 2025</p>
                            <p className="text-lg md:text-xl font-['League_Spartan'] text-white opacity-90">9:00 AM - 4:00 PM</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 text-center">
                        <img src="https://ik.imagekit.io/wlknxcf5m/calendar.png" alt="Calendar" className="w-[48vw] md:w-[18vw] h-auto drop-shadow-[0_4px_24px_rgba(214,196,102,0.4)]" />
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
                                    <p className="text-center text-[#D6C466] text-2xl md:text-3xl font-['League_Spartan'] leading-9 font-normal whitespace-pre-line">
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Mobile horizontal carousel with left/right arrows, animation, and touch drag */}
                    <div className="md:hidden flex flex-col items-center">
                        <div className="relative w-[90vw] max-w-[23rem] h-[14rem] mx-auto flex items-center select-none">
                            {/* Left arrow - closer and vertically centered */}
                            <button
                                aria-label="Previous"
                                onClick={() => goTo((evalIndex === 0 ? evalCriteria.length - 1 : evalIndex - 1), -1)}
                                className="absolute z-10 p-2 rounded-full bg-[#D6C466]/20 hover:bg-[#D6C466]/40 text-[#D6C466] text-2xl left-[-1.8rem] top-[52%] -translate-y-[52%]"
                            >
                                &#8592;
                            </button>
                            {/* Carousel frame with live drag and snap animation */}
                            <div
                                className="relative w-full h-full overflow-hidden"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                onMouseDown={handleTouchStart}
                                onMouseMove={e => isDragging && handleTouchMove(e)}
                                onMouseUp={handleTouchEnd}
                                onMouseLeave={() => isDragging && handleTouchEnd()}
                                style={{ touchAction: 'pan-y', cursor: isDragging ? 'grabbing' : 'grab' }}
                            >
                                {/* Slides wrapper */}
                                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                                    {/* Slides: animate both outgoing and incoming for correct direction */}
                                    {/* Outgoing (current) card */}
                                    <div
                                        className={`absolute w-full h-full transition-transform ${animating && !isDragging ? 'duration-300' : 'duration-0'}`}
                                        style={{
                                            transform: isDragging
                                                ? `translateX(${dragX}px)`
                                                : animating && direction !== 0
                                                    ? `translateX(${-direction * 100}%)`
                                                    : 'translateX(0)',
                                            zIndex: 2,
                                        }}
                                    >
                                        <img
                                            src={evalCriteria[evalIndex].img}
                                            alt="Decorative frame"
                                            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center px-6">
                                            <p className="text-center text-[#D6C466] text-2xl font-['League_Spartan'] leading-9 font-normal whitespace-pre-line">
                                                {evalCriteria[evalIndex].label}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Incoming card (only during animating, not dragging, and direction is set) */}
                                    {animating && !isDragging && direction !== 0 && (
                                        <div
                                            className="absolute w-full h-full transition-transform duration-300"
                                            style={{
                                                transform: `translateX(${direction * 100}%)`,
                                                zIndex: 1,
                                            }}
                                        >
                                            <img
                                                src={evalCriteria[(evalIndex + direction + evalCriteria.length) % evalCriteria.length].img}
                                                alt="Decorative frame"
                                                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center px-6">
                                                <p className="text-center text-[#D6C466] text-2xl font-['League_Spartan'] leading-9 font-normal whitespace-pre-line">
                                                    {evalCriteria[(evalIndex + direction + evalCriteria.length) % evalCriteria.length].label}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Right arrow - closer and vertically centered */}
                            <button
                                aria-label="Next"
                                onClick={() => goTo((evalIndex === evalCriteria.length - 1 ? 0 : evalIndex + 1), 1)}
                                className="absolute z-10 p-2 rounded-full bg-[#D6C466]/20 hover:bg-[#D6C466]/40 text-[#D6C466] text-2xl right-[-1.8rem] top-[52%] -translate-y-[52%]"
                            >
                                &#8594;
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

            {/*}
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
            */}

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
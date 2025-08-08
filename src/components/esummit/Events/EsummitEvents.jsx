"use client"

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import EventCard from './EventCard';
import EventsCalendar from './EventsCalendar';
import EventsMap from './EventsMap';
import HeroSection from './HeroSection';
import MobileTabs from './MobileTabs';
// import EventDecorative from '../../assets/Images/svg/EventDecorativeLeaves.svg'
// import Oracle_Frame_Right from '../../assets/Images/png/Oracle_Frame_Right.png'
import Oracle_Frame_Left from '../../../../public/images/esummit/events/Oracle_Frame_Left.png'
import Pandora_Frame_Right from '../../../../public/images/esummit/events/Pandora_Frame_Right.png'
import Pandora_Frame_Left from '../../../../public/images/esummit/events/Pandora_Frame_Left.png'
import AIF_Frame_Right from '../../../../public/images/esummit/events/AIF_Frame_Right.png'
import Image_Background_Desktop from '../../../../public/images/esummit/events/Events_Image_Background_Desktop.png'
import Image_Background_Mobile from '../../../../public/images/esummit/events/Events_Image_Background_Mobile.png'
// import AIF_Frame_Left from '../../assets/Images/png/AIF_Frame_Left.png'
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger);


const EventsPage = () => {
    const desktopLayoutRef = useRef(null);
    const leftSectionRef = useRef(null);
    const cardRefs = useRef([]);
    const footerRef = useRef(null);

    const [selectedDate, setSelectedDate] = useState(15);

    const tabs = [
        { date: 15, label: "15th Friday" },
        { date: 16, label: "16th Saturday" },
        { date: 17, label: "17th Sunday" }
    ];

    const eventsByDate = {
        15: [
            {
                title: "PANDORA'S PARADOX",
                time: "2:00PM - 8:00PM", 
                venue: "CAMPUS-25",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, exercitationem.",
                image: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/Pandora_Frame_Right.png?updatedAt=1754584352905",
            },
            {
                title: "CASEX",
                time: "8:00AM - 6:00PM",
                venue: "CAMPUS-25",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, exercitationem.",
                image: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/Oracle_Frame_Left.png?updatedAt=1754584352990",
            },
            {
                title: "PANDORA'S PARADOX",
                time: "2:00PM - 8:00PM", 
                venue: "CAMPUS-25",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, exercitationem.",
                image: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/Pandora_Frame_Right.png?updatedAt=1754584352905",
            },
            {
                title: "CASEX",
                time: "8:00AM - 6:00PM",
                venue: "CAMPUS-25",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, exercitationem.",
                image: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/Oracle_Frame_Left.png?updatedAt=1754584352990",
            },
        ],
        16: [
            {
                title: "ALICE IN FOUNDERLAND",
                time: "9:00AM - 5:00PM",
                venue: "CAMPUS-25",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, exercitationem.",
                image: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/AIF_Frame_Right.png?updatedAt=1754584352943",
            },
            {
                title: "PANDORA'S PARADOX",
                time: "9:00AM - 5:00PM",
                venue: "CAMPUS-25", 
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, exercitationem.",
                image: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/Pandora_Frame_Left.png?updatedAt=1754584353078",
            },
            {
                title: "ALICE IN FOUNDERLAND",
                time: "9:00AM - 5:00PM",
                venue: "CAMPUS-25",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, exercitationem.",
                image: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/AIF_Frame_Right.png?updatedAt=1754584352943",
            },
            {
                title: "PANDORA'S PARADOX",
                time: "9:00AM - 5:00PM",
                venue: "CAMPUS-25", 
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, exercitationem.",
                image: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/Pandora_Frame_Left.png?updatedAt=1754584353078",
            },
        ],
        17: [
            {
                title: "PANDORA'S PARADOX",
                time: "10:00AM - 4:00PM",
                venue: "CAMPUS-25",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, exercitationem.",
                image: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/Pandora_Frame_Right.png?updatedAt=1754584352905",
            },
            {
                title: "ORACLE",
                time: "5:00PM - 9:00PM",
                venue: "CAMPUS-25",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, exercitationem.",
                image: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/Oracle_Frame_Left.png?updatedAt=1754584352990",
            },
            {
                title: "PANDORA'S PARADOX",
                time: "10:00AM - 4:00PM",
                venue: "CAMPUS-25",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, exercitationem.",
                image: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/Pandora_Frame_Right.png?updatedAt=1754584352905",
            },
            {
                title: "ORACLE",
                time: "5:00PM - 9:00PM",
                venue: "CAMPUS-25",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, exercitationem.",
                image: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/Oracle_Frame_Left.png?updatedAt=1754584352990",
            }
        ]
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const currentEvents = eventsByDate[selectedDate] || eventsByDate[15];

    useGSAP(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
        if (!desktopLayoutRef.current || !leftSectionRef.current || cardRefs.current.length === 0) return;


        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        const cards = cardRefs.current.filter(card => card !== null);
        const totalCards = cards.length;

        cards.forEach((card, index) => {
            if (index === 0) {
                gsap.set(card, {
                    y: "0vh",
                    opacity: 1
                });
            } else {
                gsap.set(card, {
                    y: "100vh",
                    opacity: 0
                });
            }
        });

        const pinTrigger = ScrollTrigger.create({
            trigger: desktopLayoutRef.current,
            start: "top top",
            end: `+=${window.innerHeight * totalCards}`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const cardProgress = progress * totalCards;

                cards.forEach((card, index) => {
                    // Card 0: 0-1, Card 1: 1-2, Card 2: 2-3, etc.
                    const cardStart = index;
                    const cardEnd = index + 1;
                    
                    if (index === 0) {
                        if (cardProgress <= 1) {
                            if (cardProgress <= 0.8) {
                                gsap.set(card, {
                                    y: "0vh",
                                    opacity: 1
                                });
                            } else {
                                const outProgress = (cardProgress - 0.8) / 0.2;
                                gsap.set(card, {
                                    y: gsap.utils.interpolate("0vh", "-100vh", outProgress),
                                    opacity: gsap.utils.interpolate(1, 0, outProgress)
                                });
                            }
                        } else {
                            gsap.set(card, {
                                y: "-100vh",
                                opacity: 0
                            });
                        }
                    } else {
                        if (cardProgress >= cardStart && cardProgress <= cardEnd) {
                            if (index === totalCards - 1) {
                                // Last card: comes in and stays
                                if (cardProgress <= cardStart + 0.2) {
                                    const inProgress = (cardProgress - cardStart) / 0.2;
                                    gsap.set(card, {
                                        y: gsap.utils.interpolate("100vh", "0vh", inProgress),
                                        opacity: gsap.utils.interpolate(0, 1, inProgress)
                                    });
                                } else {
                                    gsap.set(card, {
                                        y: "0vh",
                                        opacity: 1
                                    });
                                }
                            } else {
                                // Middle cards: come in, stay, then go out
                                if (cardProgress <= cardStart + 0.2) {
                                    const inProgress = (cardProgress - cardStart) / 0.2;
                                    gsap.set(card, {
                                        y: gsap.utils.interpolate("100vh", "0vh", inProgress),
                                        opacity: gsap.utils.interpolate(0, 1, inProgress)
                                    });
                                } else if (cardProgress <= cardStart + 0.8) {
                                    gsap.set(card, {
                                        y: "0vh",
                                        opacity: 1
                                    });
                                } else {
                                    const outProgress = (cardProgress - cardStart - 0.8) / 0.2;
                                    gsap.set(card, {
                                        y: gsap.utils.interpolate("0vh", "-100vh", outProgress),
                                        opacity: gsap.utils.interpolate(1, 0, outProgress)
                                    });
                                }
                            }
                        } else if (cardProgress < cardStart) {
                            gsap.set(card, {
                                y: "100vh",
                                opacity: 0
                            });
                        } else if (cardProgress > cardEnd) {
                            if (index === totalCards - 1) {
                                gsap.set(card, {
                                    y: "0vh",
                                    opacity: 1
                                });
                            } else {
                                gsap.set(card, {
                                    y: "-100vh",
                                    opacity: 0
                                });
                            }
                        }
                    }
                });
            },
            onComplete: () => {
                if (cards[totalCards - 1]) {
                    gsap.set(cards[totalCards - 1], {
                        y: "0vh",
                        opacity: 1
                    });
                }
            }
        });

        return () => {
            pinTrigger.kill();
        };
    });

    return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
}, [currentEvents, selectedDate]);

    useEffect(() => {
        cardRefs.current = cardRefs.current.slice(0, currentEvents.length);
    }, [currentEvents]);

    return (
        <div className="min-h-screen overflow-hidden">

            <HeroSection/>
            {/* Desktop Layout */}
            <div 
                ref={desktopLayoutRef}
                className="lg:h-[120vh] lg:flex hidden relative"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(24, 28, 13, 1) 0%, rgba(24, 28, 13, 0.3) 70%, rgba(0, 0, 0, 1) 100%), url("https://ik.imagekit.io/fhervghik/E-Cell%20Website/Events_Image_Background_Desktop.png?updatedAt=1754584353201")`,
                    backgroundSize: "100%",       
                }}
            >
                {/* Left Scrollable Section */}
                <div
                    ref={leftSectionRef}
                    className="w-full lg:w-3/5 h-[120vh] px-6 py-8 relative flex items-center justify-center"
                >
                    <div className="absolute inset-0 pointer-events-none z-0">
                        {/* Background decorative elements can be added here */}
                    </div>

                    {/* Card Container */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {currentEvents.map((eventData, index) => (
                            <div 
                                key={`${selectedDate}-${index}`} 
                                ref={el => cardRefs.current[index] = el}
                                className="absolute w-full z-10"
                                style={{ 
                                    top: '20%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <EventCard 
                                    left={index % 2 === 0} 
                                    eventData={eventData}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Right Static Section */}
                <div className="w-2/5 p-8 bg-none h-[60vh] my-auto scale-75 flex flex-col justify-center">
                    <div>
                        <h1 className='text-3xl font-cormorant-infant text-center text-[#f8d6a4] font-semibold'>Events Calendar</h1>
                        <EventsCalendar 
                            selectedDate={selectedDate}
                            onDateSelect={handleDateSelect}
                        />
                        <p className="text-[#edbd90] text-base font-cormorant-infant flex items-center justify-center">
                            August {selectedDate}, 2025 - {currentEvents.length} event{currentEvents.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <div className="mt-3">
                        <h1 className='text-3xl font-cormorant-infant text-center text-[#f8d6a4] font-semibold'>Map Of The Emerald Empire</h1>
                        <EventsMap/>
                    </div>
                </div>
            </div>


            {/* Mobile Layout */}
            <div className="lg:hidden"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(24, 28, 13, 1) 0%, rgba(24, 28, 13, 0.3) 70%, rgba(0, 0, 0, 1) 100%), url("https://ik.imagekit.io/fhervghik/E-Cell%20Website/Events_Image_Background_Mobile.png?updatedAt=1754584353312")`,
                    backgroundSize: "100%",
                    backgroundPositionY: "",
                    backgroundPositionX: "",         
                }}
            >
                {/* Calendar Section - Above events on mobile */}
                <div className="bg-none p-6">
                    <h2 className="text-2xl font-bold text-[#edbd90] text-center font-cormorant-infant mb-2">Events Calendar</h2>
                    <div className="">
                        <MobileTabs 
                            selectedDate={selectedDate}
                            onDateSelect={handleDateSelect}
                            tabs={tabs}
                        />
                        <p className="text-[#edbd90] text-base font-cormorant-infant text-center">
                            August {selectedDate}, 2025 - {currentEvents.length} event{currentEvents.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                <div className="relative py-8">
                    {/* Background Decorative */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                        {/* <div 
                            className="absolute top-0 left-0 w-full h-full opacity-80"
                            style={{
                                backgroundImage: `url(${EventDecorative})`,
                                backgroundSize: '100%',
                                backgroundRepeat: 'repeat-y',
                                backgroundPosition: 'left center'
                            }}
                        /> */}
                    </div>

                    {/* Horizontal Scroll Container */}
                    <div className="relative z-10 px-4">
                        <div 
                            className="flex gap-6 overflow-x-auto scrollbar-hide pb-"
                            style={{
                                scrollSnapType: 'x mandatory',
                                WebkitOverflowScrolling: 'touch',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                            }}
                        >
                            {currentEvents.map((eventData, index) => (
                                <div 
                                    key={`mobile-${selectedDate}-${index}`} 
                                    className="flex-shrink-0 w-[85vw] sm:w-[70vw]"
                                    style={{ scrollSnapAlign: 'start' }}
                                >
                                    <EventCard 
                                        left={index % 2 === 0} 
                                        eventData={eventData}
                                    />
                                </div>
                            ))}
                        </div>
                        
                        {/* Scroll Indicator Dots */}
                        {currentEvents.length > 1 && (
                            <div className="flex justify-center mt-6 gap-2">
                                {currentEvents.map((_, index) => (
                                    <div 
                                        key={index}
                                        className="w-2 h-2 rounded-full bg-[#edbd90] opacity-30"
                                    />
                                ))}
                            </div>
                        )}
                        
                        {currentEvents.length === 0 && (
                            <div className="text-center text-[#edbd90] font-cormorant-infant text-xl py-12">
                                No events scheduled for this date
                            </div>
                        )}
                    </div>
                </div>

                {/* Map Section - Right below the cards */}
                <div className="bg-none p-6">
                    <h1 className='text-2xl font-cormorant-infant text-center text-[#f8d6a4] font-semibold'>MAP OF EMERALD EMPIRE</h1>
                    <EventsMap/>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
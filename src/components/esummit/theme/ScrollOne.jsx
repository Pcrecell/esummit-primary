import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

const images = [
    "https://ik.imagekit.io/kiitecell/Emerald_Desc.png",
    "https://ik.imagekit.io/kiitecell/Ruby_Desc.png",
    "https://ik.imagekit.io/kiitecell/Sapphire_Desc.png"
];

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 640px)');
        setIsMobile(mq.matches);
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);
    return isMobile;
}

const ScrollOne = () => {
    const isMobile = useIsMobile();
    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(true);
    const containerRef = useRef(null);
    const currentRef = useRef(0);
    const isScrolling = useRef(false);
    
    // Mobile touch/swipe states
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [translateX, setTranslateX] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);


     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const { userData, setUserData, profile, setProfile, loading} = useAuth();
     const router = useRouter();


    useEffect(() => {
        currentRef.current = current;
    }, [current]);

    // Desktop wheel handler
    useEffect(() => {
        if (isMobile) return;
        const handleWheel = (e) => {
            if (currentRef.current < images.length - 1) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (isScrolling.current) return;
            isScrolling.current = true;
            if (e.deltaY > 0 && currentRef.current < images.length - 1) {
                setFade(false);
                setTimeout(() => {
                    setCurrent((prev) => Math.min(prev + 1, images.length - 1));
                    setFade(true);
                    setTimeout(() => { isScrolling.current = false; }, 300);
                }, 250);
            } else if (e.deltaY < 0 && currentRef.current > 0) {
                setFade(false);
                setTimeout(() => {
                    setCurrent((prev) => Math.max(prev - 1, 0));
                    setFade(true);
                    setTimeout(() => { isScrolling.current = false; }, 300);
                }, 250);
            } else {
                setTimeout(() => { isScrolling.current = false; }, 300);
            }
        };
        const container = containerRef.current;
        if (container) {
            container.addEventListener("wheel", handleWheel, { passive: false });
        }
        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel);
            }
        };
    }, [isMobile]);

    // Mobile touch handlers
    const handleTouchStart = (e) => {
        if (isTransitioning) return;
        setStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || isTransitioning) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        setTranslateX(diff);
    };

    const handleTouchEnd = () => {
        if (!isDragging || isTransitioning) return;
        setIsDragging(false);
        setIsTransitioning(true);
        
        const threshold = 80; // Minimum swipe distance
        
        if (translateX > threshold && current > 0) {
            // Swipe right - go to previous
            setCurrent(prev => prev - 1);
        } else if (translateX < -threshold && current < images.length - 1) {
            // Swipe left - go to next
            setCurrent(prev => prev + 1);
        }
        
        // Reset translate and allow new interactions after animation
        setTranslateX(0);
        setTimeout(() => {
            setIsTransitioning(false);
        }, 300);
    };

    const containerHeight = isMobile ? 'auto' : 'calc(100vh - 120px)';
    const imgMaxWidth = isMobile ? '90vw' : '90vw';
    const imgMaxHeight = isMobile ? '120px' : 'calc(100vh - 180px)';

    if (isMobile) {
        // Mobile carousel view - show only current card
        return (
            <div className="w-full flex flex-col items-center justify-center gap-4" style={{ position: "relative", padding: '8px 0' }}>
                <div className="w-full flex justify-center overflow-hidden" style={{ height: '200px' }}>
                    <div
                        className="flex items-center justify-center relative"
                        style={{ width: '80vw', maxWidth: '350px', minWidth: '220px' }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="bg-white/5 rounded-xl flex flex-col items-center justify-center transition-transform duration-300 ease-out"
                            style={{ 
                                width: '100%', 
                                height: '180px',
                                transform: `translateX(${translateX}px)`
                            }}
                        >
                            <img
                                src={images[current]}
                                alt={`Image ${current + 1}`}
                                className="object-contain"
                                style={{ width: '100%', height: '100%', borderRadius: '12px' }}
                                draggable={false}
                            />
                        </div>
                    </div>
                </div>
                
                {/* Dots indicator */}
                <div className="flex gap-2 py-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                idx === current ? 'bg-green-500 scale-125' : 'bg-white/30'
                            }`}
                            onClick={() => {
                                if (!isTransitioning) {
                                    setIsTransitioning(true);
                                    setCurrent(idx);
                                    setTimeout(() => setIsTransitioning(false), 300);
                                }
                            }}
                        />
                    ))}
                </div>
                
                {/* Register button */}
               {!userData && (
  <div className="w-full flex justify-center pt-2">
      <button
          onClick={() => router.replace('/register')}
          className="inline-block rounded-full font-bold transition-transform transform hover:scale-105 hover:shadow-xl"
          style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontFamily: "Judson, serif",
              backgroundColor: "#20956E",
              color: "#FFFFFF",
              border: "2px solid #15A944",
              boxShadow: `0 8px 24px rgba(32, 149, 110, 0.4), 0 4px 12px rgba(32, 149, 110, 0.2)`,
          }}
      >
          Register Now
      </button>
  </div>
)}

            </div>
        );
    }

    // Desktop: scrollable one at a time
    return (
        <div className="w-full flex flex-col items-center justify-center gap-4" style={{ position: "relative", height: containerHeight, minHeight: containerHeight, paddingTop: '40px', paddingBottom: '40px' }}>
            <div
                ref={containerRef}
                className="w-full flex items-center justify-center overflow-visible"
                style={{ position: "relative", height: imgMaxHeight, minHeight: imgMaxHeight, alignItems: 'center', justifyContent: 'center', display: 'flex' }}
            >
                <div
                    className="rounded-xl flex flex-col items-center justify-center"
                    style={{ width: '90vw', maxWidth: '1200px', minWidth: '400px', height: imgMaxHeight, alignItems: 'center', justifyContent: 'center', display: 'flex', padding: '32px' }}
                >
                    <img
                        src={images[current]}
                        alt={`Image ${current + 1}`}
                        className={`object-contain transition-all duration-500 ${fade ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '18px', objectFit: 'contain', objectPosition: 'center' }}
                    />
                </div>
            </div>
           {!userData && (
  <div className="w-full flex justify-center pt-4">
      <button
          onClick={() => router.push("/register")}
          className="inline-block rounded-full font-bold transition-transform transform hover:scale-105 hover:shadow-xl"
          style={{
              padding: '18px 40px',
              fontSize: '20px',
              fontFamily: "Judson, serif",
              backgroundColor: "#20956E",
              color: "#FFFFFF",
              border: "2px solid #15A944",
              boxShadow: `0 8px 32px rgba(32, 149, 110, 0.7), 0 4px 16px rgba(32, 149, 110, 0.4)`,
              opacity: 1,
              fontWeight: 700,
          }}
      >
          Register Now
      </button>
  </div>
)}

        </div>
    );
};

export default ScrollOne;
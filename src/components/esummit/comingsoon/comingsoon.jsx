"use client";

import { useEffect, useRef, useState } from 'react';

export default function ComingSoon() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Video handling
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        video.play().catch(error => {
          console.log("Autoplay prevented, trying muted play:", error);
          video.muted = true;
          video.play().catch(e => console.log("Still can't play:", e));
        });
        setVideoLoaded(true);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background with loading state */}
      <div className="absolute inset-0 z-0">
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <div className="text-white">Loading video...</div>
          </div>
        )}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover ${videoLoaded ? 'block' : 'hidden'}`}
          preload="auto"
        >
          <source
            src="https://ik.imagekit.io/tm5te9cjl/Medusa_Statue_Animation_with_Subtle_Parallax%20(1).mp4?updatedAt=1755029381058"
            type="video/mp4"
          />
          Your browser does not support HTML5 video.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
    </div>
  );
}
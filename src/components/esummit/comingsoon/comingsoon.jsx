"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {} from 'next/font/google'

const Alumini = Alumni_Sans_Inline_One({
  subsets: ['latin'],
  weight: "400"
})

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
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className='absolute inset-0 flex flex-col gap-12 justify-center items-center z-10'>
        <div className=''>
          <Image
            src={"https://i.postimg.cc/C1s2B7Ds/image.png"}
            width={600}
            height={600}
          />
        </div>
        <div className='flex flex-col gap-6'>
          <p className='text-9xl text-[#2eb24c] tracking-wider font-[Alumni_Sans_Inline_One]'>We Are Cooking.</p>
          <p className='text-2xl text-white text-center font-bold'>We’re going to launch our event specific website very soon</p>
        </div>
      </div>
    </div>
  );
}
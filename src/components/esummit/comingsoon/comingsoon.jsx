"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {Montserrat} from 'next/font/google'
import {Instagram, Linkedin, Youtube} from "lucide-react"

const montserrat = Montserrat({
  subsets: ['latin'],
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
          video.muted = true;
          video.play().catch(e => console.error("Cant Play Video: ", e));
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
          style={{
            filter: "contrast(1.2)"
          }}
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
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className='absolute inset-0 flex flex-col gap-12 justify-end items-center z-10 mb-12'>
        <div className=''>
          <Image
            src={"https://i.postimg.cc/C1s2B7Ds/image.png"}
            width={300}
            height={300}
          />
        </div>
        <div className='flex flex-col gap-6 w-full'>
          <p className='text-5xl text-center md:text-7xl text-[#ffffff] font-[Montserrat] font-semibold md:tracking-widest'>Launching <span className='font-extrabold text-[#0ef743]'>Soon</span></p>
          <p className='text-md max-w-80 mx-auto md:text-xl md:max-w-none text-white text-center font-bold'>"We’re going to launch our event specific website very soon"</p>
        </div>
        <div className='flex flex-row gap-5 justify-self-end items-end'>
          <a href="https://www.instagram.com/ecell_kiit/" target='_blank'>
            <Instagram/>
          </a>
          <a href="https://www.linkedin.com/company/kiit-e-cell/" target='_blank'>
            <Linkedin/>
          </a>
          <a href="https://www.youtube.com/@KIIT-ECELL" target='_blank'>
            <Youtube/>
          </a>
        </div>
      </div>
    </div>
  );
}
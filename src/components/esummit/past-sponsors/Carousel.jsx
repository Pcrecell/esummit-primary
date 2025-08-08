"use client"

import React, { useState } from "react";
import { past_sponsors } from "../../../../public/images/image-links";
import { Skeleton } from '@mui/material';


const images = [past_sponsors.sponsor_1.link, past_sponsors.sponsor_2.link, past_sponsors.sponsor_3.link, past_sponsors.sponsor_1.link, past_sponsors.sponsor_2.link, past_sponsors.sponsor_3.link];

const Carousel = () => {
  // Track loading and error state for each image
  const [loadedImages, setLoadedImages] = useState(Array(images.length).fill(false));
  const [erroredImages, setErroredImages] = useState(Array(images.length).fill(false));

  return (
   <div className="relative w-full overflow-hidden bg-black py-4 md:py-6 min-h-[100px]">
      <style>{`
        @keyframes scroll-left-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .scroll-track {
          animation: scroll-left-right 7s linear infinite;
          display: flex;
          width: max-content;
        }
      `}</style>

      {/* Side gradient fades */}
      <div className="absolute left-0 top-0 h-full w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Scrolling image track */}
      <div className="scroll-track z-0">
        <div className="flex gap-8 md:gap-12 px-4">
          {images.map((image, index) => (
            <div key={index} className="relative h-16 md:h-20 flex items-center justify-center">
              {(!loadedImages[index] && !erroredImages[index]) && (
                <Skeleton
                  variant="rectangular"
                  animation="pulse"
                  width={80}
                  height={64}
                  sx={{ position: 'absolute', width: '100%', height: '100%' }}
                />
              )}
              <img
                src={image}
                alt={`carousel-${index}`}
                loading="lazy"
                fetchPriority="low"
                className={`h-16 w-auto md:h-20 object-contain transition-opacity duration-700 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'} ${erroredImages[index] ? 'hidden' : ''}`}
                onLoad={() => setLoadedImages(prev => { const arr = [...prev]; arr[index] = true; return arr; })}
                onError={() => setErroredImages(prev => { const arr = [...prev]; arr[index] = true; return arr; })}
                style={{ position: 'relative', zIndex: 1 }}
                draggable={false}
              />
              {erroredImages[index] && (
                <Skeleton
                  variant="rectangular"
                  animation="pulse"
                  width={80}
                  height={64}
                  sx={{ position: 'absolute', width: '100%', height: '100%' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

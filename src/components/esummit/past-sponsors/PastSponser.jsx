"use client"

import { past_sponsors } from '../../../../public/images/image-links';
import { Skeleton } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';

function PastSponser() {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  return (
    <div className="flex items-center justify-center mt-4 md:mt-0">
      {(!loaded && !errored) && (
        <Skeleton
          variant="rectangular"
          animation="pulse"
          width="100%"
          height={80}
          sx={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '0.75rem' }}
        />
      )}
      <Image
        src={past_sponsors.past_sponsors_text.link}
        alt={past_sponsors.past_sponsors_text.alt}
        width={1200}
        height={1200}
        className={`object-contain max-w-[300px] sm:max-w-[400px] my-auto sm:mt-0 sm:mb-0 h-full shadow-lg rounded-xl p-2 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${errored ? 'hidden' : ''}`}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        style={{ position: 'relative', zIndex: 1 }}
        draggable={false}
      />
      {errored && (
        <Skeleton
          variant="rectangular"
          animation="pulse"
          width="100%"
          height={80}
          sx={{ borderRadius: '0.75rem' }}
        />
      )}
    </div>
  );
}
export default PastSponser;

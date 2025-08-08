"use client"

import React, { useEffect, useState, useRef, useCallback } from 'react';

const PageTransition = ({ children }) => {
  // const location = useLocation();
  // const navigate = useNavigate();
  const [blurIntensity, setBlurIntensity] = useState(0);
  const isTransitioningRef = useRef(false);

  const executeTransition = useCallback(async (targetRoute) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    
    const isHomepage = targetRoute === '/' || targetRoute === '/Gallery';
    const blurIn = isHomepage ? 700 : 400;
    const blurOut = isHomepage ? 600 : 350;
    const maxBlur = isHomepage ? 30 : 25;
    
    // Blur in
    await new Promise(resolve => {
      let start = null;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / blurIn, 1);
        
        setBlurIntensity(progress * progress * maxBlur);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(animate);
    });
    
    // Navigate and wait for new page to mount
    // navigate(targetRoute);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Ensure we still have the blur before starting blur-out
    setBlurIntensity(maxBlur);
    
    // Small delay to ensure new page is rendered
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Blur out
    await new Promise(resolve => {
      let start = null;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / blurOut, 1);
        
        setBlurIntensity(maxBlur * (1 - progress));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setBlurIntensity(0);
          isTransitioningRef.current = false;
          resolve();
        }
      };
      requestAnimationFrame(animate);
    });
  }, []);

  // useEffect(() => {
  //   const handleClick = (e) => {
  //     const link = e.target.closest('a[href^="/"]');
  //     if (!link || isTransitioningRef.current) return;
      
  //     const href = link.getAttribute('href');
  //     const skipPages = ['/esummit/register', '/esummit/login', '/esummit/reset-password', '/esummit/forgot-password'];
      
  //     if (skipPages.includes(href) || skipPages.includes(location.pathname)) return;
      
  //     if (href && href !== location.pathname) {
  //       e.preventDefault();
  //       executeTransition(href);
  //     }
  //   };

  //   document.addEventListener('click', handleClick, true);
  //   return () => document.removeEventListener('click', handleClick, true);
  // }, [location.pathname, executeTransition]);
  return (
    <>
      {children}
      {blurIntensity > 0 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          backdropFilter: `blur(${blurIntensity}px)`,
          backgroundColor: `rgba(0, 0, 0, ${Math.min(blurIntensity / 25 * 0.15, 0.15)})`,
          willChange: 'backdrop-filter, background-color'
        }} />
      )}
    </>
  );
};

export default PageTransition;

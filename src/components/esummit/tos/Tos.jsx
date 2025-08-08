import React, { useEffect, useRef } from "react";
import CustomScrollBar from "../custom-scrollbar/CustomScrollBar";
const PP = () => {
  const sectionRefs = useRef([]);
  
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Add CSS for animations
    const style = document.createElement('style');
    style.innerHTML = `
      .reveal-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
      }
      
      .reveal-section.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all sections
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, []);

  const poppinsBold = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
  };

  return (
    <div>
      <CustomScrollBar />
      
      <main className="relative min-h-screen flex items-center justify-center" style={{
        backgroundImage: `url(https://ik.imagekit.io/kiitecell/background_tropical.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundColor: "#000000",
      }}>
        {/* Background scroll image */}
        <div className="" style={{
          backgroundImage: "url(https://ik.imagekit.io/kiitecell/tos_scrol.png)",
          backgroundSize: "auto 95vh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute", 
          inset: 0,
          zIndex: 1
        }}></div>
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
          <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[35%] h-[80%] sm:h-[75%] md:h-[70%] flex flex-col justify-start items-center pt-36 sm:pt-36 md:pt-32 lg:pt-24 px-3 sm:px-4 md:px-6 lg:px-8 text-center">

            <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              <h1 className="text-green-400 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2" style={poppinsBold}>
                Terms of Service
              </h1>
            </div>

            {/* Content */}
            <section className="w-full space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 overflow-y-auto max-h-[69%] sm:max-h-[60%] md:max-h-[72%] text-xs sm:text-sm md:text-base">
              <div ref={el => sectionRefs.current[0] = el} className="reveal-section">
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-green-300">1. Acceptance of Terms</h2>
                <p className="mt-1 sm:mt-2 text-green-100">
                  By accessing or using the{" "}
                  <span className="text-green-400 font-semibold">KIIT E-Cell E-Summit</span>, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree,{" "}
                  <span className="text-green-400 font-semibold">please do not use our website</span>.
                </p>
              </div>

              <div ref={el => sectionRefs.current[1] = el} className="reveal-section">
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-green-300">2. Use License</h2>
                <p className="mt-1 sm:mt-2 text-green-100">
                  We may collect personal information such as your name, email address, phone number, and any other information you voluntarily provide through forms or registrations on our site.
                </p>
              </div>

              <div ref={el => sectionRefs.current[2] = el} className="reveal-section">
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-green-300">3. Disclaimer</h2>
                <p className="mt-1 sm:mt-2 text-green-100">
                  All materials on the website are provided{" "}
                  <span className="text-green-400 font-semibold">"as is"</span>. KIIT E-Cell makes no warranties, expressed or implied, and hereby disclaims all other warranties.
                </p>
              </div>

              <div ref={el => sectionRefs.current[3] = el} className="reveal-section">
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-green-300">4. Cookies</h2>
                <p className="mt-1 sm:mt-2 text-green-100">
                  In no event shall{" "}
                  <span className="text-green-400 font-semibold">KIIT E-Cell</span> or its affiliates be liable for any damages arising out of the use or inability to use the materials on the website.
                </p>
              </div>

              <div ref={el => sectionRefs.current[4] = el} className="reveal-section">
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-green-300">5. Modifications</h2>
                <p className="mt-1 sm:mt-2 text-green-100">
                  KIIT E-Cell may revise these terms at any time without notice. By using this site, you agree to be bound by the{" "}
                  <span className="text-green-400 font-semibold">current version</span> of the Terms of Service.
                </p>
              </div>
              <div ref={el => sectionRefs.current[5] = el} className="reveal-section">
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-green-300">6. Governing Law</h2>
                <p className="mt-1 sm:mt-2 text-green-100">
                  These terms are governed by and construed in accordance with the{" "}
                  <span className="text-green-400 font-semibold">laws of India</span>.
                </p>
              </div>

            </section>
            
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default PP;

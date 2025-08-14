import Image from "next/image";
import Particles from "./Particles";
import aboutBg from "../../../../../public/images/hackathon/about-side-bg.png";
import banner from "../../../../../public/images/hackathon/about-banner.png";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // add weights you need
});

const AboutPage = () => {
  return (
    <section
      id="aboutus"
      className="relative min-h-[120vh] w-full bg-black flex flex-col lg:flex-row items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 max-h-[90vh]">
        <Image
          src={aboutBg}
          alt="About background"
          fill
          priority
          className="object-cover opacity-30 "
        />
        {/* Greenish overlay */}
        <div className="absolute inset-0 bg-green-900/20"></div>
        {/* Backing gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-transparent"></div>
      </div>

      {/* Bottom black gradient overlay*/}
      <div className="absolute bottom-0 left-0 right-0 h-84 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      {/* Top black gradient overlay */}
     <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-10" /> 

      {/* Particle Background */}
      <div className="absolute inset-0 z-5">
        <Particles
          particleColors={["#f2ff00", "#525700"]}
          particleCount={1500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Red Banner - Top Left Corner */}
      <div className="absolute top-0 left-0 z-30">
        <div className="hidden lg:block relative w-[500px] xl:w-[600px] h-[700px] xl:h-[850px] -ml-4 lg:-ml-8">
          <Image
            src={banner}
            alt="About banner"
            fill
            priority
            className="object-contain"
          />

          {/* Title Overlay on Banner - Desktop */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[#D4AF37] text-center font-bold select-none leading-tight px-4">
              <h1
                className="text-4xl xl:text-5xl tracking-wider"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)"
                }}
              >
                ABOUT
                <br />
                THE
                <br />
                PARADOX
              </h1>
            </div>
          </div>
        </div>

        {/* Mobile Banner - Rotated */}
        <div className="lg:hidden absolute top-0 left-50">
          <div
            className="relative w-[200px] h-[400px] sm:w-[240px] sm:h-[480px]"
            style={{
              transform: "rotate(90deg)",
              transformOrigin: "100px 100px",
            }}
          >
            <Image
              src={banner}
              alt="About banner"
              fill
              priority
              className="object-contain"
            />

            {/* Title Overlay on Banner - Mobile (keeping text straight) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="text-[#D4AF37] text-center font-bold select-none leading-tight px-4"
                style={{ transform: "rotate(-90deg)" }}
              >
                <h1
                  className="text-2xl sm:text-3xl tracking-wider"
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)"
                  }}
                >
                  ABOUT
                  <br />
                  THE
                  <br />
                  PARADOX
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 w-full min-h-screen flex items-center justify-center">
        {/* Full Width Background for Content */}
        <div className="w-full py-16 lg:py-24">
          <div className="max-w-9xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex justify-end">
            {/* Content Box - Right Side on Desktop, Adjusted for Mobile */}
            <div className="w-full lg:w-2/3 xl:w-1/2 max-w-2xl lg:mr-8 xl:mr-16 mt-2 sm:mt-40 lg:mt-0">
              {/* Green Border Box */}
              <div className="relative rounded-lg p-6 sm:p-8 lg:p-10 backdrop-blur-sm">
               

                {/* Text Content */}
                <div className="text-[#ffffad] leading-relaxed text-center space-y-6">
                  <p className="text-sm sm:text-base lg:text-3xl">
                    Pandora's Paradox is the premier hackathon event organised
                    by KIIT E-Cell, an innovation marathon event that brings
                    together creativity and execution. The event is designed to
                    instill fearless boundaryless thinking; engaging the most
                    brilliant minds in multiple disciplines to compete,
                    collaborate, and create impactful solutions in 72 hours.
                  </p>

                  <p className="text-sm sm:text-base lg:text-3xl">
                    Pandora's Paradox features real-world problem statements,
                    localized resources, expert mentorship, and more. It is not
                    simply a hackathon, it's a launchpad for changemakers who
                    are ready to turn their bold ideas into action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
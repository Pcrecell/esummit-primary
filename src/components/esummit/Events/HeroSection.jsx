import { motion, useScroll, useTransform } from 'framer-motion';
import { esummit_events_page } from '../../../../public/images/image-links';
// import { Anton } from "next/font/google"

const HeroSection = () => {

    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);

    return(
        <div>

        <motion.div
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.3)), url(${esummit_events_page.hero_section.link})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundPositionY: backgroundY,
                backgroundRepeat: 'no-repeat'
            }}
            className="relative h-[500px] w-full flex items-center justify-center z-0"
        >
            {/* Gradient overlay at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#181C0D] to-transparent"></div>
        </motion.div>

        <div className="w-full bg-[#181C0D] py-12 -mt-8 md:-mt-24 flex justify-center">
            <motion.div className="flex">
                {"EVENTS".split('').map((letter, index) => {
                    const isFirstOrLast = index === 0 || index === "EVENTS".length - 1;

                    return (
                        <motion.span
                            key={index}
                            className={`text-[72px] sm:text-[160px] font-bold text-center font-[Anton] text-white px-1 ${isFirstOrLast ? 'cursor-pointer' : 'cursor-default'}`}
                            initial={{
                                opacity: 0,
                                y: 60,
                                scale: 0.9,
                                textShadow: "0 0 0 rgba(16, 189, 27, 0)" // Initial glow state
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                textShadow: "0 0 10px rgba(16, 189, 27, 0.8)", // Default glow
                                // transition: {
                                //     delay: index * 0.2,
                                //     duration: 1,
                                //     ease: "easeOut"
                                // }
                                transition: {
                                    duration: 1.5,
                                    ease: "easeOut"
                                }
                            }}
                        >
                            {letter}
                        </motion.span>
                    );
                })}
            </motion.div>
        </div> 
        </div>    
    )
}

export default HeroSection
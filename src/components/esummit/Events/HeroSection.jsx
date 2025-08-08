import { motion, useScroll, useTransform } from 'framer-motion';
import { esummit_events_page } from '../../../../public/images/image-links';
import { Anton } from "next/font/google"

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
                                rotate: 0,
                                textShadow: "0 0 0 rgba(16, 189, 27, 0)" // Initial glow state
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                rotate: 0,
                                textShadow: "0 0 10px rgba(16, 189, 27, 0.8)", // Default glow
                                transition: {
                                    delay: index * 0.2,
                                    duration: 1,
                                    ease: "easeOut"
                                }
                            }}
                            whileHover={{
                                textShadow: isFirstOrLast
                                    ? [
                                        "0 0 15px rgba(16, 189, 27, 0.9)",
                                        "0 0 25px rgba(16, 170, 26, 0.9)",
                                        "0 0 35px rgba(172, 15, 15, 0.9)"
                                    ]
                                    : "0 0 10px rgba(16, 189, 27, 0.8)",
                                transition: {
                                    duration: 0.5,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }
                            }}
                            onHoverStart={(e) => {
                                if (!isFirstOrLast) return;

                                const letters = e.target.parentElement.children;
                                const direction = index === 0 ? 1 : -1;

                                for (let i = 0; i < letters.length; i++) {
                                    const position = direction === 1 ? i : letters.length - 1 - i;
                                    const delay = position * 150;
                                    const height = -30 + (position * 3);

                                    setTimeout(() => {
                                        // Animate both position and glow
                                        letters[position].animate([
                                            {
                                                transform: 'translateY(0)',
                                                textShadow: '0 0 10px rgba(16, 189, 27, 0.8)'
                                            },
                                            {
                                                transform: `translateY(${height}px)`,
                                                textShadow: '0 0 25px rgba(16, 170, 26, 0.9)'
                                            },
                                            {
                                                transform: 'translateY(-10px)',
                                                textShadow: '0 0 15px rgba(15, 172, 41, 0.8)'
                                            },
                                            {
                                                transform: 'translateY(0)',
                                                textShadow: '0 0 10px rgba(16, 189, 27, 0.8)'
                                            }
                                        ], {
                                            duration: 2500,
                                            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
                                        });
                                    }, delay);
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
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import FullScreenMenu from './FullScreenMenu';

// Match the preloader character stagger style
const characterReveal = {
    hidden: { y: 15, opacity: 0, scale: 0.95, filter: 'blur(8px)' },
    visible: (delay) => ({
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: delay,
        }
    })
};

const fadeUp = {
    hidden: { opacity: 0, y: 15, scale: 0.98, filter: 'blur(8px)' },
    visible: (delay) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
            delay: delay,
        }
    })
};

// Helper to split text and apply staggers
const SplitText = ({ text, baseDelay, stagger, className, customVariants, ready }) => {
    return text.split("").map((char, i) => (
        <motion.span
            key={i}
            className={className}
            variants={customVariants || characterReveal}
            initial={ready ? false : "hidden"} // Prevent re-animation if already ready
            animate={ready ? "visible" : "hidden"}
            custom={baseDelay + (i * stagger)}
            style={{ display: char === " " ? "inline" : "inline-block" }}
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    ));
};

// Memoized content block to prevent re-animations when menu toggles
const HeroContent = React.memo(({ ready }) => (
    <main className="flex-1 flex items-center justify-center relative z-10 px-6 md:px-12 lg:px-24">
        <motion.div className="flex flex-col items-center text-center w-full relative">
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[150px] rounded-[100%] pointer-events-none -z-10"></div>

            <h1 className="text-[4rem] md:text-[6.5rem] lg:text-[7.5rem] font-bold tracking-tight text-white leading-[0.9] mb-6 drop-shadow-lg max-w-5xl relative flex flex-col items-center">
                <span className="block">
                    <SplitText
                        text="ErbilVerse"
                        baseDelay={0.4}
                        stagger={0.04}
                        className="inline-block"
                        ready={ready}
                    />
                </span>
                <span className="block text-[2rem] md:text-[3.5rem] lg:text-[4rem] text-[#74573e] mt-2 py-2">
                    <SplitText
                        text="The Digital Layer of Real Estate"
                        baseDelay={0.8}
                        stagger={0.02}
                        className="inline-block"
                        ready={ready}
                    />
                </span>
            </h1>

            <div className="overflow-hidden mb-12">
                <motion.p
                    className="max-w-2xl text-[1.1rem] md:text-[1.25rem] text-white/50 font-light leading-[1.6]"
                    variants={fadeUp}
                    initial={ready ? false : "hidden"}
                    animate={ready ? "visible" : "hidden"}
                    custom={1.2}
                >
                    A living digital city where property, projects, and market activity come together.
                </motion.p>
            </div>

            <motion.div
                variants={fadeUp}
                initial={ready ? false : "hidden"}
                animate={ready ? "visible" : "hidden"}
                custom={1.4}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
                <button className="relative w-full sm:w-auto px-10 py-4 rounded-full bg-[#111638]/60 backdrop-blur-md border border-white/10 hover:border-[#d4a373]/50 text-white font-medium text-[15px] tracking-wide shadow-2xl transition-all duration-500 flex items-center justify-center gap-4 group">
                    <span className="relative z-10">Enter the City</span>
                    <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#d4a373] transition-colors duration-500">
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-[#111638] transition-colors duration-500" />
                    </span>
                </button>
            </motion.div>
        </motion.div>
    </main>
));

HeroContent.displayName = 'HeroContent';

const HeroPage = ({ ready = true }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#000] font-sans selection:bg-[#75573f] selection:text-white flex flex-col">
            {/* Background Layer (Video) */}
            <div className="absolute inset-0 z-0">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="/Video_pingpong.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="absolute inset-0 bg-[#000]/40 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#000]/60 via-[#000]/30 to-[#000]/80 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_25%,rgba(0,0,0,0.85)_100%)] pointer-events-none"></div>
            </div>

            {/* Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="fixed top-0 left-0 right-0 z-[300] flex items-center justify-between px-6 py-6 md:px-12 lg:px-24 w-full max-w-[1600px] mx-auto pointer-events-none"
            >
                <div className="flex items-center cursor-pointer pointer-events-auto">
                    <img src="/logo.svg" alt="Erbilverse" className="h-10 w-auto" />
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="group relative flex items-center justify-end cursor-pointer pointer-events-auto w-16 h-8 overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={menuOpen ? 'close' : 'menu'}
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -15, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                            className="absolute text-[13px] font-medium text-white/50 group-hover:text-white transition-colors duration-300 tracking-[0.15em] uppercase"
                        >
                            {menuOpen ? 'Close' : 'Menu'}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </motion.nav>

            <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            <HeroContent ready={ready} />

            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#000] to-transparent pointer-events-none z-20"></div>
        </div>
    );
};

export default HeroPage;

import React from 'react';
import { motion, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import DataGlobe from './ui/DataGlobe';

const HeroContent = React.memo(({ progress, preloaderActive }) => {
    const navigate = useNavigate();
    // Phase 1: Fade out Hero as scroll begins (0 to 0.15)
    const opacity = useTransform(progress, [0, 0.15], [1, 0]);

    return (
        <motion.main
            style={{ opacity }}
            className="absolute inset-0 z-0 flex flex-col items-center justify-center"
        >
            {/* The Globe Background */}
            <div className="absolute inset-0 z-0 pointer-events-auto">
                <DataGlobe coreColor="#111638" />
            </div>

            {/* Bottom-to-top dark overlay so text is readable */}
            <div className="absolute inset-0 z-[5] bg-gradient-to-t from-[#111638] via-[#111638]/60 to-transparent pointer-events-none" />

            {/* Overlay Typography */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center px-4 mt-24 md:mt-40">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={preloaderActive ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="pointer-events-auto mb-4"
                >
                    <span className="text-[#74573e] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
                        THE DIGITAL LAYER OF REAL ESTATE
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={preloaderActive ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="pointer-events-auto text-white text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-center mb-6 leading-none"
                >
                    ERBILVERSE
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={preloaderActive ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="flex flex-col items-center gap-6"
                >
                    <p className="pointer-events-auto text-gray-200 text-center text-base md:text-2xl max-w-3xl font-light leading-relaxed px-4">
                        ERBILVERSE is a unified digital environment where real estate activity across the city becomes continuously visible and interactive.
                    </p>

                </motion.div>

                {/* CTA Button & Small Text */}
                <div className="flex flex-col items-center gap-6 mt-12">
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={preloaderActive ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        onClick={() => { }}
                        className="pointer-events-auto bg-[#75573f] text-white px-10 py-4 rounded-full font-light hover:bg-[#8c6d53] transition-all duration-300 flex items-center justify-center gap-3 drop-shadow-[0_0_15px_rgba(117,87,63,0.3)] hover:drop-shadow-[0_0_25px_rgba(117,87,63,0.5)] group"
                    >
                        Enter the City
                        <div className="bg-white/10 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm ml-1 transition-all duration-300 group-hover:bg-white/20 group-hover:translate-x-1">
                            →
                        </div>
                    </motion.button>

                </div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0 }} animate={preloaderActive ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
                    className="pointer-events-auto grid grid-cols-2 md:flex md:flex-row gap-y-8 gap-x-4 md:gap-16 mt-12 md:mt-20 text-center items-center justify-center max-w-sm md:max-w-none"
                >
                    <div className="col-span-1">
                        <div className="text-white font-medium text-lg md:text-xl">5,000+</div>
                        <div className="text-gray-400/80 text-[10px] md:text-sm mt-1 uppercase tracking-wider font-light">Mapped Locations</div>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-white/10" />
                    <div className="col-span-1 border-l border-white/5 md:border-none pl-4 md:pl-0">
                        <div className="text-white font-medium text-lg md:text-xl">Real-time</div>
                        <div className="text-gray-400/80 text-[10px] md:text-sm mt-1 uppercase tracking-wider font-light">City Data Layer</div>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-white/10" />
                    <div className="col-span-2 md:col-span-1 pt-4 md:pt-0 border-t border-white/5 md:border-none">
                        <div className="text-white font-medium text-lg md:text-xl">Web3</div>
                        <div className="text-gray-400/80 text-[10px] md:text-sm mt-1 uppercase tracking-wider font-light">Powered Platform</div>
                    </div>
                </motion.div>
            </div>
        </motion.main>
    );
});

HeroContent.displayName = 'HeroContent';

const HeroPage = ({ ready, progress, preloaderActive }) => {
    const opacity = useTransform(progress, [0, 0.15, 0.25, 0.3], [1, 1, 1, 0]);

    return (
        <motion.div style={{ opacity }} className="relative min-h-[100dvh] w-full bg-[#111638] overflow-hidden selection:bg-[#74573e] selection:text-white">
            <HeroContent ready={ready} progress={progress} preloaderActive={preloaderActive} />
        </motion.div>
    );
};

export default HeroPage;

import React from 'react';
import { motion, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const HeroContent = React.memo(({ progress, preloaderActive }) => {
    const navigate = useNavigate();
    // 1. Overlay fades out almost immediately on scroll
    const overlayOpacity = useTransform(progress, [0, 0.02, 0.15], [1, 1, 0]);
    // Also fade out the canvas itself, so only the #111638 background color remains for SecondSection.
    const canvasOpacity = useTransform(progress, [0, 0.02, 0.15], [1, 1, 0]);

    // 2. All text elements fade out alongside the canvas and overlay
    const contentOpacity = useTransform(progress, [0, 0.02, 0.15], [1, 1, 0]);


    const VIDEO_URL = '/VideoHero.mp4';

    return (
        <motion.main
            className="absolute inset-0 z-0 flex flex-col items-center justify-center"
        >
            {/* The Video Background */}
            <motion.div style={{ opacity: canvasOpacity }} className="w-full h-full bg-[#111638] absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <video
                    src={VIDEO_URL}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_#111638_110%)] opacity-90" />
            </motion.div>

            {/* Bottom-to-top dark overlay so text is readable */}
            <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 z-[5] bg-gradient-to-t from-[#111638] via-[#111638]/60 to-transparent pointer-events-none"
            />

            {/* Overlay Typography */}
            <motion.div style={{ opacity: contentOpacity }} className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center px-4 mt-24 md:mt-40">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={preloaderActive ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="pointer-events-none mb-4"
                >
                    <span className="text-[#74573e] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
                        THE DIGITAL LAYER OF REAL ESTATE
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={preloaderActive ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="pointer-events-none text-white text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-center mb-6 leading-none"
                >
                    ERBILVERSE
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={preloaderActive ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col items-center gap-6"
                >
                    <p className="pointer-events-none text-gray-200 text-center text-base md:text-2xl max-w-3xl font-light leading-relaxed px-4">
                        ERBILVERSE is a unified digital environment where real estate activity across the city becomes continuously visible and interactive.
                    </p>
                </motion.div>

                {/* CTA Button & Small Text */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={preloaderActive ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col items-center gap-6 mt-12"
                >
                    <button
                        onClick={() => { }}
                        className="pointer-events-auto bg-[#75573f] text-white px-10 py-4 rounded-full font-light hover:bg-[#8c6d53] transition-[background-color,filter] duration-300 flex items-center justify-center gap-3 drop-shadow-[0_0_15px_rgba(117,87,63,0.3)] hover:drop-shadow-[0_0_25px_rgba(117,87,63,0.5)] group"
                    >
                        Enter the City
                        <div className="bg-white/10 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm ml-1 transition-[background-color,transform] duration-300 group-hover:bg-white/20 group-hover:translate-x-1">
                            →
                        </div>
                    </button>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={preloaderActive ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
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
            </motion.div>


        </motion.main>
    );
});

HeroContent.displayName = 'HeroContent';

const HeroPage = ({ ready, progress, preloaderActive }) => {
    // We want the Hero Page background & image to remain visible under the Second Section.
    // So we do not fade the HeroPage's opacity out. We just let it translate over naturally.
    return (
        <motion.div
            style={{ transform: 'translateZ(0)' }}
            className="relative min-h-[100dvh] w-full bg-[#111638] selection:bg-[#74573e] selection:text-white pointer-events-none"
        >
            <HeroContent ready={ready} progress={progress} preloaderActive={preloaderActive} />
        </motion.div>
    );
};

export default HeroPage;

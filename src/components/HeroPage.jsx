import React from 'react';
import { motion, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import DataGlobe from './ui/DataGlobe';

const HeroContent = React.memo(({ progress }) => {
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
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center px-4 mt-40">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
                    className="pointer-events-auto text-white text-5xl md:text-7xl font-semibold tracking-tight text-center"
                >
                    Explore Erbil.
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
                    className="pointer-events-auto text-white text-5xl md:text-7xl font-semibold tracking-tight mb-6 text-center"
                >
                    Digitally.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
                    className="pointer-events-auto text-gray-300/80 max-w-2xl text-center text-lg md:text-2xl mb-10 font-light"
                >
                    The world's first digital layer for Erbil — mapping culture, architecture, and innovation across the city.
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
                    onClick={() => navigate('/map')}
                    className="pointer-events-auto bg-[#75573f] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#8c6d53] transition-all duration-300 flex items-center justify-center gap-3 drop-shadow-[0_0_15px_rgba(117,87,63,0.3)] hover:drop-shadow-[0_0_25px_rgba(117,87,63,0.5)]"
                >
                    Enter the City
                    <div className="bg-white/10 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm ml-1 transition-colors group-hover:bg-white/20">
                        →
                    </div>
                </motion.button>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
                    className="pointer-events-auto flex gap-16 mt-20 text-center items-center"
                >
                    <div>
                        <div className="text-white font-medium text-lg md:text-xl">5,000+</div>
                        <div className="text-gray-400/80 text-xs md:text-sm mt-1 uppercase tracking-wider font-light">Mapped Locations</div>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div>
                        <div className="text-white font-medium text-lg md:text-xl">Real-time</div>
                        <div className="text-gray-400/80 text-xs md:text-sm mt-1 uppercase tracking-wider font-light">City Data Layer</div>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div>
                        <div className="text-white font-medium text-lg md:text-xl">Web3</div>
                        <div className="text-gray-400/80 text-xs md:text-sm mt-1 uppercase tracking-wider font-light">Powered Platform</div>
                    </div>
                </motion.div>
            </div>
        </motion.main>
    );
});

HeroContent.displayName = 'HeroContent';

const HeroPage = ({ ready, progress }) => {
    const opacity = useTransform(progress, [0, 0.15, 0.25, 0.3], [1, 1, 1, 0]);

    return (
        <motion.div style={{ opacity }} className="relative min-h-[100dvh] w-full bg-[#111638] overflow-hidden selection:bg-[#74573e] selection:text-white">
            <HeroContent ready={ready} progress={progress} />
        </motion.div>
    );
};

export default HeroPage;

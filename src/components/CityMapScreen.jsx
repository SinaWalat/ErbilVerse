import React from 'react';
import { motion } from 'framer-motion';
import MotionTrailsBackground from './MotionTrailsBackground';

const CityMapScreen = () => {
    return (
        <section className="relative w-full py-40 px-6 md:px-16 text-white overflow-hidden lg:min-h-screen flex items-center">
            {/* Animated Motion Trails Background */}
            <MotionTrailsBackground />

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Text Content Block */}
                <div className="flex flex-col items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[#74573e] text-xs md:text-sm tracking-[0.4em] uppercase font-light mb-8 block font-serif italic">
                            Section 02
                        </span>
                        <h2 className="text-6xl sm:text-7xl md:text-8xl font-serif font-medium tracking-tight text-white leading-[1.0] mb-8">
                            Explore <br />
                            <span className="text-[#74573e] italic">the Digital City</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="w-24 h-[1px] bg-white/20 mb-10 origin-left"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-md"
                    >
                        Navigate Erbil in an interactive environment and discover real districts and developments across the city.
                    </motion.p>
                </div>

                {/* Interactive Map Visual Placeholder - Ultra Modern Soft Look */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full aspect-[4/3] overflow-visible flex items-center justify-center transform group"
                >
                    {/* Spatial Floating Elements Instead of a Box */}
                    <div className="absolute inset-0 bg-white/5 rounded-3xl pointer-events-none" />

                    {/* Interactive UI Element floating freely */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 flex flex-col items-center justify-center h-full w-full"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="w-24 h-24 rounded-full border border-[#74573e]/20 flex items-center justify-center mb-8 relative backdrop-blur-md"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.3], opacity: [0.2, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                                className="absolute inset-0 rounded-full border border-[#74573e]/30"
                            />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#74573e]" />
                        </motion.div>
                        <span className="text-xs md:text-sm tracking-[0.4em] text-white/50 uppercase font-sans font-medium">
                            Initializing Map Data
                        </span>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default CityMapScreen;

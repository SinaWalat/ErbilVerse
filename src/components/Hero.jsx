import React from 'react';
import { ArrowRight, Box } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-grid-pattern">
            {/* Abstract 3D City Vibe Background */}
            <div className="absolute top-1/2 right-[-10%] sm:right-[5%] md:right-[15%] transform -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-secondary/20 blur-[80px] -z-10"></div>

            {/* Decorative Hologram Circles */}
            <div className="absolute top-1/4 right-[10%] w-[500px] h-[500px] rounded-full border border-primary-light/30 opacity-50 -z-10 animate-[spin_40s_linear_infinite]"></div>
            <div className="absolute top-1/4 right-[10%] w-[300px] h-[300px] rounded-full border border-secondary/20 opacity-40 -z-10 animate-[spin_20s_linear_infinite_reverse]"></div>

            <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-border bg-glass-bg backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                        <span className="text-xs uppercase tracking-widest text-text-muted font-medium">ErbilVerse Version 1.0</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold font-outfit leading-[1.1] mb-6"
                    >
                        The <span className="text-gradient">Digital Layer</span><br />
                        of Real Estate
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-lg md:text-xl text-text-muted mb-10 max-w-lg font-light leading-relaxed"
                    >
                        A living digital city where property, projects, and market activity come together.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="flex flex-wrap items-center gap-5"
                    >
                        <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary-light to-primary border border-primary-light/50 text-white font-medium hover:shadow-glow transition-all duration-300 group">
                            <span>Enter the City</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-glass-bg border border-border text-white font-medium hover:bg-white/5 transition-all duration-300">
                            <Box size={18} className="text-secondary-light" />
                            <span>Explore Projects</span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Visual Mock Platform Element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="relative hidden lg:block perspective-[2000px]"
                >
                    <motion.div
                        animate={{ rotateY: [-15, -5, -15], rotateX: [10, 5, 10] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="relative w-full aspect-square max-w-[600px] ml-auto transform rotate-y-[-15deg] rotate-x-[10deg] transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0"
                    >
                        {/* Holographic Platform Base */}
                        <div className="absolute inset-x-10 bottom-10 h-32 rounded-[100%] border-2 border-secondary/30 bg-primary-light/10 shadow-[0_0_50px_rgba(122,85,58,0.2)]"></div>
                        <div className="absolute inset-x-20 bottom-16 h-20 rounded-[100%] border border-primary/50 bg-primary/20 shadow-glow blur-[2px]"></div>

                        {/* Hologram Beams */}
                        <motion.div
                            animate={{ opacity: [0.4, 0.7, 0.4] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute bottom-32 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-gradient-to-t from-primary-light/40 to-transparent blur-xl clip-path-polygon-[10%_100%,90%_100%,60%_0%,40%_0%]"
                        ></motion.div>

                        {/* Floating Glass Cards representing Data */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute top-20 right-10 glass-panel p-4 rounded-xl shadow-2xl border-secondary/30"
                        >
                            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Live Value</p>
                            <p className="font-outfit font-bold text-xl text-gradient-gold">IQD 450.2M</p>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                            className="absolute top-40 left-0 glass-panel p-4 rounded-xl shadow-2xl"
                        >
                            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Active Projects</p>
                            <p className="font-outfit font-bold text-xl">124 Developments</p>
                        </motion.div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;

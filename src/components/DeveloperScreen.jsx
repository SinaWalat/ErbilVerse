import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const DeveloperScreen = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Create a subtle parallax effect for the entire section background
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    const features = [
        {
            title: "Showcase in 3D",
            desc: "Present your projects in full spatial fidelity instead of flat images.",
            stat: "Interactive",
            icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
        },
        {
            title: "Connect with Audiences",
            desc: "Reach active buyers and tenants directly within the digital platform.",
            stat: "Global Reach",
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        },
        {
            title: "Direct Engagement",
            desc: "Receive inquiries and manage interest through a dedicated dashboard.",
            stat: "Real-time",
            icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        },
        {
            title: "Digital Positioning",
            desc: "Establish your brand globally in Erbil's premier virtual landscape.",
            stat: "Premium",
            icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        }
    ];

    return (
        <section ref={containerRef} className="relative w-full py-32 md:py-48 bg-[#111638] text-white overflow-hidden flex flex-col items-center justify-center">

            {/* Elegant Parallax Background Elements */}
            <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#74573e]/10 to-transparent" />
            </motion.div>

            <div className="max-w-[1400px] mx-auto w-full px-6 md:px-16 lg:px-24 xl:px-32 relative z-10 flex flex-col">

                {/* Hero Introduction */}
                <div className="flex flex-col mb-32 items-center text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-sm font-bold tracking-[0.2em] text-[#74573e] uppercase mb-8 block">
                            Ecosystem Partners
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-white leading-none mb-12 font-medium">
                            For <br className="md:hidden" />
                            <span className="text-[#fcfcfc]">Developers</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed mb-16 max-w-3xl mx-auto">
                            A new digital presence inside Erbil’s interactive city layer. Leverage cutting-edge technology to showcase your developments to a global audience.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-[#111638] px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#74573e] hover:text-white transition-all duration-300 shadow-xl"
                        >
                            Partner With Us
                        </motion.button>
                    </motion.div>
                </div>

                {/* Staggered Feature Blocks (Instead of generic cards) */}
                <div className="flex flex-col gap-32 relative">
                    {/* Central Vertical Connector Line */}
                    <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2 hidden sm:block" />

                    {features.map((feature, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 lg:gap-32 w-full relative z-10 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Center Node for Timeline */}
                                <div className="hidden sm:flex absolute left-8 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-[#111638] border border-white/20 items-center justify-center shadow-md">
                                    <div className="w-3 h-3 rounded-full bg-[#74573e]" />
                                </div>

                                {/* Text Content */}
                                <div className={`w-full md:w-1/2 pl-24 sm:pl-32 md:-pl-0 flex flex-col ${isEven ? 'md:items-end md:text-right md:pr-16' : 'md:items-start md:text-left md:pl-16'}`}>
                                    <span className="text-xs font-bold tracking-widest text-[#74573e] uppercase mb-4 block">
                                        {feature.stat}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-6 tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-lg text-zinc-400 leading-relaxed font-light max-w-sm">
                                        {feature.desc}
                                    </p>
                                </div>

                                {/* Minimalist Icon/Graphic Display */}
                                <div className="w-full md:w-1/2 hidden md:flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="w-48 h-48 rounded-[2rem] bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center mt-8 md:mt-0"
                                    >
                                        <svg className="w-16 h-16 text-[#74573e] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={feature.icon} />
                                        </svg>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default DeveloperScreen;

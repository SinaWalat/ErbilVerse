import React from 'react';
import { motion } from 'motion/react';

const LaunchPhaseSection = () => {
    const milestones = [
        { label: 'Founding Partners', status: 'active' },
        { label: 'Platform Beta', status: 'upcoming' },
        { label: 'Public Launch', status: 'upcoming' },
    ];

    return (
        <section className="relative w-full py-36 md:py-52 bg-[#111638] text-white overflow-hidden">

            {/* Ambient glows */}
            <div className="absolute top-1/4 right-[15%] w-[600px] h-[600px] rounded-full bg-[#74573e]/[0.05] blur-[200px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#1a2050]/80 blur-[150px] pointer-events-none" />

            {/* Fine dot grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-24 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

                    {/* Left — Content (7 cols) */}
                    <div className="lg:col-span-7">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#74573e]/20 bg-[#74573e]/[0.05] mb-10"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#74573e] opacity-40" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#74573e]" />
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.3em] text-[#74573e] uppercase">Launch Phase</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 35 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] tracking-tight font-light leading-[1.05] mb-12"
                        >
                            Launch<br />
                            <span className="text-[#74573e]">Phase</span>
                        </motion.h2>

                        {/* Body */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="max-w-xl mb-16"
                        >
                            <p className="text-[17px] md:text-lg text-white/50 font-light leading-[1.9] mb-6">
                                ERBILVERSE will begin with a limited number of founding development partners responsible for the initial launch phase in Erbil.
                            </p>
                            <p className="text-[15px] md:text-base text-white/30 font-light leading-[1.8] pl-5 border-l border-[#74573e]/30">
                                A private working presentation is available for selected parties.
                            </p>
                        </motion.div>

                        {/* Milestone Progress */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                            className="flex items-center gap-0"
                        >
                            {milestones.map((m, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full border-2 transition-all ${m.status === 'active'
                                            ? 'bg-[#74573e] border-[#74573e] shadow-[0_0_12px_rgba(116,87,62,0.5)]'
                                            : 'bg-transparent border-white/15'
                                            }`} />
                                        <span className={`text-[11px] font-semibold tracking-wider uppercase ${m.status === 'active' ? 'text-[#74573e]' : 'text-white/20'
                                            }`}>
                                            {m.label}
                                        </span>
                                    </div>
                                    {i < milestones.length - 1 && (
                                        <div className={`w-12 md:w-20 h-[1px] mx-4 ${m.status === 'active' ? 'bg-[#74573e]/40' : 'bg-white/[0.06]'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — Animated visual (5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="lg:col-span-5 relative flex items-center justify-center"
                    >
                        <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]">

                            {/* Outer ring — dashed */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    border: '1px dashed #74573e',
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute top-[10%] right-[5%] w-2 h-2 rounded-full bg-[#74573e]/50" />
                                <div className="absolute bottom-[15%] left-[8%] w-1.5 h-1.5 rounded-full bg-white/10" />
                            </motion.div>

                            {/* Second ring */}
                            <motion.div
                                className="absolute inset-[12%] rounded-full border border-white/50"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#74573e]/40 shadow-[0_0_8px_rgba(116,87,62,0.3)]" />
                                <div className="absolute bottom-[20%] right-0 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/15" />
                            </motion.div>

                            {/* Third ring */}
                            <motion.div
                                className="absolute inset-[26%] rounded-full border border-[#74573e]"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#74573e]/60 shadow-[0_0_6px_rgba(116,87,62,0.4)]" />
                            </motion.div>

                            {/* Inner ring */}
                            <div className="absolute inset-[36%] rounded-full border border-[#74573e]/60" />

                            {/* Core circle */}
                            <div className="absolute inset-[40%] rounded-full bg-gradient-to-br from-[#74573e]/[0.12] to-[#74573e]/[0.04] border border-[#74573e]/20 flex items-center justify-center backdrop-blur-sm">
                                <div className="text-center">
                                    <motion.span
                                        className="text-3xl md:text-4xl font-extralight text-white/90 block tracking-tight"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        01
                                    </motion.span>
                                    <motion.span
                                        className="text-[8px] tracking-[0.35em] text-[#74573e] uppercase font-bold mt-0.5 block"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 1 }}
                                    >
                                        Phase
                                    </motion.span>
                                </div>
                            </div>

                            {/* Core glow */}
                            <div className="absolute inset-[32%] rounded-full bg-[#74573e]/[0.06] blur-[50px] pointer-events-none" />

                            {/* Floating particles */}
                            <motion.div
                                className="absolute top-[8%] left-[45%] w-1 h-1 rounded-full bg-[#74573e]/30"
                                animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute bottom-[12%] right-[35%] w-1 h-1 rounded-full bg-white/15"
                                animate={{ y: [0, 6, 0], opacity: [0.15, 0.3, 0.15] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />
                            <motion.div
                                className="absolute top-[40%] right-[8%] w-0.5 h-0.5 rounded-full bg-[#74573e]/40"
                                animate={{ y: [0, -5, 0], opacity: [0.4, 0.7, 0.4] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default LaunchPhaseSection;

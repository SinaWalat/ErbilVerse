import React from 'react';
import { motion } from 'motion/react';

const LatestActivityVisual = () => (
    <div className="relative w-full h-48 md:h-56 flex flex-col justify-end overflow-hidden border-b border-white/5 bg-gradient-to-t from-white/5 to-transparent p-6">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
        <div className="relative z-10 w-full flex items-end justify-between gap-2 h-24">
            {[40, 70, 45, 90, 60, 85, 50, 75].map((height, i) => (
                <motion.div
                    key={i}
                    className="w-full bg-[#74573e] rounded-t-sm"
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: `${height}%`, opacity: height > 60 ? 1 : 0.6 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                />
            ))}
        </div>
    </div>
);

const RecentInteractionsVisual = () => (
    <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden border-b border-white/5 bg-gradient-to-t from-white/5 to-transparent">
        <svg viewBox="0 0 100 100" className="w-40 h-40">
            {/* Center Node */}
            <motion.circle cx="50" cy="50" r="6" className="fill-[#74573e]"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} />

            {/* Pulsing ring */}
            <motion.circle cx="50" cy="50" r="15" className="stroke-[#74573e]/30 fill-none" strokeWidth="1"
                animate={{ scale: [1, 2.5], opacity: [0.8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }} />

            {/* Connecting lines and satellite nodes */}
            {[
                { x: 20, y: 30 }, { x: 80, y: 25 }, { x: 30, y: 80 }, { x: 75, y: 70 }, { x: 15, y: 60 }
            ].map((pos, i) => (
                <g key={i}>
                    <motion.line x1="50" y1="50" x2={pos.x} y2={pos.y} className="stroke-white/20" strokeWidth="1" strokeDasharray="2 2"
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 + i * 0.1 }} />
                    <motion.circle cx={pos.x} cy={pos.y} r="3" className="fill-zinc-400"
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.1, type: 'spring' }} />

                    {/* Activity dots moving along lines */}
                    <motion.circle r="1.5" className="fill-white"
                        initial={{ cx: 50, cy: 50, opacity: 0 }}
                        animate={{ cx: pos.x, cy: pos.y, opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }} />
                </g>
            ))}
        </svg>
    </div>
);

const EnvironmentMovementVisual = () => (
    <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden border-b border-white/5 bg-gradient-to-t from-white/5 to-transparent">
        <svg viewBox="0 0 100 100" className="w-40 h-40">
            {/* Abstract map/environment contours */}
            <motion.path d="M 10 50 Q 30 20 60 40 T 90 30" fill="none" className="stroke-white/10" strokeWidth="1.5"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
            <motion.path d="M 15 65 Q 40 45 70 70 T 95 55" fill="none" className="stroke-[#74573e]/40" strokeWidth="1.5"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.2 }} />
            <motion.path d="M 5 80 Q 25 70 50 85 T 85 75" fill="none" className="stroke-white/10" strokeWidth="1.5"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.4 }} />

            {/* Moving scanning line mapping the environment */}
            <motion.line x1="0" y1="0" x2="0" y2="100" className="stroke-[#74573e]/50" strokeWidth="3"
                style={{ filter: 'blur(2px)' }}
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: [0, 100, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
        </svg>
    </div>
);

const sections = [
    {
        title: "Latest Activity",
        desc: "Monitor real-time aggregate events shaping the platform ecosystem system-wide.",
        Visual: LatestActivityVisual
    },
    {
        title: "Recent Interactions",
        desc: "Peer-to-peer and system engagements recorded continually, indicating system activity.",
        Visual: RecentInteractionsVisual
    },
    {
        title: "Environment Movement",
        desc: "Dimensional shifts in participant density and structural updates across the ERBILVERSE map.",
        Visual: EnvironmentMovementVisual
    }
];

const LiveActivityEnvironment = () => {
    return (
        <section className="relative w-full py-24 md:py-32 bg-[#111638] text-white border-t border-white/5 overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#74573e]/[0.08] blur-[200px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full flex flex-col items-center">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="px-4 py-1.5 rounded-full border border-[#74573e]/30 bg-[#74573e]/10 text-[#cbb59d] text-xs font-semibold tracking-wider uppercase mb-6"
                    >
                        Dynamic System
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 font-medium"
                    >
                        Live Activity <span className="text-zinc-500">Environment.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base md:text-lg text-zinc-400 font-light max-w-2xl leading-relaxed"
                    >
                        Within ERBILVERSE, platform layers evolve automatically in response to structured platform activity. The system reflects interaction, movement, and engagement across the city.
                    </motion.p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {sections.map((section, idx) => {
                        const Visual = section.Visual;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                                className="flex flex-col bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-colors duration-500"
                            >
                                <Visual />
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-medium text-zinc-200 mb-3">{section.title}</h3>
                                    <p className="text-sm text-zinc-400 font-light leading-relaxed">{section.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default LiveActivityEnvironment;

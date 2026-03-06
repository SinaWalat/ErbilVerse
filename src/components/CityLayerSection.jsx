import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const AnimatedCityNetwork = ({ className }) => {
    const [hoveredCity, setHoveredCity] = useState(null);

    const cities = [
        { id: 'erbil', name: 'Erbil', cx: 400, cy: 400, r: 10, delay: 0, main: true },
        { id: 'sulaymaniyah', name: 'Sulaymaniyah', cx: 250, cy: 220, r: 6, delay: 0.2, main: true },
        { id: 'duhok', name: 'Duhok', cx: 550, cy: 180, r: 6, delay: 0.4, main: true },
        { id: 'kirkuk', name: 'Kirkuk', cx: 650, cy: 450, r: 6, delay: 0.6, main: true },
        { id: 'halabja', name: 'Halabja', cx: 500, cy: 650, r: 6, delay: 0.8, main: true },
        { id: 'zakho', name: 'Zakho', cx: 220, cy: 580, r: 6, delay: 1.0, main: true },
        { id: 'ranya', name: 'Ranya', cx: 300, cy: 100, r: 4, delay: 1.2 },
        { id: 'soran', name: 'Soran', cx: 750, cy: 350, r: 4, delay: 1.4 },
        { id: 'akre', name: 'Akre', cx: 600, cy: 750, r: 4, delay: 1.6 },
        { id: 'amadiya', name: 'Amadiya', cx: 150, cy: 700, r: 4, delay: 1.8 },
        { id: 'shaikhan', name: 'Shaikhan', cx: 100, cy: 350, r: 4, delay: 2.0 },
    ];

    return (
        <div className={`relative pointer-events-auto ${className || ''}`}>
            <svg viewBox="0 0 800 800" className="w-full h-full cursor-crosshair" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="netGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#74573e" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#74573e" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#111638" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="netLine" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#74573e" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="subLine" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#74573e" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* Center Glow */}
                <motion.circle
                    cx="400" cy="400" r="350" fill="url(#netGlow)"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />


                {/* Dynamic Main Lines */}
                <motion.g strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                        d="M 400 400 L 250 220 L 550 180 L 650 450 L 500 650 L 220 580 Z M 400 400 L 550 180 M 400 400 L 650 450 M 400 400 L 500 650 M 400 400 L 220 580"
                        stroke="url(#netLine)"
                        strokeWidth="1.5"
                        fill="rgba(116,87,62,0.02)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />
                </motion.g>

                {/* Sub Lines */}
                <motion.g strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                        d="M 250 220 L 300 100 L 550 180 M 650 450 L 750 350 L 550 180 M 500 650 L 600 750 L 650 450 M 220 580 L 150 700 L 500 650 M 250 220 L 100 350 L 220 580"
                        stroke="url(#subLine)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
                    />
                </motion.g>

                {/* Nodes Display */}
                {cities.map((node) => (
                    <motion.g
                        key={node.id}
                        onMouseEnter={() => setHoveredCity(node)}
                        onMouseLeave={() => setHoveredCity(null)}
                        className="cursor-pointer pointer-events-auto"
                    >
                        {/* Pulse Ring */}
                        <motion.circle
                            cx={node.cx} cy={node.cy} r={node.r * 2.5}
                            fill="none"
                            stroke={node.main ? "#ffffff" : "#74573e"}
                            strokeWidth="1"
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: [0.5, 2, 0.5], opacity: [0, 0.5, 0] }}
                            transition={{ duration: 2.5, delay: node.delay, repeat: Infinity, repeatDelay: 1 }}
                        />
                        {/* Core Dot */}
                        <motion.circle
                            cx={node.cx} cy={node.cy} r={node.r}
                            fill={node.main ? "#ffffff" : "#74573e"}
                            initial={{ scale: 0 }}
                            animate={{
                                scale: hoveredCity?.id === node.id ? 1.5 : 1,
                                fill: hoveredCity?.id === node.id ? "#ffffff" : (node.main ? "#ffffff" : "#74573e"),
                                filter: hoveredCity?.id === node.id ? "drop-shadow(0 0 8px #ffffff)" : "none"
                            }}
                            whileInView={{
                                scale: 1,
                                transition: { duration: 0.5, delay: node.delay, type: "spring" }
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2 }}
                        />

                        <AnimatePresence>
                            {(node.id === 'erbil' || hoveredCity?.id === node.id) && (
                                <motion.g
                                    key={`label-${node.id}`}
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: node.id === 'erbil' ? 2.5 : 0,
                                        type: "spring", stiffness: 200, damping: 20
                                    }}
                                    className="pointer-events-none"
                                >
                                    <rect
                                        x={node.cx - 50}
                                        y={node.cy - 45}
                                        width="100"
                                        height="30"
                                        rx="15"
                                        fill="rgba(17, 22, 56, 0.9)"
                                        stroke="#74573e"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x={node.cx}
                                        y={node.cy - 25}
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="14"
                                        fontWeight="500"
                                        className="transition-all duration-300"
                                    >
                                        {node.name}
                                    </text>
                                </motion.g>
                            )}
                        </AnimatePresence>
                    </motion.g>
                ))}
            </svg >
        </div >
    );
};

const CityLayerSection = () => {
    return (
        <section
            className="relative w-full py-16 md:py-32 xl:py-48 bg-[#111638] text-white overflow-hidden xl:min-h-[100dvh] flex items-center"
            style={{ transform: 'translateZ(0)' }}
        >
            {/* Dark gradient overlay to blend perfectly with background */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#111638] via-transparent to-[#111638] opacity-50" />

            {/* Ambient glows */}
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[#74573e]/[0.08] blur-[200px] pointer-events-none" />

            <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-24 relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-2 lg:gap-8 items-center">

                {/* Left side: Premium Typography Content */}
                <div className="xl:col-span-6 2xl:col-span-5 flex flex-col pt-10 pb-10 xl:pb-20">

                    {/* Pre-title with line */}
                    <div className="flex items-center gap-4 mb-8">
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: 48 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-[1px] bg-[#74573e] block"
                        />
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-xs font-bold tracking-[0.3em] text-[#74573e] uppercase"
                        >
                            The City Layer
                        </motion.span>
                    </div>

                    {/* Dramatic Main Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-[5rem] tracking-tight text-white mb-8 font-light leading-[1.1] z-10"
                    >
                        A New Layer <br />
                        for the <span className="font-light text-[#74573e] block mt-1">
                            Property Layer.
                        </span>
                    </motion.h2>

                    {/* Text Content Directly Under Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 w-full md:w-[85%] xl:w-full max-w-[500px] mt-8 border-l-[3px] border-transparent"
                    >
                        <p className="text-[17px] md:text-[19px] text-[#A0A4CD] font-light leading-relaxed mb-10 pl-1">
                            Instead of discovering projects occasionally through scattered channels, ERBILVERSE organizes property activity into one continuous digital environment.
                        </p>

                        <div className="flex items-stretch relative">
                            {/* Thin accent line matching the design */}
                            <div className="absolute left-[-2px] md:left-[-1px] top-0 bottom-0 w-[2px] bg-[#74573e] rounded-full" />
                            <p className="text-[18px] md:text-[21px] text-white font-light leading-[1.6] pl-4 md:pl-5">
                                Projects, locations, and interactions exist together inside a <span className="text-[#74573e]">single structured city layer</span> accessible through the platform.
                            </p>
                        </div>
                    </motion.div>

                </div>

                {/* Right side graphic for all devices, wrapping natively under the text on phones/tablets until XL screens */}
                <div className="xl:col-span-6 2xl:col-span-7 h-full relative flex items-center justify-center min-h-[300px] md:min-h-[400px] xl:min-h-0 w-full xl:z-20 xl:pointer-events-none">
                    <div
                        className="w-full max-w-[500px] aspect-square md:w-[70vw] md:h-[70vw] xl:absolute xl:top-[-10%] 2xl:top-[-20%] xl:right-[-4%] 2xl:right-[-6%] xl:w-[65vw] 2xl:w-[65vw] max-w-[900px] max-h-[900px] opacity-100 z-0"
                    >
                        <AnimatedCityNetwork />
                    </div>
                </div>

            </div>

            {/* Foreground particle dust */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
                {/* CSS driven static/slow particles could go here if needed, but SVG has motion */}
            </div>
        </section>
    );
};

export default CityLayerSection;

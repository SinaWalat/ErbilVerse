import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const fields = [
    {
        id: 'location',
        label: 'Location',
        value: 'Empire World, Erbil',
        detail: 'Kurdistan Region, Iraq — Premium Zone A',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
            </svg>
        ),
    },
    {
        id: 'area',
        label: 'Total Area',
        value: '1,250 sq.m',
        detail: 'Net usable area across 3 floors',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 3v18" />
            </svg>
        ),
    },
    {
        id: 'value',
        label: 'Engagement Metric',
        value: 'High Activity',
        detail: 'Updated in real-time based on platform interactions',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v12M9 9h6M9 15h6" />
            </svg>
        ),
    },
    {
        id: 'info',
        label: 'Project Information',
        value: 'Tower C — Mixed Use',
        detail: 'Phase 2 construction in progress',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
            </svg>
        ),
    },
];

const PropertyOverviewSection = () => {
    const [activeCard, setActiveCard] = useState(null);

    return (
        <section className="relative w-full py-24 md:py-36 xl:py-44 bg-white text-[#111638] overflow-hidden">

            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#111638]/[0.02] blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#74573e]/[0.03] blur-[120px] pointer-events-none" />

            <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-24 relative z-10">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-6xl lg:text-[4.5rem] tracking-tight text-[#111638] font-light leading-[1.1]"
                    >
                        Property <span className="text-[#74573e]">Overview</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <button className="group relative inline-flex items-center gap-3 px-8 py-[14px] rounded-full bg-[#111638] text-white font-medium text-[13px] tracking-wider uppercase transition-all duration-500 hover:bg-[#1a2050] hover:shadow-[0_8px_30px_rgba(17,22,56,0.25)] overflow-hidden">
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                            <span className="relative z-10">View Details</span>
                            <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 8h10M9 4l4 4-4 4" />
                            </svg>
                        </button>
                    </motion.div>
                </div>

                {/* Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#111638]/[0.06] rounded-3xl overflow-hidden">
                    {fields.map((field, i) => {
                        const isActive = activeCard === field.id;
                        return (
                            <motion.div
                                key={field.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                                onMouseEnter={() => setActiveCard(field.id)}
                                onMouseLeave={() => setActiveCard(null)}
                                className={`group relative p-8 md:p-9 cursor-default transition-colors duration-500 border-r border-b border-[#111638]/[0.06] ${isActive ? 'bg-[#111638]' : 'bg-white'}`}
                                style={{
                                    borderRight: (i === 3) ? 'none' : undefined,
                                }}
                            >
                                {/* Animated top accent */}
                                <motion.div
                                    className="absolute top-0 left-0 w-0 h-[2px] bg-[#74573e]"
                                    animate={{ width: isActive ? '100%' : '0%' }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                />

                                {/* Icon */}
                                <motion.div
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-7 transition-colors duration-500 ${isActive ? 'bg-white/[0.1] text-[#74573e]' : 'bg-[#111638]/[0.04] text-[#111638]'}`}
                                    animate={{ scale: isActive ? 1.05 : 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {field.icon}
                                </motion.div>

                                {/* Label */}
                                <p className={`text-[10px] uppercase tracking-[0.25em] mb-3 transition-colors duration-500 ${isActive ? 'text-white/40' : 'text-[#111638]/30'}`}>
                                    {field.label}
                                </p>

                                {/* Value */}
                                <h3 className={`text-[22px] md:text-[24px] font-medium leading-tight tracking-tight transition-colors duration-500 ${isActive ? 'text-[#74573e]' : 'text-[#74573e]'}`}>
                                    {field.value}
                                </h3>

                                {/* Detail - always visible */}
                                <p className={`text-[13px] font-light leading-relaxed mt-4 transition-colors duration-500 ${isActive ? 'text-white/50' : 'text-[#111638]/35'}`}>
                                    {field.detail}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default PropertyOverviewSection;

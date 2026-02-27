import React from 'react';
import { motion } from 'motion/react';

const TransparencySecurityScreen = () => {
    const pillars = [
        {
            title: "Verified Users",
            desc: "Every participant is authenticated to ensure a trustworthy environment.",
            icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        },
        {
            title: "Real-Time Log",
            desc: "All system actions and modifications are recorded immutably.",
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        {
            title: "Clear Ownership",
            desc: "Indisputable digital records of property ownership and history.",
            icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        },
        {
            title: "Secure Data",
            desc: "Enterprise-grade infrastructure protecting platform data continuously.",
            icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        }
    ];

    return (
        <section className="relative w-full py-32 md:py-48 bg-[#fcfcfc] text-[#111638] overflow-hidden flex flex-col border-t border-[#111638]/5">
            <div className="max-w-[1600px] mx-auto w-full px-6 flex flex-col items-center">

                {/* Grand Symmetrical Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center mb-24 max-w-3xl"
                >
                    <span className="w-1 px-8 py-px bg-[#74573e] mb-8 block" />
                    <h2 className="text-5xl md:text-7xl tracking-tight text-[#111638] leading-[1.1] mb-8 font-medium">
                        Transparency<br />
                        <span className="">Built In</span>
                    </h2>
                    <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto">
                        The platform operates on a foundation of absolute clarity and confidence. Every action is verifiable to maintain a secure digital environment.
                    </p>
                </motion.div>

                {/* Monumental Pillars Layout */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.2 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                            className="group relative flex flex-col h-full bg-white rounded-t-full rounded-b-[2rem] border border-[#111638]/5 p-8 pt-16 lg:p-12 lg:pt-24 shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Inner Arch Accent */}
                            <div className="absolute inset-2 border border-[#111638]/5 rounded-t-full rounded-b-[1.75rem] pointer-events-none group-hover:border-[#74573e]/20 transition-colors duration-500" />

                            {/* Icon Centerpiece */}
                            <div className="w-20 h-20 mx-auto rounded-full bg-zinc-50 border border-[#111638]/10 flex items-center justify-center mb-12 text-[#111638] group-hover:bg-[#111638] group-hover:text-white group-hover:border-[#111638] transition-colors duration-500 relative z-10 shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={pillar.icon} />
                                </svg>
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col flex-1 text-center relative z-10 items-center">
                                <h3 className="text-2xl font-medium text-[#111638] mb-4 tracking-tight">{pillar.title}</h3>
                                <div className="w-12 h-1 bg-zinc-200 mb-6 group-hover:bg-[#74573e] transition-colors duration-500" />
                                <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                                    {pillar.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Elegant Footer Accent Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                    className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#111638]/10 to-transparent pt-32 mt-12"
                />

            </div>
        </section>
    );
};

export default TransparencySecurityScreen;

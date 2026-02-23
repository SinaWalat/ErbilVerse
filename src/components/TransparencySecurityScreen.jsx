import React from 'react';
import { motion } from 'framer-motion';

const TransparencySecurityScreen = () => {
    return (
        <section className="relative w-full py-32 px-6 md:px-16 bg-[#000510] text-white overflow-hidden lg:min-h-screen flex items-center">
            <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#111638]/40 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">

                {/* Header Sequence */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20 text-center flex flex-col items-center"
                >
                    <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00f0ff]/10 mb-6 border border-[#00f0ff]/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                        <svg className="w-8 h-8 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </span>
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[1.1] text-white drop-shadow-md">
                        Transparency <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-blue-400">Built In</span>
                    </h2>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="w-16 h-[2px] bg-[#00f0ff]/40 mx-auto mb-8"
                    />

                    <p className="text-gray-300 font-light text-lg md:text-xl max-w-2xl mx-auto">
                        A secure digital environment engineered for total operational clarity.
                    </p>
                </motion.div>

                {/* Grid Sequence for the 4 Key Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {[
                        { title: "Verified Users", desc: "Strict identity verification protocols.", icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" },
                        { title: "Real-Time Activity Log", desc: "Transparent record of all market actions.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                        { title: "Clear Ownership Records", desc: "Immutable and instantly verifiable.", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
                        { title: "Secure Environment", desc: "Enterprise-grade digital infrastructure.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.2 + (index * 0.1), type: "spring", stiffness: 50, damping: 20 }}
                            className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] p-8 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] transition-all duration-500 text-left relative overflow-hidden group hover:-translate-y-1"
                        >
                            <svg className="w-10 h-10 text-[#00f0ff]/50 group-hover:text-[#00f0ff] transition-colors duration-500 mb-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                            </svg>
                            <h3 className="text-xl font-bold tracking-tight text-white mb-3">{feature.title}</h3>
                            <p className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-500 hidden md:block leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TransparencySecurityScreen;

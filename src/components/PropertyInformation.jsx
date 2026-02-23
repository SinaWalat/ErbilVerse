import React from 'react';
import { motion } from 'framer-motion';

const PropertyInformation = () => {
    return (
        <section className="relative w-full py-32 px-6 md:px-16 bg-gradient-to-tr from-[#fdfbf9] to-white text-[#111638] overflow-hidden lg:min-h-screen flex items-center">
            {/* Elegant Spatial Gradient Background */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none flex items-center justify-center">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], y: [0, -50, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1200px] h-[1200px] bg-gradient-radial from-[#74573e]/5 to-transparent rounded-full blur-[150px]"
                />
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">

                {/* Left Side: Property Graphic/Visual - Spatial Floating */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, delay: 0.2, type: "spring", stiffness: 40, damping: 20 }}
                    className="lg:col-span-7 relative w-full aspect-[4/3] flex items-center justify-center group"
                >

                    {/* Freely Floating Abstract Architectural Geometry */}
                    <motion.div
                        animate={{ rotateY: [0, 10, 0], rotateX: [0, 5, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center p-12 perspective-1000"
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Abstract planes */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 2, delay: 0.4 }}
                                className="absolute w-64 h-80 border border-[#74573e]/20 bg-white/40 backdrop-blur-sm -rotate-6 transform translate-x-12 translate-y-8"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 2, delay: 0.6 }}
                                className="absolute w-72 h-64 border border-[#111638]/10 bg-[#fdfbf9]/60 backdrop-blur-md rotate-3 transform -translate-x-8 -translate-y-12 flex items-center justify-center shadow-lg"
                            >
                                <span className="text-[#111638]/40 tracking-[0.4em] uppercase font-sans text-[10px] md:text-xs font-light">Spatial Concept</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Side: Data UI */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-16"
                    >
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight text-[#111638] leading-[1.0] mb-8">
                            Property <br />
                            <span className="text-[#74573e] italic">Overview</span>
                        </h2>

                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="w-24 h-[1px] bg-[#111638]/20 mb-10 origin-left"
                        />

                        <p className="text-[#111638]/60 font-light text-xl md:text-2xl leading-relaxed max-w-lg">
                            Detailed structural and legal documentation attached to the unique digital twin.
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {[
                            { label: "Total Area", value: "4,200 sqft" },
                            { label: "Status", value: "Verified Active" },
                            { label: "Last Assessment", value: "Oct 24, 2026" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, delay: 0.6 + (index * 0.15) }}
                                className="flex justify-between items-baseline border-b border-[#111638]/10 py-6 group relative"
                            >
                                <span className="text-[#111638]/60 font-sans tracking-widest uppercase text-xs font-medium">{item.label}</span>
                                <span className="text-2xl text-[#111638] font-serif transition-colors duration-500 group-hover:text-[#74573e]">{item.value}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-16 group flex items-center gap-6 self-start"
                    >
                        <span className="text-[#111638] uppercase tracking-[0.3em] text-xs font-semibold group-hover:text-[#74573e] transition-colors duration-500">
                            View Details
                        </span>
                        <div className="w-12 h-[1px] bg-[#111638] group-hover:w-24 group-hover:bg-[#74573e] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    </motion.button>
                </div>
        </section>
    );
};

export default PropertyInformation;

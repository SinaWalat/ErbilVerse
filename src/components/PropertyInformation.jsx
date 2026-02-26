import React from 'react';
import { motion } from 'motion/react';

const PropertyInformation = () => {
    const specs = [
        { label: "Location", value: "Erbil Central District", category: "Geographic Data" },
        { label: "Total Area", value: "4,200 SQFT", category: "Physical Metrics" },
        { label: "Digital Market Value", value: "$450,000 USD", category: "Valuation" },
        { label: "Project Information", value: "Phase 1 / Verified", category: "Status" }
    ];

    return (
        <section className="relative w-full py-32 bg-[#fcfcfc] text-[#111638] overflow-hidden flex justify-center font-sans border-t border-[#111638]/5">
            <div className="max-w-[1400px] mx-auto w-full px-8 md:px-16 lg:px-24">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-12 h-[1px] bg-[#74573e]" />
                            <span className="text-xs font-bold tracking-[0.1em] text-[#74573e] uppercase">
                                Property Spec Sheet
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#111638] leading-none mb-6">
                            Property<br />
                            <span className="font-semibold">Overview</span>
                        </h2>
                        <p className="text-zinc-500 text-lg leading-relaxed">
                            Comprehensive data profile and verified structural metrics for the selected twin.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="hidden md:flex items-center gap-3 border border-[#111638]/10 rounded-full px-6 py-3 shadow-sm bg-white"
                    >
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-semibold tracking-wider text-[#111638] uppercase">Ledger Synced</span>
                    </motion.div>
                </div>

                {/* Architectural Ledger Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-8 border-t border-[#111638]/10 pt-16 relative">

                    {/* Abstract Blueprint / Wireframe graphic (Elegant) */}
                    <div className="lg:col-span-4 lg:pr-12 relative flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full aspect-square bg-[#111638] rounded-2xl relative overflow-hidden flex items-center justify-center p-8 shadow-md"
                        >
                            {/* Sophisticated geometric lines overlay */}
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="w-3/4 h-3/4 border-[0.5px] border-white/30 rounded-full flex items-center justify-center relative"
                            >
                                <div className="absolute top-0 right-1/2 w-[1px] h-4 bg-white/50" />
                                <div className="absolute bottom-0 left-1/2 w-[1px] h-4 bg-white/50" />
                                <div className="absolute left-0 top-1/2 w-4 h-[1px] bg-[#74573e]" />
                                <div className="absolute right-0 bottom-1/2 w-4 h-[1px] bg-[#74573e]" />

                                <div className="w-1/2 h-1/2 border-[0.5px] border-[#74573e]/50 transform rotate-45" />
                            </motion.div>

                            {/* Internal overlay badge */}
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-[10px] tracking-widest text-white/50 border-t border-white/10 pt-4">
                                <span>MODEL_X1</span>
                                <span>1:100</span>
                            </div>
                        </motion.div>

                        <div className="mt-8">
                            <h4 className="text-sm font-bold text-[#111638] mb-2 uppercase tracking-wide">3D Volumetric Data</h4>
                            <p className="text-xs text-zinc-500 leading-relaxed font-medium">Standardized spatial measurement extracted from the digital twin array. Verified accurate to real-world coordinates.</p>
                        </div>
                    </div>

                    {/* Data List rows */}
                    <div className="lg:col-span-8 flex flex-col border-t border-[#111638]/5 lg:border-t-0">
                        {specs.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-[#111638]/10 hover:border-[#111638]/30 transition-colors duration-300"
                            >
                                <div className="flex flex-col mb-4 sm:mb-0">
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{item.category}</span>
                                    <span className="text-xl md:text-2xl font-light text-[#111638] tracking-tight">{item.label}</span>
                                </div>
                                <div className="sm:text-right flex items-center gap-6">
                                    <span className={`text-xl md:text-2xl font-semibold tracking-tight ${item.label === 'Digital Market Value' ? 'text-[#74573e]' : 'text-[#111638]'}`}>
                                        {item.value}
                                    </span>
                                    {/* Minimalist interactive arrow on hover */}
                                    <span className="w-8 h-8 rounded-full border border-[#111638]/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        <svg className="w-3 h-3 text-[#111638]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </span>
                                </div>
                            </motion.div>
                        ))}

                        {/* Beautiful Call to Action row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-12 flex justify-end"
                        >
                            <button className="bg-[#111638] text-white px-8 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#74573e] transition-colors duration-300 shadow-lg flex items-center gap-4">
                                Request Full Audit
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                            </button>
                        </motion.div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default PropertyInformation;

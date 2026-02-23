import React from 'react';
import { motion } from 'framer-motion';

const DigitalMarketScreen = () => {
    return (
        <section className="relative w-full py-32 px-6 md:px-16 bg-[#000510] text-white overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#111638]/20 to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* Header Sequence */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <span className="text-[#74573e] text-xs md:text-sm tracking-[0.4em] uppercase font-light mb-8 block font-serif italic">Section 04</span>
                    <h2 className="text-6xl sm:text-7xl md:text-8xl font-serif font-medium tracking-tight text-[#111638] leading-[1.0] mb-8">
                        Live Digital <br /><span className="text-[#74573e] italic">Market</span>
                    </h2>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="w-24 h-[1px] bg-[#111638]/20 mx-auto mb-10 origin-center"
                    />

                    <p className="text-[#111638]/60 font-light text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                        Market values change dynamically based on real platform activity.
                    </p>
                </motion.div>

                {/* Dashboard Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Latest Transactions */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, delay: 0.2, type: "spring", stiffness: 40, damping: 20 }}
                        className="bg-transparent p-8 flex flex-col items-center text-center group"
                    >
                        <div className="mb-8 flex flex-col items-center">
                            <h3 className="text-2xl font-serif text-[#111638] mb-2 tracking-tight">Transactions</h3>
                            <div className="w-12 h-[1px] bg-[#111638]/20 group-hover:w-24 group-hover:bg-[#74573e]/40 transition-all duration-700 ease-out" />
                        </div>

                        <div className="w-full space-y-6">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex justify-between items-baseline py-4 border-b border-[#111638]/10 last:border-0 group cursor-default">
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-sans font-medium uppercase tracking-widest text-[#111638]">District {String.fromCharCode(65 + i)}</span>
                                        <span className="text-xs text-[#111638]/40 font-serif italic mt-1">Just now</span>
                                    </div>
                                    <span className="text-[#74573e] font-serif text-lg">+2.4%</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, delay: 0.4, type: "spring", stiffness: 40, damping: 20 }}
                        className="bg-transparent p-8 flex flex-col justify-between items-center text-center group border-l border-r border-[#111638]/5"
                    >
                        <div className="mb-8 flex flex-col items-center">
                            <h3 className="text-2xl font-serif text-[#111638] mb-2 tracking-tight">Activity Trend</h3>
                            <div className="w-12 h-[1px] bg-[#111638]/20 group-hover:w-24 group-hover:bg-[#74573e]/40 transition-all duration-700 ease-out" />
                        </div>

                        <div className="relative h-48 w-full border-b border-[#111638]/20 flex items-end justify-between px-2 pt-4 group-hover:border-[#74573e]/30 transition-colors duration-500">
                            {/* Elegant Sparse Chart */}
                            {[40, 70, 45, 90, 65, 85].map((height, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${height}%` }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.1), type: "spring", bounce: 0.2 }}
                                    className="w-[8%] bg-[#111638]/10 hover:bg-[#74573e]/40 transition-colors duration-500 cursor-pointer"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Market Movement */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, delay: 0.6, type: "spring", stiffness: 40, damping: 20 }}
                        className="bg-transparent p-8 flex flex-col justify-between items-center text-center group"
                    >
                        <div className="mb-8 flex flex-col items-center">
                            <h3 className="text-2xl font-serif text-[#111638] mb-2 tracking-tight">Market Status</h3>
                            <div className="w-12 h-[1px] bg-[#111638]/20 group-hover:w-24 group-hover:bg-[#74573e]/40 transition-all duration-700 ease-out" />
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center">
                            <span className="text-7xl md:text-8xl font-serif font-light tracking-tighter text-[#111638] mb-4 leading-none group-hover:text-[#74573e] transition-colors duration-700">
                                12.8<span className="text-4xl text-[#111638]/40 font-sans">k</span>
                            </span>
                            <span className="text-xs text-[#111638]/60 uppercase tracking-widest font-medium font-sans">Active Users (24h)</span>
                        </div>

                        <div className="mt-12 pt-8 border-t border-[#111638]/10 flex justify-between items-baseline w-full">
                            <span className="text-xs text-[#111638]/60 uppercase tracking-widest font-medium font-sans">Volume</span>
                            <span className="text-xl font-serif text-[#111638]">1.4M ERB</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default DigitalMarketScreen;

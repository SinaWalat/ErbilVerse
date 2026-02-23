import React from 'react';
import { Building2, AreaChart, CircleDollarSign, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const PropertyOverview = () => {
    return (
        <section id="property" className="py-24 relative overflow-hidden bg-bg-dark border-y border-border/50">
            {/* Background aesthetics */}
            <div className="absolute top-1/2 left-0 w-full h-[500px] bg-primary/10 -translate-y-1/2 -z-10 blur-[120px]"></div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4">
                        Property <span className="text-gradient">Overview</span>
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto font-light">
                        Detailed asset insights directly from the digital twin.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Visual Representation (3D Building mockup) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-2 lg:order-1 relative aspect-square max-w-[500px] mx-auto w-full"
                    >
                        {/* Base platform */}
                        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[80%] h-32 bg-primary-light/20 rounded-[100%] border border-primary/40 transform rotate-x-[60deg] shadow-[0_0_80px_rgba(30,40,93,0.4)]"></div>

                        {/* Building blocks (Mock 3D) */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-48 h-64 bg-gradient-to-t from-primary/80 to-primary-light/40 border border-primary-light/50 rounded-lg backdrop-blur-md shadow-2xl flex items-center justify-center group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                            {/* Scanning line effect */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-secondary shadow-[0_0_20px_rgba(122,85,58,1)] animate-[scan_3s_ease-in-out_infinite_alternate]"></div>
                        </motion.div>

                        {/* Auxiliary block */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-[25%] left-[30%] -translate-x-1/2 w-32 h-40 bg-gradient-to-t from-primary/60 to-primary-light/30 border border-primary-light/30 rounded-lg backdrop-blur-md"
                        ></motion.div>
                    </motion.div>

                    {/* Property Data Cards */}
                    <div className="order-1 lg:order-2 grid sm:grid-cols-2 gap-6">

                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-primary-light transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Building2 size={80} />
                            </div>
                            <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center mb-6 border border-border">
                                <Building2 size={24} className="text-secondary-light" />
                            </div>
                            <p className="text-sm text-text-muted uppercase tracking-wider mb-2">Location</p>
                            <h3 className="text-xl font-medium font-outfit">Empire World, Sector B</h3>
                        </motion.div>

                        {/* Total Area */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-primary-light transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <AreaChart size={80} />
                            </div>
                            <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center mb-6 border border-border">
                                <AreaChart size={24} className="text-secondary-light" />
                            </div>
                            <p className="text-sm text-text-muted uppercase tracking-wider mb-2">Total Area</p>
                            <h3 className="text-xl font-medium font-outfit">1,250 sq.m</h3>
                        </motion.div>

                        {/* Market Value */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-primary-light transition-colors sm:col-span-2"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <CircleDollarSign size={120} />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center mb-4 border border-border">
                                        <CircleDollarSign size={24} className="text-secondary-light" />
                                    </div>
                                    <p className="text-sm text-text-muted uppercase tracking-wider mb-2">Digital Market Value</p>
                                    <h3 className="text-3xl font-bold font-outfit text-gradient-gold">IQD 1.8B</h3>
                                </div>
                                <div className="text-right sm:mt-auto">
                                    <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-medium">
                                        +2.4% this month
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Project Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="glass-panel p-6 rounded-2xl sm:col-span-2 flex items-start gap-4 hover:border-primary-light transition-colors cursor-pointer"
                        >
                            <div className="mt-1">
                                <Info size={24} className="text-secondary-light" />
                            </div>
                            <div>
                                <p className="text-sm text-text-muted uppercase tracking-wider mb-1">Project Information</p>
                                <h4 className="text-lg font-medium font-outfit mb-2">Tower C - Mixed Use Development</h4>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    Currently in Phase 2 of construction. Expected to feature premium office spaces and luxury penthouses.
                                </p>
                            </div>
                            <button className="ml-auto mt-auto sm:mt-0 font-medium text-sm text-secondary-light hover:text-white transition-colors border-b border-secondary-light/30 hover:border-white pb-1 whitespace-nowrap">
                                View Details
                            </button>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

// Add keyframes for the scan effect inline if not in tailwind config
const style = document.createElement('style');
style.textContent = `
  @keyframes scan {
    0% { transform: translateY(0); }
    100% { transform: translateY(16rem); }
  }
`;
if (typeof document !== 'undefined') {
    document.head.appendChild(style);
}

export default PropertyOverview;

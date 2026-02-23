import React from 'react';
import { Search, Map as MapIcon, Layers, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const districts = [
    { id: 1, name: 'Empire World', active: 34, value: 'High', coords: '44.0° N, 36.1° E' },
    { id: 2, name: 'English Village', active: 12, value: 'Premium', coords: '44.2° N, 36.3° E' },
    { id: 3, name: 'Dream City', active: 18, value: 'Premium', coords: '44.1° N, 36.2° E' },
    { id: 4, name: 'Italian Village', active: 22, value: 'Mid-High', coords: '43.9° N, 36.0° E' },
];

const CityMapSection = () => {
    return (
        <section id="city" className="py-24 relative overflow-hidden bg-bg-dark">
            <div className="container-custom relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:flex justify-between items-end gap-8"
                >
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-4">
                            Explore the <span className="text-gradient-gold">Digital City</span>
                        </h2>
                        <p className="text-text-muted text-lg font-light leading-relaxed">
                            Navigate Erbil in an interactive environment and discover real districts and developments across the city.
                        </p>
                    </div>

                    <div className="mt-6 md:mt-0 flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                            <input
                                type="text"
                                placeholder="Search districts..."
                                className="pl-12 pr-6 py-3 rounded-full bg-glass-bg border border-border text-white outline-none focus:border-secondary transition-colors w-full md:w-64"
                            />
                        </div>
                        <button className="w-12 h-12 rounded-full border border-border bg-glass-bg flex items-center justify-center hover:bg-white/5 transition-colors">
                            <Layers size={20} className="text-secondary-light" />
                        </button>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-8 h-[600px]">
                    {/* Interactive Map Visual Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-8 relative rounded-3xl border border-border bg-[#0a0c1a] overflow-hidden group"
                    >
                        {/* Map Background Grid/Texture */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

                        {/* Map abstract elements */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                            className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-light/40 rounded-full blur-3xl"
                        ></motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"
                        ></motion.div>

                        {/* Mock Map Nodes */}
                        <div className="absolute top-[30%] left-[40%] text-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform">
                            <div className="w-6 h-6 rounded-full bg-secondary shadow-glow border-2 border-[#0a0c1a] mx-auto mb-2 relative">
                                <div className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-50"></div>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-glass-bg backdrop-blur-md border border-border text-xs font-medium whitespace-nowrap z-10 relative">Empire World</span>
                        </div>

                        <div className="absolute top-[60%] left-[25%] text-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform opacity-70">
                            <div className="w-4 h-4 rounded-full bg-primary-light border-2 border-[#0a0c1a] mx-auto mb-2"></div>
                            <span className="text-[10px] uppercase tracking-wider text-text-muted whitespace-nowrap">Italian Village</span>
                        </div>

                        <div className="absolute top-[45%] left-[65%] text-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform opacity-80">
                            <div className="w-5 h-5 rounded-full bg-white border-2 border-[#0a0c1a] mx-auto mb-2 relative">
                                <div className="absolute inset-0 rounded-full bg-white animate-pulse opacity-40"></div>
                            </div>
                            <span className="px-2 py-1 rounded bg-black/50 backdrop-blur-md text-[10px] font-medium whitespace-nowrap border border-white/20">Dream City</span>
                        </div>

                        {/* Map Controls */}
                        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
                            <button className="w-10 h-10 rounded-xl bg-glass-bg backdrop-blur-md border border-border flex items-center justify-center hover:bg-white/10 text-white font-medium">+</button>
                            <button className="w-10 h-10 rounded-xl bg-glass-bg backdrop-blur-md border border-border flex items-center justify-center hover:bg-white/10 text-white font-medium">-</button>
                        </div>

                        <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg backdrop-blur-md border border-border z-20">
                            <MapIcon size={14} className="text-secondary-light" />
                            <span className="text-xs font-medium tracking-wider uppercase">Live View</span>
                        </div>
                    </motion.div>

                    {/* District List */}
                    <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                        <h3 className="font-outfit text-xl font-medium mb-2">Key Districts</h3>

                        {districts.map((district, index) => (
                            <motion.div
                                key={district.id}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                                className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-secondary/40 transition-colors group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-medium text-lg leading-tight group-hover:text-secondary-light transition-colors">{district.name}</h4>
                                    <ChevronRight size={18} className="text-text-muted group-hover:text-white transition-colors" />
                                </div>

                                <div className="flex justify-between items-end border-t border-white/5 pt-3 mt-1">
                                    <div>
                                        <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Active Projects</p>
                                        <p className="font-medium">{district.active}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Market</p>
                                        <span className="text-xs px-2 py-1 rounded bg-primary-light/30 text-primary-light border border-primary-light/50 font-medium">
                                            {district.value}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default CityMapSection;

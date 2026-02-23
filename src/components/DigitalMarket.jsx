import React from 'react';
import { TrendingUp, Activity, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const recentActivity = [
    { id: 1, type: 'Sale', property: 'Empire Tower 3, Apt 4B', amount: 'IQD 340M', time: '10m ago', trend: 'up' },
    { id: 2, type: 'Listing', property: 'Dream City, Villa 12', amount: 'IQD 1.2B', time: '45m ago', trend: 'neutral' },
    { id: 3, type: 'Sale', property: 'Italian Village, 2BR', amount: 'IQD 210M', time: '2h ago', trend: 'down' },
    { id: 4, type: 'Transfer', property: 'Gulan Residences, P1', amount: 'IQD 890M', time: '3h ago', trend: 'up' },
];

const DigitalMarket = () => {
    return (
        <section id="market" className="py-24 relative bg-[#030409]">
            <div className="container-custom relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4">
                            Live Digital <span className="text-gradient">Market</span>
                        </h2>
                        <p className="text-text-muted text-lg max-w-xl font-light">
                            Market values change dynamically based on real platform activity.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium tracking-wide uppercase">Market Open</span>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Market Movement (Chart Mockup) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden"
                    >

                        {/* Chart Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-xl font-medium font-outfit mb-1 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-secondary-light" />
                                    Market Movement
                                </h3>
                                <p className="text-sm text-text-muted">Erbil Prime Index (EPI)</p>
                            </div>
                            <div className="flex gap-2 bg-[#0a0d24] p-1 rounded-lg border border-border">
                                {['1H', '1D', '1W', '1M'].map((range, i) => (
                                    <button key={range} className={`px-3 py-1 text-xs font-medium rounded-md ${i === 1 ? 'bg-primary border border-primary-light text-white' : 'text-text-muted hover:text-white'}`}>
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Abstract Chart Graphic */}
                        <div className="h-[300px] w-full relative flex items-end mb-4 border-b border-white/10 pb-4">
                            {/* Grid Lines */}
                            <div className="absolute inset-x-0 bottom-4 top-0 flex flex-col justify-between opacity-10">
                                <div className="w-full h-px bg-white"></div>
                                <div className="w-full h-px bg-white"></div>
                                <div className="w-full h-px bg-white"></div>
                                <div className="w-full h-px bg-white"></div>
                            </div>

                            {/* Mock SVG Line */}
                            <motion.svg
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                                className="w-full h-[80%] drop-shadow-[0_0_15px_rgba(122,85,58,0.5)] z-10"
                                viewBox="0 0 100 50"
                                preserveAspectRatio="none"
                            >
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                                    d="M0,50 L5,45 L15,48 L25,35 L40,40 L50,20 L65,25 L75,10 L85,15 L100,5" fill="none" stroke="#7a553a" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
                                />
                                <motion.path
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.2 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
                                    d="M0,50 L5,45 L15,48 L25,35 L40,40 L50,20 L65,25 L75,10 L85,15 L100,5 L100,50 Z" fill="url(#gradient)"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#7a553a" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </linearGradient>
                                </defs>
                            </motion.svg>
                        </div>

                        <div className="flex justify-between text-xs text-text-muted">
                            <span>09:00</span>
                            <span>12:00</span>
                            <span>15:00</span>
                            <span>18:00</span>
                            <span>Now</span>
                        </div>
                    </motion.div>

                    {/* Recent Activity Feed */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="glass-panel p-6 md:p-8 rounded-3xl flex flex-col h-[500px]"
                    >
                        <h3 className="text-xl font-medium font-outfit mb-6 flex items-center gap-2">
                            <Activity size={20} className="text-secondary-light" />
                            Latest Transactions
                        </h3>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
                            {recentActivity.map((activity, index) => (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                                    className="p-4 rounded-xl bg-[#0a0d24]/50 border border-white/5 hover:border-primary-light transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-medium uppercase tracking-wider text-primary-light bg-primary/20 px-2 py-0.5 rounded">
                                            {activity.type}
                                        </span>
                                        <span className="flex items-center gap-1 text-[10px] text-text-muted uppercase tracking-wider">
                                            <Clock size={10} />
                                            {activity.time}
                                        </span>
                                    </div>

                                    <p className="font-medium mb-1 truncate">{activity.property}</p>

                                    <div className="flex justify-between items-center mt-3">
                                        <p className="font-outfit font-bold text-gradient-gold">{activity.amount}</p>
                                        {activity.trend === 'up' && <ArrowUpRight size={16} className="text-green-400" />}
                                        {activity.trend === 'down' && <ArrowDownRight size={16} className="text-red-400" />}
                                    </div>
                                </motion.div>
                            ))}

                            {/* See more fake button */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 1 }}
                                className="w-full py-3 mt-2 rounded-xl border border-border text-sm font-medium hover:bg-white/5 transition-colors"
                            >
                                View All Activity
                            </motion.button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default DigitalMarket;

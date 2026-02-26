import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

const DigitalMarketScreen = () => {
    // Dynamic Market Data State (Numeric for animation)
    const [tradingVolume, setTradingVolume] = useState(8.4);
    const [chartData, setChartData] = useState(() =>
        Array.from({ length: 24 }, () => ({ value: 20 + Math.random() * 60 }))
    );

    // Simulate Live Market Updates
    useEffect(() => {
        const interval = setInterval(() => {
            // Randomize volume between 8.0 and 9.5
            const newVolume = 8.0 + Math.random() * 1.5;
            setTradingVolume(newVolume);

            // Randomize chart data with a slight bias to make it look like a trend
            setChartData(prev => {
                const newTrend = [...prev.slice(1), { value: 20 + Math.random() * 60 }];
                return newTrend;
            });
        }, 10000); // Every 10 seconds

        return () => clearInterval(interval);
    }, []);


    // Extended list for the looping marquee
    const transactions = [
        { id: "TX-A1", type: "Buy", amount: "$120,000", time: "2m ago", status: "Completed" },
        { id: "TX-B4", type: "Sell", amount: "$85,500", time: "15m ago", status: "Completed" },
        { id: "TX-C2", type: "Buy", amount: "$450,000", time: "1h ago", status: "Pending" },
        { id: "TX-D9", type: "Sell", amount: "$210,000", time: "2h ago", status: "Completed" },
        { id: "TX-E5", type: "Buy", amount: "$930,000", time: "3h ago", status: "Completed" },
        { id: "TX-F7", type: "Buy", amount: "$50,000", time: "4h ago", status: "Processing" },
    ];

    const activity = [
        { user: "User_88", action: "Listed Property", location: "District 4" },
        { user: "GlobalCorp", action: "Bid Placed", location: "Central Hub" },
        { user: "User_12", action: "Viewed 3D Model", location: "North Wing" },
        { user: "System", action: "Market Update", location: "All Regions" }
    ];

    return (
        <section className="relative w-full py-32 bg-[#fcfcfc] text-[#111638] overflow-hidden min-h-screen flex items-center justify-center font-sans">

            {/* Route 3 Ambient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(116,87,62,0.06)_0%,transparent_70%)] blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(17,22,56,0.04)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 relative z-10">

                {/* Elegant Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="w-8 h-[1px] bg-[#74573e]/40" />
                            <span className="text-xs font-bold tracking-[0.2em] text-[#74573e] uppercase flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#74573e] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#74573e]"></span>
                                </span>
                                System Live
                            </span>
                            <span className="w-8 h-[1px] bg-[#74573e]/40" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight text-[#111638] mb-6 font-outfit">
                            Live Digital <span className="font-semibold">Market</span>
                        </h2>
                        <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                            Monitor real-time valuations, secure transactions, and platform-wide activity in a unified, floating ledger dashboard.
                        </p>
                    </motion.div>
                </div>

                {/* Dashboard Layout - Floating Cards (Route 3 style) */}
                <div className="flex flex-col gap-6">

                    {/* Topline Metric Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#111638]/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
                    >
                        {/* Left: Metric */}
                        <div className="shrink-0">
                            <span className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3 block">
                                24H Trading Volume
                            </span>
                            <div className="flex items-baseline gap-5">
                                <div className="text-6xl md:text-8xl font-light tracking-tighter text-[#111638] font-outfit flex items-baseline" style={{ lineHeight: 1 }}>
                                    <span style={{ lineHeight: 1 }}>$</span>
                                    <NumberFlow
                                        value={tradingVolume}
                                        format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                                        trend={0}
                                        className="font-outfit"
                                        style={{ lineHeight: 1 }}
                                    />
                                    <span style={{ lineHeight: 1 }}>M</span>
                                </div>
                                <span className="bg-[#74573e]/10 text-[#74573e] px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                    <motion.span
                                        key={tradingVolume}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        +{(Math.random() * 5 + 1).toFixed(1)}%
                                    </motion.span>
                                </span>
                            </div>
                        </div>

                        {/* Right: Chart (below on mobile, beside on desktop) */}
                        <div className="w-full md:w-[45%] h-28 select-none" tabIndex={-1} style={{ outline: 'none' }} onMouseDown={(e) => e.preventDefault()}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 8, right: 12, bottom: 0, left: 0 }} style={{ outline: 'none', cursor: 'pointer' }}>
                                    <defs>
                                        <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#74573e" stopOpacity={0.25} />
                                            <stop offset="100%" stopColor="#74573e" stopOpacity={0.02} />
                                        </linearGradient>
                                    </defs>
                                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                                    <Tooltip
                                        content={({ active, payload, label }) => {
                                            if (!active || !payload || !payload.length) return null;
                                            const val = payload[0].value;
                                            // Map chart data range (20-80) to volume range (8.0-9.5)
                                            const volume = 8.0 + ((val - 20) / 60) * 1.5;
                                            return (
                                                <div style={{
                                                    background: '#111638',
                                                    color: '#fff',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '13px',
                                                    fontWeight: 600,
                                                    fontFamily: 'Outfit, sans-serif',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                    border: '1px solid rgba(116,87,62,0.3)',
                                                }}>
                                                    ${volume.toFixed(1)}M
                                                </div>
                                            );
                                        }}
                                        cursor={false}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#74573e"
                                        strokeWidth={2}
                                        fill="url(#chartAreaGradient)"
                                        dot={(props) => {
                                            const { cx, cy, index } = props;
                                            if (index !== chartData.length - 1) return null;
                                            return (
                                                <g key={`pin-${index}`}>
                                                    <circle cx={cx} cy={cy} r="8" fill="#74573e" opacity="0.15">
                                                        <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                                                        <animate attributeName="opacity" values="0.15;0.05;0.15" dur="2s" repeatCount="indefinite" />
                                                    </circle>
                                                    <circle cx={cx} cy={cy} r="4" fill="white" stroke="#74573e" strokeWidth="2" />
                                                </g>
                                            );
                                        }}
                                        activeDot={{ r: 5, fill: '#74573e', stroke: 'white', strokeWidth: 2 }}
                                        isAnimationActive={true}
                                        animationDuration={1200}
                                        animationEasing="ease-in-out"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Bottom Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Transactions - Live Ticker */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="lg:col-span-7 bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#111638]/5 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-[#111638]">Live Transaction Feed</h3>
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#74573e]">
                                    <span className="w-2 h-2 rounded-full bg-[#74573e] animate-pulse" />
                                    SYNCING
                                </div>
                            </div>

                            <div className="relative h-[360px] overflow-hidden -mx-2 px-2">
                                {/* Scrolling Container */}
                                <motion.div
                                    animate={{ y: ["0%", "-50%"] }}
                                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                                    className="flex flex-col gap-3 absolute top-0 left-0 right-0 w-full"
                                >
                                    {[...transactions, ...transactions].map((tx, index) => (
                                        <div
                                            key={`${tx.id} -${index} `}
                                            className="bg-white rounded-2xl p-5 shadow-sm border border-[#111638]/5 flex justify-between items-center group hover:bg-zinc-50/50 transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w - 12 h - 12 rounded - full flex items - center justify - center transition - colors ${tx.type === 'Buy' ? 'bg-[#74573e]/10 text-[#74573e] group-hover:bg-[#74573e]/20' : 'bg-zinc-50 text-zinc-500 group-hover:bg-zinc-100'} `}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tx.type === 'Buy' ? "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" : "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"} /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#111638] group-hover:text-[#74573e] transition-colors">{tx.id}</p>
                                                    <p className="text-xs text-zinc-500 font-medium mt-1">{tx.time} &bull; {tx.type}</p>
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                                <p className="text-lg font-bold text-[#111638] font-outfit">{tx.amount}</p>
                                                <div className={`text - [10px] font - bold uppercase tracking - wider mt - 1 px - 2 py - 0.5 rounded - sm ${tx.status === 'Completed' ? 'bg-green-100 text-green-700' : tx.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'} `}>
                                                    {tx.status}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Fade Masks */}
                                <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#fcfcfc] to-transparent pointer-events-none z-10" />
                                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#fcfcfc] to-transparent pointer-events-none z-10" />
                            </div>
                        </motion.div>

                        {/* Network Events */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-5 bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#111638]/5 relative overflow-hidden"
                        >
                            <h3 className="text-lg font-bold text-[#111638] mb-8 relative z-10">Network Events</h3>

                            <div className="relative pl-6 space-y-8 z-10">
                                {/* Timeline line */}
                                <div className="absolute left-[8px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#74573e]/50 via-[#111638]/10 to-transparent" />

                                {activity.map((act, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                                        className="relative group cursor-pointer"
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-[-21px] top-1.5 w-[10px] h-[10px] rounded-full bg-white border-[2px] border-[#74573e] group-hover:scale-125 group-hover:bg-[#74573e] transition-all duration-300 shadow-sm" />

                                        <div className="flex flex-col gap-1.5">
                                            <p className="text-sm">
                                                <span className="font-bold text-[#111638] block">{act.user}</span>
                                                <span className="text-zinc-500 font-medium text-xs block mt-0.5">{act.action} in <span className="font-semibold text-[#111638]">{act.location}</span></span>
                                            </p>
                                            <p className="text-[10px] text-[#74573e] font-bold tracking-[0.1em] uppercase">Just Now</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default DigitalMarketScreen;

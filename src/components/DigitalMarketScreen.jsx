import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

const UrbanActivityScreen = () => {
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
        { id: "EV-A1", type: "Ingest", level: "High", time: "2m ago", status: "Completed" },
        { id: "EV-B4", type: "Interact", level: "Med", time: "15m ago", status: "Completed" },
        { id: "EV-C2", type: "Ingest", level: "High", time: "1h ago", status: "Pending" },
        { id: "EV-D9", type: "Interact", level: "Med", time: "2h ago", status: "Completed" },
        { id: "EV-E5", type: "Ingest", level: "High", time: "3h ago", status: "Completed" },
        { id: "EV-F7", type: "Ingest", level: "High", time: "4h ago", status: "Processing" },
    ];

    const activity = [
        { participant: "Participant_88", action: "Updated Presence", location: "District 4" },
        { participant: "GlobalCorp", action: "Engagement", location: "Central Hub" },
        { participant: "Participant_12", action: "Viewed 3D Model", location: "North Wing" },
        { participant: "System", action: "Node Update", location: "All Regions" }
    ];

    return (
        <section className="relative w-full py-32 bg-[#fcfcfc] text-[#111638] overflow-hidden min-h-screen flex items-center justify-center">

            {/* Route 3 Ambient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(116,87,62,0.06)_0%,transparent_70%)] blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(17,22,56,0.04)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-24 relative z-10">

                {/* Elegant Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-4xl md:text-6xl tracking-tight text-[#111638] mb-6 font-medium">
                            Urban Activity <span className="">Hub</span>
                        </h2>
                        <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                            Monitor real-time interactions, secure activity logs, and platform-wide presence in a unified, floating dashboard.
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
                                24H Platform Engagement
                            </span>
                            <div className="flex items-baseline gap-5">
                                <div className="text-6xl md:text-8xl tracking-tighter text-[#111638] font-medium flex items-baseline" style={{ lineHeight: 1 }}>
                                    <NumberFlow
                                        value={tradingVolume}
                                        format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                                        trend={0}
                                        className="font-medium"
                                        style={{ lineHeight: 1 }}
                                    />
                                    <span style={{ lineHeight: 1 }} className="ml-2 uppercase text-3xl opacity-30">Activity</span>
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
                                                    fontWeight: 300,
                                                    fontFamily: '"Lazare Grotesk", sans-serif',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                    border: '1px solid rgba(116,87,62,0.3)',
                                                }}>
                                                    {volume.toFixed(1)}M ACTIVITY
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
                                                <g key={`pin - ${ index } `}>
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
                                <h3 className="text-lg font-bold text-[#111638]">Live Activity Feed</h3>
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
                                            key={`${ tx.id } -${ index } `}
                                            className="bg-white rounded-2xl p-5 shadow-sm border border-[#111638]/5 flex justify-between items-center group hover:bg-zinc-50/50 transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w - 12 h - 12 rounded - full flex items - center justify - center transition - colors ${ tx.type === 'Ingest' ? 'bg-[#74573e]/10 text-[#74573e] group-hover:bg-[#74573e]/20' : 'bg-zinc-50 text-zinc-500 group-hover:bg-zinc-100' } `}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tx.type === 'Ingest' ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" : "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"} /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#111638] group-hover:text-[#74573e] transition-colors">{tx.id}</p>
                                                    <p className="text-xs text-zinc-500 font-medium mt-1">{tx.time} &bull; {tx.type} Sequence</p>
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                                <p className="text-lg font-medium text-[#111638] uppercase text-xs opacity-60 tracking-tighter">{tx.level} Level</p>
                                                <div className={`text - [10px] font - medium uppercase tracking - wider mt - 1 px - 2 py - 0.5 rounded - sm ${ tx.status === 'Completed' ? 'bg-green-100 text-green-700' : tx.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700' } `}>
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
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-[#111638]">Network Events</h3>
                                <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-widest">Live</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                {activity.map((act, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 + (index * 0.08) }}
                                        className="group flex items-center gap-4 p-4 rounded-xl bg-white/60 border border-[#111638]/[0.04] hover:bg-[#111638] hover:border-[#111638] transition-colors duration-400 cursor-pointer"
                                    >
                                        {/* Avatar circle */}
                                        <div className="w-9 h-9 rounded-full bg-[#111638]/[0.06] flex items-center justify-center shrink-0 group-hover:bg-white/[0.1] transition-colors duration-400">
                                            <span className="text-[11px] font-bold text-[#111638] group-hover:text-white transition-colors duration-400">
                                                {act.participant.charAt(0)}
                                            </span>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-semibold text-[#111638] group-hover:text-white transition-colors duration-400 truncate">{act.participant}</p>
                                            <p className="text-[11px] text-zinc-400 group-hover:text-white/50 transition-colors duration-400 truncate mt-0.5">
                                                {act.action} in <span className="font-semibold text-[#111638]/70 group-hover:text-white/70 transition-colors duration-400">{act.location}</span>
                                            </p>
                                        </div>

                                        {/* Time badge */}
                                        <span className="text-[9px] font-bold text-[#74573e] group-hover:text-[#74573e] bg-[#74573e]/[0.06] group-hover:bg-[#74573e]/20 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 transition-colors duration-400">
                                            Now
                                        </span>
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

export default UrbanActivityScreen;

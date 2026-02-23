import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const Card = ({ title, description, badge, children, icon }) => (
    <div className="min-w-[85vw] md:min-w-[420px] h-[55vh] md:h-[480px] flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] bg-white border border-[#111638]/20 shadow-[0_4px_20px_-10px_rgba(17,22,56,0.1)] mx-4 md:mx-6 relative overflow-hidden group">
        <div>
            {badge && (
                <span className="inline-block px-3 py-1 rounded-full bg-[#74573e]/10 border border-[#74573e]/20 text-[#74573e] text-[9px] uppercase tracking-[0.2em] font-bold mb-6">
                    {badge}
                </span>
            )}
            <div className="flex items-start gap-5 mb-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#74573e]/10 flex items-center justify-center text-[#74573e]">
                    {icon}
                </div>
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight mb-3">{title}</h3>
                    <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-[280px]">{description}</p>
                </div>
            </div>
        </div>

        <div className="relative z-10 w-full mt-auto">
            {children}
        </div>
    </div>
);

const ScrubbedWord = ({ word, index, total, progress, range, color }) => {
    const start = range[0] + (index / total) * (range[1] - range[0]);
    const end = start + (1 / total) * (range[1] - range[0]);

    const opacity = useTransform(progress, [start, end], [0, 1]);
    const filter = useTransform(progress, [start, end], ["blur(12px)", "blur(0px)"]);
    const y = useTransform(progress, [start, end], [15, 0]);

    return (
        <motion.span style={{ opacity, filter, y, color }} className="inline-block mr-[0.3em]">
            {word}
        </motion.span>
    );
};

const HorizontalSection = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // We start moving horizontally only after the intro text has revealed (around 0.2 progress)
    const x = useTransform(scrollYProgress, [0.15, 1], ["0%", "-62%"]);

    const headlineWords = "Digital Urbanism.".split(" ");
    const introLabel = "The Platform Ecosystem".split(" ");
    const descriptionWords = "Discover the layers that make ErbilVerse a living digital city.".split(" ");

    return (
        <section ref={targetRef} className="relative h-[450vh] bg-white">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex items-center px-[5vw] md:px-[10vw]">

                    {/* Intro Card */}
                    <div className="min-w-[70vw] md:min-w-[35vw] flex flex-col justify-center pr-12 md:pr-20">
                        <div className="text-[#74573e] uppercase tracking-[0.4em] font-bold text-[10px] mb-6 block">
                            {introLabel.map((word, i) => (
                                <ScrubbedWord
                                    key={i}
                                    word={word}
                                    index={i}
                                    total={introLabel.length}
                                    progress={scrollYProgress}
                                    range={[0, 0.05]}
                                    color="#74573e"
                                />
                            ))}
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-8">
                            {headlineWords.map((word, i) => (
                                <ScrubbedWord
                                    key={i}
                                    word={word}
                                    index={i}
                                    total={headlineWords.length}
                                    progress={scrollYProgress}
                                    range={[0.02, 0.12]}
                                    color="#111638"
                                />
                            ))}
                        </h2>

                        <motion.div
                            style={{
                                scaleX: useTransform(scrollYProgress, [0.1, 0.15], [0, 1]),
                                originX: 0
                            }}
                            className="w-16 h-1 bg-[#74573e] mb-8"
                        ></motion.div>

                        <p className="text-zinc-400 text-lg max-w-sm leading-relaxed">
                            {descriptionWords.map((word, i) => (
                                <ScrubbedWord
                                    key={i}
                                    word={word}
                                    index={i}
                                    total={descriptionWords.length}
                                    progress={scrollYProgress}
                                    range={[0.1, 0.2]}
                                    color="#11163880"
                                />
                            ))}
                        </p>
                    </div>

                    {/* Card 1: City Map Screen */}
                    <motion.div
                        style={{
                            opacity: useTransform(scrollYProgress, [0.15, 0.25], [0, 1]),
                            filter: useTransform(scrollYProgress, [0.15, 0.25], ["blur(15px)", "blur(0px)"]),
                            y: useTransform(scrollYProgress, [0.15, 0.25], [30, 0])
                        }}
                    >
                        <Card
                            badge="Module 01"
                            title="City Map"
                            description="Navigate Erbil in an interactive 3D environment and discover real districts."
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>}
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center">
                                    <span className="text-zinc-400 text-[9px] uppercase font-bold mb-1">View</span>
                                    <span className="text-zinc-900 text-xs font-semibold">3D Ortho</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-[#74573e]/5 border border-[#74573e]/10 flex flex-col items-center text-center">
                                    <span className="text-[#74573e] text-[9px] uppercase font-bold mb-1">Active</span>
                                    <span className="text-zinc-900 text-xs font-semibold">Central</span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Card 2: Digital Market Screen */}
                    <motion.div
                        style={{
                            opacity: useTransform(scrollYProgress, [0.3, 0.4], [0, 1]),
                            filter: useTransform(scrollYProgress, [0.3, 0.4], ["blur(15px)", "blur(0px)"]),
                            y: useTransform(scrollYProgress, [0.3, 0.4], [30, 0])
                        }}
                    >
                        <Card
                            badge="Module 02"
                            title="Market"
                            description="Dynamic market values based on platform activity."
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                        >
                            <div className="flex flex-col gap-3">
                                {["Latest Transactions", "Recent Activity"].map((label, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                                        <span className="text-zinc-600 text-xs font-medium">{label}</span>
                                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Card 3: Developer Screen */}
                    <motion.div
                        style={{
                            opacity: useTransform(scrollYProgress, [0.45, 0.55], [0, 1]),
                            filter: useTransform(scrollYProgress, [0.45, 0.55], ["blur(15px)", "blur(0px)"]),
                            y: useTransform(scrollYProgress, [0.45, 0.55], [30, 0])
                        }}
                    >
                        <Card
                            badge="Module 03"
                            title="Developers"
                            description="Professional digital showcasing for your projects."
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <div className="aspect-square rounded-xl bg-[#74573e]/5 border border-[#74573e]/10 flex flex-col justify-center p-4">
                                    <span className="text-zinc-900 font-bold text-xl mb-1">3D</span>
                                    <span className="text-zinc-400 text-[8px] uppercase font-bold">Space</span>
                                </div>
                                <div className="aspect-square rounded-xl bg-zinc-50 border border-zinc-100 flex flex-col justify-center p-4">
                                    <span className="text-zinc-900 font-bold text-xl mb-1">Log</span>
                                    <span className="text-zinc-400 text-[8px] uppercase font-bold">Connect</span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Card 4: Transparency Screen */}
                    <motion.div
                        style={{
                            opacity: useTransform(scrollYProgress, [0.6, 0.7], [0, 1]),
                            filter: useTransform(scrollYProgress, [0.6, 0.7], ["blur(15px)", "blur(0px)"]),
                            y: useTransform(scrollYProgress, [0.6, 0.7], [30, 0])
                        }}
                    >
                        <Card
                            badge="Module 04"
                            title="Secure"
                            description="Verified environment with real-time tracking."
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                        >
                            <div className="space-y-3">
                                {["Verified Users", "Activity Log"].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-zinc-600">
                                        <div className="w-5 h-5 rounded-full bg-[#74573e]/10 flex items-center justify-center">
                                            <svg className="w-2.5 h-2.5 text-[#74573e]" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                        </div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Outro Spacer */}
                    <div className="min-w-[20vw]"></div>

                </motion.div>
            </div>
        </section>
    );
};

export default HorizontalSection;

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const Card = ({ title, description, badge, children, icon, isMobile }) => (
    <div className="w-[92vw] max-w-[850px] h-auto md:h-[480px] flex flex-col md:flex-row rounded-[2rem] md:rounded-[2.5rem] bg-white border border-[#74573e]/5 shadow-[0_30px_60px_-15px_rgba(17,22,56,0.06)] mx-4 md:mx-6 relative overflow-hidden group">
        {/* Left Column: Content */}
        <div className="w-full md:w-[42%] p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#74573e]/5 bg-white relative z-20">
            <div>
                {badge && (
                    <span className="inline-block px-3 py-1 rounded-md bg-[#74573e]/5 border border-[#74573e]/10 text-[#74573e] text-[9px] uppercase tracking-[0.4em] font-black mb-6 md:mb-10">
                        {badge}
                    </span>
                )}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#74573e]/5 flex items-center justify-center text-[#74573e] mb-4 md:mb-6">
                    {React.cloneElement(icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                </div>
                <h3 className="text-2xl md:text-5xl font-bold text-[#111638] tracking-tighter mb-3 md:mb-4 leading-none uppercase">{title}</h3>
                <p className="text-zinc-400 text-xs md:text-base leading-relaxed font-medium mb-6 md:mb-0">{description}</p>
            </div>

            {!isMobile && (
                <div className="flex gap-1.5 opacity-20">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#74573e]" />
                    ))}
                </div>
            )}
        </div>

        {/* Right Column: Visual Stage */}
        <div className="w-full md:w-[58%] h-[280px] md:h-full bg-[#fcfcfd] relative overflow-hidden flex items-center justify-center p-6 md:p-8">
            <div className="scale-[0.85] md:scale-100 w-full h-full flex items-center justify-center">
                {children}
            </div>
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

const HorizontalSection = ({ progress }) => {
    // We no longer need the containerRef or scrollRange as we've moved to a vertical stack.
    // Keeping this component as a sticky section controlled by the parent's progress.

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Generate a local progress for the sequence that starts AFTER
    // the global progress reaches 0.5
    const localProgress = useTransform(progress, [0.5, 1], [0, 1]);

    // Timings for stacking sequence - spreading them out more
    const timings = {
        introLabel: [0.0, 0.08],
        headline: [0.05, 0.15],
        line: [0.1, 0.2],
        description: [0.15, 0.25],
        introFadeOut: [0.3, 0.4],

        card1: {
            enter: [0.35, 0.45],
            stack: [0.5, 0.6] // When card 2 enters
        },
        card2: {
            enter: [0.5, 0.6],
            stack: [0.65, 0.75] // When card 3 enters
        },
        card3: {
            enter: [0.65, 0.75],
            stack: [0.8, 0.9] // When card 4 enters
        },
        card4: {
            enter: [0.8, 0.9]
        }
    };

    const headlineWords = "Digital Urbanism.".split(" ");
    const introLabel = "The Platform Ecosystem".split(" ");
    const descriptionWords = "Discover the layers that make ErbilVerse a living digital city.".split(" ");

    // Fade the white background in as the entire global track transitions from 0.45 to 0.5
    const sectionOpacity = useTransform(progress, [0.45, 0.5], [0, 1]);

    // Intro section transforms
    const introOpacity = useTransform(localProgress, timings.introFadeOut, [1, 0]);
    const introScale = useTransform(localProgress, timings.introFadeOut, [1, 0.95]);

    // Card 1 transforms
    const card1Y = useTransform(localProgress, [...timings.card1.enter, ...timings.card1.stack], [1000, 0, 0, -40]);
    const card1Scale = useTransform(localProgress, [...timings.card1.enter, ...timings.card1.stack], [0.9, 1, 1, 0.94]);
    const card1Opacity = useTransform(localProgress, timings.card1.enter, [0, 1]);
    const card1Blur = useTransform(localProgress, timings.card1.enter, ["blur(20px)", "blur(0px)"]);

    // Card 2 transforms
    const card2Y = useTransform(localProgress, [...timings.card2.enter, ...timings.card2.stack], [1000, 0, 0, -20]);
    const card2Scale = useTransform(localProgress, [...timings.card2.enter, ...timings.card2.stack], [0.9, 1, 1, 0.97]);
    const card2Opacity = useTransform(localProgress, timings.card2.enter, [0, 1]);
    const card2Blur = useTransform(localProgress, timings.card2.enter, ["blur(20px)", "blur(0px)"]);

    // Card 3 transforms
    const card3Y = useTransform(localProgress, [...timings.card3.enter, ...timings.card3.stack], [1000, 0, 0, 0]);
    const card3Scale = useTransform(localProgress, [...timings.card3.enter, ...timings.card3.stack], [0.9, 1, 1, 1]);
    const card3Opacity = useTransform(localProgress, timings.card3.enter, [0, 1]);
    const card3Blur = useTransform(localProgress, timings.card3.enter, ["blur(20px)", "blur(0px)"]);

    // Card 4 transforms
    const card4Y = useTransform(localProgress, timings.card4.enter, [1000, 0]);
    const card4Scale = useTransform(localProgress, timings.card4.enter, [0.9, 1]);
    const card4Opacity = useTransform(localProgress, timings.card4.enter, [0, 1]);
    const card4Blur = useTransform(localProgress, timings.card4.enter, ["blur(20px)", "blur(0px)"]);

    return (
        <section className="relative h-full w-full">
            <motion.div style={{ opacity: sectionOpacity }} className="h-full w-full flex items-center justify-center overflow-hidden bg-white">
                <div className="relative w-full h-full max-w-[1600px] flex items-center justify-center">

                    {/* Intro Card */}
                    <motion.div
                        style={{ opacity: introOpacity, scale: introScale }}
                        className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10"
                    >
                        <div className="text-[#74573e] uppercase tracking-[0.4em] font-bold text-[10px] mb-6 block">
                            {introLabel.map((word, i) => (
                                <ScrubbedWord
                                    key={i}
                                    word={word}
                                    index={i}
                                    total={introLabel.length}
                                    progress={localProgress}
                                    range={timings.introLabel}
                                    color="#74573e"
                                />
                            ))}
                        </div>

                        <h2 className="text-[2.75rem] leading-[1] md:text-7xl font-bold tracking-tighter md:leading-[0.95] mb-6 md:mb-8">
                            {headlineWords.map((word, i) => (
                                <ScrubbedWord
                                    key={i}
                                    word={word}
                                    index={i}
                                    total={headlineWords.length}
                                    progress={localProgress}
                                    range={timings.headline}
                                    color="#111638"
                                />
                            ))}
                        </h2>

                        <motion.div
                            style={{
                                scaleX: useTransform(localProgress, timings.line, [0, 1]),
                                originX: 0.5
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
                                    progress={localProgress}
                                    range={timings.description}
                                    color="#11163880"
                                />
                            ))}
                        </p>
                    </motion.div>

                    {/* Cards Stack */}
                    <div className="relative w-full h-[600px] flex items-center justify-center z-20">
                        {/* Card 1 */}
                        <motion.div
                            style={{
                                y: card1Y,
                                scale: card1Scale,
                                opacity: card1Opacity,
                                filter: card1Blur,
                                position: "absolute",
                                zIndex: 1
                            }}
                        >
                            <Card
                                badge="Module 01"
                                title="City Map"
                                description="Navigate Erbil in an interactive 3D environment and discover real districts."
                                icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>}
                                isMobile={isMobile}
                            >
                                <div className="w-full h-full flex items-center justify-center relative">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                        className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full border border-[#74573e]/10 flex items-center justify-center"
                                    >
                                        <div className="w-[130px] h-[130px] md:w-[180px] md:h-[180px] rounded-full border border-[#74573e]/5 flex items-center justify-center relative">
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                                className="absolute inset-0 bg-[#74573e]/10 rounded-full blur-xl"
                                            />
                                            <svg className="w-8 h-8 md:w-12 md:h-12 text-[#74573e]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                                        </div>
                                    </motion.div>

                                    {/* Scanning Orbitals */}
                                    {[0, 120, 240].map((deg, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ rotate: [deg, deg + 360] }}
                                            transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                                            className="absolute w-[260px] h-[260px] md:w-[340px] md:h-[340px]"
                                        >
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#74573e] absolute top-0 left-1/2 -translate-x-1/2" />
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            style={{
                                y: card2Y,
                                scale: card2Scale,
                                opacity: card2Opacity,
                                filter: card2Blur,
                                position: "absolute",
                                zIndex: 2
                            }}
                        >
                            <Card
                                badge="Module 02"
                                title="Market"
                                description="Dynamic market values based on platform activity."
                                icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                                isMobile={isMobile}
                            >
                                <div className="w-full flex items-end justify-center gap-1.5 md:gap-3 h-full max-h-[160px] md:max-h-[200px]">
                                    {[40, 70, 45, 90, 65, 80, 50, 85].map((height, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [`${height}%`, `${height + 10}%`, `${height}%`] }}
                                            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-3 md:w-4 bg-[#74573e]/10 rounded-t-md md:rounded-t-lg border-t border-x border-[#74573e]/20 relative group"
                                        >
                                            <motion.div
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                                                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-1 text-[7px] md:text-[8px] font-bold text-[#74573e]"
                                            >
                                                +{i}.2
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            style={{
                                y: card3Y,
                                scale: card3Scale,
                                opacity: card3Opacity,
                                filter: card3Blur,
                                position: "absolute",
                                zIndex: 3
                            }}
                        >
                            <Card
                                badge="Module 03"
                                title="Developers"
                                description="Professional digital showcasing for your projects."
                                icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011-1v5m-4 0h4" /></svg>}
                                isMobile={isMobile}
                            >
                                <div className="flex flex-col gap-2.5 md:gap-4 w-full max-w-[320px]">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="p-3 md:p-4 rounded-xl bg-white border border-[#74573e]/10 relative overflow-hidden group/dev shadow-sm">
                                            <motion.div
                                                animate={{ x: [-320, 320] }}
                                                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-y-0 w-16 md:w-20 bg-gradient-to-r from-transparent via-[#74573e]/10 to-transparent pointer-events-none"
                                            />
                                            <div className="flex items-center justify-between font-mono text-[8px] md:text-[10px]">
                                                <span className="text-[#74573e]/60 font-bold tracking-wider">INSTANCE_RD_{i}20</span>
                                                <span className="text-[#74573e] font-black">ACTIVE</span>
                                            </div>
                                            <div className="mt-1.5 md:mt-2 h-1 w-full bg-[#74573e]/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    animate={{ width: ["20%", "80%", "20%"] }}
                                                    transition={{ duration: 5, delay: i * 1, repeat: Infinity }}
                                                    className="h-full bg-[#74573e]/20"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Card 4 */}
                        <motion.div
                            style={{
                                y: card4Y,
                                scale: card4Scale,
                                opacity: card4Opacity,
                                filter: card4Blur,
                                position: "absolute",
                                zIndex: 4
                            }}
                        >
                            <Card
                                badge="Module 04"
                                title="Secure"
                                description="Verified environment with real-time tracking."
                                icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                                isMobile={isMobile}
                            >
                                <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 md:gap-6">
                                    <div className="relative">
                                        <motion.div
                                            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="absolute inset-0 bg-[#74573e] rounded-full blur-2xl"
                                        />
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-white border border-[#74573e]/5 shadow-xl flex items-center justify-center relative z-10">
                                            <motion.div
                                                animate={{ y: [-3, 3, -3], scale: [1, 1.05, 1] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            >
                                                <svg className="w-8 h-8 md:w-10 md:h-10 text-[#74573e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                            </motion.div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5 md:gap-2">
                                        {[1, 2, 3, 4, 5, 6].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ opacity: [0.3, 1, 0.3], scaleY: [1, 1.5, 1] }}
                                                transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                                                className="w-0.5 md:w-1 h-2 md:h-3 bg-[#74573e]/20 rounded-full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default HorizontalSection;

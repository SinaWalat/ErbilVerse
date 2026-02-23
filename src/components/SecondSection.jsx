import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const sentence = "Modern life fatigues the mind. We build spatial experiences that feel like stepping into a sanctuary.";

const SecondSection = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    // We bind the scroll progress to the entire 300vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
        // start animating when the container is pinned (top hits top)
        // finish animating when the container unpins (bottom hits bottom)
    });

    // Track the entrance of the section to animate the background color
    const { scrollYProgress: entranceProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    // Interpolate from black (matching Hero) to brand dark blue
    const bgColor = useTransform(entranceProgress, [0, 1], ["#000000", "#111638"]);

    const words = sentence.split(" ");

    return (
        // The outer container provides the scrolling track. 
        // We use 250vh to ensure there is plenty of distance to slowly scrub the text.
        <motion.div ref={containerRef} style={{ backgroundColor: bgColor }} className="relative w-full h-[250vh] font-sans">

            {/* The sticky container locks the text in the center of the viewport while we scroll through the 300vh track */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <div ref={textRef} className="max-w-4xl px-6 md:px-12 lg:px-24 mx-auto text-center">
                    <p className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 lg:gap-x-4 gap-y-1 md:gap-y-2 text-[1.5rem] md:text-[2.5rem] lg:text-[3.5rem] font-bold leading-[1.2] tracking-tight">
                        {words.map((word, i) => {
                            // Calculate the specific progress range for this word
                            const start = i / words.length;
                            const end = start + (1 / words.length);

                            // Map the scroll progress to opacity
                            // Map the scroll progress to opacity
                            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

                            // Map the scroll progress to a blur filter (soft focus effect)
                            const filter = useTransform(scrollYProgress, [start, end], ["blur(12px)", "blur(0px)"]);

                            // Add a slight translation for a cinematic settling effect
                            const y = useTransform(scrollYProgress, [start, end], [20, 0]);

                            // Alternate between white and the brand bronze/gold for certain words 
                            const isGoldWord = word.toLowerCase() === 'spatial' || word.toLowerCase() === 'sanctuary.';
                            const textColor = isGoldWord ? '#74573e' : 'rgba(255,255,255,0.85)';

                            return (
                                <motion.span
                                    key={i}
                                    style={{
                                        opacity,
                                        filter,
                                        y,
                                        color: textColor
                                    }}
                                    className="inline-block drop-shadow-lg"
                                >
                                    {word}
                                </motion.span>
                            );
                        })}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default SecondSection;

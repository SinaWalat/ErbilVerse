import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const sentence = "Modern life fatigues the mind. We build spatial experiences that feel like stepping into a sanctuary.";

const SecondSection = ({ progress }) => {
    // We map the global progress to a local progress so the text animation only happens
    // during Phase 2 of the unified timeline (from 0.2 to 0.5)
    const localProgress = useTransform(progress, [0.2, 0.5], [0, 1]);

    const words = sentence.split(" ");

    return (
        <motion.div className="relative w-full h-full font-sans bg-transparent pointer-events-none">
            <div className="h-full w-full flex items-center justify-center overflow-hidden">
                <div className="max-w-4xl px-6 md:px-12 lg:px-24 mx-auto text-center">
                    <p className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 lg:gap-x-4 gap-y-1 md:gap-y-2 text-[1.5rem] md:text-[2.5rem] lg:text-[3.5rem] font-bold leading-[1.2] tracking-tight">
                        {words.map((word, i) => {
                            // Calculate the specific progress range for this word using the *compressed* local progress
                            const textRevealEndProgress = 0.7;
                            const textFadeOutStart = 0.8;
                            const textFadeOutEnd = 0.95;

                            const start = (i / words.length) * textRevealEndProgress;
                            const end = start + ((1 / words.length) * textRevealEndProgress);

                            // Map the scroll progress to opacity: Fade In -> Hold -> Fade Out
                            const opacity = useTransform(localProgress, [start, end, textFadeOutStart, textFadeOutEnd], [0, 1, 1, 0]);

                            // Map the scroll progress to a blur filter (soft focus effect)
                            const filter = useTransform(localProgress, [start, end, textFadeOutStart, textFadeOutEnd], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

                            // Add a slight translation for a cinematic settling effect
                            const y = useTransform(localProgress, [start, end], [20, 0]);

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

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

const FullScreenMenu = ({ isOpen, onClose }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Lock body scroll when menu is open and reset hover state
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setHoveredIndex(null); // Ensure hover is reset whenever opened
        } else {
            document.body.style.overflow = '';
            setHoveredIndex(null); // Ensure hover is cleared when closed
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] pointer-events-auto">

                    {/* Transition Layer 1 (Brown/Gold) */}
                    <motion.div
                        className="absolute inset-0 bg-[#74573e] z-0"
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ clipPath: 'inset(100% 0 0 0)' }}
                        transition={{
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1],
                            exit: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }
                        }}
                    />

                    {/* Transition Layer 2 (Navy Blue - Main Background) */}
                    <motion.div
                        className="absolute inset-0 bg-[#111638] z-10"
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ clipPath: 'inset(100% 0 0 0)' }}
                        transition={{
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1],
                            delay: 0.15,
                            exit: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0 }
                        }}
                    />

                    {/* Content Layer */}
                    <motion.div
                        className="absolute inset-0 z-20 flex flex-col h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.6 } }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                        {/* Main Content (Spacing adjusted for fixed header) */}
                        <div className="flex-1 flex flex-col md:flex-row px-6 md:px-12 lg:px-24 w-full max-w-[1600px] mx-auto pt-28">
                            {/* Left — Large Nav links */}
                            <div className="flex-1 flex flex-col justify-center">
                                <nav className="flex flex-col">
                                    {menuItems.map((item, i) => (
                                        <div
                                            key={item.label}
                                            className="overflow-hidden"
                                            onMouseEnter={() => setHoveredIndex(i)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            <motion.a
                                                href={item.href}
                                                onClick={onClose}
                                                className="group flex items-center gap-5 md:gap-8 cursor-pointer relative py-3 md:py-[18px]"
                                                initial={{ y: '120%' }}
                                                animate={{ y: '0%' }}
                                                transition={{
                                                    duration: 0.8,
                                                    ease: [0.22, 1, 0.36, 1],
                                                    delay: 0.4 + i * 0.08,
                                                }}
                                            >
                                                {/* Number */}
                                                <span
                                                    className="text-[11px] font-mono transition-all duration-500 mt-2 min-w-[24px]"
                                                    style={{
                                                        color: hoveredIndex === i ? '#d4a373' : 'rgba(255,255,255,0.15)',
                                                    }}
                                                >
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>

                                                {/* Label */}
                                                <span
                                                    className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-light leading-[0.95] tracking-[-0.03em] transition-all duration-500 relative"
                                                    style={{
                                                        color: hoveredIndex === null || hoveredIndex === i ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.15)',
                                                        transform: hoveredIndex === i ? 'translateX(12px)' : 'translateX(0)',
                                                        WebkitTextStroke: hoveredIndex !== null && hoveredIndex !== i ? '1px rgba(255,255,255,0.08)' : 'none',
                                                    }}
                                                >
                                                    {item.label}
                                                </span>

                                                {/* Arrow */}
                                                <svg
                                                    width="32" height="32" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" strokeWidth="1.5"
                                                    className="transition-all duration-500 -rotate-45 mt-3 flex-shrink-0"
                                                    style={{
                                                        color: hoveredIndex === i ? '#d4a373' : 'transparent',
                                                        opacity: hoveredIndex === i ? 1 : 0,
                                                        transform: `rotate(-45deg) translateX(${hoveredIndex === i ? '0px' : '-20px'})`,
                                                    }}
                                                >
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </motion.a>

                                            {/* Separator */}
                                            <motion.div
                                                className="h-px bg-white/[0.04]"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.5 + i * 0.08 }}
                                                style={{ transformOrigin: 'left' }}
                                            />
                                        </div>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Footer */}
                        <motion.div
                            className="px-6 md:px-12 lg:px-24 py-6 flex items-center justify-between border-t border-white/[0.04] w-full max-w-[1600px] mx-auto"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <p className="text-[10px] text-[#d4a373]/70 tracking-[0.2em] uppercase font-medium">© {new Date().getFullYear()} Erbilverse</p>
                            <p className="text-[10px] text-[#d4a373]/70 tracking-[0.2em] uppercase font-medium">All rights reserved</p>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FullScreenMenu;

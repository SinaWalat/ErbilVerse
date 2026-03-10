import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import FullScreenMenu from './FullScreenMenu';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isOverLightSection, setIsOverLightSection] = useState(false);
    
    // We want the Header to be WHITE during the Hero Video section (progress < 0.30)
    // and then revert back to its normal color afterward.
    const [isVideoActive, setIsVideoActive] = useState(true);
    const { scrollYProgress } = useScroll();
    
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.30) {
            setIsVideoActive(true);
        } else {
            setIsVideoActive(false);
        }
    });

    const location = useLocation();

    useEffect(() => {
        // Only run observer on the home page where sections exist
        if (location.pathname !== '/') {
            setIsOverLightSection(false);
            return;
        }

        const handleScroll = () => {
            // Find all elements that have the light background class
            const lightSections = document.querySelectorAll('.bg-\\[\\#fcfcfc\\]');
            let foundLightSectionUnderHeader = false;

            // Header is fixed at the top, let's check a point a bit below the top edge
            // where the logo and menu text actually sit.
            const headerCheckY = 50;

            lightSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                // If the top of the light section is above our check line AND
                // the bottom of the light section is below our check line, we are over it.
                if (rect.top <= headerCheckY && rect.bottom >= headerCheckY) {
                    foundLightSectionUnderHeader = true;
                }
            });

            setIsOverLightSection(foundLightSectionUnderHeader);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    // Color states: White during video, otherwise brown
    // 150ms smooth transition applied to className below
    const isWhiteText = isVideoActive;
    
    // We want the Close button to inherit the environment's text color.
    // So if the menu is open, its text is just slightly faded, but inherits the base color.
    const baseTextColor = isWhiteText ? "text-white" : "text-[#74573e]";
    const hoverTextColor = isWhiteText ? "hover:text-white/80" : "hover:text-[#5e4530]";
    const openMenuOpacity = "opacity-50 hover:opacity-100";
    
    const textColorClass = !menuOpen
        ? `${baseTextColor} ${hoverTextColor}`
        : `${baseTextColor} ${openMenuOpacity}`;

    // For the logo, we use CSS filter to turn it brown (#74573e) when NOT in video
    // Otherwise keep it white (or drop the filter to show original white SVG)
    // filter: brightness(0) saturate(100%) invert(35%) sepia(21%) saturate(986%) hue-rotate(345deg) brightness(97%) contrast(85%);
    const logoFilter = !menuOpen && !isVideoActive
        ? "brightness(0) saturate(100%) invert(35%) sepia(21%) saturate(986%) hue-rotate(345deg) brightness(97%) contrast(85%)"
        : "none";

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{
                    y: 0,
                }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="fixed top-0 left-0 right-0 z-[300] w-full mix-blend-normal"
            >
                <div className="max-w-[1600px] mx-auto w-full py-6 px-6 md:px-12 lg:px-24 flex justify-between items-center">
                    <motion.div
                        animate={{
                            opacity: menuOpen ? 0 : 1
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex items-center"
                    >
                        <Link to="/" className="flex items-center">
                            <img
                                src="/ErbilVerse-LogoText.svg"
                                alt="ERBILVERSE"
                                className="h-10 w-auto transition-[filter] duration-150 ease-in-out pointer-events-auto"
                                style={{ filter: logoFilter }}
                            />
                        </Link>
                    </motion.div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="group relative flex items-center justify-end cursor-pointer pointer-events-auto w-16 h-8 overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={menuOpen ? 'close' : 'menu'}
                                initial={{ y: 15, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -15, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                                className={`absolute text-[13px] font-light transition-colors duration-150 ease-in-out tracking-[0.15em] uppercase ${textColorClass}`}
                            >
                                {menuOpen ? 'Close' : 'Menu'}
                            </motion.span>
                        </AnimatePresence>
                    </button>
                </div>
            </motion.nav>

            <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
};

export default Navigation;

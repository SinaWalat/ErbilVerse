import React from 'react';
import { motion } from 'motion/react';

const Footer = () => {
    return (
        <footer className="w-full bg-[#111638] border-t border-white/5 relative z-30 overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-[50%] left-[-5%] w-[400px] h-[400px] rounded-full bg-white/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#74573e]/[0.08] blur-[200px] pointer-events-none" />

            <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16 relative z-10">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 md:mb-24 gap-8">
                    {/* Logo/Brand */}
                    <div className="max-w-[120px] md:max-w-[160px]">
                        <img
                            src="/EV-LOGO-PRELOADER.svg"
                            alt="ERBILVERSE Logo"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Links grid */}
                    <div className="grid grid-cols-2 gap-x-12 md:gap-x-24 gap-y-4">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2">Platform</h3>
                            <a href="#" className="text-sm text-white/80 hover:text-[#eed0b4] transition-colors">Activity Layer</a>
                            <a href="#" className="text-sm text-white/80 hover:text-[#eed0b4] transition-colors">Developer Portal</a>
                            <a href="#" className="text-sm text-white/80 hover:text-[#eed0b4] transition-colors">City Map</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2">Company</h3>
                            <a href="#" className="text-sm text-white/80 hover:text-[#eed0b4] transition-colors">About Us</a>
                            <a href="#" className="text-sm text-white/80 hover:text-[#eed0b4] transition-colors">Careers</a>
                            <a href="#" className="text-sm text-white/80 hover:text-[#eed0b4] transition-colors">Contact</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center pt-8 border-t border-white/5 gap-4"
                >
                    <p className="text-[12px] text-white/40 leading-relaxed max-w-xl font-light">
                        ERBILVERSE is a structured digital property environment operating within the city framework. Digital ownership exists exclusively within the platform ecosystem.
                    </p>
                    <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] font-light">
                        © ERBILVERSE
                    </p>
                </motion.div>

            </div>
        </footer>
    );
};

export default Footer;

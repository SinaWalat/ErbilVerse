import React from 'react';
import { motion } from 'motion/react';

const Footer = () => {
    return (
        <footer className="w-full bg-[#111638] font-sans border-t border-white/5 relative z-30">
            <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 md:mb-24 gap-8">
                    {/* Logo/Brand */}
                    <div className="max-w-[120px] md:max-w-[160px]">
                        <img
                            src="/EV-LOGO-PRELOADER.svg"
                            alt="ErbilVerse Logo"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Links grid */}
                    <div className="grid grid-cols-2 gap-x-12 md:gap-x-24 gap-y-4">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Platform</h3>
                            <a href="#" className="text-sm text-white/80 hover:text-[#eed0b4] transition-colors">Digital Market</a>
                            <a href="#" className="text-sm text-white/80 hover:text-[#eed0b4] transition-colors">Developer Portal</a>
                            <a href="#" className="text-sm text-white/80 hover:text-[#eed0b4] transition-colors">City Map</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Company</h3>
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
                    className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4"
                >
                    <p className="text-[11px] text-white/40 uppercase tracking-[0.2em] font-medium">
                        © {new Date().getFullYear()} Erbilverse. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-[11px] text-white/40 hover:text-[#eed0b4] transition-colors uppercase tracking-[0.15em]">Privacy Policy</a>
                        <a href="#" className="text-[11px] text-white/40 hover:text-[#eed0b4] transition-colors uppercase tracking-[0.15em]">Terms of Service</a>
                    </div>
                </motion.div>

            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { Menu, User, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 py-6 px-8 flex justify-between items-center bg-gradient-to-b from-bg-dark/80 to-transparent backdrop-blur-sm"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-light to-secondary flex items-center justify-center shadow-glow">
                    <MapPin color="white" size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-medium tracking-wider text-white">ERBIL<span className="text-secondary-light">VERSE</span></h1>
                    <p className="text-[0.65rem] tracking-[0.2em] text-text-muted uppercase font-light">Digital Layer</p>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm tracking-wider font-medium text-text-muted">
                <a href="#city" className="hover:text-white transition-colors duration-300">City Map</a>
                <a href="#market" className="hover:text-white transition-colors duration-300">Market</a>
                <a href="#developers" className="hover:text-white transition-colors duration-300">Developers</a>
            </div>

            <div className="flex items-center gap-4">
                <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-glass-bg border border-border hover:border-secondary/50 transition-all duration-300 text-sm font-medium hover:shadow-glow">
                    <User size={16} />
                    <span>Connect Wallet</span>
                </button>
                <button className="md:hidden p-2 text-text-muted hover:text-white">
                    <Menu size={24} />
                </button>
            </div>
        </motion.nav>
    );
};

export default Navigation;

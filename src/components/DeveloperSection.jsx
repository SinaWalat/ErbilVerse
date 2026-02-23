import React from 'react';
import { Box, Users, MessageSquareMore, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <Box size={24} className="text-secondary-light" />,
        title: "Showcase Projects in 3D",
        desc: "Bring developments to life through immersive virtual environments before ground is ever broken."
    },
    {
        icon: <Users size={24} className="text-secondary-light" />,
        title: "Connect with New Audiences",
        desc: "Reach a global network of digital real estate enthusiasts and potential domestic investors."
    },
    {
        icon: <MessageSquareMore size={24} className="text-secondary-light" />,
        title: "Receive Direct Engagement",
        desc: "Interact instantly with interested parties through the platform's secure communication layer."
    },
    {
        icon: <Award size={24} className="text-secondary-light" />,
        title: "Strengthen Digital Positioning",
        desc: "Establish your brand as a forward-thinking pioneer in Erbil's digital real estate revolution."
    }
];

const DeveloperSection = () => {
    return (
        <section id="developers" className="py-24 relative overflow-hidden bg-bg-dark border-t border-border/50">
            {/* Background glow coming from the right */}
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary/10 -translate-y-1/2 -z-10 blur-[130px] rounded-full"></div>

            <div className="container-custom relative z-10">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-secondary/30 bg-secondary/10 text-secondary-light">
                            <span className="w-2 h-2 rounded-full bg-secondary-light animate-pulse"></span>
                            <span className="text-xs uppercase tracking-widest font-medium">Partner Program</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6">
                            For <span className="text-gradient">Developers</span>
                        </h2>

                        <p className="text-text-muted text-lg font-light leading-relaxed mb-10 max-w-lg">
                            A new digital presence inside Erbil's interactive city layer. Leverage the ErbilVerse platform to showcase, market, and manage your developments.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 mb-10">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
                                    className="glass-panel p-5 rounded-2xl border-white/5 hover:border-secondary/30 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(122,85,58,0.15)]">
                                        {feature.icon}
                                    </div>
                                    <h4 className="font-medium font-outfit text-lg mb-2">{feature.title}</h4>
                                    <p className="text-sm text-text-muted leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-primary font-medium hover:bg-white/90 transition-all duration-300 group shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        >
                            <span>Apply for Developer Access</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>

                    {/* Right Side: Visual Graphic (Hologram interface mockup) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] w-full max-w-[500px] mx-auto relative perspective-[1000px]">

                            {/* Floating screens effect */}
                            <motion.div
                                animate={{ rotateY: [-10, 0, -10], rotateX: [5, 0, 5], y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="absolute inset-0 bg-gradient-to-br from-primary-light/40 to-primary/20 rounded-3xl border border-primary-light/50 backdrop-blur-sm transform rotate-y-[-10deg] rotate-x-[5deg] p-6 shadow-2xl flex flex-col transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0"
                            >

                                {/* Screen Header */}
                                <div className="flex justify-between items-center border-b border-border/50 pb-4 mb-6">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                    </div>
                                    <p className="text-xs text-text-muted uppercase tracking-wider">Developer Dashboard</p>
                                </div>

                                {/* Dashboard content blocks */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-bg-dark/60 rounded-xl p-4 border border-white/5">
                                        <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Total Views</p>
                                        <p className="text-xl font-bold font-outfit">45,289</p>
                                    </div>
                                    <div className="bg-bg-dark/60 rounded-xl p-4 border border-white/5">
                                        <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Inquiries</p>
                                        <p className="text-xl font-bold font-outfit text-secondary-light">342</p>
                                    </div>
                                </div>

                                <div className="flex-1 bg-bg-dark/60 rounded-xl p-4 border border-white/5 relative overflow-hidden flex flex-col">
                                    <p className="text-[10px] text-text-muted uppercase tracking-wider mb-4">Asset Performance</p>

                                    {/* Mock bar chart */}
                                    <div className="flex-1 flex items-end justify-between gap-2 px-2 mt-auto">
                                        {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                                            <div key={i} className="w-full bg-gradient-to-t from-primary/80 to-primary-light rounded-t-sm relative group">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${height}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                                                    className="absolute bottom-0 w-full bg-gradient-to-t from-secondary/50 to-secondary-light rounded-t-sm transition-all duration-500 group-hover:opacity-80"
                                                ></motion.div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* UI Overlay element */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                                    className="absolute -right-12 top-1/3 glass-panel p-4 rounded-xl border border-secondary/30 shadow-[0_0_30px_rgba(122,85,58,0.2)] shadow-glow"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center fill-secondary-light text-secondary-light">
                                            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 13.5l-10-5V17l10 5 10-5v-6.5l-10 5z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white">Project Approved</p>
                                            <p className="text-[10px] text-text-muted">Twin created</p>
                                        </div>
                                    </div>
                                </motion.div>

                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default DeveloperSection;

import React from 'react';
import { motion } from 'framer-motion';

const DeveloperScreen = () => {
    return (
        <section className="relative w-full py-32 px-6 md:px-16 bg-gradient-to-tr from-white to-[#fdfbf9] text-[#111638] overflow-hidden lg:min-h-screen flex items-center">
            {/* Soft Ambient Background Elements */}
            <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-[#74573e]/5 to-transparent rounded-full blur-[120px] opacity-40 pointer-events-none transform -translate-y-1/2" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 w-full relative z-10">

                {/* Left Side: Content & Key Points */}
                <div className="flex-1 flex flex-col items-start w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-12"
                    >
                        <span className="text-[#74573e] text-xs md:text-sm tracking-[0.4em] uppercase font-light mb-8 block font-serif italic">Section 05</span>
                        <h2 className="text-6xl sm:text-7xl md:text-8xl font-serif font-medium tracking-tight text-[#111638] leading-[1.0] mb-8">
                            For <br />
                            <span className="text-[#74573e] italic">Developers</span>
                        </h2>

                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="w-24 h-[1px] bg-[#111638]/20 mb-10 origin-left"
                        />

                        <p className="text-[#111638]/60 font-light text-xl md:text-2xl max-w-lg leading-relaxed">
                            A new digital presence inside Erbil's interactive city layer.
                        </p>
                    </motion.div>

                    <div className="space-y-6 w-full max-w-md">
                        {[
                            "Showcase projects in 3D",
                            "Connect with new audiences",
                            "Receive direct engagement",
                            "Strengthen digital positioning"
                        ].map((point, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, delay: 0.4 + (index * 0.15), type: "spring", bounce: 0.2 }}
                                className="flex items-center gap-6 group"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-[#111638]/20 group-hover:bg-[#74573e] group-hover:scale-150 transition-all duration-500 shrink-0" />
                                <span className="text-lg font-light tracking-tight text-[#111638]/80 group-hover:text-[#111638] transition-colors duration-500">
                                    {point}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-16 group flex items-center gap-6 self-start"
                    >
                        <span className="text-[#111638] uppercase tracking-[0.3em] text-xs font-semibold group-hover:text-[#74573e] transition-colors duration-500">
                            Partner With Us
                        </span>
                        <div className="w-12 h-[1px] bg-[#111638] group-hover:w-24 group-hover:bg-[#74573e] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    </motion.button>
                </div>

                {/* Right Side: Visual Presentation */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, delay: 0.6, type: "spring", stiffness: 40, damping: 20 }}
                    className="flex-1 w-full relative"
                >
                    {/* Floating Images (Editorial Style) */}
                    <div className="relative w-full aspect-[4/3] flex items-center justify-center">

                        {/* Foreground Image */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="relative z-20 w-[60%] aspect-[3/4] bg-[#fdfbf9] border border-[#111638]/5 shadow-2xl shadow-[#111638]/10 overflow-hidden transform -rotate-6 transition-all duration-700 group -translate-x-12"
                        >
                            <img src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop" alt="Development" className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105 opacity-80 mix-blend-multiply filter grayscale hover:grayscale-0" />
                            <div className="absolute bottom-6 left-6 flex flex-col items-start bg-white/90 backdrop-blur-md px-4 py-2">
                                <span className="text-[#111638] text-[10px] font-bold uppercase tracking-widest font-sans">Active Project</span>
                            </div>
                        </motion.div>

                        {/* Background Image / Solid Area */}
                        <div className="absolute z-10 w-[70%] aspect-square bg-[#ece8e1] border border-[#111638]/5 shadow-xl shadow-[#111638]/5 overflow-hidden transform rotate-3 translate-x-12 translate-y-12 flex items-center justify-center">
                            <span className="text-[#111638]/20 tracking-[1em] uppercase font-serif text-sm transform -rotate-90">Future Build</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default DeveloperScreen;

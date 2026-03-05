import React from 'react';
import { motion } from 'framer-motion';

const Blob = ({ className, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0]
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
        className={`absolute rounded-full blur-3xl mix-blend-multiply filter ${className}`}
    />
);

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-between p-6 overflow-hidden bg-[#fafafa] font-sans">
            
            {/* Top Navigation Bar area */}
            <div className="w-full flex justify-between items-center z-20 mt-4">
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                    <span className="w-2 h-2 rounded-full bg-[#a3ff47] animate-pulse"></span>
                    Going Live This Fall 2024
                </div>
                
                <div className="flex items-center gap-2 font-bold text-lg tracking-tight z-20">
                    <div className="w-4 h-4 rounded-full bg-zinc-800"></div>
                    blob3d
                </div>

                <button className="px-5 py-2 rounded-full bg-zinc-100 text-sm font-medium text-zinc-600 hover:bg-zinc-200 transition-colors">
                    Sign Up
                </button>
            </div>

            {/* Blobs Container */}
            <div className="absolute inset-0 flex items-center justify-center p-8 z-0 overflow-hidden">
                <div className="relative w-full max-w-5xl h-[70vh] rounded-[3rem] overflow-hidden bg-white">
                    {/* Top Left Blob */}
                    <Blob className="top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#a3ff47]/60" delay={0} />
                    {/* Top Right Blob */}
                    <Blob className="top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#a3ff47]/50" delay={2} />
                    {/* Bottom Center Blob */}
                    <Blob className="bottom-[-20%] left-[20%] w-[700px] h-[600px] bg-[#a3ff47]/70" delay={4} />
                    
                    {/* Black arrow button inside the blob area */}
                    <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 z-30">
                        <button className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 text-white shadow-xl hover:scale-110 transition-transform">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5v14M19 12l-7 7-7-7"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Content Area */}
            <div className="w-full flex flex-col md:flex-row items-end justify-between z-20 mb-4 gap-6">
                
                {/* Left Card */}
                <div className="flex items-center gap-4 px-6 py-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-zinc-100">
                    <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xl">🧊</div>
                        <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-xl">🍕</div>
                        <div className="w-10 h-10 rounded-full bg-yellow-100 border-2 border-white flex items-center justify-center text-xl">😀</div>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Powered By</p>
                        <p className="text-sm font-semibold text-zinc-800">Design Experts</p>
                    </div>
                </div>

                {/* Center Text */}
                <div className="text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-2 tracking-tight">3D Blob Library</h1>
                    <p className="text-zinc-500 font-medium">Create 3D Blobs For Design Projects</p>
                </div>

                {/* Right Card */}
                <div className="flex items-center gap-4 px-6 py-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-zinc-100">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Latest News</p>
                        <p className="text-sm font-semibold text-zinc-800">4389 Blobs Created</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;

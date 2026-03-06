import React from 'react';
import { motion } from 'motion/react';

const VerifiedParticipantsVisual = () => (
    <div className="relative w-full h-56 md:h-64 flex items-center justify-center overflow-hidden border-b border-[#111638]/5 bg-gradient-to-b from-transparent to-[#fcfcfc]">
        <svg viewBox="0 0 100 100" className="w-40 h-40 stroke-zinc-300 fill-none" strokeWidth="1.5">
            {/* Participant Head */}
            <motion.circle cx="40" cy="35" r="12"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            {/* Participant Body */}
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                d="M 15 80 Q 40 50 65 80"
                strokeLinecap="round"
            />
            {/* Status Pulse background */}
            <motion.circle cx="75" cy="65" r="12" className="fill-[#74573e]/10 stroke-none"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ delay: 0.8, duration: 3, repeat: Infinity }}
            />
            {/* Checkmark */}
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                d="M 68 65 L 73 70 L 85 55"
                className="stroke-[#74573e]"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </div>
);

const LedgerVisual = () => (
    <div className="relative w-full h-56 md:h-64 flex items-center justify-center overflow-hidden border-b border-[#111638]/5 bg-gradient-to-b from-transparent to-[#fcfcfc]">
        {/* Subtle grid background */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(17, 22, 56, 0.04) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

        <svg viewBox="0 0 100 100" className="w-40 h-40 select-none z-10" strokeWidth="1.5">
            {/* The Ledger Document Base */}
            <motion.path
                initial={{ pathLength: 0, fill: "rgba(255, 255, 255, 0)" }}
                whileInView={{ pathLength: 1, fill: "rgba(255, 255, 255, 1)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="stroke-zinc-300 drop-shadow-sm"
                d="M 25 12 L 58 12 L 75 29 L 75 88 L 25 88 Z"
            />
            {/* Fold Corner */}
            <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
                className="stroke-zinc-300 fill-zinc-50"
                d="M 58 12 L 58 29 L 75 29 Z"
            />

            {/* Document Header block */}
            <motion.rect x="35" y="38" width="8" height="8" rx="2" className="fill-zinc-200 stroke-none"
                initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.2, type: 'spring' }} />
            <motion.line x1="48" y1="42" x2="65" y2="42" className="stroke-zinc-300" strokeLinecap="round" strokeWidth="2.5"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1.3 }} />

            <motion.line x1="35" y1="52" x2="65" y2="52" className="stroke-zinc-200" strokeWidth="1" strokeDasharray="2 2"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }} />

            {/* Mask for Ledger Entries */}
            <clipPath id="ledger-mask">
                <rect x="30" y="55" width="40" height="28" />
            </clipPath>

            {/* Real-time scrolling entries */}
            <motion.g clipPath="url(#ledger-mask)">
                <motion.g
                    initial={{ y: 0 }}
                    animate={{ y: -14 }}
                    transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
                >
                    {[0, 1, 2, 3].map(i => (
                        <g key={i} transform={`translate(0, ${58 + i * 14})`}>
                            {/* Bullet / Hash Indicator */}
                            <circle cx="36" cy="0" r="2.5" className={i === 2 ? "fill-[#74573e]" : "fill-zinc-200"} />
                            {/* Data Lines */}
                            <line x1="42" y1="-1" x2="64" y2="-1" className={i === 2 ? "stroke-[#74573e]/70" : "stroke-zinc-200"} strokeLinecap="round" strokeWidth="2" />
                            <line x1="42" y1="3" x2="56" y2="3" className="stroke-zinc-200/60" strokeLinecap="round" strokeWidth="1.5" />
                        </g>
                    ))}
                </motion.g>
            </motion.g>

            {/* Incoming Data Feed removed */}


            {/* Fade Gradients for smooth scrolling illusion */}
            <rect x="30" y="54" width="40" height="6" fill="url(#ledger-fade-top)" />
            <rect x="30" y="78" width="40" height="6" fill="url(#ledger-fade-bottom)" />

            <defs>
                <linearGradient id="ledger-fade-top" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="ledger-fade-bottom" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    </div>
);

const OwnershipVisual = () => (
    <div className="relative w-full h-56 md:h-64 flex items-center justify-center overflow-hidden border-b border-[#111638]/5 bg-gradient-to-b from-transparent to-[#fcfcfc]">
        <svg viewBox="0 0 100 100" className="w-40 h-40 stroke-zinc-300 fill-none" strokeWidth="1.5">
            {/* Property/House */}
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M 20 55 L 50 30 L 80 55 L 80 85 L 20 85 Z"
            />
            {/* Door */}
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                d="M 40 85 L 40 60 L 60 60 L 60 85"
            />
            {/* Digital Block/Base representing immutability */}
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
                d="M 10 90 L 90 90"
                className="stroke-[#74573e]"
                strokeWidth="2"
                strokeLinecap="round"
            />
            {/* Nodes/Dots on the base */}
            <motion.circle cx="20" cy="90" r="3" className="fill-[#74573e] stroke-none" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1 }} />
            <motion.circle cx="50" cy="90" r="4" className="fill-[#74573e] stroke-none" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.2, type: "spring" }} />
            <motion.circle cx="80" cy="90" r="3" className="fill-[#74573e] stroke-none" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 }} />
        </svg>
    </div>
);

const EncryptionVisual = () => (
    <div className="relative w-full h-56 md:h-64 flex items-center justify-center overflow-hidden border-b border-[#111638]/5 bg-gradient-to-b from-transparent to-[#fcfcfc]">
        <svg viewBox="0 0 100 100" className="w-40 h-40 stroke-zinc-300 fill-none" strokeWidth="1.5">
            {/* Moving Shield Orbit */}
            <motion.circle cx="50" cy="50" r="38" strokeDasharray="4 8" className="stroke-zinc-200 origin-[50px_50px]"
                animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            {/* Padlock Body */}
            <motion.rect x="35" y="45" width="30" height="25" rx="3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
            {/* Padlock Shackle */}
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
                d="M 38 45 V 35 A 12 12 0 0 1 62 35 V 45"
            />

            {/* Keyhole */}
            <motion.circle cx="50" cy="55" r="3" className="fill-[#74573e] stroke-none" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }} />
            <motion.path d="M 50 58 V 62" className="stroke-[#74573e]" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1.4 }} />
        </svg>
    </div>
);

const pillars = [
    {
        title: "Verified Participants",
        desc: "Every actor is cryptographically authenticated, ensuring a flawless and trustworthy environment free of fraudulent entities.",
        Visual: VerifiedParticipantsVisual
    },
    {
        title: "Real-Time Ledger",
        desc: "All system modifications and activity are recorded immutably to a decentralized, tamper-proof system log.",
        Visual: LedgerVisual
    },
    {
        title: "Immutable Ownership",
        desc: "Indisputable digital records establish chain of activity, removing traditional friction and securing historical chains.",
        Visual: OwnershipVisual
    },
    {
        title: "Enterprise Encryption",
        desc: "Institutional-grade infrastructure protects platform data continuously, shielding assets and privacy at the protocol layer.",
        Visual: EncryptionVisual
    }
];

const TransparencySecurityScreen = () => {
    return (
        <section className="relative w-full py-32 md:py-48 bg-[#fcfcfc] text-[#111638] border-t border-[#111638]/5">
            <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full flex flex-col items-center">

                <div className="flex flex-col items-center text-center mb-20 md:mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#111638] mb-8 font-medium"
                    >
                        Trust as <br className="md:hidden" /><span className="text-[#74573e]">Infrastructure.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-zinc-500 font-light max-w-2xl text-center leading-relaxed"
                    >
                        Operating on a foundation of absolute cryptographic clarity. Every action is verifiable, immutable, and secured by institutional-grade architecture.
                    </motion.p>
                </div>

                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#111638]/10 rounded-3xl overflow-hidden border border-[#111638]/5 shadow-xl shadow-[#111638]/5">
                    {pillars.map((pillar, index) => {
                        const Visual = pillar.Visual;
                        return (
                            <div
                                key={index}
                                className="bg-white hover:bg-zinc-50/50 transition-colors duration-700 relative flex flex-col group"
                            >
                                <Visual />

                                <div className="p-10 md:p-14 flex-1 flex flex-col justify-start z-10">
                                    <h3 className="text-2xl md:text-3xl text-[#111638] font-medium mb-4 tracking-tight group-hover:text-[#74573e] transition-colors duration-300">{pillar.title}</h3>
                                    <p className="text-zinc-500 font-light leading-relaxed text-base md:text-lg group-hover:text-zinc-600 transition-colors duration-300">{pillar.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    );
};

export default TransparencySecurityScreen;

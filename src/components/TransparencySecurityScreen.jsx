import React from 'react';
import { motion } from 'motion/react';

const VerifiedUsersVisual = () => (
    <div className="relative w-full h-56 md:h-64 flex items-center justify-center overflow-hidden border-b border-[#111638]/5 bg-gradient-to-b from-transparent to-[#fcfcfc]">
        <svg viewBox="0 0 100 100" className="w-40 h-40 stroke-zinc-300 fill-none" strokeWidth="1.5">
            {/* User Head */}
            <motion.circle cx="40" cy="35" r="12"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            {/* User Body */}
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
        <svg viewBox="0 0 100 100" className="w-40 h-40 stroke-zinc-300 fill-none" strokeWidth="1.5">
            {/* Document Outline */}
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M 30 15 L 60 15 L 75 30 L 75 85 L 30 85 Z"
            />
            {/* Document Fold */}
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
                d="M 60 15 L 60 30 L 75 30"
            />
            {/* Static Lines */}
            <motion.line x1="40" y1="45" x2="65" y2="45" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="origin-left" />
            <motion.line x1="40" y1="55" x2="65" y2="55" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="origin-left" />

            {/* Animated Live Entry Line */}
            <motion.line x1="40" y1="70" x2="55" y2="70"
                className="stroke-[#74573e]" strokeWidth="2" strokeLinecap="round"
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{
                    scaleX: { delay: 0.8, duration: 0.6, ease: "easeOut" },
                    opacity: { duration: 1.5, repeat: Infinity, ease: "linear" }
                }}
            />
            <motion.circle cx="32" cy="70" r="2" className="fill-[#74573e] stroke-none"
                animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
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
        Visual: VerifiedUsersVisual
    },
    {
        title: "Real-Time Ledger",
        desc: "All system modifications and transactions are recorded immutably to a decentralized, tamper-proof system log.",
        Visual: LedgerVisual
    },
    {
        title: "Immutable Ownership",
        desc: "Indisputable digital records establish chain of title, removing traditional friction and securing historical chains.",
        Visual: OwnershipVisual
    },
    {
        title: "Enterprise Encryption",
        desc: "Bank-grade infrastructure protects platform data continuously, shielding assets and privacy at the protocol layer.",
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

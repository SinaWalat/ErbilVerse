import React from 'react';
import { ShieldCheck, Activity, FileText, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const TransparencySecurity = () => {
    return (
        <section className="py-24 relative bg-[#030409]">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4">
                        <span className="text-gradient">Transparency</span> Built In
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto font-light">
                        ErbilVerse operates on a foundation of trust, verifiable data, and secure digital infrastructure.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center group"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary-light flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(30,40,93,0.3)] group-hover:shadow-[0_0_30px_rgba(30,40,93,0.5)] transition-shadow">
                            <ShieldCheck size={32} className="text-white" />
                        </div>
                        <h3 className="font-outfit text-xl font-medium mb-3">Verified Users</h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                            Every participant in the ecosystem undergoes strict verification to ensure a secure, trusted community.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center border-secondary/30 bg-secondary/5 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/10 -z-10"></div>
                        <div className="w-16 h-16 rounded-2xl bg-secondary/20 border border-secondary/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(122,85,58,0.2)] group-hover:shadow-[0_0_40px_rgba(122,85,58,0.4)] transition-shadow">
                            <Activity size={32} className="text-secondary-light" />
                        </div>
                        <h3 className="font-outfit text-xl font-medium mb-3">Real-Time Log</h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                            All market activity and property changes are recorded immutably and viewable instantly by the community.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center group"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary-light flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(30,40,93,0.3)] group-hover:shadow-[0_0_30px_rgba(30,40,93,0.5)] transition-shadow">
                            <FileText size={32} className="text-white" />
                        </div>
                        <h3 className="font-outfit text-xl font-medium mb-3">Clear Records</h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                            Transparent ownership history and asset provenance prevent disputes and enable frictionless transactions.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center group"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary-light flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(30,40,93,0.3)] group-hover:shadow-[0_0_30px_rgba(30,40,93,0.5)] transition-shadow">
                            <Lock size={32} className="text-white" />
                        </div>
                        <h3 className="font-outfit text-xl font-medium mb-3">Secure Environment</h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                            Bank-grade security protocols protect user data, assets, and communications across the entire platform.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default TransparencySecurity;

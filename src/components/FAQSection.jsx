import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
    {
        question: "What is the mission of ERBILVERSE?",
        answer: "ERBILVERSE operates as a structured digital property environment within the city framework, where digital ownership and interaction exist exclusively within a verified, platform-wide ecosystem."
    },
    {
        question: "How is 'Trust as Infrastructure' maintained?",
        answer: "Trust is integrated into the platform's core through immutable digital logging and transparent verification layers, ensuring that every property record and transaction is secure and traceable."
    },
    {
        question: "What is the Live Activity Environment?",
        answer: "It is a dynamic system where digital property values respond automatically to platform activity, reflecting real-time interaction, movement, and engagement across the city’s digital layers."
    },
    {
        question: "How do the city layers work?",
        answer: "The platform utilizes multiple specialized data layers—from basic topography to complex urban activity—allowing stakeholders to visualize and analyze the city from a multi-dimensional perspective."
    },
    {
        question: "How can developers join the ecosystem?",
        answer: "Early partners gain priority presence inside the platform’s core environment during the launch phase, enabling them to showcase projects and influence the evolving digital landscape."
    }
];

const FAQItem = ({ faq, isOpen, toggle }) => {
    return (
        <div className="relative border-b border-zinc-200 overflow-hidden group">
            <button
                onClick={toggle}
                className="w-full py-8 md:py-10 flex items-center justify-between text-left"
            >
                <span className={`text-xl md:text-3xl font-medium tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#74573e]' : 'text-[#111638] group-hover:text-zinc-600'}`}>
                    {faq.question}
                </span>

                <div className={`shrink-0 ml-6 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-45 bg-zinc-100' : 'bg-transparent'}`}>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className={`transition-colors duration-300 ${isOpen ? 'text-[#74573e]' : 'text-zinc-400 group-hover:text-zinc-900'}`}
                    >
                        <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-10 pt-2 text-lg md:text-xl text-zinc-500 font-light leading-relaxed max-w-3xl pr-12">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
    };

    return (
        <section className="w-full py-32 md:py-48 bg-white text-zinc-900 pb-32">
            <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left: Branding/Header */}
                    <div className="lg:col-span-5 flex flex-col pt-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="sticky top-48"
                        >
                            <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-8 block">
                                Information
                            </span>
                            <h2 className="text-5xl md:text-6xl tracking-tight text-[#111638] leading-[1.1] mb-8 font-medium">
                                Common <br />
                                Questions
                            </h2>
                            <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-sm">
                                Find the answers to everything from ERBILVERSE’s operational framework to platform partnerships.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: FAQ Accordion */}
                    <div className="lg:col-span-7">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="flex flex-col border-t border-zinc-200"
                        >
                            {faqs.map((faq, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <FAQItem
                                        faq={faq}
                                        isOpen={openIndex === index}
                                        toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;

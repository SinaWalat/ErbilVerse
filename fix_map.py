import re

with open('src/components/MapPage.jsx', 'r') as f:
    content = f.read()

match = re.search(r'const ERBIL_PATH = \".*?\";', content)
if not match:
    print("Could not find ERBIL_PATH")
    exit(1)

erbil_path_decl = match.group(0)

new_content = f'''import React from \'react\';
import {{ motion }} from \'framer-motion\';
import Navigation from \'./Navigation\';
import Footer from \'./Footer\';

{erbil_path_decl}

const MapPage = () => {{
    return (
        <div className="w-full bg-[#0a0d24] selection:bg-[#74573e] selection:text-white min-h-screen flex flex-col">
            <Navigation />

            {{/* MAIN VIEWPORT */}}
            <div className="relative w-full flex-grow flex items-center justify-center overflow-hidden z-20 min-h-[90vh]">
                
                {{/* SVG manifest stage */}}
                <div className="relative w-full max-w-7xl h-full flex items-center justify-center">

                    <motion.div
                        initial={{{{ opacity: 0, scale: 0.8 }}}}
                        animate={{{{ opacity: 1, scale: 1.3 }}}}
                        transition={{{{ duration: 4, ease: "easeOut" }}}}
                        className="absolute inset-0 flex items-center justify-center w-full h-full p-4 md:p-12 pointer-events-none"
                    >
                        <motion.svg
                            viewBox="0 0 898.75 718.55"
                            className="w-full h-full max-w-none md:max-w-[1200px]"
                            style={{{{ overflow: 'visible', scale: 1.5 }}}}
                            initial={{{{ opacity: 1 }}}}
                            animate={{{{ opacity: 0.2 }}}}
                            transition={{{{ delay: 3.5, duration: 2 }}}}
                        >
                            {{/* Glow filter */}}
                            <defs>
                                <filter id="erbilGlow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="6" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {{/* Background glow layer */}}
                            <motion.path
                                d={{ERBIL_PATH}}
                                fill="none"
                                stroke="#c8a17d"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                filter="url(#erbilGlow)"
                                initial={{{{ pathLength: 0, opacity: 0.2 }}}}
                                animate={{{{ pathLength: 1, opacity: 0.8 }}}}
                                transition={{{{ duration: 4, ease: "easeInOut" }}}}
                            />

                            {{/* Main sharp path */}}
                            <motion.path
                                d={{ERBIL_PATH}}
                                fill="none"
                                stroke="#c8a17d"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{{{ pathLength: 0 }}}}
                                animate={{{{ pathLength: 1 }}}}
                                transition={{{{ duration: 4, ease: "easeInOut" }}}}
                            />
                        </motion.svg>
                    </motion.div>

                    {{/* FINAL CONTENT (MANIFESTO) */}}
                    <div className="absolute inset-0 flex items-center justify-center z-40 px-6">
                        <motion.div
                            initial={{{{ opacity: 0, y: 40 }}}}
                            animate={{{{ opacity: 1, y: 0 }}}}
                            transition={{{{ delay: 3.8, duration: 1.5, ease: "easeOut" }}}}
                            className="max-w-4xl text-center pointer-events-auto"
                        >
                            <h2 className="text-5xl md:text-8xl font-light text-white mb-6 uppercase tracking-tighter drop-shadow-2xl">
                                The City manifested
                            </h2>
                            <p className="text-[#c8a17d] text-[10px] tracking-[1.2em] uppercase font-bold mb-12 drop-shadow-md">
                                Digital Infrastructure Active
                            </p>
                            <button className="group relative px-14 py-5 overflow-hidden rounded-full border border-[#c8a17d]/50 bg-[#0a0d24]/60 backdrop-blur-md transition-all hover:scale-105 duration-500">
                                <div className="absolute inset-0 bg-[#c8a17d] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <span className="relative text-[#c8a17d] group-hover:text-[#0a0d24] transition-colors duration-500 tracking-[0.4em] text-[10px] uppercase font-bold">
                                    Explore Erbilverse
                                </span>
                            </button>
                        </motion.div>
                    </div>

                </div>
            </div>

            {{/* FOOTER */}}
            <div className="relative z-50 bg-[#0a0d24] mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default MapPage;
'''

with open('src/components/MapPage.jsx', 'w') as f:
    f.write(new_content)
print("Updated MapPage.jsx successfully!")

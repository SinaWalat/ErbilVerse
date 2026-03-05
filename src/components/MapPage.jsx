import React from 'react';
import DataGlobe from './ui/DataGlobe';

const MapPage = () => {
    return (
        <div className="w-full h-screen bg-[#0a0a0a] overflow-hidden selection:bg-[#74573e] selection:text-white relative">

            <DataGlobe />

            {/* Bottom-to-top dark overlay so text is readable */}
            <div className="absolute inset-0 z-[5] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none" />

            {/* Overlay Typography */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center px-4 mt-40">
                <h1 className="pointer-events-auto text-white text-5xl md:text-7xl font-semibold tracking-tight text-center">
                    Explore Erbil.
                </h1>
                <h1 className="pointer-events-auto text-white text-5xl md:text-7xl font-semibold tracking-tight mb-6 text-center">
                    Digitally.
                </h1>
                <p className="pointer-events-auto text-gray-300/80 max-w-2xl text-center text-lg md:text-2xl mb-10 font-light">
                    The world's first digital layer for Erbil — mapping culture, architecture, and innovation across the city.
                </p>

                {/* CTA Button */}
                <button className="pointer-events-auto bg-[#75573f] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#8c6d53] transition-all duration-300 flex items-center justify-center gap-3 drop-shadow-[0_0_15px_rgba(117,87,63,0.3)] hover:drop-shadow-[0_0_25px_rgba(117,87,63,0.5)]">
                    Enter the City
                    <div className="bg-white/10 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm ml-1 transition-colors group-hover:bg-white/20">
                        →
                    </div>
                </button>

                {/* Stats Grid */}
                <div className="pointer-events-auto flex gap-16 mt-20 text-center items-center">
                    <div>
                        <div className="text-white font-medium text-lg md:text-xl">5,000+</div>
                        <div className="text-gray-400/80 text-xs md:text-sm mt-1 uppercase tracking-wider font-light">Mapped Locations</div>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div>
                        <div className="text-white font-medium text-lg md:text-xl">Real-time</div>
                        <div className="text-gray-400/80 text-xs md:text-sm mt-1 uppercase tracking-wider font-light">City Data Layer</div>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div>
                        <div className="text-white font-medium text-lg md:text-xl">Web3</div>
                        <div className="text-gray-400/80 text-xs md:text-sm mt-1 uppercase tracking-wider font-light">Powered Platform</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapPage;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Map, MapControls, MapMarker, MarkerContent, useMap } from "@/components/ui/map";
import maplibregl from "maplibre-gl";

// Fix RTL (Arabic/Kurdish) text rendering in MapLibre
if (maplibregl.getRTLTextPluginStatus() === 'unavailable') {
    maplibregl.setRTLTextPlugin(
        'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js',
        null,
        true
    );
}

const baseHotspots = [
    { id: 1, lng: 43.993, lat: 36.191, name: 'سەنتەری دارایی', nameEng: 'Financial Hub', status: 'Active', roi: '9.2%' },
    { id: 2, lng: 44.020, lat: 36.185, name: 'ناوچەی کلتووری', nameEng: 'Cultural District', status: 'In Development', roi: '7.5%' },
    { id: 3, lng: 44.035, lat: 36.210, name: 'پارکی تەکنەلۆژیا', nameEng: 'Tech Park', status: 'Pre-Lease', roi: '11.0%' },
    { id: 4, lng: 43.980, lat: 36.175, name: 'نیشتەجێبوونی لوکس', nameEng: 'Luxury Residential', status: 'Sold Out', roi: '8.8%' },
    { id: 5, lng: 44.010, lat: 36.220, name: 'ناوچەی مارینا', nameEng: 'Marina Quarter', status: 'Planning', roi: 'TBD' },
];

const generateHotspots = () => {
    const generated = [...baseHotspots];
    const centerLng = 44.009;
    const centerLat = 36.191;
    const statuses = ['Active', 'In Development', 'Planning', 'Pre-Lease'];

    // Seeded-like random function to keep points consistent across re-renders
    let seed = 12345;
    const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    for (let i = 6; i <= 42; i++) {
        // Randomly distribute around center in a circular pattern
        const angle = random() * Math.PI * 2;
        // Adjust radius to keep most points within the Erbil ring roads
        const radius = 0.005 + random() * 0.04;

        generated.push({
            id: i,
            lng: centerLng + Math.cos(angle) * radius,
            lat: centerLat + Math.sin(angle) * radius,
            name: `ناوچەی ${i}`,
            nameEng: `Development Zone ${i}`,
            status: statuses[Math.floor(random() * statuses.length)],
            roi: (7 + random() * 5).toFixed(1) + '%'
        });
    }
    return generated;
};

const hotspots = generateHotspots();

const InteractiveMapEffects = () => {
    const { map } = useMap();
    const [is3D, setIs3D] = useState(true);

    // Add 3D Building extrusion if available in the basemap style
    useEffect(() => {
        if (!map) return;

        map.on('style.load', () => {
            const layers = map.getStyle().layers;
            const sources = map.getStyle().sources;

            // Find a vector source that contains a 'building' layer
            // This is common in OpenMapTiles-based styles like CartoDB or OpenFreeMap
            let buildingSource = null;
            let buildingLayerName = 'building';

            // Check if there's an explicit 'building' layer in the style we can use for extrusion
            const buildingLayer = layers.find(l => l.id.includes('building') || l['source-layer'] === 'building');

            if (buildingLayer && !map.getLayer('3d-buildings')) {
                const sourceId = buildingLayer.source;

                try {
                    map.addLayer(
                        {
                            'id': '3d-buildings',
                            'source': sourceId,
                            'source-layer': 'building',
                            'filter': ['==', 'extrude', 'true'],
                            'type': 'fill-extrusion',
                            'minzoom': 15,
                            'paint': {
                                'fill-extrusion-color': '#111638',
                                'fill-extrusion-height': [
                                    'interpolate',
                                    ['linear'],
                                    ['zoom'],
                                    15,
                                    0,
                                    15.05,
                                    ['get', 'height']
                                ],
                                'fill-extrusion-base': [
                                    'interpolate',
                                    ['linear'],
                                    ['zoom'],
                                    15,
                                    0,
                                    15.05,
                                    ['get', 'min_height']
                                ],
                                'fill-extrusion-opacity': 0.6
                            }
                        },
                        buildingLayer.id
                    );
                } catch (e) { console.warn("Failed to add 3D building layer:", e); }
            }
        });
    }, [map]);

    const toggle3D = () => {
        if (!map) return;
        const new3D = !is3D;
        setIs3D(new3D);
        map.easeTo({
            pitch: new3D ? 60 : 0,
            bearing: new3D ? -20 : 0,
            duration: 1500,
            essential: true
        });
    };

    return (
        <div className="absolute top-8 right-8 flex flex-col gap-3 z-30 pointer-events-auto">
            <button
                onClick={toggle3D}
                className="w-12 h-12 bg-[#111638]/90 backdrop-blur-xl border border-white/10 rounded-full flex flex-col items-center justify-center text-white hover:bg-[#74573e] hover:border-[#74573e]/50 transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5)] group"
            >
                <svg className="w-5 h-5 mb-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
                <span className="text-[8px] font-bold tracking-widest">{is3D ? '2D' : '3D'}</span>
            </button>

            <div className="bg-[#111638]/90 backdrop-blur-xl border border-white/10 rounded-full overflow-hidden shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5)]">
                <button onClick={() => map.zoomIn()} className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors border-b border-white/5"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></button>
                <button onClick={() => map.zoomOut()} className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg></button>
            </div>
        </div>
    );
};

const CityMapScreen = () => {
    const [activeSpot, setActiveSpot] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section className="relative w-full h-[100dvh] bg-[#050714] overflow-hidden font-sans cursor-default" style={{ touchAction: 'pan-y' }}>

            {/* 1. Immersive 3D Dark Map using mapcn */}
            <div className="absolute inset-0 z-0">
                {/* Edge Fading for Map Context */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#050714] via-transparent to-[#050714]/40" />
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#050714] via-transparent to-[#050714]/10" />

                <Map
                    viewport={{
                        center: [44.009, 36.191],
                        zoom: 13,
                        pitch: 60,
                        bearing: -20
                    }}
                    theme="dark"
                    className="w-full h-full"
                    scrollZoom={false}
                    dragPan={true}
                    cooperativeGestures={true}
                >
                    <InteractiveMapEffects />

                    {/* Interactive 3D Hotspots */}
                    {hotspots.map((spot) => (
                        <MapMarker
                            key={spot.id}
                            longitude={spot.lng}
                            latitude={spot.lat}
                            onMouseEnter={() => setActiveSpot(spot.id)}
                            onMouseLeave={() => setActiveSpot(null)}
                        >
                            <MarkerContent>
                                <div className="relative flex flex-col items-center justify-end group pointer-events-auto cursor-pointer pb-6 -mb-6">
                                    {/* The Map Marker Design */}
                                    <div className="relative flex items-center justify-center">
                                        {/* Glowing background layers */}
                                        <div className="absolute inset-[-16px] rounded-full bg-[#74573e]/40 blur-md animate-pulse pointer-events-none" style={{ animationDuration: '2s' }} />
                                        <div className="absolute inset-[-8px] rounded-full bg-[#74573e]/60 blur-sm pointer-events-none" />

                                        {/* Core marker */}
                                        <div className="w-4 h-4 rounded-full bg-[#74573e] border-2 border-white shadow-[0_0_25px_8px_rgba(116,87,62,0.8)] z-10 group-hover:scale-150 transition-transform duration-500 ease-out relative" />
                                        <div className="absolute inset-[-12px] rounded-full border border-[#74573e] opacity-60 group-hover:animate-ping" style={{ animationDuration: '1.5s' }} />
                                    </div>

                                    {/* Connecting Line to ground */}
                                    <div className="relative w-[1px] h-6 origin-bottom scale-y-100 group-hover:scale-y-[1.5] transition-transform duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#74573e]/0 to-[#74573e]" />
                                        <div className="absolute inset-0 bg-[#74573e] blur-[2px] opacity-70" />
                                    </div>

                                    {/* Floating Tooltip Label (In WebGL space, anchored properly) */}
                                    <div className="absolute left-1/2 bottom-full mb-4 -translate-x-1/2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none whitespace-nowrap z-50">
                                        <div className="bg-[#111638]/90 backdrop-blur-xl px-5 py-3 rounded-xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.5)] border border-[#74573e]/30 flex flex-col items-center">
                                            {/* RTL Native Name */}
                                            <span
                                                className="text-[14px] font-bold text-white leading-tight mb-1"
                                                dir="rtl"
                                                style={{ fontFamily: 'Tahoma, Arial, sans-serif', letterSpacing: 'normal' }}
                                            >
                                                {spot.name}
                                            </span>
                                            {/* English Translation */}
                                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#74573e]">{spot.nameEng}</span>
                                        </div>
                                    </div>
                                </div>
                            </MarkerContent>
                        </MapMarker>
                    ))}
                </Map>
            </div>

            {/* 2. Top Navigation / Status Elements */}
            <div className="absolute top-8 left-8 flex gap-4 z-20 pointer-events-none">
                <div className="px-6 py-3 bg-[#111638]/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#74573e] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#74573e]"></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Live 3D Topography</span>
                </div>
            </div>

            {/* 3. The Details / Command Center Dashboard (Bottom Left on Desktop, Full-Width Dock on Mobile) */}
            <div className="absolute bottom-0 left-0 md:bottom-12 md:left-12 z-20 w-full md:w-[380px] pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full bg-[#111638]/80 md:bg-[#111638]/60 backdrop-blur-3xl md:rounded-[2.5rem] p-5 md:p-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] border-t md:border border-white/10 overflow-hidden pointer-events-auto"
                    style={{ transform: 'translateZ(0)' }}
                >
                    {/* Inner highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

                    <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4 md:gap-0">
                        {/* Title Section */}
                        <div className="flex flex-col">
                            {/* Header line (Desktop only for space) */}
                            <div className="hidden md:flex items-center gap-4 mb-8">
                                <span className="w-10 h-[1px] bg-[#74573e]" />
                                <span className="text-[10px] font-bold tracking-[0.25em] text-[#74573e] uppercase">
                                    Spatial Overview
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <h2 className="text-xl md:text-6xl font-light tracking-tight text-white leading-none md:mb-2 font-outfit uppercase md:normal-case">
                                    Digital
                                </h2>
                                <h2 className="text-xl md:text-6xl font-medium tracking-tight text-white leading-none mb-0 md:mb-6 font-outfit uppercase md:normal-case">
                                    Masterplan
                                </h2>
                            </div>
                        </div>


                        {/* Action Controls & Dynamic Status */}
                        <div className="flex flex-row md:flex-col gap-4 md:gap-6 items-center md:items-start md:justify-between md:pt-8 md:border-t md:border-white/10 relative w-auto md:w-full">
                            {/* Dynamic readouts based on hover */}
                            <div className="hidden sm:block md:w-full">
                                <AnimatePresence mode="wait">
                                    {activeSpot ? (
                                        <motion.div
                                            key={activeSpot.name}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <span className="hidden md:block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Target Yield</span>
                                            <span className="block text-xl md:text-3xl font-bold text-[#74573e]">{hotspots.find(h => h.id === activeSpot)?.roi}</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="default"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <span className="hidden md:block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Total Zones</span>
                                            <span className="block text-xl md:text-3xl font-bold text-white">42</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Interactive Explore Button */}
                            <button className="flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-white hover:text-[#74573e] transition-colors group/explore">
                                <span className="hidden lg:inline">Explore Area</span>
                                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/5 group-hover/explore:border-[#74573e] group-hover/explore:bg-[#74573e]/10 transition-colors">
                                    <svg className="w-4 h-4 group-hover/explore:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

        </section>
    );
};

export default CityMapScreen;

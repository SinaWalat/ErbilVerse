import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useTransform, useMotionValueEvent } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const HeroContent = React.memo(({ progress, preloaderActive }) => {
    const navigate = useNavigate();
    // 1. Overlay fades in smoothly over the video's end
    const overlayOpacity = useTransform(progress, [0, 0.15, 0.25, 0.30, 0.35], [0, 0, 1, 1, 0]);
    // Also fade out the canvas itself, so only the #111638 background color remains for SecondSection.
    const canvasOpacity = useTransform(progress, [0, 0.30, 0.35], [1, 1, 0]);

    // 2. All text elements animate TOGETHER smoothly near the end of the video
    // They start fading in at 0.22, fully visible at 0.25
    // They fade out between 0.30 and 0.35 alongside the canvas and overlay
    const contentOpacity = useTransform(progress, [0, 0.22, 0.25, 0.30, 0.35], [0, 0, 1, 1, 0]);

    // 3. Scroll Guidance Indicator at bottom center (fades out immediately as user starts scrolling)
    const scrollGuidanceOpacity = useTransform(progress, [0, 0.05], [1, 0]);

    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const videoReadyRef = useRef(false);
    const isSeekingRef = useRef(false);
    const pendingSeekRef = useRef(null);
    const frameCacheRef = useRef(new Map());
    const lastDrawnFrameRef = useRef(-1);

    const TOTAL_FRAMES = 431;
    const MAX_CACHE_SIZE = 150; // Limit memory usage
    const CACHE_WIDTH = 960;   // Cache at reduced resolution
    const VIDEO_URL = 'https://pub-5b73abe3c7c84cb182ef6b6155e55ce6.r2.dev/Video/VideoHeroNew.MP4';

    // Convert scroll progress to frame index
    const getFrameIndex = useCallback((p) => {
        const normalized = Math.min(Math.max(p / 0.30, 0), 1);
        return Math.min(Math.floor(normalized * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
    }, []);

    // Draw a source to the main canvas with object-cover sizing
    const drawToCanvas = useCallback((source, srcW, srcH) => {
        const canvas = canvasRef.current;
        if (!canvas || !srcW || !srcH) return;
        const ctx = canvas.getContext('2d');
        const cw = canvas.width;
        const ch = canvas.height;
        const srcRatio = srcW / srcH;
        const canvasRatio = cw / ch;
        let dw, dh, ox, oy;
        if (canvasRatio > srcRatio) {
            dw = cw; dh = cw / srcRatio; ox = 0; oy = (ch - dh) / 2;
        } else {
            dw = ch * srcRatio; dh = ch; ox = (cw - dw) / 2; oy = 0;
        }
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(source, ox, oy, dw, dh);
    }, []);

    // Cache a video frame at reduced resolution to save memory
    const cacheVideoFrame = useCallback((video, frameIdx) => {
        if (frameCacheRef.current.has(frameIdx)) return;
        // Evict oldest entries if cache is too large
        if (frameCacheRef.current.size >= MAX_CACHE_SIZE) {
            const firstKey = frameCacheRef.current.keys().next().value;
            frameCacheRef.current.delete(firstKey);
        }
        const ratio = video.videoHeight / video.videoWidth;
        const w = CACHE_WIDTH;
        const h = Math.round(w * ratio);
        const oc = document.createElement('canvas');
        oc.width = w;
        oc.height = h;
        oc.getContext('2d').drawImage(video, 0, 0, w, h);
        frameCacheRef.current.set(frameIdx, oc);
    }, []);

    // Draw the best available frame for a given scroll progress
    const drawFrame = useCallback((p) => {
        const frameIdx = getFrameIndex(p);
        if (frameIdx === lastDrawnFrameRef.current) return;

        // 1. Try cached frame (instant)
        const cached = frameCacheRef.current.get(frameIdx);
        if (cached) {
            drawToCanvas(cached, cached.width, cached.height);
            lastDrawnFrameRef.current = frameIdx;
            return;
        }

        // 2. Show nearest cached frame as placeholder
        for (let offset = 1; offset <= 20; offset++) {
            const before = frameCacheRef.current.get(frameIdx - offset);
            if (before) { drawToCanvas(before, before.width, before.height); break; }
            const after = frameCacheRef.current.get(frameIdx + offset);
            if (after) { drawToCanvas(after, after.width, after.height); break; }
        }

        // 3. Seek video to get exact frame (async)
        const video = videoRef.current;
        if (video && videoReadyRef.current && video.duration) {
            // Clamp to slightly before end to prevent glitch at last frame
            const t = Math.min(
                (frameIdx / (TOTAL_FRAMES - 1)) * video.duration,
                video.duration - 0.01
            );
            if (isSeekingRef.current) {
                pendingSeekRef.current = t;
            } else {
                isSeekingRef.current = true;
                video.currentTime = t;
            }
        }
    }, [getFrameIndex, drawToCanvas]);

    // Single video element for scroll-driven seeking
    useEffect(() => {
        const video = document.createElement('video');
        video.src = VIDEO_URL;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.pause();
        videoRef.current = video;

        const onLoadedData = () => {
            videoReadyRef.current = true;
            // Draw the initial frame
            const p = progress.get ? progress.get() : 0;
            const normalized = Math.min(Math.max(p / 0.30, 0), 1);
            video.currentTime = Math.min(normalized * video.duration, video.duration - 0.01);
        };

        const onSeeked = () => {
            if (!video.duration || video.readyState < 2) return;

            const frameIdx = Math.round(
                Math.min(video.currentTime / video.duration, 1) * (TOTAL_FRAMES - 1)
            );

            // Draw the video frame to canvas
            drawToCanvas(video, video.videoWidth, video.videoHeight);
            lastDrawnFrameRef.current = frameIdx;

            // Cache it at reduced resolution for instant future access
            cacheVideoFrame(video, frameIdx);

            isSeekingRef.current = false;

            // Process any queued seek from scrolling
            if (pendingSeekRef.current !== null) {
                const next = pendingSeekRef.current;
                pendingSeekRef.current = null;
                isSeekingRef.current = true;
                video.currentTime = next;
            }
        };

        const onError = () => {
            // Retry loading after a delay
            setTimeout(() => {
                if (videoRef.current === video) {
                    video.src = VIDEO_URL;
                    video.load();
                }
            }, 2000);
        };

        video.addEventListener('loadeddata', onLoadedData);
        video.addEventListener('seeked', onSeeked);
        video.addEventListener('error', onError);
        video.load();

        return () => {
            video.removeEventListener('loadeddata', onLoadedData);
            video.removeEventListener('seeked', onSeeked);
            video.removeEventListener('error', onError);
            video.pause();
            video.removeAttribute('src');
            video.load();
            videoRef.current = null;
            videoReadyRef.current = false;
            isSeekingRef.current = false;
            pendingSeekRef.current = null;
            frameCacheRef.current.clear();
        };
    }, [drawToCanvas, cacheVideoFrame, progress]);

    // On scroll, draw the correct frame
    useMotionValueEvent(progress, 'change', (v) => {
        drawFrame(v);
    });

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                lastDrawnFrameRef.current = -1;
                const p = progress.get ? progress.get() : 0;
                drawFrame(p);
            }
        };

        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [drawFrame, progress]);

    return (
        <motion.main
            className="absolute inset-0 z-0 flex flex-col items-center justify-center"
        >
            {/* The Canvas Background */}
            <motion.div style={{ opacity: canvasOpacity }} className="w-full h-full bg-black absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block opacity-80"
                />
            </motion.div>

            {/* Bottom-to-top dark overlay so text is readable */}
            <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 z-[5] bg-gradient-to-t from-[#111638] via-[#111638]/60 to-transparent pointer-events-none"
            />

            {/* Overlay Typography */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center px-4 mt-24 md:mt-40">
                <motion.div
                    style={{ opacity: contentOpacity }}
                    className="pointer-events-none mb-4"
                >
                    <span className="text-[#74573e] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
                        THE DIGITAL LAYER OF REAL ESTATE
                    </span>
                </motion.div>

                <motion.h1
                    style={{ opacity: contentOpacity }}
                    className="pointer-events-none text-white text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-center mb-6 leading-none"
                >
                    ERBILVERSE
                </motion.h1>

                <motion.div
                    style={{ opacity: contentOpacity }}
                    className="flex flex-col items-center gap-6"
                >
                    <p className="pointer-events-none text-gray-200 text-center text-base md:text-2xl max-w-3xl font-light leading-relaxed px-4">
                        ERBILVERSE is a unified digital environment where real estate activity across the city becomes continuously visible and interactive.
                    </p>

                </motion.div>

                {/* CTA Button & Small Text */}
                <div className="flex flex-col items-center gap-6 mt-12">
                    <motion.button
                        style={{ opacity: contentOpacity }}
                        onClick={() => { }}
                        className="pointer-events-auto bg-[#75573f] text-white px-10 py-4 rounded-full font-light hover:bg-[#8c6d53] transition-[background-color,filter] duration-300 flex items-center justify-center gap-3 drop-shadow-[0_0_15px_rgba(117,87,63,0.3)] hover:drop-shadow-[0_0_25px_rgba(117,87,63,0.5)] group"
                    >
                        Enter the City
                        <div className="bg-white/10 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm ml-1 transition-[background-color,transform] duration-300 group-hover:bg-white/20 group-hover:translate-x-1">
                            →
                        </div>
                    </motion.button>

                </div>

                {/* Stats Grid */}
                <motion.div
                    style={{ opacity: contentOpacity }}
                    className="pointer-events-auto grid grid-cols-2 md:flex md:flex-row gap-y-8 gap-x-4 md:gap-16 mt-12 md:mt-20 text-center items-center justify-center max-w-sm md:max-w-none"
                >
                    <div className="col-span-1">
                        <div className="text-white font-medium text-lg md:text-xl">5,000+</div>
                        <div className="text-gray-400/80 text-[10px] md:text-sm mt-1 uppercase tracking-wider font-light">Mapped Locations</div>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-white/10" />
                    <div className="col-span-1 border-l border-white/5 md:border-none pl-4 md:pl-0">
                        <div className="text-white font-medium text-lg md:text-xl">Real-time</div>
                        <div className="text-gray-400/80 text-[10px] md:text-sm mt-1 uppercase tracking-wider font-light">City Data Layer</div>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-white/10" />
                    <div className="col-span-2 md:col-span-1 pt-4 md:pt-0 border-t border-white/5 md:border-none">
                        <div className="text-white font-medium text-lg md:text-xl">Web3</div>
                        <div className="text-gray-400/80 text-[10px] md:text-sm mt-1 uppercase tracking-wider font-light">Powered Platform</div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Guidance Indicator */}
            <motion.div
                style={{ opacity: scrollGuidanceOpacity }}
                className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center justify-center pointer-events-none"
            >
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={preloaderActive ? { opacity: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-white/60 text-[10px] md:text-xs tracking-[0.2em] font-light uppercase">Scroll to Explore</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
                </motion.div>
            </motion.div>
        </motion.main>
    );
});

HeroContent.displayName = 'HeroContent';

const HeroPage = ({ ready, progress, preloaderActive }) => {
    // We want the Hero Page background & image to remain visible under the Second Section.
    // So we do not fade the HeroPage's opacity out. We just let it translate over naturally.
    return (
        <motion.div
            style={{ transform: 'translateZ(0)' }}
            className="relative min-h-[100dvh] w-full bg-[#111638] selection:bg-[#74573e] selection:text-white pointer-events-none"
        >
            <HeroContent ready={ready} progress={progress} preloaderActive={preloaderActive} />
        </motion.div>
    );
};

export default HeroPage;

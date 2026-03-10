import React, { useRef, useEffect, useState } from 'react';
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
    
    // 431 frames extracted
    const frameCount = 431;
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    
    // Preload images
    useEffect(() => {
        const loadedImages = [];
        let loadedCount = 0;
        
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const frameIndex = String(i).padStart(4, '0');
            img.src = `/hero-frames/frame-${frameIndex}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                }
            };
            loadedImages.push(img);
        }
    }, [frameCount]);

    const drawFrame = (ctx, img, canvasWidth, canvasHeight) => {
        if (!img) return;
        
        // Calculate object-cover equivalent drawing
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (canvasRatio > imgRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawWidth = canvasHeight * imgRatio;
            drawHeight = canvasHeight;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        }
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const renderCurrentFrame = (imgs) => {
        if (!canvasRef.current || imgs.length < frameCount) return;
        
        const ctx = canvasRef.current.getContext('2d');
        const currentProgress = progress.get ? progress.get() : 0;
        const normalizedProgress = Math.min(Math.max(currentProgress / 0.30, 0), 1);
        
        const frameIndex = Math.min(
            Math.floor(normalizedProgress * (frameCount - 1)),
            frameCount - 1
        );
        
        requestAnimationFrame(() => {
            if (canvasRef.current && imgs[frameIndex]) {
                drawFrame(ctx, imgs[frameIndex], canvasRef.current.width, canvasRef.current.height);
            }
        });
    };

    useMotionValueEvent(progress, 'change', () => {
        renderCurrentFrame(images);
    });

    // Handle initial paint and resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderCurrentFrame(images);
            }
        };
        
        // Set up dimensions
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
        
        // Paint immediately if images are ready
        renderCurrentFrame(images);
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [images]);

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
                    transition={{ duration: 1, delay: 1 }}
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

import React, { useRef, useEffect } from 'react';

/**
 * MotionTrailsBackground — A native Canvas recreation of the Spline "motion trails" effect.
 * Renders glowing, flowing light trails that move organically through 3D-like space.
 */
const MotionTrailsBackground = ({ className = '' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;
        let w, h;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        window.addEventListener('resize', resize);

        // Trail configuration
        const trailCount = 12;
        const pointsPerTrail = 80;
        const trails = [];

        // Color palette matching the Spline motion trails feel
        const colors = [
            { r: 116, g: 87, b: 62 },    // #74573e bronze
            { r: 80, g: 120, b: 200 },    // soft blue
            { r: 160, g: 100, b: 60 },    // warm gold
            { r: 40, g: 80, b: 180 },     // deep blue
            { r: 200, g: 140, b: 80 },    // light gold
            { r: 60, g: 50, b: 120 },     // purple-blue
            { r: 140, g: 80, b: 50 },     // dark bronze
            { r: 100, g: 140, b: 220 },   // sky blue
            { r: 180, g: 120, b: 70 },    // amber
            { r: 50, g: 70, b: 160 },     // royal blue
            { r: 170, g: 130, b: 90 },    // tan
            { r: 70, g: 90, b: 180 },     // medium blue
        ];

        // Initialize trails
        for (let i = 0; i < trailCount; i++) {
            const color = colors[i % colors.length];
            const trail = {
                points: [],
                color,
                speed: 0.3 + Math.random() * 0.6,
                thickness: 1.5 + Math.random() * 3,
                // Movement parameters — each trail has unique sine/cosine frequencies
                freqX: 0.3 + Math.random() * 0.7,
                freqY: 0.4 + Math.random() * 0.6,
                freqZ: 0.2 + Math.random() * 0.5,
                ampX: 0.15 + Math.random() * 0.25,
                ampY: 0.1 + Math.random() * 0.2,
                phaseX: Math.random() * Math.PI * 2,
                phaseY: Math.random() * Math.PI * 2,
                phaseZ: Math.random() * Math.PI * 2,
                // Starting center offset
                cx: 0.3 + Math.random() * 0.4,
                cy: 0.3 + Math.random() * 0.4,
                glow: 8 + Math.random() * 16,
            };

            // Pre-fill trail points
            for (let j = 0; j < pointsPerTrail; j++) {
                trail.points.push({ x: w * trail.cx, y: h * trail.cy, opacity: 0 });
            }
            trails.push(trail);
        }

        let time = 0;

        const render = () => {
            time += 0.008;

            // Fade previous frame — creates the trail effect
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(17, 22, 56, 0.12)';
            ctx.fillRect(0, 0, w, h);

            trails.forEach((trail) => {
                const t = time * trail.speed;

                // Calculate new head position with organic 3D-like movement
                const nx = w * (trail.cx
                    + Math.sin(t * trail.freqX + trail.phaseX) * trail.ampX
                    + Math.sin(t * trail.freqY * 0.7 + trail.phaseZ) * trail.ampX * 0.5
                );
                const ny = h * (trail.cy
                    + Math.cos(t * trail.freqY + trail.phaseY) * trail.ampY
                    + Math.sin(t * trail.freqZ * 1.3 + trail.phaseX) * trail.ampY * 0.4
                );

                // Shift points — remove tail, add new head
                trail.points.pop();
                trail.points.unshift({ x: nx, y: ny, opacity: 1 });

                // Draw the trail as a series of connected line segments with varying opacity
                ctx.globalCompositeOperation = 'screen';
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                for (let i = 0; i < trail.points.length - 1; i++) {
                    const p0 = trail.points[i];
                    const p1 = trail.points[i + 1];
                    const progress = 1 - i / trail.points.length;
                    const alpha = progress * progress * 0.7; // Quadratic falloff

                    // Thickness tapers along the trail
                    const lineWidth = trail.thickness * progress;

                    if (lineWidth < 0.1) continue;

                    ctx.beginPath();
                    ctx.moveTo(p0.x, p0.y);
                    ctx.lineTo(p1.x, p1.y);

                    const { r, g, b } = trail.color;

                    // Glow layer
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`;
                    ctx.lineWidth = lineWidth + trail.glow * progress;
                    ctx.stroke();

                    // Core bright line
                    ctx.strokeStyle = `rgba(${Math.min(255, r + 60)}, ${Math.min(255, g + 60)}, ${Math.min(255, b + 60)}, ${alpha})`;
                    ctx.lineWidth = lineWidth;
                    ctx.stroke();

                    // Hot center (brighter core)
                    if (progress > 0.5) {
                        ctx.strokeStyle = `rgba(${Math.min(255, r + 120)}, ${Math.min(255, g + 120)}, ${Math.min(255, b + 120)}, ${alpha * 0.5})`;
                        ctx.lineWidth = lineWidth * 0.3;
                        ctx.stroke();
                    }
                }
            });

            animationId = requestAnimationFrame(render);
        };

        // Initial fill with base color
        ctx.fillStyle = '#111638';
        ctx.fillRect(0, 0, w, h);

        render();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className={`absolute inset-0 z-0 w-full h-full bg-[#111638] ${className}`}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
            {/* Subtle vignette */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(17,22,56,0.5) 100%)'
                }}
            />
        </div>
    );
};

export default MotionTrailsBackground;

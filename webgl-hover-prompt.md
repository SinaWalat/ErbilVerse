# WebGL Hover Animation Prompt

## Animation Name
**Chromatic Ripple Lens Hover**

This is a custom descriptive name, not a strict industry-standard term. It fits the effect: a WebGL image hover animation with ripple distortion, lens warping, and subtle chromatic aberration.

## Reusable Prompt
Create a full-screen responsive hero section using WebGL with a background image texture. The image should feel cinematic and premium, not flat. Add an interactive hover effect where the pointer creates a smooth ripple and lens distortion across the image, with subtle chromatic aberration on the edges of the distortion. The effect should be elegant, soft, and high-end, not noisy or aggressive.

The hero must stay properly framed across desktop, tablet, and mobile. On narrow portrait screens, do not simply center-crop the image. Use responsive focus and zoom so the key visual area stays visible and the image does not look shrunken. The WebGL canvas must resize correctly when switching between desktop and mobile dimensions, including orientation changes, without requiring a page refresh.

Interaction must work for both mouse and touch devices. On desktop, the effect should react to hover and pointer movement. On touch devices, use touch movement and a subtle idle animation fallback so the scene still feels alive even without hover. Keep the motion smooth, premium, and performant.

Design requirements:
- Full-screen hero only
- Background image rendered as a WebGL texture
- Soft ripple distortion around the pointer
- Lens-like warp effect
- Slight RGB/chromatic split near the interaction point
- Subtle ambient drifting motion even when idle
- Responsive image composition for landscape and portrait
- Proper resize handling for `resize`, `orientationchange`, and `visualViewport`
- Clean modern typography overlay with glassmorphism card
- Mobile-friendly and performance-conscious

Technical direction:
- Use React with `@react-three/fiber` and `three`
- Build the effect with a custom shader material
- Use shader uniforms for time, pointer position, hover/touch intensity, image resolution, screen resolution, focus point, and zoom
- Scale the WebGL plane to always cover the viewport
- Clamp UVs cleanly to avoid edge artifacts
- Avoid generic parallax-only solutions; the image itself should distort in WebGL

## Short Version
Build a premium full-screen WebGL hero using an image texture with a chromatic ripple lens hover effect. The pointer should create soft ripple distortion, subtle lens warping, and slight RGB split. The hero must be fully responsive, preserve the image composition on mobile portrait screens, and update correctly on resize/orientation changes without refresh. Support both mouse hover and touch interaction, with a subtle idle animation fallback on mobile.

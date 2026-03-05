import React, { Suspense, startTransition, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform vec2 uPointer;
  uniform vec2 uFocus;
  uniform float uTime;
  uniform float uHover;
  uniform float uRadius;
  uniform float uZoom;

  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 screen, vec2 image, vec2 focus, float zoom) {
    float screenRatio = screen.x / screen.y;
    float imageRatio = image.x / image.y;

    if (screenRatio < imageRatio) {
      float scale = screenRatio / imageRatio;
      uv.x = uv.x * scale + (1.0 - scale) * 0.5;
    } else {
      float scale = imageRatio / screenRatio;
      uv.y = uv.y * scale + (1.0 - scale) * 0.5;
    }

    uv = (uv - focus) / zoom + focus;

    return clamp(uv, 0.001, 0.999);
  }

  void main() {
    vec2 uv = vUv;
    vec2 pointer = uPointer;
    vec2 offset = uv - pointer;
    offset.x *= uResolution.x / uResolution.y;

    float distanceToPointer = length(offset);
    float hoverMask = smoothstep(uRadius, 0.0, distanceToPointer) * uHover;
    float ripple = sin(distanceToPointer * 30.0 - uTime * 3.8);
    float pulse = cos(distanceToPointer * 18.0 - uTime * 2.2);

    vec2 flowDirection = normalize(offset + vec2(0.0001));
    vec2 idleDrift = vec2(
      sin((uv.y * 7.5) + uTime * 0.18),
      cos((uv.x * 6.0) - uTime * 0.14)
    ) * 0.0035;
    vec2 rippleWarp = flowDirection * hoverMask * (0.02 + ripple * 0.014);
    vec2 lensWarp = offset * hoverMask * (-0.11 + pulse * 0.025);

    vec2 sampleUv = coverUv(
      uv + idleDrift + rippleWarp + lensWarp,
      uResolution,
      uImageResolution,
      uFocus,
      uZoom
    );
    vec2 aberration = flowDirection * hoverMask * 0.012;

    float r = texture2D(uTexture, sampleUv + aberration).r;
    float g = texture2D(uTexture, sampleUv).g;
    float b = texture2D(uTexture, sampleUv - aberration).b;
    vec3 color = vec3(r, g, b);

    float bloom = smoothstep(uRadius * 0.7, 0.0, distanceToPointer) * uHover;
    color += bloom * vec3(0.12, 0.22, 0.55);
    color += hoverMask * 0.08;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function BackgroundPlane({ interactionRef, pointerTargetRef, coarsePointerRef }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const textureRef = useRef(null);
  const { viewport, size } = useThree();

  useEffect(() => {
    const loader = new THREE.TextureLoader();

    loader.load('/backbackback.png', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      textureRef.current = texture;

      if (materialRef.current) {
        materialRef.current.uniforms.uTexture.value = texture;
        materialRef.current.uniforms.uImageResolution.value.set(
          texture.image.width,
          texture.image.height
        );
      }
    });

    return () => {
      textureRef.current?.dispose();
    };
  }, []);

  useFrame((state) => {
    if (!materialRef.current) {
      return;
    }

    const { uniforms } = materialRef.current;
    const screenAspect = size.width / Math.max(size.height, 1);
    const portraitWeight = THREE.MathUtils.clamp((0.9 - screenAspect) / 0.4, 0, 1);
    const targetZoom = THREE.MathUtils.lerp(1.02, 1.7, portraitWeight);
    const targetFocus = coarsePointerRef.current
      ? new THREE.Vector2(
          THREE.MathUtils.lerp(0.5, 0.43, portraitWeight),
          THREE.MathUtils.lerp(0.5, 0.64, portraitWeight)
        )
      : new THREE.Vector2(
          THREE.MathUtils.lerp(0.5, 0.46, portraitWeight),
          THREE.MathUtils.lerp(0.5, 0.58, portraitWeight)
        );
    const idlePointer = new THREE.Vector2(
      targetFocus.x + Math.sin(state.clock.elapsedTime * 0.28) * 0.07,
      targetFocus.y + Math.cos(state.clock.elapsedTime * 0.22) * 0.05
    );
    const targetRadius = interactionRef.current.active
      ? coarsePointerRef.current
        ? 0.24
        : 0.14
      : coarsePointerRef.current
        ? 0.2
        : 0.12;
    const pointerTarget = interactionRef.current.active
      ? pointerTargetRef.current
      : idlePointer;
    const hoverTarget = interactionRef.current.active
      ? 1
      : coarsePointerRef.current
        ? 0.34
        : 0.18;

    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uHover.value = THREE.MathUtils.lerp(
      uniforms.uHover.value,
      hoverTarget,
      0.08
    );
    uniforms.uPointer.value.lerp(pointerTarget, 0.08);
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uFocus.value.lerp(targetFocus, 0.08);
    uniforms.uRadius.value = THREE.MathUtils.lerp(
      uniforms.uRadius.value,
      targetRadius,
      0.08
    );
    uniforms.uZoom.value = THREE.MathUtils.lerp(
      uniforms.uZoom.value,
      targetZoom,
      0.08
    );

    if (textureRef.current?.image) {
      uniforms.uImageResolution.value.set(
        textureRef.current.image.width,
        textureRef.current.image.height
      );
    }

    if (meshRef.current) {
      meshRef.current.scale.set(viewport.width, viewport.height, 1);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: null },
          uResolution: { value: new THREE.Vector2(size.width, size.height) },
          uImageResolution: { value: new THREE.Vector2(1344, 768) },
          uPointer: { value: new THREE.Vector2(0.5, 0.5) },
          uFocus: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0 },
          uHover: { value: 0 },
          uRadius: { value: 0.14 },
          uZoom: { value: 1.02 },
        }}
        toneMapped={false}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}

function readViewportMetrics() {
  if (typeof window === 'undefined') {
    return { height: 0, dpr: 1, width: 0 };
  }

  const viewport = window.visualViewport;

  return {
    height: Math.round(viewport?.height ?? window.innerHeight),
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    width: Math.round(viewport?.width ?? window.innerWidth),
  };
}

function useViewportMetrics() {
  const [viewportMetrics, setViewportMetrics] = useState(() => readViewportMetrics());

  useLayoutEffect(() => {
    const syncViewport = () => {
      const nextMetrics = readViewportMetrics();
      startTransition(() => {
        setViewportMetrics((currentMetrics) => {
          if (
            currentMetrics.height === nextMetrics.height &&
            currentMetrics.width === nextMetrics.width &&
            currentMetrics.dpr === nextMetrics.dpr
          ) {
            return currentMetrics;
          }

          return nextMetrics;
        });
      });
    };

    syncViewport();

    window.addEventListener('resize', syncViewport);
    window.addEventListener('orientationchange', syncViewport);
    window.visualViewport?.addEventListener('resize', syncViewport);
    window.visualViewport?.addEventListener('scroll', syncViewport);

    return () => {
      window.removeEventListener('resize', syncViewport);
      window.removeEventListener('orientationchange', syncViewport);
      window.visualViewport?.removeEventListener('resize', syncViewport);
      window.visualViewport?.removeEventListener('scroll', syncViewport);
    };
  }, []);

  return viewportMetrics;
}

function WebGLHero() {
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const pointerTargetRef = useRef(new THREE.Vector2(0.5, 0.5));
  const cursorTargetRef = useRef(new THREE.Vector2(-80, -80));
  const cursorPositionRef = useRef(new THREE.Vector2(-80, -80));
  const lastPointerClientRef = useRef({ x: null, y: null });
  const lastPointerTypeRef = useRef('mouse');
  const cursorScaleRef = useRef(1);
  const cursorScaleTargetRef = useRef(0.92);
  const coarsePointerRef = useRef(false);
  const interactionRef = useRef({ active: false, pointerType: 'mouse' });
  const cursorUiRef = useRef({ visible: false, active: false });
  const viewportMetrics = useViewportMetrics();
  const [showCursor, setShowCursor] = useState(false);
  const [isCursorActive, setIsCursorActive] = useState(false);

  const setCursorVisibility = (visible) => {
    if (cursorUiRef.current.visible === visible) {
      return;
    }

    cursorUiRef.current.visible = visible;
    setShowCursor(visible);
  };

  const setCursorActivity = (active) => {
    if (cursorUiRef.current.active === active) {
      return;
    }

    cursorUiRef.current.active = active;
    setIsCursorActive(active);
  };

  const measureHeroBounds = () => {
    const heroElement = heroRef.current;

    if (!heroElement) {
      return null;
    }

    return heroElement.getBoundingClientRect();
  };

  const clearInteraction = (pointerType = 'mouse', hideCursor = pointerType !== 'touch') => {
    interactionRef.current = { active: false, pointerType };

    if (pointerType !== 'touch') {
      cursorScaleTargetRef.current = 0.92;
      setCursorActivity(false);

      if (hideCursor) {
        setCursorVisibility(false);
      }
    }
  };

  const updatePointerFromClient = (clientX, clientY, pointerType = 'mouse') => {
    const bounds = measureHeroBounds();

    if (!bounds || bounds.width <= 0 || bounds.height <= 0) {
      clearInteraction(pointerType);
      return false;
    }

    lastPointerClientRef.current = { x: clientX, y: clientY };
    lastPointerTypeRef.current = pointerType;

    const isInside =
      clientX >= bounds.left &&
      clientX <= bounds.right &&
      clientY >= bounds.top &&
      clientY <= bounds.bottom;

    if (!isInside) {
      clearInteraction(pointerType);
      return false;
    }

    const x = THREE.MathUtils.clamp((clientX - bounds.left) / bounds.width, 0, 1);
    const y = THREE.MathUtils.clamp(1 - (clientY - bounds.top) / bounds.height, 0, 1);

    pointerTargetRef.current.set(x, y);
    cursorTargetRef.current.set(clientX - bounds.left, clientY - bounds.top);
    interactionRef.current = { active: true, pointerType };

    if (pointerType !== 'touch' && !coarsePointerRef.current) {
      cursorScaleTargetRef.current = 1;
      setCursorVisibility(true);
      setCursorActivity(true);
    }

    return true;
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const syncPointerMode = () => {
      coarsePointerRef.current = mediaQuery.matches;

      if (mediaQuery.matches) {
        setCursorVisibility(false);
        setCursorActivity(false);
      }
    };

    syncPointerMode();
    mediaQuery.addEventListener('change', syncPointerMode);

    return () => {
      mediaQuery.removeEventListener('change', syncPointerMode);
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const animateCursor = () => {
      const cursorElement = cursorRef.current;

      if (cursorElement && !coarsePointerRef.current) {
        cursorPositionRef.current.lerp(cursorTargetRef.current, 0.18);
        cursorScaleRef.current = THREE.MathUtils.lerp(
          cursorScaleRef.current,
          cursorScaleTargetRef.current,
          0.16
        );
        cursorElement.style.transform = `translate3d(${cursorPositionRef.current.x}px, ${cursorPositionRef.current.y}px, 0) translate(-50%, -50%) scale(${cursorScaleRef.current})`;
      }

      frameId = window.requestAnimationFrame(animateCursor);
    };

    frameId = window.requestAnimationFrame(animateCursor);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useLayoutEffect(() => {
    measureHeroBounds();

    const updateBounds = () => {
      measureHeroBounds();

      const { x, y } = lastPointerClientRef.current;

      if (x !== null && y !== null) {
        updatePointerFromClient(x, y, lastPointerTypeRef.current);
      }
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' && heroRef.current
        ? new ResizeObserver(updateBounds)
        : null;

    if (resizeObserver && heroRef.current) {
      resizeObserver.observe(heroRef.current);
    }

    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds, { passive: true });
    window.addEventListener('orientationchange', updateBounds);
    window.visualViewport?.addEventListener('resize', updateBounds);
    window.visualViewport?.addEventListener('scroll', updateBounds);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds);
      window.removeEventListener('orientationchange', updateBounds);
      window.visualViewport?.removeEventListener('resize', updateBounds);
      window.visualViewport?.removeEventListener('scroll', updateBounds);
    };
  }, []);

  useEffect(() => {
    const { x, y } = lastPointerClientRef.current;

    if (x === null || y === null) {
      return;
    }

    measureHeroBounds();
    updatePointerFromClient(x, y, lastPointerTypeRef.current);
  }, [viewportMetrics.height, viewportMetrics.width, viewportMetrics.dpr]);

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') {
      return;
    }

    updatePointerFromClient(event.clientX, event.clientY, event.pointerType || 'mouse');
  };

  const handlePointerEnter = (event) => {
    if (event.pointerType === 'touch') {
      return;
    }

    updatePointerFromClient(event.clientX, event.clientY, event.pointerType || 'mouse');
  };

  const handlePointerLeave = (event) => {
    clearInteraction(event.pointerType || lastPointerTypeRef.current);
  };

  const handlePointerDown = (event) => {
    updatePointerFromClient(event.clientX, event.clientY, event.pointerType || 'mouse');
  };

  const handlePointerUp = (event) => {
    const pointerType = event.pointerType || lastPointerTypeRef.current;

    if (pointerType === 'touch') {
      clearInteraction(pointerType, false);
      return;
    }

    updatePointerFromClient(event.clientX, event.clientY, pointerType);
  };

  const updateTouch = (event) => {
    const touch = event.touches[0] || event.changedTouches[0];

    if (!touch) {
      return;
    }

    updatePointerFromClient(touch.clientX, touch.clientY, 'touch');
  };

  const heroHeight = viewportMetrics.height || null;

  return (
    <main
      ref={heroRef}
      className="hero-shell"
      style={heroHeight ? { '--hero-height': `${heroHeight}px` } : undefined}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerLeave}
      onTouchStart={updateTouch}
      onTouchMove={updateTouch}
      onTouchEnd={() => {
        clearInteraction('touch');
      }}
      onTouchCancel={() => {
        clearInteraction('touch');
      }}
    >
      <div className="hero-canvas">
        <Canvas
          camera={{ fov: 50, position: [0, 0, 1.35] }}
          dpr={viewportMetrics.dpr}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <BackgroundPlane
              coarsePointerRef={coarsePointerRef}
              interactionRef={interactionRef}
              pointerTargetRef={pointerTargetRef}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="hero-shade" />
      <div className="hero-noise" />
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`hero-cursor${showCursor ? ' is-visible' : ''}${isCursorActive ? ' is-active' : ''}`}
      />

      <section className="hero-content">
        <div className="hero-card">
          <p className="hero-eyebrow">Interactive Hero</p>
          <h1>Hover to bend the horizon.</h1>
          <p className="hero-copy">
            A full-screen hero using your supplied artwork as a live WebGL texture with
            subtle ripple, lens, and chromatic hover response.
          </p>
        </div>
      </section>
    </main>
  );
}

export default WebGLHero;

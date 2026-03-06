import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const RADIUS = 2;
const BASE_SCALE = 1.0;
const HOVER_SCALE = 3.0;

const atmosphereVertexShader = `
varying vec3 vNormal;
void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const atmosphereFragmentShader = `
varying vec3 vNormal;
void main() {
  float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
    gl_FragColor = vec4(0.23, 0.51, 0.96, 1.0) * intensity;
}
`;

const signalVertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const signalFragmentShader = `
uniform float time;
uniform vec3 color;
varying vec2 vUv;
void main() {
    // Sharp digital signal pulse
    // Reduced pulses per ring for subtler effect (x2)
    float pulse = mod(vUv.x * 2.0 - time * 0.5, 1.0);
    pulse = pow(pulse, 12.0); 
    
    // Faint persistent line for the "orbital track"
    float base = 0.06;
    
    // Brighten the signal blue for visibility
    vec3 signalColor = color * (1.5 + pulse * 6.0);
    float alpha = (pulse * 0.7 + base) * 0.4;
    
    gl_FragColor = vec4(signalColor, alpha);
}
`;

function SignalArc({ rotation, radiusScale = 1.4, speed = 1.0 }) {
    const materialRef = useRef();

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = state.clock.getElapsedTime() * speed;
        }
    });

    const uniforms = useMemo(() => ({
        time: { value: 0 },
        color: { value: new THREE.Color("#75573f") }
    }), []);

    return (
        <group rotation={rotation}>
            <mesh>
                <torusGeometry args={[RADIUS * radiusScale, 0.003, 16, 100]} />
                <shaderMaterial
                    ref={materialRef}
                    uniforms={uniforms}
                    vertexShader={signalVertexShader}
                    fragmentShader={signalFragmentShader}
                    transparent={true}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

function GlobePoints({ hoverPoint }) {
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const [positions, setPositions] = useState(null);
    const [normals, setNormals] = useState(null);
    const [pointData, setPointData] = useState(null);

    const currentScales = useRef(null);

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = 'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-water.png';
        img.onload = () => {
            const w = 512;
            const h = 256;
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            const data = ctx.getImageData(0, 0, w, h).data;

            const posArray = [];
            const normArray = [];
            const dataArray = [];

            const latStep = 1.6;
            const lngStep = 1.6;
            for (let lat = -90; lat <= 90; lat += latStep) {
                for (let lng = -180; lng <= 180; lng += lngStep) {
                    const jLat = lat + (Math.random() - 0.5) * latStep * 0.5;
                    const jLng = lng + (Math.random() - 0.5) * lngStep * 0.5;

                    // Uniform distribution: Ignore the image map data
                    const phi = (90 - jLat) * (Math.PI / 180);
                    const theta = (jLng + 180) * (Math.PI / 180);

                    const px = -(RADIUS * Math.sin(phi) * Math.cos(theta));
                    const py = RADIUS * Math.cos(phi);
                    const pz = RADIUS * Math.sin(phi) * Math.sin(theta);

                    // Slightly higher probability to keep density pleasant across the whole sphere
                    if (Math.random() > 0.88) {
                        posArray.push(px, py, pz);
                        normArray.push(px / RADIUS, py / RADIUS, pz / RADIUS);
                        dataArray.push(BASE_SCALE);
                    }
                }
            }

            const numPoints = posArray.length / 3;
            currentScales.current = new Float32Array(numPoints).fill(BASE_SCALE);

            setPositions(new Float32Array(posArray));
            setNormals(new Float32Array(normArray));
            setPointData(new Float32Array(dataArray));
        };
    }, []);

    useFrame((state, delta) => {
        if (!meshRef.current || !positions) return;

        // Slow idle rotation
        meshRef.current.rotation.y += delta * 0.05;

        let localHover = null;
        let anyHovered = false;

        if (hoverPoint && hoverPoint.current) {
            localHover = hoverPoint.current.clone();
            meshRef.current.worldToLocal(localHover);
        }

        const numPoints = positions.length / 3;
        const hoverRadiusSq = 0.5 * 0.5;

        for (let i = 0; i < numPoints; i++) {
            let targetS = pointData[i];

            if (localHover) {
                const dx = positions[i * 3] - localHover.x;
                const dy = positions[i * 3 + 1] - localHover.y;
                const dz = positions[i * 3 + 2] - localHover.z;
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < hoverRadiusSq) {
                    const dist = Math.sqrt(distSq);
                    const hoverEffect = 1.0 - (dist / 0.5);
                    targetS += hoverEffect * 2.0;
                    anyHovered = true;
                }
            }

            // Smoother, slower interpolation
            currentScales.current[i] += (targetS - currentScales.current[i]) * 5 * delta;

            dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);

            const targetLook = new THREE.Vector3(
                positions[i * 3] + normals[i * 3],
                positions[i * 3 + 1] + normals[i * 3 + 1],
                positions[i * 3 + 2] + normals[i * 3 + 2]
            );
            dummy.lookAt(targetLook);

            const s = currentScales.current[i];
            dummy.scale.set(s, s, s);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;

        document.body.style.cursor = anyHovered ? 'pointer' : 'auto';
    });

    if (!positions) return null;

    return (
        <instancedMesh
            ref={meshRef}
            args={[null, null, positions.length / 3]}
        >
            <circleGeometry args={[0.015, 24]} />
            <meshBasicMaterial color="#60a5fa" transparent={true} opacity={0.8} side={THREE.DoubleSide} />
        </instancedMesh>
    );
}

function pow(a, b) {
    return Math.pow(a, b);
}

function RotationLogic({ target, current, groupRef }) {
    useFrame((state, delta) => {
        // Smoothly interpolate current towards target
        current.current.x += (target.current.x - current.current.x) * 3 * delta;
        current.current.y += (target.current.y - current.current.y) * 3 * delta;

        if (groupRef.current) {
            groupRef.current.rotation.x = current.current.x;
            groupRef.current.rotation.y = current.current.y;
        }
    });
    return null;
}

export default function DataGlobe({ coreColor = "#0a0a0a" }) {
    const hoverPoint = useRef(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const targetRotation = useRef({ x: 0, y: 0 });
    const currentRotation = useRef({ x: 0, y: 0 });
    const groupRef = useRef();

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Scale mouse position to [-1, 1]
            mousePosition.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            };

            // Map mouse position to rotation values
            targetRotation.current = {
                x: mousePosition.current.y * 0.3,
                y: mousePosition.current.x * 0.5
            };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="w-full h-full bg-transparent absolute inset-0 z-0" style={{ touchAction: 'pan-y' }}>
            <Canvas
                camera={{ position: [0, 0, 4.0], fov: 45 }}
                dpr={[1, 2]}
            >
                <RotationLogic target={targetRotation} current={currentRotation} groupRef={groupRef} />

                {/* Drop the entire globe structure downwards so we mainly see the Northern Hemisphere arch */}
                <group
                    ref={groupRef}
                    position={[0, -1.2, 0]}
                >
                    {/* Dark core sphere acting as a raycast hit target for hover Point */}
                    <mesh
                        onPointerMove={(e) => {
                            e.stopPropagation();
                            if (!hoverPoint.current) hoverPoint.current = new THREE.Vector3();
                            hoverPoint.current.copy(e.point);
                        }}
                        onPointerOut={(e) => {
                            hoverPoint.current = null;
                        }}
                    >
                        <sphereGeometry args={[RADIUS * 0.99, 64, 64]} />
                        <meshBasicMaterial color={coreColor} />
                    </mesh>

                    {/* Glowing Atmosphere edge */}
                    <mesh>
                        <sphereGeometry args={[RADIUS * 1.15, 64, 64]} />
                        <shaderMaterial
                            vertexShader={atmosphereVertexShader}
                            fragmentShader={atmosphereFragmentShader}
                            blending={THREE.AdditiveBlending}
                            side={THREE.BackSide}
                            transparent={true}
                            depthWrite={false}
                        />
                    </mesh>

                    {/* The literal data points representing land */}
                    <GlobePoints hoverPoint={hoverPoint} />

                    {/* Animated Signal Rings behind the globe - subtler and clean */}
                    <group position={[0, 0, -0.8]}>
                        <SignalArc rotation={[Math.PI / 4, 0.2, 0]} radiusScale={1.3} speed={0.6} />
                        <SignalArc rotation={[Math.PI / 3, -0.4, 0]} radiusScale={1.6} speed={0.4} />
                        <SignalArc rotation={[-Math.PI / 4, 0.6, 0]} radiusScale={1.9} speed={0.5} />
                        <SignalArc rotation={[1.2, 0.1, 0]} radiusScale={2.1} speed={0.3} />
                        <SignalArc rotation={[-0.8, -1.2, 0.5]} radiusScale={1.45} speed={0.7} />
                        <SignalArc rotation={[2.1, 0.8, -0.3]} radiusScale={1.75} speed={0.45} />
                        <SignalArc rotation={[-1.5, 0.2, 1.1]} radiusScale={2.0} speed={0.55} />
                    </group>
                </group>

                {/* Disabled default rotation to favor cursor-follow */}
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    enableRotate={false}
                    enableDamping={true}
                    dampingFactor={0.05}
                    rotateSpeed={0.8}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>

            {/* Soft gradient overlay matching the reference image's top edge glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />
        </div>
    );
}

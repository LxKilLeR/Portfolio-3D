import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

/**
 * Animated particle stars background
 */
function Stars({ count = 5000 }) {
  const ref = useRef();

  // Generate random sphere points
  const sphere = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 2.5 + 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 16;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#6c63ff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

/**
 * Central glowing distorted sphere
 */
function FloatingSphere({ mouseX, mouseY }) {
  const meshRef = useRef();
  const lightRef = useRef();
  const outerOrbitRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    // Subtle mouse parallax
    meshRef.current.rotation.x = mouseY.current * 0.3;
    meshRef.current.rotation.z = mouseX.current * 0.3;
  });

  useGSAP(() => {
    if (!outerOrbitRef.current) return;

    // Expand the outer orbit as we scroll down to the bottom of the page
    gsap.to(outerOrbitRef.current.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement, 
        start: "top top",
        end: "max",
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // Make the outer orbit rotate based on document scroll 
    gsap.to(outerOrbitRef.current.rotation, {
      x: 0,
      y: Math.PI * 4,
      z: 0,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top", 
        end: "max",
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  }, { scope: outerOrbitRef });

  return (
    <>
      {/* Ambient point light that follows sphere */}
      <pointLight ref={lightRef} color="#6c63ff" intensity={2} distance={4} />
      <pointLight position={[2, 2, 0]} color="#00d4ff" intensity={1} distance={5} />

      {/* Main sphere */}
      <Sphere ref={meshRef} args={[0.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#6c63ff"
          attach="material"
          distort={0.45}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
          emissive="#2d1b8a"
          emissiveIntensity={0.4}
        />
      </Sphere>

      {/* Outer glow ring / Wireframe orbit */}
      <Sphere ref={outerOrbitRef} args={[1.15, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#6c63ff"
          transparent
          opacity={0.15}
          wireframe
        />
      </Sphere>
    </>
  );
}

/**
 * Orbiting particles around the sphere
 */
function OrbitingParticles() {
  const groupRef = useRef();
  const count = 80;

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.6 + Math.random() * 0.4;
      const yOffset = (Math.random() - 0.5) * 0.4;
      const speed = 0.3 + Math.random() * 0.4;
      const size = 0.012 + Math.random() * 0.01;
      const opacity = 0.7 + Math.random() * 0.3;
      return { angle, radius, yOffset, speed, size, opacity };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      const angle = p.angle + t * p.speed * 0.5;
      child.position.x = Math.cos(angle) * p.radius;
      child.position.z = Math.sin(angle) * p.radius;
      child.position.y = p.yOffset + Math.sin(t * 0.8 + i) * 0.08;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#6c63ff' : i % 3 === 1 ? '#00d4ff' : '#ff6b6b'}
            transparent
            opacity={p.opacity}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * The 3D canvas scene for the Hero section
 */
const HeroScene = ({ mouseX, mouseY }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <Suspense fallback={null}>
        <Stars />
        <FloatingSphere mouseX={mouseX} mouseY={mouseY} />
        <OrbitingParticles />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;

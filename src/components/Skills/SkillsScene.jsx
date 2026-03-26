import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Technology data with colors
const TECH_DATA = [
  { name: 'React', color: '#61dafb', icon: '⚛️' },
  { name: 'Next.js', color: '#ffffff', icon: '▲' },
  { name: 'Three.js', color: '#6c63ff', icon: '🔮' },
  { name: 'TypeScript', color: '#3178c6', icon: '📘' },
  { name: 'GSAP', color: '#88ce02', icon: '🎬' },
  { name: 'Tailwind', color: '#38bdf8', icon: '🎨' },
  { name: 'Node.js', color: '#339933', icon: '🟢' },
  { name: 'MongoDB', color: '#47a248', icon: '🍃' },
  { name: 'WebGL', color: '#ff6b6b', icon: '🌐' },
  { name: 'Framer', color: '#ff4154', icon: '🎭' },
  { name: 'Python', color: '#3776ab', icon: '🐍' },
  { name: 'C++', color: '#00599C', icon: '⚡' },
];

/**
 * Floating technology logo with depth-based glow
 * - Glows when in front (closer to camera)
 * - Becomes dull when in back
 */
function TechLogo({ tech, position, orbitRadius, speed, delay }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const labelRef = useRef();
  const hoverRef = useRef(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const camera = state.camera;

    // Calculate orbital position
    const angle = delay + t * speed;
    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;
    const y = position[1] + Math.sin(t * 0.5 + delay) * 0.2;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);

      // Always face the camera
      groupRef.current.lookAt(camera.position);

      // Calculate distance from camera (z-depth in camera space)
      const relativePos = groupRef.current.position.clone().sub(camera.position);
      const distance = relativePos.length();

      // Normalize distance for glow calculation (closer = brighter)
      const minDist = 4;
      const maxDist = 12;
      const normalizedDist = THREE.MathUtils.clamp(
        (maxDist - distance) / (maxDist - minDist),
        0,
        1
      );

      // Glow intensity based on distance (front = glow, back = dull)
      const baseGlow = 0.2;
      const maxGlow = 1.0;
      const targetGlow = baseGlow + (maxGlow - baseGlow) * normalizedDist;

      // Hover boost
      const hoverBoost = hoverRef.current ? 0.5 : 0;
      const finalGlow = THREE.MathUtils.clamp(targetGlow + hoverBoost, 0, 1.5);

      if (meshRef.current) {
        // Apply glow based on depth
        meshRef.current.material.emissiveIntensity = finalGlow;

        // Scale slightly based on depth (closer = bigger)
        const baseScale = hoverRef.current ? 1.4 : 1;
        const depthScale = 0.85 + normalizedDist * 0.2;
        const targetScale = baseScale * depthScale;

        const currentScale = meshRef.current.scale.x;
        meshRef.current.scale.setScalar(
          currentScale + (targetScale - currentScale) * 0.1
        );

        // Opacity based on depth (back = more transparent)
        const minOpacity = 0.3;
        const maxOpacity = 1;
        const targetOpacity = minOpacity + (maxOpacity - minOpacity) * normalizedDist;
        meshRef.current.material.opacity = THREE.MathUtils.lerp(
          meshRef.current.material.opacity,
          targetOpacity,
          0.1
        );
      }

      if (labelRef.current) {
        // Label follows same depth-based opacity
        const minOpacity = 0.2;
        const maxOpacity = 1;
        const normalizedDist = THREE.MathUtils.clamp(
          (maxDist - distance) / (maxDist - minDist),
          0,
          1
        );
        const targetOpacity = minOpacity + (maxOpacity - minOpacity) * normalizedDist;
        labelRef.current.material.opacity = THREE.MathUtils.lerp(
          labelRef.current.material.opacity,
          targetOpacity,
          0.1
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Logo Circle */}
      <mesh
        ref={meshRef}
        onPointerOver={() => { hoverRef.current = true; }}
        onPointerOut={() => { hoverRef.current = false; }}
      >
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.3}
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Icon on the circle */}
      <Text
        position={[0, 0, 0.05]}
        fontSize={0.3}
        color="#0a0a0f"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      >
        {tech.icon}
      </Text>

      {/* Label below */}
      <Text
        ref={labelRef}
        position={[0, -0.6, 0]}
        fontSize={0.14}
        color={tech.color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        letterSpacing={0.1}
        transparent
        opacity={0.8}
      >
        {tech.name}
      </Text>

      {/* Dynamic glow light */}
      <pointLight
        color={tech.color}
        intensity={0.5}
        distance={4}
      />
    </group>
  );
}

/**
 * Central glowing core sphere
 */
function CentralCore() {
  const meshRef = useRef();
  const wireframeRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = t * 0.1;

      // Pulsating glow
      const pulse = 0.5 + Math.sin(t * 2) * 0.2;
      meshRef.current.material.emissiveIntensity = pulse;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = t * 0.08;
      wireframeRef.current.rotation.x = t * 0.04;
    }
  });

  return (
    <group>
      {/* Inner solid sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#6c63ff"
          emissive="#6c63ff"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Outer wireframe sphere */}
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[1.3, 24, 24]} />
        <meshBasicMaterial
          color="#6c63ff"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Core glow */}
      <pointLight color="#6c63ff" intensity={3} distance={6} />
    </group>
  );
}

/**
 * Background particle grid on a sphere
 */
function ParticleSphere() {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 7 + Math.random() * 5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={300}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#6c63ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Skills 3D Scene with depth-based glow
 */
const SkillsScene = ({ skills }) => {
  const techs = TECH_DATA;

  // Distribute logos in multiple orbital rings
  const logoPositions = useMemo(() => {
    const positions = [];
    const rings = [
      { count: 4, radius: 2.8, yOffset: 0.8, speed: 0.4 },
      { count: 4, radius: 3.2, yOffset: 0, speed: 0.35 },
      { count: 4, radius: 2.8, yOffset: -0.8, speed: 0.4 },
    ];

    let index = 0;
    rings.forEach((ring, ringIndex) => {
      for (let i = 0; i < ring.count && index < techs.length; i++) {
        const angle = (i / ring.count) * Math.PI * 2 + ringIndex;
        positions.push({
          tech: techs[index],
          orbitRadius: ring.radius,
          yOffset: ring.yOffset,
          speed: ring.speed,
          delay: angle,
        });
        index++;
      }
    });

    return positions;
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ height: '550px', background: '#0a0a0f' }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0a0a0f']} />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-6, -4, -6]} color="#7b2cbf" intensity={1.5} distance={12} />
      <pointLight position={[6, 4, -6]} color="#00d4ff" intensity={1} distance={12} />

      {/* Central core */}
      <CentralCore />

      {/* Orbiting tech logos with depth-based glow */}
      {logoPositions.map((item) => (
        <TechLogo
          key={item.tech.name}
          tech={item.tech}
          position={[0, item.yOffset, 0]}
          orbitRadius={item.orbitRadius}
          speed={item.speed}
          delay={item.delay}
        />
      ))}

      {/* Background particle sphere */}
      <ParticleSphere />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.2}
        enablePan={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 1.4}
        rotateSpeed={0.2}
      />
    </Canvas>
  );
};

export default SkillsScene;

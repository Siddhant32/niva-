'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const count = 36;
  const radius = 1.3;
  const height = 4.5;

  const nodes = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 4;
      const y = (t - 0.5) * height;
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      items.push({
        y,
        p1: [x1, y, z1] as [number, number, number],
        p2: [x2, y, z2] as [number, number, number],
        mid: [(x1 + x2) / 2, y, (z1 + z2) / 2] as [number, number, number],
        length: radius * 2,
        angle,
      });
    }
    return items;
  }, [count, radius, height]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15;
    }
  });

  const nodeColor1 = isDark ? '#2dd4bf' : '#0d9488'; // Teal
  const nodeColor2 = isDark ? '#38bdf8' : '#0284c7'; // Sky Blue
  const barColor = isDark ? '#a855f7' : '#7e22ce'; // Violet

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <group key={i}>
          {/* Strand 1 Node */}
          <mesh position={n.p1}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? nodeColor1 : nodeColor2}
              emissive={i % 2 === 0 ? nodeColor1 : nodeColor2}
              emissiveIntensity={isDark ? 0.6 : 0.2}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Strand 2 Node */}
          <mesh position={n.p2}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? nodeColor2 : nodeColor1}
              emissive={i % 2 === 0 ? nodeColor2 : nodeColor1}
              emissiveIntensity={isDark ? 0.6 : 0.2}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Rung Connecting Bar */}
          {i % 2 === 0 && (
            <mesh position={n.mid} rotation={[0, -n.angle, 0]}>
              <cylinderGeometry args={[0.025, 0.025, n.length, 12]} />
              <meshStandardMaterial
                color={barColor}
                transparent
                opacity={isDark ? 0.75 : 0.6}
                roughness={0.3}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Central energy core aura */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={isDark ? '#38bdf8' : '#0284c7'}
          transparent
          opacity={isDark ? 0.25 : 0.15}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function InteractiveDNA({ heightClass = "h-80 md:h-[480px]" }: { heightClass?: string }) {
  return (
    <div className={`w-full ${heightClass} relative cursor-grab active:cursor-grabbing`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#2dd4bf" />
        <directionalLight position={[0, 5, 5]} intensity={1.0} />

        <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
          <DNAHelix />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface HeartbeatConfig {
  minScale: number;
  maxScale: number;
  beatSpeed: number;
  pauseDuration: number;
}

interface PointCloudProps {
  count?: number;
  radius?: number;
  heartbeat?: HeartbeatConfig;
}

const PointCloud: React.FC<PointCloudProps> = ({
  count = 8000,
  radius = 3,
  heartbeat = {
    minScale: 1.0,
    maxScale: 1.15,
    beatSpeed: 2.5,
    pauseDuration: 0.8,
  },
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { positions, colors, originalPositions, distanceFactors } =
    useMemo(() => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const originalPositions = new Float32Array(count * 3);
      const distanceFactors = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        // Generate random point inside sphere
        let x, y, z, distanceFromCenter;

        do {
          x = (Math.random() - 0.5) * 2;
          y = (Math.random() - 0.5) * 2;
          z = (Math.random() - 0.5) * 2;
          distanceFromCenter = Math.sqrt(x * x + y * y + z * z);
        } while (distanceFromCenter > 1);

        // Strong density falloff for sparse outer regions
        const falloffFactor = Math.pow(Math.random(), 7);
        const maxDistanceRatio = 0.6;
        const scaledDistance = Math.min(
          distanceFromCenter * falloffFactor,
          maxDistanceRatio
        );

        // Base spherical positions
        let finalX = x * scaledDistance * radius;
        let finalY = y * scaledDistance * radius;
        let finalZ = z * scaledDistance * radius;

        // Transform inner core into egg shape
        if (scaledDistance < 0.4) {
          const eggIntensity = Math.max(0, (0.4 - scaledDistance) / 0.4); // 1 at center, 0 at boundary
          const verticalStretch = 1 + 0.5 * eggIntensity; // Up to 50% taller at center
          const horizontalShrink = 1 - 0.25 * eggIntensity; // Up to 25% narrower at center

          // Apply egg transformation
          finalY = finalY * verticalStretch; // Stretch vertically (taller)
          finalX = finalX * horizontalShrink; // Shrink horizontally
          finalZ = finalZ * horizontalShrink; // Shrink depth
        }

        positions[i * 3] = finalX;
        positions[i * 3 + 1] = finalY;
        positions[i * 3 + 2] = finalZ;

        // Store original positions and distance for animation
        originalPositions[i * 3] = finalX;
        originalPositions[i * 3 + 1] = finalY;
        originalPositions[i * 3 + 2] = finalZ;
        distanceFactors[i] = scaledDistance;

        // Black dots
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0;
        colors[i * 3 + 2] = 0;
      }

      return { positions, colors, originalPositions, distanceFactors };
    }, [count, radius]);

  // Combined animation: heartbeat + random particle movement
  useFrame((state) => {
    if (groupRef.current && pointsRef.current) {
      const time = state.clock.elapsedTime;

      // Heartbeat animation
      const beatCycle = heartbeat.beatSpeed;
      const totalCycle = beatCycle + heartbeat.pauseDuration;
      const cycleTime = time % totalCycle;

      let scale = heartbeat.minScale;

      if (cycleTime < beatCycle) {
        const beatProgress = cycleTime / beatCycle;
        let beatIntensity = 0;

        if (beatProgress < 0.35) {
          const firstBeatProgress = beatProgress / 0.35;
          const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          const rawIntensity = Math.sin(firstBeatProgress * Math.PI);
          beatIntensity = easeInOutCubic(rawIntensity);
        } else if (beatProgress > 0.5 && beatProgress < 0.85) {
          const secondBeatProgress = (beatProgress - 0.5) / 0.35;
          const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          const rawIntensity = Math.sin(secondBeatProgress * Math.PI);
          beatIntensity = easeInOutCubic(rawIntensity);
        }

        scale =
          heartbeat.minScale +
          (heartbeat.maxScale - heartbeat.minScale) * beatIntensity;
      }

      const currentScale = groupRef.current.scale.x;
      const smoothScale = THREE.MathUtils.lerp(currentScale, scale, 0.12);
      groupRef.current.scale.setScalar(smoothScale);

      // Animate all particles with random movement
      const positionAttribute = pointsRef.current.geometry.attributes.position;
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const distance = distanceFactors[i];
        const baseX = originalPositions[i * 3];
        const baseY = originalPositions[i * 3 + 1];
        const baseZ = originalPositions[i * 3 + 2];

        // Random movement intensity increases with distance from center
        const movementIntensity =
          distance < 0.15 ? 0.3 : distance < 0.35 ? 0.7 : 1.0;
        const randomSpeed = 0.6 + (i % 50) * 0.02; // Individual particle speed variation

        // Primary random movement with unique frequencies per particle
        const offsetX =
          Math.sin(time * randomSpeed + i * 0.1) * 0.06 * movementIntensity;
        const offsetY =
          Math.cos(time * randomSpeed * 1.4 + i * 0.15) *
          0.05 *
          movementIntensity;
        const offsetZ =
          Math.sin(time * randomSpeed * 0.8 + i * 0.08) *
          0.07 *
          movementIntensity;

        // Secondary chaotic movement for more randomness
        const secondaryX =
          Math.cos(time * randomSpeed * 2.2 + i * 0.3) *
          0.03 *
          movementIntensity;
        const secondaryY =
          Math.sin(time * randomSpeed * 1.9 + i * 0.35) *
          0.04 *
          movementIntensity;
        const secondaryZ =
          Math.cos(time * randomSpeed * 2.7 + i * 0.2) *
          0.035 *
          movementIntensity;

        positions[i * 3] = baseX + offsetX + secondaryX;
        positions[i * 3 + 1] = baseY + offsetY + secondaryY;
        positions[i * 3 + 2] = baseZ + offsetZ + secondaryZ;
      }

      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={false}
        />
      </points>
    </group>
  );
};

interface Globe3DProps {
  className?: string;
  pointCount?: number;
  globeRadius?: number;
  heartbeat?: HeartbeatConfig;
}

const Globe3D: React.FC<Globe3DProps> = ({
  className = "w-full h-full",
  pointCount = 8000,
  globeRadius = 3,
  heartbeat,
}) => {
  return (
    <div className={`${className} bg-white`}>
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: false,
        }}
      >
        <color attach="background" args={["white"]} />
        <ambientLight intensity={1} />
        <PointCloud
          count={pointCount}
          radius={globeRadius}
          heartbeat={heartbeat}
        />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          target={[0, 0, 0]}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default Globe3D;

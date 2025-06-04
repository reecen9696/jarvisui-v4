import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
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
  modelPath?: string;
}

interface Globe3DProps {
  className?: string;
  pointCount?: number;
  globeRadius?: number;
  heartbeat?: HeartbeatConfig;
  modelPath?: string;
}

// Default model path as string constant
const DEFAULT_MODEL_PATH = "/models/model.fbx";
const FBXModelPointCloud: React.FC<PointCloudProps> = ({
  count = 8000,
  radius = 3,
  heartbeat = {
    minScale: 1.0,
    maxScale: 1.15,
    beatSpeed: 2.5,
    pauseDuration: 0.8,
  },
  modelPath = DEFAULT_MODEL_PATH,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [modelVertices, setModelVertices] = useState<number[]>([]);

  // Load FBX model
  const fbx = useLoader(FBXLoader, modelPath);

  // Extract vertices from FBX model
  useEffect(() => {
    if (fbx) {
      const vertices: number[] = [];

      // Handle both single Group and array of Groups
      const processGroup = (group: THREE.Group) => {
        group.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh && child.geometry) {
            const geometry = child.geometry;
            const position = geometry.attributes.position;

            if (position) {
              for (let i = 0; i < position.count; i++) {
                vertices.push(
                  position.getX(i),
                  position.getY(i),
                  position.getZ(i)
                );
              }
            }
          }
        });
      };

      if (Array.isArray(fbx)) {
        fbx.forEach((group) => processGroup(group));
      } else {
        processGroup(fbx);
      }

      setModelVertices(vertices);
    }
  }, [fbx]);

  const { positions, colors, originalPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);

    // Calculate model particles count (40% of total)
    const modelParticleCount = Math.floor(count * 0.4);
    const radiatingParticleCount = count - modelParticleCount;

    let positionIndex = 0;

    // Generate model particles if we have vertices
    if (modelVertices.length > 0) {
      for (let i = 0; i < modelParticleCount; i++) {
        // Sample random vertex from model
        const vertexIndex =
          Math.floor(Math.random() * (modelVertices.length / 3)) * 3;

        let x = modelVertices[vertexIndex] || 0;
        let y = modelVertices[vertexIndex + 1] || 0;
        let z = modelVertices[vertexIndex + 2] || 0;

        // Auto-scale model to fit within 60% of radius
        const modelScale = (radius * 1.4) / 2;
        x *= modelScale;
        y *= modelScale;
        z *= modelScale;

        // Position adjustments (move model around)
        y += -2.5; // Move up (change this value to move up/down)

        x += -0.1; // Move up (change this value to move up/down)

        // Rotation adjustments (rotate model)
        const rotationY = Math.PI / 1.8; // 45 degrees (change this to rotate)
        const newX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
        const newZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
        x = newX;
        z = newZ;

        // X-axis rotation (pitch up/down)
        const rotationX = Math.PI / 11; // 30 degrees (change this value)
        const newY = y * Math.cos(rotationX) - z * Math.sin(rotationX);
        const newZ2 = y * Math.sin(rotationX) + z * Math.cos(rotationX);
        y = newY;
        z = newZ2;
        // Add slight randomization
        x += (Math.random() - 0.5) * 0.01;
        y += (Math.random() - 0.5) * 0.01;
        z += (Math.random() - 0.5) * 0.01;

        positions[positionIndex * 3] = x;
        positions[positionIndex * 3 + 1] = y;
        positions[positionIndex * 3 + 2] = z;

        originalPositions[positionIndex * 3] = x;
        originalPositions[positionIndex * 3 + 1] = y;
        originalPositions[positionIndex * 3 + 2] = z;

        // Black color for model particles
        colors[positionIndex * 3] = 0;
        colors[positionIndex * 3 + 1] = 0;
        colors[positionIndex * 3 + 2] = 0;

        positionIndex++;
      }
    } else {
      // If no model loaded, make them sphere particles
      for (let i = 0; i < modelParticleCount; i++) {
        let x, y, z, distanceFromCenter;

        do {
          x = (Math.random() - 0.5) * 2;
          y = (Math.random() - 0.5) * 2;
          z = (Math.random() - 0.5) * 2;
          distanceFromCenter = Math.sqrt(x * x + y * y + z * z);
        } while (distanceFromCenter > 1);

        const falloffFactor = Math.pow(Math.random(), 1);
        const scaledDistance = distanceFromCenter * falloffFactor;

        positions[positionIndex * 3] = x * scaledDistance * radius * 0.3;
        positions[positionIndex * 3 + 1] = y * scaledDistance * radius * 0.3;
        positions[positionIndex * 3 + 2] = z * scaledDistance * radius * 0.3;

        originalPositions[positionIndex * 3] = positions[positionIndex * 3];
        originalPositions[positionIndex * 3 + 1] =
          positions[positionIndex * 3 + 1];
        originalPositions[positionIndex * 3 + 2] =
          positions[positionIndex * 3 + 2];

        colors[positionIndex * 3] = 0;
        colors[positionIndex * 3 + 1] = 0;
        colors[positionIndex * 3 + 2] = 0;

        positionIndex++;
      }
    }

    // Generate radiating particles
    for (let i = 0; i < radiatingParticleCount; i++) {
      let x, y, z, distanceFromCenter;

      do {
        x = (Math.random() - 0.5) * 2;
        y = (Math.random() - 0.5) * 2;
        z = (Math.random() - 0.5) * 2;
        distanceFromCenter = Math.sqrt(x * x + y * y + z * z);
      } while (distanceFromCenter > 1);

      // Bias toward outer regions for radiating effect
      const radiatingFactor = Math.pow(Math.random(), 1) * 0.7 + 0.3;
      const scaledDistance = distanceFromCenter * radiatingFactor;

      positions[positionIndex * 3] = x * scaledDistance * radius;
      positions[positionIndex * 3 + 1] = y * scaledDistance * radius;
      positions[positionIndex * 3 + 2] = z * scaledDistance * radius;

      originalPositions[positionIndex * 3] = positions[positionIndex * 3];
      originalPositions[positionIndex * 3 + 1] =
        positions[positionIndex * 3 + 1];
      originalPositions[positionIndex * 3 + 2] =
        positions[positionIndex * 3 + 2];

      colors[positionIndex * 3] = 0;
      colors[positionIndex * 3 + 1] = 0;
      colors[positionIndex * 3 + 2] = 0;

      positionIndex++;
    }

    return { positions, colors, originalPositions };
  }, [count, radius, modelVertices]);

  // Animation
  useFrame(({ clock }) => {
    if (!pointsRef.current || !groupRef.current) return;

    const time = clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const modelParticleCount = Math.floor(count * 1);

    // // Heartbeat animation
    // const totalCycle = heartbeat.beatSpeed + heartbeat.pauseDuration;
    // const cycleProgress = (time % totalCycle) / totalCycle;
    // const beatPhase = Math.min(
    //   cycleProgress / (heartbeat.beatSpeed / totalCycle),
    //   1
    // );

    // let scale = heartbeat.minScale;

    // if (beatPhase < 1) {
    //   // First beat (0-35%)
    //   if (beatPhase < 0.35) {
    //     const progress = beatPhase / 0.35;
    //     const eased = 0.5 * (1 + Math.sin(progress * Math.PI - Math.PI / 2));
    //     scale =
    //       heartbeat.minScale +
    //       (heartbeat.maxScale - heartbeat.minScale) * eased;
    //   }
    //   // Short pause (35-50%)
    //   else if (beatPhase < 0.5) {
    //     scale = heartbeat.minScale;
    //   }
    //   // Second beat (50-85%)
    //   else if (beatPhase < 0.85) {
    //     const progress = (beatPhase - 0.5) / 0.35;
    //     const eased = 0.5 * (1 + Math.sin(progress * Math.PI - Math.PI / 2));
    //     scale =
    //       heartbeat.minScale +
    //       (heartbeat.maxScale - heartbeat.minScale) * eased;
    //   }
    //   // Rest (85-100%)
    //   else {
    //     scale = heartbeat.minScale;
    //   }
    // }

    // groupRef.current.scale.setScalar(scale);

    groupRef.current.scale.setScalar(1.0);

    groupRef.current.rotation.y = time * 0.2; // Adjust 0.2 to change speed

    // Particle animation
    for (let i = 0; i < count; i++) {
      const originalX = originalPositions[i * 3];
      const originalY = originalPositions[i * 3 + 1];
      const originalZ = originalPositions[i * 3 + 2];

      const distanceFromCenter = Math.sqrt(
        originalX * originalX + originalY * originalY + originalZ * originalZ
      );
      const normalizedDistance = distanceFromCenter / radius;

      const speed = 0.6 + i * 0.001;
      const uniqueOffset1 = i * 0.1;
      const uniqueOffset2 = i * 0.15;
      const uniqueOffset3 = i * 0.05;

      let intensity = 1.0;
      if (i < modelParticleCount) {
        // Model particles - subtle breathing
        intensity = 0.3;
      } else {
        // Radiating particles - more movement
        intensity = Math.min(normalizedDistance * 1.5, 1.0);
      }

      // Random movement
      const offsetX =
        Math.sin(time * speed * 0.15 + uniqueOffset1) * 0.06 * intensity;
      const offsetY =
        Math.cos(time * speed * 0.125 + uniqueOffset2) * 0.05 * intensity;
      const offsetZ =
        Math.sin(time * speed * 0.175 + uniqueOffset3) * 0.07 * intensity;

      // Secondary chaotic movement
      const secondaryX =
        Math.cos(time * speed * 2.2 + uniqueOffset1) * 0.03 * intensity;
      const secondaryY =
        Math.sin(time * speed * 1.9 + uniqueOffset2) * 0.04 * intensity;
      const secondaryZ =
        Math.cos(time * speed * 2.7 + uniqueOffset3) * 0.035 * intensity;

      positionAttribute.setXYZ(
        i,
        originalX + offsetX + secondaryX,
        originalY + offsetY + secondaryY,
        originalZ + offsetZ + secondaryZ
      );
    }

    positionAttribute.needsUpdate = true;
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

const Globe3D: React.FC<Globe3DProps> = ({
  className = "w-full h-[90%] md:w-[1000px] md:h-[1000px]",
  pointCount = 8000,
  globeRadius = 3,
  heartbeat = {
    minScale: 1.0,
    maxScale: 1.15,
    beatSpeed: 2.5,
    pauseDuration: 0.8,
  },
  modelPath = DEFAULT_MODEL_PATH,
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

        <FBXModelPointCloud
          count={pointCount}
          radius={globeRadius}
          heartbeat={heartbeat}
          modelPath={modelPath}
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

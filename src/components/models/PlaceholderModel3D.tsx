'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Group } from 'three';

function RotatingPlaceholder() {
  const modelRef = useRef<Group>(null);

  // Gentle automatic rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
      modelRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <group ref={modelRef}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 3, 1.5]} />
        <meshStandardMaterial color="#FFB6C1" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#FFA0B4" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-1.2, 0.5, 0]}>
        <boxGeometry args={[0.6, 2, 0.6]} />
        <meshStandardMaterial color="#FFB6C1" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[1.2, 0.5, 0]}>
        <boxGeometry args={[0.6, 2, 0.6]} />
        <meshStandardMaterial color="#FFB6C1" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.5, -2.5, 0]}>
        <boxGeometry args={[0.6, 2, 0.6]} />
        <meshStandardMaterial color="#FFB6C1" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0.5, -2.5, 0]}>
        <boxGeometry args={[0.6, 2, 0.6]} />
        <meshStandardMaterial color="#FFB6C1" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.3, 2.2, 0.9]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.3, 2.2, 0.9]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

export default function PlaceholderModel3D() {
  return (
    <div className="w-full aspect-square max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px]">
      <Canvas
        camera={{ position: [0, 2, 24], fov: 30 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={2.5} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={3} 
          castShadow 
        />
        <directionalLight 
          position={[-5, 5, -3]} 
          intensity={2.5} 
        />
        <pointLight position={[3, 5, 5]} intensity={3} />
        <pointLight position={[-3, 5, 5]} intensity={2.5} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={false}
          target={[0, 0, 0]}
        />
        <RotatingPlaceholder />
      </Canvas>
    </div>
  );
}

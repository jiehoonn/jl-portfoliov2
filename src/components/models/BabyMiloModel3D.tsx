'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Group } from 'three';

function RotatingBabyMilo() {
  const modelRef = useRef<Group>(null);
  const { scene } = useGLTF('/baby-milo-colored.glb');

  // Gentle automatic rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003; // Slightly faster than Labubu for variety
    }
  });

  if (!scene) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
    );
  }

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={[2, 2, 2]} // Adjust scale as needed
      position={[0, 0, 0]} // Adjust position as needed
    />
  );
}

export default function BabyMiloModel3D() {
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
        <RotatingBabyMilo />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/baby-milo-colored.glb');

'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

function RotatingModel() {
  const modelRef = useRef<Mesh>(null);
  const { scene } = useGLTF('/jiehoon-lego-figure.glb');

  // Rotate the model continuously
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Adjust speed as needed
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={[2, 2, 2]} // Adjust scale as needed
      position={[0, 0, 0]} 
    />
  );
}

export default function LegoModel3D() {
  return (
    <div className="w-full aspect-square max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={2} 
          castShadow 
        />
        <directionalLight 
          position={[-10, -10, -5]} 
          intensity={0.8} 
        />
        <RotatingModel />
      </Canvas>
    </div>
  );
}

// Preload the GLB file
useGLTF.preload('/jiehoon-lego-figure.glb');

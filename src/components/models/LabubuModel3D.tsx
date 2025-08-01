'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Group } from 'three';

function RotatingLabubu() {
  const modelRef = useRef<Group>(null);
  const { scene } = useGLTF('/labubu.glb');

  // Gentle automatic rotation that works with OrbitControls
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002; // Very slow rotation for subtle movement
    }
  });

  if (!scene) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gray" />
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

export default function LabubuModel3D() {
  return (
    <div className="w-full aspect-square max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px]">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 30 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={2} 
          castShadow 
        />
        <directionalLight 
          position={[-5, 5, -3]} 
          intensity={1.5} 
        />
        <pointLight position={[3, 5, 5]} intensity={2} />
        <pointLight position={[-3, 5, 5]} intensity={1.5} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={false}
          target={[0, 0, 0]}
        />
        <RotatingLabubu />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/labubu.glb');

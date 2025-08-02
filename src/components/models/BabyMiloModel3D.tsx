'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Group } from 'three';

function RotatingBabyMilo({ isMobile }: { isMobile?: boolean }) {
  const modelRef = useRef<Group>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  try {
    const { scene } = useGLTF('/baby-milo-compressed.glb');

    useEffect(() => {
      if (scene) {
        console.log('Baby Milo model loaded successfully', scene);
        setIsLoading(false);
      }
    }, [scene]);

    // Gentle automatic rotation
    useFrame(() => {
      if (modelRef.current && !isLoading) {
        const rotationSpeed = isMobile ? 0.002 : 0.003;
        modelRef.current.rotation.y += rotationSpeed;
      }
    });

    if (isLoading) {
      console.log('Baby Milo scene loading...');
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#F0E68C" opacity={0.7} transparent />
        </mesh>
      );
    }

    if (!scene) {
      console.log('Baby Milo scene failed to load');
      setHasError(true);
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      );
    }

    return (
      <primitive 
        ref={modelRef} 
        object={scene} 
        scale={[2, 2, 2]}
        position={[0, 0, 0]}
      />
    );
  } catch (error) {
    console.error('Error loading Baby Milo model:', error);
    setHasError(true);
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }
}export default function BabyMiloModel3D({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div className="w-full aspect-square max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px]">
      <Canvas
        camera={{ position: [0, 2, 24], fov: 30 }}
        style={{ width: '100%', height: '100%' }}
        performance={{ min: isMobile ? 0.2 : 0.5 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={isMobile ? 2.0 : 2.5} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={isMobile ? 2 : 3} 
          castShadow={!isMobile}
        />
        <directionalLight 
          position={[-5, 5, -3]} 
          intensity={isMobile ? 1.5 : 2.5} 
        />
        {!isMobile && (
          <>
            <pointLight position={[3, 5, 5]} intensity={3} />
            <pointLight position={[-3, 5, 5]} intensity={2.5} />
          </>
        )}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={false}
          target={[0, 0, 0]}
          enableDamping={!isMobile}
        />
        <RotatingBabyMilo isMobile={isMobile} />
      </Canvas>
    </div>
  );
}

// Preload the compressed model
useGLTF.preload('/baby-milo-compressed.glb');

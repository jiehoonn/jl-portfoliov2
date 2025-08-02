'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Group } from 'three';

function RotatingLabubu({ isMobile }: { isMobile?: boolean }) {
  const modelRef = useRef<Group>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  
  try {
    const { scene } = useGLTF('/labubu-ultra-compressed.glb', true); // Enable loading progress

    useEffect(() => {
      if (scene) {
        console.log('Labubu model loaded successfully (36MB compressed)', scene);
        setIsLoading(false);
      }
    }, [scene]);

    // Gentle automatic rotation that works with OrbitControls
    useFrame(() => {
      if (modelRef.current && !isLoading) {
        modelRef.current.rotation.y += 0.001; // Slower for large model
      }
    });

    if (isLoading) {
      console.log('Labubu scene loading... (36MB compressed file)');
      return (
        <group>
          <mesh>
            <boxGeometry args={[1, 2, 1]} />
            <meshStandardMaterial color="#E6E6FA" opacity={0.5 + loadProgress * 0.5} transparent />
          </mesh>
          {/* Loading indicator */}
          <mesh position={[0, 3, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
          </mesh>
        </group>
      );
    }

    if (!scene) {
      console.warn('Labubu scene failed to load - even compressed version failed');
      setHasError(true);
      return (
        <mesh>
          <boxGeometry args={[1, 2, 1]} />
          <meshStandardMaterial color="#FF6B6B" />
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
    console.error('Error loading Labubu model (36MB compressed):', error);
    setHasError(true);
    return (
      <mesh>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
    );
  }
}

export default function LabubuModel3D({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div className="w-full aspect-square max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px]">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 30 }}
        style={{ width: '100%', height: '100%' }}
        performance={{ min: isMobile ? 0.2 : 0.5 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={isMobile ? 1.2 : 1.5} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={isMobile ? 1.5 : 2} 
          castShadow={!isMobile}
        />
        <directionalLight 
          position={[-5, 5, -3]} 
          intensity={isMobile ? 1.2 : 1.5} 
        />
        {!isMobile && (
          <>
            <pointLight position={[3, 5, 5]} intensity={2} />
            <pointLight position={[-3, 5, 5]} intensity={1.5} />
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
        <RotatingLabubu isMobile={isMobile} />
      </Canvas>
    </div>
  );
}

// Preload the compressed model
useGLTF.preload('/labubu-ultra-compressed.glb');

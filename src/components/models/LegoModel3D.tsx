'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Group, Object3D, Box3, Vector3, Mesh, MeshPhongMaterial } from 'three';

interface LegoModel3DProps {
  isMobile?: boolean;
  isLowMemory?: boolean;
}

function RotatingModel({ isMobile, isLowMemory }: { isMobile?: boolean; isLowMemory?: boolean }) {
  const modelRef = useRef<Group>(null);
  const [model, setModel] = useState<Object3D | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const objLoader = new OBJLoader();
    objLoader.setPath('/lego-model/');

    objLoader.load(
      'model.obj',
      (object) => {
        object.traverse((child) => {
          if (child.type === 'Mesh') {
            const mesh = child as Mesh;
            mesh.castShadow = !isMobile;
            mesh.receiveShadow = !isMobile;

            let material: MeshPhongMaterial;

            const currentMaterial = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
            const materialName = currentMaterial?.name || '';

            const shininess = isMobile ? 30 : 100;
            
            switch (materialName) {
              case 'MB_140_official_3288':
              case 'MB_140_official_3290':
              case 'MB_140_official_3292':
              case 'MB_140_official_14224':
              case 'MB_140':
                // Dark blue color from MTL (Kd 0.003 0.017 0.052)
                material = new MeshPhongMaterial({ 
                  color: 0x041836,
                  shininess: shininess
                });
                break;
              case 'MB_283':
                // Skin/beige color from MTL (Kd 0.956 0.638 0.440)
                material = new MeshPhongMaterial({ 
                  color: 0xf4a370,
                  shininess: shininess
                });
                break;
              case 'MB_106':
                // Orange/red color from MTL (Kd 0.913 0.205 0.017)
                material = new MeshPhongMaterial({ 
                  color: 0xe93404,
                  shininess: shininess
                });
                break;
              case 'MB_283_official_298':
                material = new MeshPhongMaterial({
                  color: 0xf4a370,
                  shininess: shininess
                });
                break;
              default:
                material = new MeshPhongMaterial({
                  color: 0x888888,
                  shininess: shininess
                });
            }
            
            mesh.material = material;
          }
        });
        
        const box = new Box3().setFromObject(object);
        const center = box.getCenter(new Vector3());
        object.position.sub(center);
        
        setModel(object);
        setLoading(false);
      },
      undefined,
      () => {
        setError('Failed to load OBJ file');
        setLoading(false);
      }
    );
  }, [isMobile, isLowMemory]);

  useFrame(() => {
    if (modelRef.current) {
      const rotationSpeed = isMobile ? 0.001 : 0.002;
      modelRef.current.rotation.y += rotationSpeed;
    }
  });

  if (loading) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    );
  }

  if (error) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  if (!model) {
    return null;
  }

  return (
    <primitive 
      ref={modelRef} 
      object={model} 
      scale={[0.2, 0.2, 0.2]}
      position={[0, -5, 0]} 
    />
  );
}

export default function LegoModel3D({ isMobile = false, isLowMemory = false }: LegoModel3DProps) {
  return (
    <div className={`w-full aspect-square max-w-[400px] sm:max-w-[450px] md:max-w-[500px] ${isMobile ? 'lg:max-w-[350px]' : 'lg:max-w-[550px]'}`}>
      <Canvas
        camera={{ position: [0, 5, 30], fov: 20 }}
        style={{ width: '100%', height: '100%' }}
        performance={{ min: isMobile ? 0.2 : 0.5 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={isMobile ? 1.5 : 2.0} />
        <directionalLight 
          position={[10, 15, 8]} 
          intensity={isMobile ? 2 : 3} 
          castShadow={!isMobile}
        />
        <directionalLight 
          position={[-10, 10, -5]} 
          intensity={isMobile ? 1.5 : 2.5} 
        />
        <directionalLight 
          position={[0, 15, 0]} 
          intensity={isMobile ? 1.5 : 2} 
        />
        {!isMobile && (
          <>
            <pointLight position={[5, 8, 8]} intensity={2.5} />
            <pointLight position={[-5, 8, 8]} intensity={2} />
            <pointLight position={[0, 5, 12]} intensity={3} />
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
        <RotatingModel isMobile={isMobile} isLowMemory={isLowMemory} />
      </Canvas>
    </div>
  );
}

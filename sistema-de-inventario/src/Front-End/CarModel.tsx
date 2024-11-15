// src/CarModel.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const CarModel: React.FC = () => {
  const { scene } = useGLTF('/path/to/3d-car-model.gltf');

  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} />
      <primitive object={scene} scale={0.5} />
    </Canvas>
  );
};

export default CarModel;

import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

type GLTFResult = {
  scene: THREE.Object3D;
};

function Model() {
  const { scene } = useGLTF("/3DModels/free_porsche_911_carrera_4s.glb") as GLTFResult;

  return (
    <primitive
      object={scene}
      scale={[2, 2, 2]}
      position={[8, -1, 1]}
      rotation={[0, -Math.PI / 3, 0]}
    />
  );
}

export default function CarModel() {
  return (
    <div>
    <Canvas
      style={{ width: "100vw", height: "100vh", background: "#f0f0f0" }}
      camera={{ position: [0, 3, 10], fov: 70 }}
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      >
      {/* Luzes */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      
      {/* Ambiente Refletivo */}
      <Environment preset="city" />
      
      {/* Modelo */}
      <Model />
    </Canvas>
    </div>
  );
}

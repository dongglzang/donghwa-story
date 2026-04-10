import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function LowPolyDino() {
  const dino = useRef();
  const leftLeg = useRef();
  const rightLeg = useRef();
  const tail = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (dino.current) {
      dino.current.position.y = Math.sin(t * 4) * 0.03;
      dino.current.rotation.z = Math.sin(t * 2) * 0.03;
    }
    if (leftLeg.current) {
      leftLeg.current.rotation.x = Math.sin(t * 8) * 0.35;
    }
    if (rightLeg.current) {
      rightLeg.current.rotation.x = Math.sin(t * 8 + Math.PI) * 0.35;
    }
    if (tail.current) {
      tail.current.rotation.y = -0.5 + Math.sin(t * 3) * 0.18;
    }
  });

  return (
    <group ref={dino} position={[0, -0.2, 0]} rotation={[0.06, -0.25, 0]}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.2, 0.9, 0.9]} />
        <meshStandardMaterial color="#66a83f" flatShading />
      </mesh>

      <mesh position={[1.35, 0.72, 0]}>
        <boxGeometry args={[0.95, 0.55, 0.55]} />
        <meshStandardMaterial color="#73ba49" flatShading />
      </mesh>

      <mesh position={[0.6, 0.75, 0]}>
        <coneGeometry args={[0.22, 0.9, 5]} />
        <meshStandardMaterial color="#73ba49" flatShading />
      </mesh>

      <group ref={tail} position={[-1.45, 0.62, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.3, 1.4, 5]} />
          <meshStandardMaterial color="#5f993a" flatShading />
        </mesh>
      </group>

      <mesh position={[1.58, 0.85, 0.19]}>
        <sphereGeometry args={[0.045, 5, 5]} />
        <meshStandardMaterial color="#101010" flatShading />
      </mesh>
      <mesh position={[1.58, 0.85, -0.19]}>
        <sphereGeometry args={[0.045, 5, 5]} />
        <meshStandardMaterial color="#101010" flatShading />
      </mesh>

      <group ref={leftLeg} position={[-0.35, 0.04, 0.26]}>
        <mesh position={[0, -0.24, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.32]} />
          <meshStandardMaterial color="#5b8f38" flatShading />
        </mesh>
      </group>
      <group ref={rightLeg} position={[-0.35, 0.04, -0.26]}>
        <mesh position={[0, -0.24, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.32]} />
          <meshStandardMaterial color="#5b8f38" flatShading />
        </mesh>
      </group>

      <mesh position={[0.95, 0.24, 0.22]}>
        <boxGeometry args={[0.2, 0.25, 0.2]} />
        <meshStandardMaterial color="#5b8f38" flatShading />
      </mesh>
      <mesh position={[0.95, 0.24, -0.22]}>
        <boxGeometry args={[0.2, 0.25, 0.2]} />
        <meshStandardMaterial color="#5b8f38" flatShading />
      </mesh>
    </group>
  );
}

export default function DinoModelCanvas() {
  return (
    <div style={{ width: '100%', height: '230px' }}>
      <Canvas camera={{ position: [0, 1.4, 4.1], fov: 34 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 5, 4]} intensity={1.1} />
        <directionalLight position={[-2, 3, -2]} intensity={0.35} color="#e4ffcc" />
        <LowPolyDino />
      </Canvas>
    </div>
  );
}

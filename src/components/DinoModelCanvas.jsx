import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function DinoMaterial({ color, emissive = '#000000' }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={0.16}
      roughness={0.92}
      metalness={0.04}
      flatShading
    />
  );
}

function LowPolyDino() {
  const dino = useRef();
  const chest = useRef();
  const head = useRef();
  const jaw = useRef();
  const leftLeg = useRef();
  const rightLeg = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  const tailBase = useRef();
  const tailTip = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const stride = Math.sin(t * 5.5);
    const sway = Math.sin(t * 2.2);
    const breath = Math.sin(t * 3.1);

    if (dino.current) {
      dino.current.position.y = Math.sin(t * 4.5) * 0.04;
      dino.current.rotation.z = sway * 0.028;
      dino.current.rotation.x = -0.04 + breath * 0.012;
    }
    if (chest.current) {
      chest.current.scale.y = 1 + breath * 0.025;
    }
    if (head.current) {
      head.current.rotation.z = sway * 0.035;
      head.current.rotation.x = 0.08 + Math.sin(t * 2.7 + 0.4) * 0.05;
    }
    if (jaw.current) {
      jaw.current.rotation.z = 0.04 + Math.max(0, Math.sin(t * 2.7 + 1.2)) * 0.12;
    }
    if (leftLeg.current) {
      leftLeg.current.rotation.z = stride * 0.4;
    }
    if (rightLeg.current) {
      rightLeg.current.rotation.z = -stride * 0.4;
    }
    if (leftArm.current) {
      leftArm.current.rotation.z = -0.5 + Math.sin(t * 5.5 + 0.8) * 0.12;
    }
    if (rightArm.current) {
      rightArm.current.rotation.z = -0.5 + Math.sin(t * 5.5 + Math.PI + 0.8) * 0.12;
    }
    if (tailBase.current) {
      tailBase.current.rotation.y = -0.2 + Math.sin(t * 3.2) * 0.18;
      tailBase.current.rotation.z = 0.16 + Math.sin(t * 3.2) * 0.05;
    }
    if (tailTip.current) {
      tailTip.current.rotation.y = -0.24 + Math.sin(t * 3.2 + 0.5) * 0.22;
    }
  });

  return (
    <group ref={dino} position={[0, -0.34, 0]} rotation={[0.06, -0.32, 0]}>
      <group ref={chest} position={[0, 0.74, 0]}>
        <mesh scale={[1.18, 0.78, 0.88]}>
          <dodecahedronGeometry args={[0.95, 0]} />
          <DinoMaterial color="#6f8e42" emissive="#243512" />
        </mesh>
        <mesh position={[-0.8, -0.04, 0]} scale={[0.62, 0.58, 0.74]} rotation={[0.12, 0, -0.14]}>
          <dodecahedronGeometry args={[0.88, 0]} />
          <DinoMaterial color="#5f7e37" emissive="#1f2d10" />
        </mesh>
      </group>

      <mesh position={[0.78, 1.02, 0]} rotation={[0.06, 0, 0.3]} scale={[0.34, 0.9, 0.42]}>
        <cylinderGeometry args={[0.46, 0.32, 1.1, 6]} />
        <DinoMaterial color="#7ea14a" emissive="#263714" />
      </mesh>

      <group ref={head} position={[1.64, 1.34, 0]}>
        <mesh scale={[1.15, 0.66, 0.62]} rotation={[0.02, 0, 0.18]}>
          <dodecahedronGeometry args={[0.58, 0]} />
          <DinoMaterial color="#88ad52" emissive="#2c3f18" />
        </mesh>
        <mesh position={[0.28, 0.1, 0]} rotation={[0, 0, 0.16]} scale={[0.72, 0.34, 0.3]}>
          <dodecahedronGeometry args={[0.42, 0]} />
          <DinoMaterial color="#94b85b" emissive="#32481c" />
        </mesh>
        <mesh position={[0.02, 0.24, 0.22]} rotation={[0.12, 0.08, 0.22]} scale={[0.25, 0.13, 0.18]}>
          <coneGeometry args={[0.2, 0.42, 4]} />
          <DinoMaterial color="#6f8e42" emissive="#263714" />
        </mesh>
        <mesh position={[0.02, 0.24, -0.22]} rotation={[-0.12, 0.08, 0.22]} scale={[0.25, 0.13, 0.18]}>
          <coneGeometry args={[0.2, 0.42, 4]} />
          <DinoMaterial color="#6f8e42" emissive="#263714" />
        </mesh>

        <group ref={jaw} position={[0.34, -0.1, 0]}>
          <mesh rotation={[0, 0, 0.12]} scale={[0.92, 0.26, 0.3]}>
            <dodecahedronGeometry args={[0.38, 0]} />
            <DinoMaterial color="#6c8b3f" emissive="#223212" />
          </mesh>
        </group>

        <mesh position={[0.06, 0.1, 0.22]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial color="#111111" emissive="#111111" emissiveIntensity={0.35} flatShading />
        </mesh>
        <mesh position={[0.06, 0.1, -0.22]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial color="#111111" emissive="#111111" emissiveIntensity={0.35} flatShading />
        </mesh>
        <mesh position={[0.1, 0.11, 0.255]}>
          <sphereGeometry args={[0.018, 4, 4]} />
          <meshStandardMaterial color="#f8f3cf" emissive="#f8f3cf" emissiveIntensity={0.8} flatShading />
        </mesh>
        <mesh position={[0.1, 0.11, -0.255]}>
          <sphereGeometry args={[0.018, 4, 4]} />
          <meshStandardMaterial color="#f8f3cf" emissive="#f8f3cf" emissiveIntensity={0.8} flatShading />
        </mesh>

        <mesh position={[0.47, -0.02, 0.12]} rotation={[0, 0, 0.55]} scale={[0.08, 0.18, 0.08]}>
          <coneGeometry args={[0.08, 0.22, 3]} />
          <meshStandardMaterial color="#f7edd1" flatShading />
        </mesh>
        <mesh position={[0.47, -0.02, -0.12]} rotation={[0, 0, 0.55]} scale={[0.08, 0.18, 0.08]}>
          <coneGeometry args={[0.08, 0.22, 3]} />
          <meshStandardMaterial color="#f7edd1" flatShading />
        </mesh>
      </group>

      <mesh position={[-0.06, 1.26, 0.3]} rotation={[0.2, 0.1, 0.68]} scale={[0.16, 0.36, 0.16]}>
        <coneGeometry args={[0.12, 0.35, 4]} />
        <DinoMaterial color="#9fca62" emissive="#31461c" />
      </mesh>
      <mesh position={[0.3, 1.42, 0.26]} rotation={[0.18, 0.1, 0.82]} scale={[0.16, 0.4, 0.16]}>
        <coneGeometry args={[0.12, 0.35, 4]} />
        <DinoMaterial color="#9fca62" emissive="#31461c" />
      </mesh>
      <mesh position={[0.68, 1.48, 0.22]} rotation={[0.16, 0.08, 0.92]} scale={[0.15, 0.34, 0.15]}>
        <coneGeometry args={[0.1, 0.3, 4]} />
        <DinoMaterial color="#9fca62" emissive="#31461c" />
      </mesh>

      <mesh position={[-0.04, 1.26, -0.3]} rotation={[-0.2, 0.1, 0.68]} scale={[0.16, 0.36, 0.16]}>
        <coneGeometry args={[0.12, 0.35, 4]} />
        <DinoMaterial color="#9fca62" emissive="#31461c" />
      </mesh>
      <mesh position={[0.3, 1.42, -0.26]} rotation={[-0.18, 0.1, 0.82]} scale={[0.16, 0.4, 0.16]}>
        <coneGeometry args={[0.12, 0.35, 4]} />
        <DinoMaterial color="#9fca62" emissive="#31461c" />
      </mesh>
      <mesh position={[0.68, 1.48, -0.22]} rotation={[-0.16, 0.08, 0.92]} scale={[0.15, 0.34, 0.15]}>
        <coneGeometry args={[0.1, 0.3, 4]} />
        <DinoMaterial color="#9fca62" emissive="#31461c" />
      </mesh>

      <group ref={tailBase} position={[-1.45, 0.88, 0]}>
        <mesh rotation={[0, 0, -0.1]} scale={[1.25, 0.5, 0.54]}>
          <coneGeometry args={[0.48, 1.35, 6]} />
          <DinoMaterial color="#5e7d36" emissive="#1c2a0f" />
        </mesh>
        <group ref={tailTip} position={[-0.84, -0.02, 0]}>
          <mesh rotation={[0, 0, -0.14]} scale={[1.1, 0.28, 0.32]}>
            <coneGeometry args={[0.3, 1.42, 5]} />
            <DinoMaterial color="#4e6a2d" emissive="#18210c" />
          </mesh>
        </group>
      </group>

      <group ref={leftArm} position={[0.98, 0.88, 0.48]} rotation={[0.1, 0, -0.46]}>
        <mesh position={[0, -0.18, 0]} rotation={[0, 0, 0.12]} scale={[0.22, 0.42, 0.18]}>
          <boxGeometry args={[0.5, 0.86, 0.44]} />
          <DinoMaterial color="#66873c" emissive="#213011" />
        </mesh>
        <mesh position={[0.05, -0.44, 0.06]} rotation={[0.1, 0.2, 0.5]} scale={[0.06, 0.16, 0.06]}>
          <coneGeometry args={[0.08, 0.2, 3]} />
          <meshStandardMaterial color="#f7edd1" flatShading />
        </mesh>
        <mesh position={[0.05, -0.44, -0.06]} rotation={[-0.1, 0.2, 0.5]} scale={[0.06, 0.16, 0.06]}>
          <coneGeometry args={[0.08, 0.2, 3]} />
          <meshStandardMaterial color="#f7edd1" flatShading />
        </mesh>
      </group>

      <group ref={rightArm} position={[0.98, 0.88, -0.48]} rotation={[-0.1, 0, -0.46]}>
        <mesh position={[0, -0.18, 0]} rotation={[0, 0, 0.12]} scale={[0.22, 0.42, 0.18]}>
          <boxGeometry args={[0.5, 0.86, 0.44]} />
          <DinoMaterial color="#66873c" emissive="#213011" />
        </mesh>
        <mesh position={[0.05, -0.44, 0.06]} rotation={[0.1, 0.2, 0.5]} scale={[0.06, 0.16, 0.06]}>
          <coneGeometry args={[0.08, 0.2, 3]} />
          <meshStandardMaterial color="#f7edd1" flatShading />
        </mesh>
        <mesh position={[0.05, -0.44, -0.06]} rotation={[-0.1, 0.2, 0.5]} scale={[0.06, 0.16, 0.06]}>
          <coneGeometry args={[0.08, 0.2, 3]} />
          <meshStandardMaterial color="#f7edd1" flatShading />
        </mesh>
      </group>

      <group ref={leftLeg} position={[-0.18, 0.04, 0.36]}>
        <mesh position={[0, 0.08, 0]} rotation={[0, 0, 0.08]} scale={[0.3, 0.72, 0.32]}>
          <boxGeometry args={[0.76, 1.18, 0.76]} />
          <DinoMaterial color="#5d7b35" emissive="#1e2d10" />
        </mesh>
        <mesh position={[0.06, -0.54, 0]} rotation={[0, 0, -0.08]} scale={[0.22, 0.6, 0.24]}>
          <boxGeometry args={[0.66, 1.12, 0.68]} />
          <DinoMaterial color="#516b2f" emissive="#19240d" />
        </mesh>
        <mesh position={[0.26, -1.04, 0]} scale={[0.56, 0.12, 0.34]}>
          <boxGeometry args={[0.92, 0.36, 0.76]} />
          <DinoMaterial color="#708f43" emissive="#243512" />
        </mesh>
        <mesh position={[0.48, -1.08, 0.18]} rotation={[0.1, 0, 1.08]} scale={[0.08, 0.24, 0.08]}>
          <coneGeometry args={[0.08, 0.24, 3]} />
          <meshStandardMaterial color="#f7edd1" flatShading />
        </mesh>
        <mesh position={[0.52, -1.1, 0]} rotation={[0, 0, 1.2]} scale={[0.08, 0.26, 0.08]}>
          <coneGeometry args={[0.08, 0.24, 3]} />
          <meshStandardMaterial color="#f7edd1" flatShading />
        </mesh>
        <mesh position={[0.48, -1.08, -0.18]} rotation={[-0.1, 0, 1.08]} scale={[0.08, 0.24, 0.08]}>
          <coneGeometry args={[0.08, 0.24, 3]} />
          <meshStandardMaterial color="#f7edd1" flatShading />
        </mesh>
      </group>

      <group ref={rightLeg} position={[-0.18, 0.04, -0.36]}>
        <mesh position={[0, 0.08, 0]} rotation={[0, 0, 0.08]} scale={[0.3, 0.72, 0.32]}>
          <boxGeometry args={[0.76, 1.18, 0.76]} />
          <DinoMaterial color="#5d7b35" emissive="#1e2d10" />
        </mesh>
        <mesh position={[0.06, -0.54, 0]} rotation={[0, 0, -0.08]} scale={[0.22, 0.6, 0.24]}>
          <boxGeometry args={[0.66, 1.12, 0.68]} />
          <DinoMaterial color="#516b2f" emissive="#19240d" />
        </mesh>
        <mesh position={[0.26, -1.04, 0]} scale={[0.56, 0.12, 0.34]}>
          <boxGeometry args={[0.92, 0.36, 0.76]} />
          <DinoMaterial color="#708f43" emissive="#243512" />
        </mesh>
        <mesh position={[0.48, -1.08, 0.18]} rotation={[0.1, 0, 1.08]} scale={[0.08, 0.24, 0.08]}>
          <coneGeometry args={[0.08, 0.24, 3]} />
          <meshStandardMaterial color="#f7edd1" flatShading />
        </mesh>
        <mesh position={[0.52, -1.1, 0]} rotation={[0, 0, 1.2]} scale={[0.08, 0.26, 0.08]}>
          <coneGeometry args={[0.08, 0.24, 3]} />
          <meshStandardMaterial color="#f7edd1" flatShading />
        </mesh>
        <mesh position={[0.48, -1.08, -0.18]} rotation={[-0.1, 0, 1.08]} scale={[0.08, 0.24, 0.08]}>
          <coneGeometry args={[0.08, 0.24, 3]} />
          <meshStandardMaterial color="#f7edd1" flatShading />
        </mesh>
      </group>

      <mesh position={[0.38, 0.86, 0.63]} rotation={[0.2, 0, 0.12]} scale={[0.22, 0.1, 0.84]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#47622a" transparent opacity={0.22} flatShading />
      </mesh>
      <mesh position={[0.38, 0.86, -0.63]} rotation={[-0.2, 0, 0.12]} scale={[0.22, 0.1, 0.84]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#47622a" transparent opacity={0.22} flatShading />
      </mesh>
    </group>
  );
}

export default function DinoModelCanvas() {
  return (
    <div style={{ width: '100%', height: '270px' }}>
      <Canvas camera={{ position: [0.35, 1.9, 5.4], fov: 28 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 6, 5]} intensity={1.35} color="#fff7da" />
        <directionalLight position={[-4, 3, -3]} intensity={0.45} color="#b7f0a1" />
        <pointLight position={[1.8, 2.2, 2.6]} intensity={0.5} color="#ffd46a" />
        <LowPolyDino />
      </Canvas>
    </div>
  );
}

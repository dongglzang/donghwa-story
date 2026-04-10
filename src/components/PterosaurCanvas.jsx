import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Clone } from '@react-three/drei';
import * as THREE from 'three';
import { birdStories } from '../data/stories';

const FLAMINGO_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Flamingo.glb';
const PARROT_URL   = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Parrot.glb';

function FlyingBird({ url, position, offset, speed, storyKey, onBirdClick }) {
  const group    = useRef();
  const hitBox   = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const actionName = Object.keys(actions)[0];
    if (actions[actionName]) {
      const action = actions[actionName];
      action.play();
      action.setEffectiveTimeScale(0.4);
    }
  }, [actions]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const x = Math.sin(t * speed + offset) * 10;
    const z = Math.cos(t * speed + offset) * 10;
    const y = (position[1] * 0.5) + Math.sin(t * speed * 2) * 0.8;

    group.current.position.set(x, y, z);
    group.current.rotation.y = Math.atan2(
      Math.sin((t + 0.1) * speed + offset) * 10 - x,
      Math.cos((t + 0.1) * speed + offset) * 10 - z
    );

    // 히트박스도 함께 이동
    if (hitBox.current) {
      hitBox.current.position.set(x, y, z);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (onBirdClick && storyKey) {
      onBirdClick(birdStories[storyKey]);
    }
  };

  return (
    <>
      {/* 실제 모델 */}
      <group ref={group} position={position}>
        <Clone object={scene} scale={[0.0075, 0.0075, 0.0075]} />
      </group>

      {/* 클릭용 투명 히트박스 (클릭 감지 전용) */}
      <mesh
        ref={hitBox}
        position={position}
        onClick={handleClick}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() =>  { document.body.style.cursor = 'none'; }}
      >
        <sphereGeometry args={[0.6, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
}

function Pterosaurs({ onBirdClick }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      {/* 익룡 2마리 → pterosaur 동화 */}
      <FlyingBird url={FLAMINGO_URL} position={[0, 3, 0]}   offset={0}          speed={0.1}   storyKey="pterosaur" onBirdClick={onBirdClick} />
      <FlyingBird url={FLAMINGO_URL} position={[0, 3.5, 0]} offset={Math.PI/2}  speed={0.125} storyKey="pterosaur" onBirdClick={onBirdClick} />
      {/* 앵무새 1마리 → parrot 동화 */}
      <FlyingBird url={PARROT_URL}   position={[0, 2, 0]}   offset={Math.PI}    speed={0.15}  storyKey="parrot"    onBirdClick={onBirdClick} />
    </>
  );
}

export default function PterosaurCanvas({ onBirdClick }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none',   // div 자체는 통과
      zIndex: 4
    }}>
      {/* Canvas는 클릭 이벤트 허용 */}
      <Canvas
        camera={{ position: [0, 2, 12], fov: 60 }}
        style={{ pointerEvents: 'auto' }}
        gl={{ alpha: true }}
      >
        <Pterosaurs onBirdClick={onBirdClick} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(FLAMINGO_URL);
useGLTF.preload(PARROT_URL);

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { SECTION_GAP } from "../store";
import { useIsNarrow, useSectionY } from "./useSectionY";

const CUBES = 40;

export function proximity(cameraY: number, y: number, range = SECTION_GAP * 0.9) {
  return 1 - THREE.MathUtils.clamp(Math.abs(cameraY - y) / range, 0, 1);
}

export function AboutObject() {
  const y = useSectionY("about", 0.32);
  const narrow = useIsNarrow();
  const group = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  const knotWire = useRef<THREE.Mesh>(null);
  const cubes = useRef<THREE.InstancedMesh>(null);
  const grid = useRef<THREE.Mesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cubeData = useMemo(
    () =>
      Array.from({ length: CUBES }, (_, i) => ({
        radius: 2.6 + (i % 5) * 0.35,
        angle: (i / CUBES) * Math.PI * 2,
        tilt: (Math.random() - 0.5) * 1.2,
        speed: 0.2 + Math.random() * 0.3,
        size: 0.06 + Math.random() * 0.1,
      })),
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const camY = state.camera.position.y;
    const prox = proximity(camY, y);
    const eased = THREE.MathUtils.smoothstep(prox, 0, 1);

    group.current.position.x = narrow ? 0 : 3.6;
    group.current.position.y = y + (narrow ? 1.2 : 0) + (1 - eased) * -1.5;
    group.current.rotation.y = t * 0.15 + (1 - eased) * 2;
    group.current.scale.setScalar(THREE.MathUtils.lerp(0.4, narrow ? 0.7 : 1, eased));

    if (knot.current) {
      knot.current.rotation.x = t * 0.35;
      knot.current.rotation.y = t * 0.25;
      const m = knot.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.4 + eased * 0.8;
    }
    if (knotWire.current) {
      knotWire.current.rotation.x = t * 0.35;
      knotWire.current.rotation.y = t * 0.25;
      knotWire.current.scale.setScalar(1.08 + (1 - eased) * 0.6);
    }
    if (cubes.current) {
      for (let i = 0; i < CUBES; i++) {
        const c = cubeData[i];
        const a = c.angle + t * c.speed;
        const r = c.radius + (1 - eased) * 3;
        dummy.position.set(Math.cos(a) * r, Math.sin(a * 2 + c.tilt) * 0.8 * Math.sin(c.tilt), Math.sin(a) * r);
        dummy.rotation.set(t + i, t * 0.5, 0);
        dummy.scale.setScalar(c.size);
        dummy.updateMatrix();
        cubes.current.setMatrixAt(i, dummy.matrix);
      }
      cubes.current.instanceMatrix.needsUpdate = true;
    }
    if (grid.current) {
      grid.current.rotation.z = t * 0.05;
      (grid.current.material as THREE.MeshBasicMaterial).opacity = 0.18 * eased;
    }
    void delta;
  });

  return (
    <group ref={group} position={[3.6, y, 0]}>
      <mesh ref={knot}>
        <torusKnotGeometry args={[1.1, 0.32, 200, 32, 2, 3]} />
        <meshStandardMaterial color="#1a0f3d" emissive="#8a5cff" emissiveIntensity={0.6} roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh ref={knotWire}>
        <torusKnotGeometry args={[1.1, 0.32, 80, 12, 2, 3]} />
        <meshBasicMaterial color="#c9b6ff" wireframe transparent opacity={0.18} />
      </mesh>
      <instancedMesh ref={cubes} args={[undefined, undefined, CUBES]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" emissive="#8a5cff" emissiveIntensity={1.4} toneMapped={false} />
      </instancedMesh>
      <mesh ref={grid} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
        <ringGeometry args={[1.6, 4.2, 64, 6]} />
        <meshBasicMaterial color="#8a5cff" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

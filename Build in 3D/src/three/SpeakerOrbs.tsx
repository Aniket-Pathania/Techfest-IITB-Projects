import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { motionState } from "../store";
import { useSectionY } from "./useSectionY";
import { proximity } from "./AboutObject";

const ORBS = 14;

export function SpeakerOrbs() {
  const y = useSectionY("speakers", 0.6);
  const group = useRef<THREE.Group>(null);
  const orbs = useRef<THREE.InstancedMesh>(null);
  const beam = useRef<THREE.Mesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(
    () =>
      Array.from({ length: ORBS }, (_, i) => ({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 9,
        z: -3 - Math.random() * 6,
        s: 0.25 + Math.random() * 0.6,
        speed: 0.3 + Math.random() * 0.5,
        phase: i * 1.7,
      })),
    []
  );

  useFrame((state) => {
    if (!group.current || !orbs.current) return;
    const t = state.clock.elapsedTime;
    const prox = proximity(state.camera.position.y, y);
    const eased = THREE.MathUtils.smoothstep(prox, 0, 1);
    group.current.position.y = y;
    group.current.position.x = motionState.smoothMouse.x * -0.6;

    for (let i = 0; i < ORBS; i++) {
      const d = data[i];
      dummy.position.set(
        d.x + Math.sin(t * d.speed + d.phase) * 0.6,
        d.y + Math.cos(t * d.speed * 0.8 + d.phase) * 0.5 + (1 - eased) * 4,
        d.z
      );
      dummy.rotation.set(t * 0.3 + d.phase, t * 0.2, 0);
      dummy.scale.setScalar(d.s * eased);
      dummy.updateMatrix();
      orbs.current.setMatrixAt(i, dummy.matrix);
    }
    orbs.current.instanceMatrix.needsUpdate = true;

    if (beam.current) {
      beam.current.rotation.z = t * 0.08;
      (beam.current.material as THREE.MeshBasicMaterial).opacity = eased * 0.12;
    }
  });

  return (
    <group ref={group} position={[0, y, 0]}>
      <instancedMesh ref={orbs} args={[undefined, undefined, ORBS]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#38f5ff" wireframe transparent opacity={0.45} />
      </instancedMesh>
      <mesh ref={beam} position={[0, 0, -8]}>
        <ringGeometry args={[5, 9, 80, 1]} />
        <meshBasicMaterial color="#38f5ff" transparent opacity={0.1} wireframe />
      </mesh>
    </group>
  );
}

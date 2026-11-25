import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { motionState, SECTION_GAP } from "../store";
import { useIsNarrow, useSectionY } from "./useSectionY";
import { proximity } from "./AboutObject";

const STEPS = 70;
const LENGTH = SECTION_GAP * 1.7;
const TURNS = 3.2;
const R = 1.3;

export function Helix() {
  const top = useSectionY("schedule", 0.1);
  const narrow = useIsNarrow();
  const group = useRef<THREE.Group>(null);
  const strandA = useRef<THREE.InstancedMesh>(null);
  const strandB = useRef<THREE.InstancedMesh>(null);
  const rungs = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorA = useMemo(() => new THREE.Color("#b6ff3c"), []);
  const colorB = useMemo(() => new THREE.Color("#38f5ff"), []);

  useFrame((state, delta) => {
    if (!group.current || !strandA.current || !strandB.current || !rungs.current) return;
    const t = state.clock.elapsedTime;
    const centerY = top - LENGTH / 2;
    const prox = proximity(state.camera.position.y, centerY, SECTION_GAP * 1.4);
    const eased = THREE.MathUtils.smoothstep(prox, 0, 1);

    group.current.position.x = narrow ? 0 : 3.8;
    group.current.position.y = top;
    group.current.rotation.y = motionState.smoothScroll * 0.0018 + t * 0.1;
    const spreadScale = THREE.MathUtils.lerp(0.4, 1, eased);

    // "data pulse" travelling down the helix
    const pulsePos = ((t * 0.25) % 1) * STEPS;

    for (let i = 0; i < STEPS; i++) {
      const f = i / (STEPS - 1);
      const yy = -f * LENGTH;
      const a = f * Math.PI * 2 * TURNS;
      const r = R * spreadScale;
      const glow = Math.max(0, 1 - Math.abs(i - pulsePos) / 4);
      const s = 0.09 + glow * 0.12;

      dummy.position.set(Math.cos(a) * r, yy, Math.sin(a) * r);
      dummy.scale.setScalar(s);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      strandA.current.setMatrixAt(i, dummy.matrix);

      dummy.position.set(Math.cos(a + Math.PI) * r, yy, Math.sin(a + Math.PI) * r);
      dummy.updateMatrix();
      strandB.current.setMatrixAt(i, dummy.matrix);

      // rung between strands
      dummy.position.set(0, yy, 0);
      dummy.rotation.set(0, -a, Math.PI / 2);
      dummy.scale.set(0.015, r * 2, 0.015);
      dummy.updateMatrix();
      rungs.current.setMatrixAt(i, dummy.matrix);
    }
    strandA.current.instanceMatrix.needsUpdate = true;
    strandB.current.instanceMatrix.needsUpdate = true;
    rungs.current.instanceMatrix.needsUpdate = true;

    (strandA.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 + eased * 1.2;
    (strandB.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 + eased * 1.2;
    (rungs.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + eased * 0.35;
    void delta;
  });

  return (
    <group ref={group} position={[3.8, top, 0]}>
      <instancedMesh ref={strandA} args={[undefined, undefined, STEPS]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color={colorA} emissive={colorA} emissiveIntensity={1} roughness={0.3} />
      </instancedMesh>
      <instancedMesh ref={strandB} args={[undefined, undefined, STEPS]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color={colorB} emissive={colorB} emissiveIntensity={1} roughness={0.3} />
      </instancedMesh>
      <instancedMesh ref={rungs} args={[undefined, undefined, STEPS]}>
        <cylinderGeometry args={[1, 1, 1, 6]} />
        <meshBasicMaterial color="#d8ffb0" transparent opacity={0.3} />
      </instancedMesh>
    </group>
  );
}

import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { motionState, useStore } from "../store";
import { useIsNarrow, useSectionY } from "./useSectionY";

const SHARDS = 90;

export function Core() {
  const y = useSectionY("hero");
  const narrow = useIsNarrow();
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const shards = useRef<THREE.InstancedMesh>(null);
  const distortMat = useRef<any>(null);
  const halo = useRef<THREE.Mesh>(null);

  const pulses = useStore((s) => s.corePulses);
  const pulseCore = useStore((s) => s.pulseCore);
  const setCursorHover = useStore((s) => s.setCursorHover);

  const pulse = useRef(0);
  const hover = useRef(0);
  const hovered = useRef(false);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const shardData = useMemo(
    () =>
      Array.from({ length: SHARDS }, () => {
        const dir = new THREE.Vector3().randomDirection();
        return {
          dir,
          base: 1.9 + Math.random() * 0.4,
          scale: 0.08 + Math.random() * 0.14,
          spin: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.2,
        };
      }),
    []
  );

  useEffect(() => {
    if (pulses > 0) pulse.current = 1;
  }, [pulses]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!group.current) return;

    // how far the viewer has scrolled past the hero (0 at top, 1 at one viewport down)
    const away = THREE.MathUtils.clamp(motionState.smoothScroll / motionState.vh, 0, 1.4);
    pulse.current = THREE.MathUtils.damp(pulse.current, 0, 2.2, delta);
    hover.current = THREE.MathUtils.damp(hover.current, hovered.current ? 1 : 0, 6, delta);

    const p = pulse.current;
    const spread = away * 3.2 + p * 2.4 + hover.current * 0.25;

    group.current.position.y = y + (narrow ? 0.9 : 0.5) + Math.sin(t * 0.6) * 0.15 + away * 1.5;
    group.current.position.x = (narrow ? 0 : 1.8) + motionState.smoothMouse.x * -0.4 + away * 2;
    group.current.rotation.y = t * 0.12 + away * 2.2;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.1 + away * 0.6;
    const s = 1 - away * 0.45 + p * 0.15;
    group.current.scale.setScalar(Math.max(s, 0.2) * (narrow ? 0.6 : 1));

    if (inner.current) {
      inner.current.rotation.y -= delta * (0.3 + p * 4);
      inner.current.rotation.z += delta * 0.15;
    }
    if (distortMat.current) {
      distortMat.current.distort = 0.35 + p * 0.5 + hover.current * 0.15 + away * 0.2;
      distortMat.current.speed = 2 + p * 6;
      distortMat.current.emissiveIntensity = 0.5 + p * 2.5 + hover.current * 0.6;
    }
    if (wire.current) {
      wire.current.rotation.y += delta * 0.25;
      wire.current.rotation.x -= delta * 0.18;
      wire.current.scale.setScalar(1 + p * 0.4 + away * 0.3);
      (wire.current.material as THREE.MeshBasicMaterial).opacity = 0.35 - away * 0.25 + p * 0.3;
    }
    if (ringA.current) {
      ringA.current.rotation.x = t * 0.5 + 1;
      ringA.current.rotation.y = t * 0.3;
      ringA.current.scale.setScalar(1 + spread * 0.12);
    }
    if (ringB.current) {
      ringB.current.rotation.x = -t * 0.4 + 2;
      ringB.current.rotation.z = t * 0.35;
      ringB.current.scale.setScalar(1 + spread * 0.22);
    }
    if (ringC.current) {
      ringC.current.rotation.y = t * 0.6;
      ringC.current.rotation.z = -t * 0.2 + 1;
      ringC.current.scale.setScalar(1 + spread * 0.32);
    }
    if (halo.current) {
      halo.current.lookAt(state.camera.position);
      halo.current.scale.setScalar(2.6 + p * 1.2 + Math.sin(t * 2) * 0.08);
      (halo.current.material as THREE.MeshBasicMaterial).opacity = 0.07 + p * 0.2 + hover.current * 0.06;
    }

    if (shards.current) {
      for (let i = 0; i < SHARDS; i++) {
        const d = shardData[i];
        const r = d.base + spread * (0.6 + (i % 7) * 0.25) + Math.sin(t * d.speed + i) * 0.08;
        dummy.position.copy(d.dir).multiplyScalar(r);
        dummy.rotation.set(t * d.speed + d.spin, t * 0.7 + i, d.spin);
        dummy.scale.setScalar(d.scale * (1 + p * 0.6));
        dummy.updateMatrix();
        shards.current.setMatrixAt(i, dummy.matrix);
      }
      shards.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group} position={[0, y, 0]}>
      {/* interaction hit volume */}
      <mesh
        visible={false}
        onPointerOver={() => {
          hovered.current = true;
          setCursorHover(true);
        }}
        onPointerOut={() => {
          hovered.current = false;
          setCursorHover(false);
        }}
        onClick={pulseCore}
      >
        <sphereGeometry args={[2, 16, 16]} />
      </mesh>

      <mesh ref={inner}>
        <icosahedronGeometry args={[1.35, 24]} />
        <MeshDistortMaterial
          ref={distortMat}
          color="#071c22"
          emissive="#38f5ff"
          emissiveIntensity={0.9}
          roughness={0.15}
          metalness={0.6}
          distort={0.35}
          speed={2}
        />
      </mesh>

      <mesh ref={wire}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshBasicMaterial color="#9ffbff" wireframe transparent opacity={0.35} />
      </mesh>

      <mesh ref={ringA}>
        <torusGeometry args={[2.3, 0.02, 8, 120]} />
        <meshBasicMaterial color="#38f5ff" toneMapped={false} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[2.7, 0.015, 8, 120]} />
        <meshBasicMaterial color="#ff3cf0" toneMapped={false} />
      </mesh>
      <mesh ref={ringC}>
        <torusGeometry args={[3.1, 0.01, 8, 120]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>

      <mesh ref={halo}>
        <circleGeometry args={[1, 48]} />
        <meshBasicMaterial color="#38f5ff" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <instancedMesh ref={shards} args={[undefined, undefined, SHARDS]}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#cfe9ff" emissive="#38f5ff" emissiveIntensity={0.5} roughness={0.3} metalness={0.8} />
      </instancedMesh>
    </group>
  );
}

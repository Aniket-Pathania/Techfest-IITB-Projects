import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useStore } from "../store";
import { useIsNarrow, useSectionY } from "./useSectionY";
import { proximity } from "./AboutObject";

const PARTICLES = 900;

export function Portal() {
  const y = useSectionY("register");
  const narrow = useIsNarrow();
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const disk = useRef<THREE.Mesh>(null);
  const particles = useRef<THREE.Points>(null);
  const setRegisterOpen = useStore((s) => s.setRegisterOpen);
  const setCursorHover = useStore((s) => s.setCursorHover);
  const registerOpen = useStore((s) => s.registerOpen);
  const hovered = useRef(false);
  const energy = useRef(0);

  const { positions, data } = useMemo(() => {
    const positions = new Float32Array(PARTICLES * 3);
    const data = Array.from({ length: PARTICLES }, () => ({
      r: Math.pow(Math.random(), 0.6) * 2.4,
      a: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.8,
      z: (Math.random() - 0.5) * 0.4,
    }));
    return { positions, data };
  }, []);

  const uniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color("#ffb03c") }, uEnergy: { value: 0 } }),
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const prox = proximity(state.camera.position.y, y);
    const eased = THREE.MathUtils.smoothstep(prox, 0, 1);
    energy.current = THREE.MathUtils.damp(energy.current, hovered.current || registerOpen ? 1 : 0, 4, delta);
    const e = energy.current;

    group.current.position.y = y + (narrow ? 0.4 : 0);
    group.current.scale.setScalar(THREE.MathUtils.lerp(0.3, narrow ? 0.75 : 1, eased));
    group.current.rotation.y = (1 - eased) * 1.5 + Math.sin(t * 0.2) * 0.08;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.05;

    if (ringA.current) ringA.current.rotation.z = t * (0.3 + e * 1.5);
    if (ringB.current) {
      ringB.current.rotation.z = -t * (0.2 + e);
      ringB.current.scale.setScalar(1 + e * 0.05);
    }
    if (ringC.current) {
      ringC.current.rotation.x = t * 0.4;
      ringC.current.rotation.y = t * 0.3;
    }
    if (disk.current) {
      const m = disk.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.05 + e * 0.18 + Math.sin(t * 3) * 0.02;
    }
    uniforms.uEnergy.value = e;

    if (particles.current) {
      const pos = particles.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < PARTICLES; i++) {
        const d = data[i];
        d.a += delta * d.speed * (0.4 + e * 2.5) * (1.2 - d.r / 3);
        const r = d.r * (1 - e * 0.25);
        arr[i * 3] = Math.cos(d.a) * r;
        arr[i * 3 + 1] = Math.sin(d.a) * r;
        arr[i * 3 + 2] = d.z + Math.sin(t * 2 + d.a * 3) * 0.1 * e;
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <group ref={group} position={[0, y, 0]}>
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
        onClick={() => setRegisterOpen(true)}
      >
        <circleGeometry args={[3.2, 32]} />
      </mesh>

      <mesh ref={ringA}>
        <torusGeometry args={[2.9, 0.06, 16, 140]} />
        <meshStandardMaterial color="#3a2608" emissive="#ffb03c" emissiveIntensity={2.4} roughness={0.2} metalness={0.9} toneMapped={false} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[3.25, 0.012, 8, 140, Math.PI * 1.6]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <mesh ref={ringC}>
        <torusGeometry args={[3.6, 0.008, 8, 140]} />
        <meshBasicMaterial color="#ffb03c" transparent opacity={0.5} />
      </mesh>
      {/* tick marks around the ring */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 3.05, Math.sin(a) * 3.05, 0]} rotation={[0, 0, a]}>
            <boxGeometry args={[i % 6 === 0 ? 0.3 : 0.14, 0.02, 0.02]} />
            <meshBasicMaterial color="#ffd9a0" toneMapped={false} />
          </mesh>
        );
      })}

      <mesh ref={disk} position={[0, 0, -0.2]}>
        <circleGeometry args={[2.85, 64]} />
        <meshBasicMaterial color="#ffb03c" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={uniforms}
          vertexShader={`
            uniform float uEnergy;
            varying float vR;
            void main() {
              vR = length(position.xy);
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = (1.6 + uEnergy * 2.0) * (28.0 / -mv.z);
              gl_Position = projectionMatrix * mv;
            }
          `}
          fragmentShader={`
            uniform vec3 uColor;
            uniform float uEnergy;
            varying float vR;
            void main() {
              float d = length(gl_PointCoord - 0.5);
              float a = smoothstep(0.5, 0.0, d);
              vec3 col = mix(uColor, vec3(1.0), smoothstep(2.0, 0.0, vR) * 0.6);
              gl_FragColor = vec4(col, a * (0.35 + uEnergy * 0.5));
            }
          `}
        />
      </points>
    </group>
  );
}

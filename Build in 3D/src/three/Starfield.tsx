import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { motionState } from "../store";

const COUNT = 2600;

export function Starfield() {
  const points = useRef<THREE.Points>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = 6 + Math.random() * 22;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = 14 - Math.random() * 120;
      positions[i * 3 + 2] = Math.sin(a) * r - 6;
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStretch: { value: 0 },
      uColorA: { value: new THREE.Color("#38f5ff") },
      uColorB: { value: new THREE.Color("#ff3cf0") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!points.current || !mat.current) return;
    points.current.rotation.y += delta * 0.015;
    uniforms.uTime.value = state.clock.elapsedTime;
    const target = Math.min(Math.abs(motionState.velocity) / 2500, 1);
    uniforms.uStretch.value += (target - uniforms.uStretch.value) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          attribute float aSeed;
          uniform float uTime;
          uniform float uStretch;
          varying float vSeed;
          varying float vStretch;
          varying float vNear;
          void main() {
            vSeed = aSeed;
            vStretch = uStretch;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            float tw = 0.6 + 0.4 * sin(uTime * (1.0 + aSeed * 2.0) + aSeed * 40.0);
            float size = (1.2 + aSeed * 2.4) * tw * (90.0 / -mv.z) * (1.0 + uStretch * 1.5);
            vNear = smoothstep(2.0, 7.0, -mv.z);
            gl_PointSize = min(size, 7.0);
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={`
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying float vSeed;
          varying float vStretch;
          varying float vNear;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            uv.y /= (1.0 + vStretch * 3.0);
            float d = length(uv);
            float a = smoothstep(0.5, 0.05, d);
            vec3 col = mix(uColorA, uColorB, step(0.7, vSeed));
            col = mix(col, vec3(1.0), 0.6 * step(vSeed, 0.4));
            gl_FragColor = vec4(col, a * 0.9 * vNear);
          }
        `}
      />
    </points>
  );
}

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { ACCENTS, motionState, SECTION_GAP, useStore } from "../store";
import { Starfield } from "./Starfield";
import { Core } from "./Core";
import { AboutObject } from "./AboutObject";
import { EventPods } from "./EventPods";
import { Helix } from "./Helix";
import { SpeakerOrbs } from "./SpeakerOrbs";
import { Portal } from "./Portal";

function CameraRig() {
  const { camera } = useThree();
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const lastScroll = useRef(0);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const k = 1 - Math.pow(0.001, d); // framerate independent lerp
    motionState.smoothScroll += (motionState.scrollY - motionState.smoothScroll) * k * 0.6;
    motionState.smoothMouse.x += (motionState.mouse.x - motionState.smoothMouse.x) * k * 0.5;
    motionState.smoothMouse.y += (motionState.mouse.y - motionState.smoothMouse.y) * k * 0.5;

    const v = (motionState.smoothScroll - lastScroll.current) / Math.max(d, 0.001);
    motionState.velocity += (v - motionState.velocity) * 0.1;
    lastScroll.current = motionState.smoothScroll;

    const y = -(motionState.smoothScroll / motionState.vh) * SECTION_GAP;
    const mx = motionState.smoothMouse.x;
    const my = motionState.smoothMouse.y;

    const speedZ = Math.min(Math.abs(motionState.velocity) / 4000, 1) * 2.5;
    camera.position.x = mx * 0.8;
    camera.position.y = y + my * 0.5;
    camera.position.z = 10 + speedZ;
    lookTarget.set(mx * 0.25, y + my * 0.15, 0);
    camera.lookAt(lookTarget);
    camera.rotation.z = -mx * 0.02 + Math.min(Math.max(motionState.velocity / 60000, -0.03), 0.03);
  });
  return null;
}

function Atmosphere() {
  const { scene } = useThree();
  const active = useStore((s) => s.activeSection);
  const target = useMemo(() => new THREE.Color(), []);
  const bg = useMemo(() => new THREE.Color("#04050c"), []);
  const fogRef = useRef<THREE.Fog>(null);
  const keyLight = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    target.set(ACCENTS[active]).multiplyScalar(0.04).add(new THREE.Color("#03040a"));
    bg.lerp(target, Math.min(delta * 2, 1));
    scene.background = bg;
    if (fogRef.current) fogRef.current.color.copy(bg);
    if (keyLight.current) {
      keyLight.current.color.lerp(new THREE.Color(ACCENTS[active]), Math.min(delta * 2, 1));
      keyLight.current.position.y = -(motionState.smoothScroll / motionState.vh) * SECTION_GAP + 4;
    }
  });

  return (
    <>
      <fog ref={fogRef} attach="fog" args={["#04050c", 14, 34]} />
      <ambientLight intensity={0.35} />
      <pointLight ref={keyLight} position={[6, 4, 6]} intensity={120} distance={40} />
      <pointLight position={[-8, -2, 4]} intensity={60} color="#ff3cf0" distance={30} />
      <directionalLight position={[0, 10, 5]} intensity={0.6} color="#ffffff" />
    </>
  );
}

export function Scene() {
  const reducedMotion = useStore((s) => s.reducedMotion);
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 80 }}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <Atmosphere />
          <Starfield />
          <Core />
          <AboutObject />
          <EventPods />
          <Helix />
          <SpeakerOrbs />
          <Portal />
          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.25} intensity={0.85} mipmapBlur radius={0.5} />
            <Noise opacity={0.045} />
            <Vignette eskil={false} offset={0.2} darkness={0.85} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

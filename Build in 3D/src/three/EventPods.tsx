import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { EVENTS, type EventItem } from "../data";
import { useStore } from "../store";
import { useIsNarrow, useSectionY } from "./useSectionY";
import { proximity } from "./AboutObject";

const RADIUS = 2.9;

function PodGeometry({ shape }: { shape: EventItem["shape"] }) {
  switch (shape) {
    case "icosa":
      return <icosahedronGeometry args={[0.55, 0]} />;
    case "torusKnot":
      return <torusKnotGeometry args={[0.36, 0.13, 100, 16]} />;
    case "octa":
      return <octahedronGeometry args={[0.6, 0]} />;
    case "dodeca":
      return <dodecahedronGeometry args={[0.55, 0]} />;
    case "torus":
      return <torusGeometry args={[0.42, 0.17, 16, 48]} />;
    case "capsule":
      return <capsuleGeometry args={[0.3, 0.5, 8, 16]} />;
  }
}

function Pod({ item, index }: { item: EventItem; index: number }) {
  const ref = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const selected = useStore((s) => s.selectedEvent === item.id);
  const hoveredId = useStore((s) => s.hoveredPod);
  const setHovered = useStore((s) => s.setHoveredPod);
  const setSelected = useStore((s) => s.setSelectedEvent);
  const setCursorHover = useStore((s) => s.setCursorHover);
  const hovered = hoveredId === item.id;
  const scaleRef = useRef(1);

  const angle = (index / EVENTS.length) * Math.PI * 2;

  useFrame((state, delta) => {
    if (!ref.current || !mesh.current) return;
    const t = state.clock.elapsedTime;
    const target = selected ? 1.55 : hovered ? 1.3 : 1;
    scaleRef.current = THREE.MathUtils.damp(scaleRef.current, target, 8, delta);
    ref.current.scale.setScalar(scaleRef.current);
    ref.current.position.y = Math.sin(t * 1.2 + index) * 0.12;
    mesh.current.rotation.x += delta * (selected ? 1.4 : 0.4);
    mesh.current.rotation.y += delta * (hovered || selected ? 1.6 : 0.6);
    const m = mesh.current.material as THREE.MeshStandardMaterial;
    m.emissiveIntensity = THREE.MathUtils.damp(m.emissiveIntensity, selected ? 2.2 : hovered ? 1.4 : 0.55, 8, delta);
    if (ring.current) {
      ring.current.lookAt(state.camera.position);
      ring.current.rotation.z = t * 2;
      const rm = ring.current.material as THREE.MeshBasicMaterial;
      rm.opacity = THREE.MathUtils.damp(rm.opacity, selected ? 0.9 : hovered ? 0.4 : 0, 8, delta);
    }
  });

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(item.id);
    setCursorHover(true);
  };
  const onOut = () => {
    setHovered(null);
    setCursorHover(false);
  };
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setSelected(selected ? null : item.id);
  };

  return (
    <group ref={ref} position={[Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS]}>
      <mesh ref={mesh} onPointerOver={onOver} onPointerOut={onOut} onClick={onClick}>
        <PodGeometry shape={item.shape} />
        <meshStandardMaterial
          color={new THREE.Color(item.color).multiplyScalar(0.25)}
          emissive={item.color}
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.7}
          flatShading={item.shape !== "torusKnot" && item.shape !== "capsule"}
        />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.85, 0.9, 48, 1, 0, Math.PI * 1.5]} />
        <meshBasicMaterial color={item.color} transparent opacity={0} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function EventPods() {
  const narrow = useIsNarrow();
  const y = useSectionY("events", narrow ? 0.64 : 0.5);
  const group = useRef<THREE.Group>(null);
  const ringGroup = useRef<THREE.Group>(null);
  const base = useRef<THREE.Mesh>(null);
  const selected = useStore((s) => s.selectedEvent);
  const hoveredPod = useStore((s) => s.hoveredPod);
  const rot = useRef(0);
  const lightColor = useMemo(() => new THREE.Color("#ff3cf0"), []);
  const light = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (!group.current || !ringGroup.current) return;
    const t = state.clock.elapsedTime;
    const prox = proximity(state.camera.position.y, y);
    const eased = THREE.MathUtils.smoothstep(prox, 0, 1);

    group.current.position.x = narrow ? 0 : 3.3;
    group.current.position.y = y + (narrow ? 0.2 : -0.4);
    group.current.scale.setScalar(THREE.MathUtils.lerp(0.5, narrow ? 0.55 : 0.95, eased));
    group.current.rotation.x = 0.35 + (1 - eased) * 0.8;

    if (selected !== null) {
      const a = (selected / EVENTS.length) * Math.PI * 2;
      const target = a - Math.PI / 2;
      // shortest path
      let diff = target - rot.current;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      rot.current += diff * Math.min(delta * 5, 1);
    } else if (hoveredPod === null) {
      rot.current += delta * 0.25;
    }
    ringGroup.current.rotation.y = rot.current;

    if (base.current) {
      base.current.rotation.z = -t * 0.1;
      (base.current.material as THREE.MeshBasicMaterial).opacity = 0.25 * eased;
    }
    if (light.current) {
      const col = selected !== null ? EVENTS[selected].color : hoveredPod !== null ? EVENTS[hoveredPod].color : "#ff3cf0";
      lightColor.lerp(new THREE.Color(col), Math.min(delta * 4, 1));
      light.current.color.copy(lightColor);
      light.current.intensity = 20 + eased * 40;
    }
  });

  return (
    <group ref={group} position={[3.3, y, 0]}>
      <pointLight ref={light} position={[0, 1.5, 0]} intensity={40} distance={12} />
      <group ref={ringGroup}>
        {EVENTS.map((e, i) => (
          <Pod key={e.id} item={e} index={i} />
        ))}
      </group>
      <mesh ref={base} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
        <ringGeometry args={[RADIUS - 0.6, RADIUS + 0.6, 72, 4]} />
        <meshBasicMaterial color="#ff3cf0" wireframe transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.12, 0]}>
        <ringGeometry args={[RADIUS + 0.9, RADIUS + 0.93, 96]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} toneMapped={false} />
      </mesh>
    </group>
  );
}

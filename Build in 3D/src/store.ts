import { create } from "zustand";

export type SectionId = "hero" | "about" | "events" | "schedule" | "speakers" | "register";

export const SECTION_GAP = 9; // world units per viewport height

interface State {
  loaded: boolean;
  setLoaded: (v: boolean) => void;
  sections: Record<string, number>; // top offset in px
  setSection: (id: string, top: number) => void;
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
  selectedEvent: number | null;
  setSelectedEvent: (i: number | null) => void;
  hoveredPod: number | null;
  setHoveredPod: (i: number | null) => void;
  corePulses: number;
  pulseCore: () => void;
  registerOpen: boolean;
  setRegisterOpen: (v: boolean) => void;
  cursorHover: boolean;
  setCursorHover: (v: boolean) => void;
  reducedMotion: boolean;
}

export const useStore = create<State>((set) => ({
  loaded: false,
  setLoaded: (v) => set({ loaded: v }),
  sections: {},
  setSection: (id, top) => set((s) => ({ sections: { ...s.sections, [id]: top } })),
  activeSection: "hero",
  setActiveSection: (id) => set({ activeSection: id }),
  selectedEvent: null,
  setSelectedEvent: (i) => set({ selectedEvent: i }),
  hoveredPod: null,
  setHoveredPod: (i) => set({ hoveredPod: i }),
  corePulses: 0,
  pulseCore: () => set((s) => ({ corePulses: s.corePulses + 1 })),
  registerOpen: false,
  setRegisterOpen: (v) => set({ registerOpen: v }),
  cursorHover: false,
  setCursorHover: (v) => set({ cursorHover: v }),
  reducedMotion:
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
}));

/** Mutable, non-reactive scroll/mouse state read inside useFrame (no re-renders). */
export const motionState = {
  scrollY: 0,
  smoothScroll: 0,
  velocity: 0,
  vh: typeof window !== "undefined" ? window.innerHeight : 900,
  mouse: { x: 0, y: 0 },
  smoothMouse: { x: 0, y: 0 },
};

/** Convert a section's pixel top offset to its world-space Y. */
export function sectionWorldY(top: number) {
  return -(top / motionState.vh) * SECTION_GAP;
}

export const ACCENTS: Record<SectionId, string> = {
  hero: "#38f5ff",
  about: "#8a5cff",
  events: "#ff3cf0",
  schedule: "#b6ff3c",
  speakers: "#38f5ff",
  register: "#ffb03c",
};

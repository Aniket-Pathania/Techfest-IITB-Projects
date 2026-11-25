import { useThree } from "@react-three/fiber";
import { sectionWorldY, useStore } from "../store";

/** World-space Y of a DOM section's top edge + half a viewport (its visual center). */
export function useSectionY(id: string, offsetVh = 0.5) {
  const top = useStore((s) => s.sections[id] ?? 0);
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  // camera center shows the DOM point at scrollY + vh/2, so shift by half a viewport
  return sectionWorldY(top + vh * offsetVh - vh * 0.5);
}

/** Responsive helper: true when canvas is narrower than it is tall-ish. */
export function useIsNarrow() {
  const size = useThree((s) => s.size);
  return size.width < 900;
}

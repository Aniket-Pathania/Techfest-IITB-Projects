import { useEffect, useRef } from "react";
import { useStore } from "../store";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const hover = useStore((s) => s.cursorHover);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest("a, button, [data-cursor]");
      useStore.getState().setCursorHover(interactive);
    };
    const loop = () => {
      const { x, y } = pos.current;
      ringPos.current.x += (x - ringPos.current.x) * 0.18;
      ringPos.current.y += (y - ringPos.current.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      <div ref={dot} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white" />
      <div
        ref={ring}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-white/80 transition-[scale,background-color,border-color] duration-200"
        style={{
          scale: hover ? 1.7 : 1,
          backgroundColor: hover ? "rgba(255,255,255,0.12)" : "transparent",
        }}
      />
    </div>
  );
}

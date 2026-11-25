import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { type SectionId, useStore } from "../store";

interface Props {
  id: SectionId;
  className?: string;
  children: ReactNode;
}

/** Registers its DOM offset (for the 3D scene) and reports when it becomes the active section. */
export function Section({ id, className, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const setSection = useStore((s) => s.setSection);
  const setActive = useStore((s) => s.setActiveSection);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSection(id, el.offsetTop);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [id, setSection, setActive]);

  return (
    <section ref={ref} id={id} className={cn("relative min-h-screen w-full", className)}>
      {children}
    </section>
  );
}

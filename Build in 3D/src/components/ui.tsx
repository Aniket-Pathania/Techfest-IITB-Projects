import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "../utils/cn";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 40,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-white/50", className)}>
      <span className="h-px w-8" style={{ background: "var(--accent)" }} />
      {children}
    </div>
  );
}

/** Card with pointer-driven 3D tilt and a light sheen following the cursor. */
export function TiltCard({
  children,
  className,
  style,
  max = 10,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  max?: number;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20 });
  const sheen = useTransform(
    [px, py],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.14), transparent 55%)`
  );

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ry.set((x - 0.5) * max * 2);
    rx.set(-(y - 0.5) * max * 2);
    px.set(x * 100);
    py.set(y * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      data-cursor
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", transformPerspective: 900, ...style }}
      className={cn("relative", className)}
    >
      <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: sheen }} />
      {children}
    </motion.div>
  );
}

export function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
    });
  }, [spring, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden whitespace-nowrap">
      <div className={cn("animate-marquee flex shrink-0 gap-12 pr-12", reverse && "[animation-direction:reverse]")}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="font-display text-xl font-extrabold tracking-wider text-white/25 sm:text-3xl">
            {t}
            <span className="ml-12 text-white/15">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

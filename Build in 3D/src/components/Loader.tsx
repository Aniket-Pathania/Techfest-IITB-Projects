import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useStore } from "../store";

const LINES = [
  "> init singularity.core",
  "> mounting 3d scene ........ ok",
  "> compiling shaders ........ ok",
  "> calibrating gravity ...... ok",
  "> syncing 40,000 attendees . ok",
  "> ready.",
];

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState(0);
  const setLoaded = useStore((s) => s.setLoaded);

  useEffect(() => {
    const start = performance.now();
    const duration = 2100;
    let raf = 0;
    const tick = () => {
      const t = Math.min((performance.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      setLines(Math.min(LINES.length, Math.floor(eased * (LINES.length + 0.5))));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setLoaded(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setLoaded]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-void"
      exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="relative w-[min(90vw,520px)]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan/70">Techfest '26</div>
            <div className="font-display text-3xl font-black leading-none tracking-tight sm:text-5xl">
              SINGULARITY
            </div>
          </div>
          <div className="font-display text-4xl font-extrabold tabular-nums text-white/90 sm:text-6xl">
            {Math.round(progress * 100)}
            <span className="text-lg text-cyan">%</span>
          </div>
        </div>
        <div className="relative h-px w-full overflow-hidden bg-white/10">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan via-white to-magenta"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="mt-6 h-[9.5rem] font-mono text-xs leading-6 text-white/55">
          {LINES.slice(0, lines).map((l, i) => (
            <div key={i} className={i === LINES.length - 1 ? "text-lime" : ""}>
              {l}
            </div>
          ))}
          <span className="animate-blink inline-block h-3 w-2 translate-y-0.5 bg-cyan" />
        </div>
      </div>
    </motion.div>
  );
}

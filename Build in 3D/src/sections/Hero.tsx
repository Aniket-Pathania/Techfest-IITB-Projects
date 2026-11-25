import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { scrollToId } from "../components/Nav";
import { useStore } from "../store";

const word = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } },
};
const letter = {
  hidden: { y: "110%", rotateX: -60, opacity: 0 },
  show: { y: "0%", rotateX: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

function Word({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span variants={word} initial="hidden" animate="show" className={`inline-flex overflow-hidden ${className ?? ""}`} style={{ perspective: 600 }}>
      {text.split("").map((c, i) => (
        <motion.span key={i} variants={letter} className="inline-block" style={{ transformOrigin: "bottom" }}>
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const pulseCore = useStore((s) => s.pulseCore);
  const setRegisterOpen = useStore((s) => s.setRegisterOpen);

  return (
    <Section id="hero" className="flex min-h-[100svh] flex-col justify-between px-5 pb-10 pt-24 sm:px-8">
      {/* top meta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-white/50"
      >
        <div className="space-y-1">
          <div>Jan 16 — 18, 2026</div>
          <div>Powai Campus · Mumbai</div>
        </div>
        <div className="hidden text-right sm:block">
          <div>Edition 29</div>
          <div className="text-cyan">● Live 3D experience</div>
        </div>
      </motion.div>

      {/* hint — anchored near the core */}
      <div className="pointer-events-none flex flex-1 items-start justify-center lg:justify-end lg:pr-[14vw]">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          onClick={pulseCore}
          className="pointer-events-auto mt-6 rounded-full border border-cyan/30 bg-void/30 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/80 backdrop-blur-sm transition-colors hover:border-cyan hover:text-cyan lg:mt-[6vh]"
        >
          ◆ tap the core to pulse it
        </motion.button>
      </div>

      {/* title block */}
      <div className="relative">
        <h1 className="font-display leading-[0.85] tracking-tight">
          <span className="block text-[13vw] font-black sm:text-[11vw] lg:text-[9.5vw]">
            <Word text="TECH" />
            <Word text="FEST" className="text-stroke" />
          </span>
          <span className="mt-2 block text-[8vw] font-extrabold text-cyan sm:text-[6vw] lg:text-[5vw]">
            <Word text="SINGULARITY" />
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9 }}
            className="max-w-md text-sm leading-relaxed text-white/60 sm:text-base"
          >
            Asia's largest student-run technology festival returns. Three days where robots fight, models learn,
            drones race — and the future stops being hypothetical.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => setRegisterOpen(true)}
              className="group relative overflow-hidden rounded-full bg-cyan px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-void"
            >
              <span className="relative z-10">Get your pass</span>
              <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0" />
            </button>
            <button
              onClick={() => scrollToId("about")}
              className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/80 transition-colors hover:border-white/60"
            >
              Explore
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                ↓
              </motion.span>
            </button>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

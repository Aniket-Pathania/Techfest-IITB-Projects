import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { Reveal } from "../components/ui";
import { useStore } from "../store";

export function Register() {
  const setRegisterOpen = useStore((s) => s.setRegisterOpen);

  return (
    <Section id="register" className="flex min-h-[100svh] flex-col items-center justify-center px-5 py-28 text-center sm:px-8">
      <div className="pointer-events-none relative flex flex-col items-center">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-amber">05 — The gate is open</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-6 text-5xl font-black leading-[0.95] sm:text-7xl lg:text-8xl">
            STEP
            <br />
            <span className="text-stroke">THROUGH</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-md rounded-2xl bg-void/40 px-4 py-2 text-sm leading-relaxed text-white/75 backdrop-blur-[3px] sm:text-base">
            Passes are free for students. Early registrants get priority seating for keynotes and a shot at the
            hackathon wildcard slots.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <motion.button
            onClick={() => setRegisterOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="pointer-events-auto group relative mt-10 overflow-hidden rounded-full border border-amber/60 bg-void/50 px-10 py-4 font-mono text-xs font-bold uppercase tracking-[0.35em] text-amber backdrop-blur-sm"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-amber transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="relative z-10 transition-colors group-hover:text-void">Register now</span>
          </motion.button>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            or click the portal ring
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

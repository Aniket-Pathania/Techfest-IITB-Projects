import { AnimatePresence, motion } from "framer-motion";
import { Section } from "../components/Section";
import { Label, Reveal } from "../components/ui";
import { EVENTS } from "../data";
import { useStore } from "../store";
import { cn } from "../utils/cn";

export function Events() {
  const selected = useStore((s) => s.selectedEvent);
  const hovered = useStore((s) => s.hoveredPod);
  const setSelected = useStore((s) => s.setSelectedEvent);
  const setHovered = useStore((s) => s.setHoveredPod);
  const setRegisterOpen = useStore((s) => s.setRegisterOpen);
  const current = selected !== null ? EVENTS[selected] : hovered !== null ? EVENTS[hovered] : null;

  return (
    <Section id="events" className="px-5 py-28 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,480px)_1fr]">
        <div>
          <Reveal>
            <Label>02 — Flagship events</Label>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-6 text-4xl font-extrabold leading-[1.02] sm:text-5xl">
              Six arenas.
              <br />
              <span className="text-magenta">Pick your fight.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-sm leading-relaxed text-white/55 sm:text-base">
              Hover or click the floating pods to inspect an event — or use the list. Each pod is a live 3D
              object synced with the panel below.
            </p>
          </Reveal>

          {/* mobile: reserve room for the 3D pods between intro and list */}
          <div className="pointer-events-none h-[52vh] lg:hidden" />

          <Reveal delay={0.25}>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {EVENTS.map((e) => {
                const isActive = selected === e.id;
                const isHover = hovered === e.id;
                return (
                  <li key={e.id}>
                    <button
                      onClick={() => setSelected(isActive ? null : e.id)}
                      onPointerEnter={() => setHovered(e.id)}
                      onPointerLeave={() => setHovered(null)}
                      className="group flex w-full items-center gap-4 py-3.5 text-left"
                    >
                      <span className="font-mono text-[10px] tracking-[0.25em] text-white/35">{e.code}</span>
                      <span
                        className={cn(
                          "font-display text-lg font-bold transition-all duration-300 sm:text-xl",
                          isActive || isHover ? "translate-x-2" : "text-white/80"
                        )}
                        style={{ color: isActive || isHover ? e.color : undefined }}
                      >
                        {e.title}
                      </span>
                      <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 sm:block">
                        {e.tagline}
                      </span>
                      <span
                        className="h-2 w-2 rounded-full transition-all duration-300"
                        style={{
                          background: e.color,
                          boxShadow: isActive || isHover ? `0 0 14px ${e.color}` : "none",
                          opacity: isActive || isHover ? 1 : 0.35,
                        }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* detail panel */}
          <div className="mt-6 min-h-[200px]">
            <AnimatePresence mode="wait">
              {current ? (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16, clipPath: "inset(0 0 100% 0)" }}
                  animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                  exit={{ opacity: 0, y: -10, clipPath: "inset(100% 0 0 0)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="glass relative overflow-hidden rounded-2xl p-6"
                  style={{ borderColor: `${current.color}55` }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: `linear-gradient(90deg, ${current.color}, transparent)` }}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: current.color }}>
                        {current.code} · {current.tagline}
                      </div>
                      <div className="font-display mt-2 text-2xl font-extrabold">{current.title}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-xl font-black" style={{ color: current.color }}>
                        {current.prize}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{current.team}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">{current.description}</p>
                  <button
                    onClick={() => setRegisterOpen(true)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-void transition-transform hover:scale-105"
                    style={{ background: current.color }}
                  >
                    Register for {current.title} →
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-[200px] items-center justify-center rounded-2xl border border-dashed border-white/15 font-mono text-[11px] uppercase tracking-[0.3em] text-white/35"
                >
                  <span className="animate-pulse">◆ select a pod to decrypt details</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* space reserved for the 3D pods */}
        <div className="pointer-events-none relative hidden lg:block">
          <div className="absolute right-0 top-0 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            ◆ interactive — drag-free, just hover
          </div>
        </div>
      </div>
    </Section>
  );
}

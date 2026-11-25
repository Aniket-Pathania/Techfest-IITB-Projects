import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "../components/Section";
import { Label, Reveal } from "../components/ui";
import { SCHEDULE } from "../data";
import { cn } from "../utils/cn";

export function Schedule() {
  const [day, setDay] = useState(0);
  const active = SCHEDULE[day];

  return (
    <Section id="schedule" className="px-5 py-28 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,560px)_1fr]">
        <div>
          <Reveal>
            <Label>03 — Schedule</Label>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-6 text-4xl font-extrabold leading-[1.02] sm:text-5xl">
              Three days,
              <br />
              <span className="text-lime">one timeline.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex gap-2">
              {SCHEDULE.map((d, i) => (
                <button
                  key={d.day}
                  onClick={() => setDay(i)}
                  className={cn(
                    "relative flex-1 overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors",
                    day === i ? "border-lime/60" : "border-white/10 hover:border-white/30"
                  )}
                >
                  {day === i && (
                    <motion.span layoutId="day-bg" className="absolute inset-0 bg-lime/10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                  )}
                  <div className="relative font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">{d.day}</div>
                  <div className={cn("relative font-display mt-1 text-sm font-bold sm:text-base", day === i && "text-lime")}>
                    {d.date}
                  </div>
                  <div className="relative hidden text-xs text-white/40 sm:block">{d.theme}</div>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 relative">
            <div className="absolute bottom-0 left-[3.1rem] top-0 w-px bg-gradient-to-b from-lime/60 via-white/15 to-transparent" />
            <motion.ul key={day} initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-2">
              {active.slots.map((s, i) => (
                <motion.li
                  key={s.title}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="group relative flex items-start gap-5 rounded-xl py-3 pr-4 transition-colors hover:bg-white/[0.03]"
                >
                  <div className="w-10 shrink-0 pt-0.5 text-right font-mono text-xs text-white/50">{s.time}</div>
                  <div className="relative mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-lime bg-void transition-all group-hover:bg-lime group-hover:shadow-[0_0_14px_#b6ff3c]">
                    {i === 0 && <span className="absolute inset-0 animate-ping rounded-full bg-lime/50" />}
                  </div>
                  <div>
                    <div className="font-display text-base font-bold sm:text-lg">{s.title}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{s.venue}</div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        <div className="pointer-events-none hidden lg:block" />
      </div>
    </Section>
  );
}

import { motion, useScroll, useSpring } from "framer-motion";
import { ACCENTS, type SectionId, useStore } from "../store";
import { cn } from "../utils/cn";

const LINKS: { id: SectionId; label: string; n: string }[] = [
  { id: "about", label: "About", n: "01" },
  { id: "events", label: "Events", n: "02" },
  { id: "schedule", label: "Schedule", n: "03" },
  { id: "speakers", label: "Speakers", n: "04" },
];

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Nav() {
  const active = useStore((s) => s.activeSection);
  const setRegisterOpen = useStore((s) => s.setRegisterOpen);
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-[2px] origin-left"
        style={{ scaleX: width, width: "100%", background: `linear-gradient(90deg, ${ACCENTS[active]}, #fff)` }}
      />
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8"
      >
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span
              className="absolute inset-0 rounded-full border transition-colors duration-500"
              style={{ borderColor: ACCENTS[active] }}
            />
            <span
              className="h-2.5 w-2.5 rotate-45 transition-all duration-500 group-hover:rotate-[135deg]"
              style={{ background: ACCENTS[active] }}
            />
          </span>
          <span className="font-display text-sm font-extrabold tracking-wider">
            TECHFEST<span className="text-white/40">'26</span>
          </span>
        </button>

        <nav className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className={cn(
                "relative rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
                active === l.id ? "text-void" : "text-white/60 hover:text-white"
              )}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: ACCENTS[active] }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                <span className="mr-1.5 opacity-50">{l.n}</span>
                {l.label}
              </span>
            </button>
          ))}
        </nav>

        <button
          onClick={() => setRegisterOpen(true)}
          className="group relative overflow-hidden rounded-full border border-white/20 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors hover:border-white/60"
        >
          <span
            className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"
            style={{ background: ACCENTS[active] }}
          />
          <span className="relative z-10 transition-colors group-hover:text-void">Register</span>
        </button>
      </motion.header>

      {/* side section indicator */}
      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        {(["hero", ...LINKS.map((l) => l.id), "register"] as SectionId[]).map((id) => (
          <button key={id} onClick={() => scrollToId(id)} className="group flex items-center gap-2">
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.2em] text-white/0 transition-all group-hover:text-white/60",
                active === id && "text-white/80"
              )}
            >
              {id}
            </span>
            <span
              className="block h-px transition-all duration-500"
              style={{
                width: active === id ? 32 : 12,
                background: active === id ? ACCENTS[id] : "rgba(255,255,255,0.3)",
              }}
            />
          </button>
        ))}
      </div>
    </>
  );
}

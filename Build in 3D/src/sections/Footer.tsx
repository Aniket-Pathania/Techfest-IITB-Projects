import { scrollToId } from "../components/Nav";

const COLS = [
  { h: "Fest", links: ["About", "Events", "Schedule", "Speakers"] },
  { h: "Participate", links: ["Register", "Campus Ambassador", "Volunteer", "Sponsor us"] },
  { h: "Connect", links: ["Instagram", "X / Twitter", "LinkedIn", "YouTube"] },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-void/70 px-5 pb-10 pt-16 backdrop-blur-md sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="font-display text-2xl font-black tracking-wider">
            TECHFEST<span className="text-white/40">'26</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
            Organised by students, for everyone who refuses to wait for the future. Jan 16–18, 2026 · Powai Campus, Mumbai.
          </p>
          <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">hello@techfest.org</div>
        </div>
        {COLS.map((c) => (
          <div key={c.h}>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{c.h}</div>
            <ul className="mt-4 space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <button
                    onClick={() => scrollToId(l.toLowerCase())}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-16 flex w-full max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Techfest · Built in WebGL</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="transition-colors hover:text-white">
          ↑ Back to the core
        </button>
      </div>
    </footer>
  );
}

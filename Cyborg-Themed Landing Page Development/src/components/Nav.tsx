import { useEffect, useState } from "react";

const LINKS = [
  { label: "Competitions", href: "#competitions" },
  { label: "Lectures", href: "#lectures" },
  { label: "Technoholix", href: "#technoholix" },
  { label: "Workshops", href: "#workshops" },
  { label: "Impact", href: "#impact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center">
              <span className="absolute inset-0 rotate-45 rounded-[10px] border border-gold/70 transition-transform duration-700 group-hover:rotate-[225deg]" />
              <span className="absolute inset-[7px] rounded-full bg-gradient-to-br from-gold to-plasma" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[17px] font-bold tracking-[0.22em] text-white">
                TECHFEST
              </span>
              <span className="block font-mono text-[9px] tracking-[0.3em] text-gold/80">
                IIT BOMBAY · 30
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute bottom-1 left-4 h-px w-0 bg-gold transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#register"
              className="group relative hidden overflow-hidden rounded-full border border-gold/50 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold sm:block"
            >
              <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative transition-colors duration-300 group-hover:text-ink">
                Register
              </span>
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-md border border-white/15 lg:hidden"
            >
              <span className="space-y-[5px]">
                <span
                  className={`block h-px w-4 bg-white transition ${open ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-px w-4 bg-white transition ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-px w-4 bg-white transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
        <div
          className="h-px bg-gradient-to-r from-gold via-aether to-plasma transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        className={`overflow-hidden border-b border-white/10 bg-ink/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-3">
          {LINKS.concat([{ label: "Register", href: "#register" }]).map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white/70"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

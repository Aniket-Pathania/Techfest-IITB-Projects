import { useEffect, useState } from "react";

const TARGET = new Date("2026-12-16T09:00:00+05:30").getTime();

function useCountdown() {
  const [t, setT] = useState(() => TARGET - Date.now());
  useEffect(() => {
    const id = setInterval(() => setT(TARGET - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const clamped = Math.max(t, 0);
  const s = Math.floor(clamped / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass group relative min-w-[72px] overflow-hidden rounded-xl px-3 py-2.5 text-center sm:min-w-[92px] sm:px-5 sm:py-3">
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="font-display text-2xl font-bold tabular-nums text-white sm:text-4xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.28em] text-white/45 sm:text-[9px]">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const { days, hours, mins, secs } = useCountdown();
  const [mx, setMx] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMx({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center px-5 pt-28 pb-16 sm:px-8"
    >
      {/* orbital rings */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div
          className="animate-spin-slow h-[560px] w-[560px] rounded-full border border-gold/10 sm:h-[760px] sm:w-[760px]"
          style={{ transform: `translate(${mx.x * -8}px, ${mx.y * -8}px)` }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_18px_4px_rgba(240,198,116,0.6)]" />
        </div>
        <div className="animate-spin-slower absolute h-[380px] w-[380px] rounded-full border border-aether/10 sm:h-[520px] sm:w-[520px]">
          <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-aether shadow-[0_0_14px_3px_rgba(110,231,255,0.6)]" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl text-center">
        <div className="mb-7 flex justify-center">
          <div className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ring absolute inline-flex h-full w-full rounded-full bg-gold" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
              30<sup>th</sup> Edition · Registrations Live
            </span>
          </div>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-aether/80 sm:text-xs">
          Indian Institute of Technology Bombay
        </p>

        <h1
          className="mt-5 font-display text-[clamp(3rem,13vw,9.5rem)] font-black leading-[0.82] tracking-tight"
          style={{ transform: `translate(${mx.x * 6}px, ${mx.y * 5}px)` }}
        >
          <span className="shimmer-text block">TECHFEST</span>
        </h1>

        <div className="mt-4 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60 sm:w-24" />
          <p className="font-display text-[11px] uppercase tracking-[0.34em] text-white/75 sm:text-base sm:tracking-[0.42em]">
            An Aetherial Renaissance
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60 sm:w-24" />
        </div>

        <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
          Asia's largest science &amp; technology festival returns. Three days.
          300+ events. 1.8 lakh dreamers, builders and believers — rewriting
          what's possible on the shores of Powai.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <Unit value={days} label="Days" />
          <Unit value={hours} label="Hours" />
          <Unit value={mins} label="Minutes" />
          <Unit value={secs} label="Seconds" />
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gold/80">
          16 — 18 December 2026 · Powai, Mumbai
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#register"
            className="group relative overflow-hidden rounded-full bg-gold px-8 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink transition-transform hover:scale-[1.04]"
          >
            <span className="relative z-10">Register Now</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-aether to-plasma transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#competitions"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/80 transition hover:border-aether/60 hover:text-aether"
          >
            Explore Events
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-gold/70 to-transparent" />
      </div>
    </section>
  );
}

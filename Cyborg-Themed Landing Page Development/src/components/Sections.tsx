import { useRef, useState } from "react";
import { COMPETITIONS, IMG, SPEAKERS, STATS, WORKSHOPS } from "../data";
import { useCountUp, useInView } from "../lib/useReveal";

/* ------------------------------------------------------------------ */
/* shared bits                                                         */
/* ------------------------------------------------------------------ */

export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-[10px] text-gold/70">{index}</span>
      <span className="h-px w-8 bg-gold/40" />
      <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/50">
        {children}
      </span>
    </div>
  );
}

export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(2rem,5.5vw,3.8rem)] font-black leading-[0.95] tracking-tight text-white">
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/* ticker                                                              */
/* ------------------------------------------------------------------ */

export function Ticker() {
  const items = [
    "ROBOWARS",
    "★",
    "DRONE RACING LEAGUE",
    "★",
    "TECHNOHOLIX",
    "★",
    "NOBEL LECTURE SERIES",
    "★",
    "FULL THROTTLE",
    "★",
    "DEFENCE EXPO",
    "★",
    "GAMERS LEAGUE",
    "★",
    "INT'L EXHIBITIONS",
    "★",
  ];
  return (
    <div className="relative z-10 border-y border-white/10 bg-gradient-to-r from-gold/10 via-plasma/10 to-aether/10 py-3.5">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-8 pr-8">
            {items.map((it, i) => (
              <span
                key={i}
                className={`font-mono text-[11px] uppercase tracking-[0.3em] ${
                  it === "★" ? "text-gold" : "text-white/70"
                }`}
              >
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* stats                                                               */
/* ------------------------------------------------------------------ */

function StatItem({
  value,
  suffix,
  label,
  run,
}: {
  value: number;
  suffix: string;
  label: string;
  run: boolean;
}) {
  const v = useCountUp(value, run);
  const display =
    value >= 100000
      ? `${(v / 100000).toFixed(1)}L`
      : Math.round(v).toLocaleString("en-IN");
  return (
    <div className="group relative px-4 py-8 text-center">
      <div className="font-display text-[clamp(2rem,5vw,3.4rem)] font-black leading-none text-white">
        {display}
        <span className="text-gold">{suffix}</span>
      </div>
      <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
        {label}
      </div>
      <span className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  return (
    <section ref={ref} className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
      <div className="glass reveal grid grid-cols-2 divide-x divide-y divide-white/5 rounded-2xl md:grid-cols-4 md:divide-y-0">
        {STATS.map((s) => (
          <StatItem
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            label={s.label}
            run={inView}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* about / manifesto                                                   */
/* ------------------------------------------------------------------ */

export function Manifesto() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div className="reveal">
          <SectionLabel index="01">The Renaissance</SectionLabel>
          <Heading>
            Where theory <span className="text-outline">burns down</span>
            <br />
            and prototypes rise.
          </Heading>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-white/55">
            Since 1998, Techfest has existed for one stubborn idea — that
            technology belongs to whoever is reckless enough to build with it.
            What began as a student experiment on the Powai campus is now a
            three-day gravitational event pulling in 1.8 lakh people, 2,500
            Indian colleges and 500 institutions from abroad.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/55">
            The 30<sup>th</sup> edition —{" "}
            <span className="text-gold">An Aetherial Renaissance</span> — is a
            return to that first spark: machines that fight, drones that think,
            minds that refuse the obvious.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {["Compete", "Learn", "Witness", "Build"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/12 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="reveal relative">
          <div className="animate-floaty overflow-hidden rounded-2xl border border-white/10">
            <img
              src={IMG.laser}
              alt="Techfest night"
              loading="lazy"
              className="h-[380px] w-full object-cover opacity-80 transition duration-700 hover:scale-105 hover:opacity-100"
            />
          </div>
          <div className="glass absolute -bottom-7 -left-5 max-w-[230px] rounded-xl p-4 sm:-left-8">
            <div className="font-display text-3xl font-black text-gold">
              1998
            </div>
            <p className="mt-1.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white/50">
              The first edition. Four classrooms, one borrowed projector.
            </p>
          </div>
          <div className="glass absolute -right-3 -top-6 rounded-xl px-4 py-3 sm:-right-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-aether">
              ● Live from Powai
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* competitions                                                        */
/* ------------------------------------------------------------------ */

function CompCard({ c, i }: { c: (typeof COMPETITIONS)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState("");

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt(
      `perspective(900px) rotateX(${-py * 7}deg) rotateY(${px * 9}deg) translateY(-6px)`,
    );
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt("")}
      style={{ transform: tilt }}
      className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-ink2 transition-transform duration-300 will-change-transform"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={c.img}
          alt={c.name}
          loading="lazy"
          className="h-full w-full object-cover opacity-45 grayscale transition duration-700 group-hover:scale-110 group-hover:opacity-85 group-hover:grayscale-0"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${c.accent} mix-blend-overlay opacity-60`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink2 via-ink2/30 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/80 backdrop-blur">
          {c.tag}
        </span>
        <span className="absolute right-4 top-4 font-mono text-[10px] text-white/30">
          0{i + 1}
        </span>
      </div>

      <div className="relative p-6">
        <h3 className="font-display text-2xl font-bold tracking-tight text-white">
          {c.name}
        </h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-white/50">
          {c.blurb}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
          <span className="font-mono text-[11px] tracking-wider text-gold">
            {c.prize}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 transition group-hover:text-aether">
            Enter
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function Competitions() {
  return (
    <section
      id="competitions"
      className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8"
    >
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div className="reveal">
          <SectionLabel index="02">Competitions</SectionLabel>
          <Heading>
            300+ arenas.
            <br />
            One winner each.
          </Heading>
        </div>
        <p className="reveal max-w-sm text-sm leading-relaxed text-white/50">
          35,000+ participants from 20+ countries fought through zonal rounds
          last year. The prize pool crosses ₹1 crore across the circuit.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COMPETITIONS.map((c, i) => (
          <CompCard key={c.name} c={c} i={i} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* lectures                                                            */
/* ------------------------------------------------------------------ */

export function Lectures() {
  return (
    <section id="lectures" className="relative z-10 overflow-hidden py-24">
      <div className="mx-auto mb-12 max-w-7xl px-5 sm:px-8">
        <div className="reveal">
          <SectionLabel index="03">Lecture Series</SectionLabel>
          <Heading>
            The people who <span className="shimmer-text">moved the needle</span>
          </Heading>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/50">
            Nobel laureates, ISRO chairmen, presidents and inventors have stood
            on the Techfest stage. Every December, the queue starts at dawn.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {[0, 1].map((row) => (
          <div key={row} className="flex w-max pl-4">
            <div
              className={`flex ${row === 0 ? "animate-marquee" : "animate-marquee-rev"}`}
            >
              {(row === 0
                ? [...SPEAKERS, ...SPEAKERS]
                : [...SPEAKERS].reverse().concat([...SPEAKERS].reverse())
              ).map((s, i) => (
                  <div
                    key={`${s.name}-${i}`}
                    className="glass group mr-4 w-[270px] shrink-0 rounded-xl p-5 transition hover:border-gold/40"
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 font-display text-xs font-bold text-gold">
                        {s.name
                          .replace(/^(Dr\.|Prof\.|Gen\.|The) /, "")
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <span className="font-mono text-[9px] text-white/30">
                        {s.year}
                      </span>
                    </div>
                    <h4 className="mt-4 font-display text-base font-bold leading-snug text-white">
                      {s.name}
                    </h4>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-aether/70">
                      {s.role}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
        <div className="reveal glass relative overflow-hidden rounded-2xl">
          <img
            src={IMG.stage}
            alt="Keynote stage"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="relative grid gap-6 p-8 sm:grid-cols-[1fr_auto] sm:items-center sm:p-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Announcing soon
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                The 30<sup>th</sup> edition keynote line-up
              </h3>
              <p className="mt-3 max-w-md text-sm text-white/55">
                Be the first to know. Drop your email and we'll ping you the
                moment the names drop.
              </p>
            </div>
            <a
              href="#register"
              className="inline-flex items-center justify-center rounded-full border border-gold px-7 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-ink"
            >
              Notify me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* technoholix                                                         */
/* ------------------------------------------------------------------ */

export function Technoholix() {
  return (
    <section id="technoholix" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal relative overflow-hidden rounded-3xl border border-white/10">
          <img
            src={IMG.concert}
            alt="Technoholix"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/70 to-plasma/25" />
          <div className="relative px-6 py-16 text-center sm:px-14 sm:py-24">
            <SectionLabel index="04">
              <span className="mx-auto">Nights</span>
            </SectionLabel>
            <h2 className="animate-flicker font-display text-[clamp(2.4rem,9vw,6.5rem)] font-black leading-none tracking-tight text-white">
              TECHNO<span className="text-gold">HOLIX</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/60">
              When the labs shut, the lakefront lights up. Projection mapping,
              drone shows, international acts and an open-air crowd of 40,000
              under a Mumbai winter sky.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { t: "Drone Light Show", d: "500 synchronised units" },
                { t: "Int'l Headliners", d: "3 nights, 3 acts" },
                { t: "Projection Mapping", d: "On the Convocation Hall" },
              ].map((x) => (
                <div
                  key={x.t}
                  className="glass rounded-xl px-5 py-6 transition hover:-translate-y-1 hover:border-gold/40"
                >
                  <div className="font-display text-lg font-bold text-white">
                    {x.t}
                  </div>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                    {x.d}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* workshops                                                           */
/* ------------------------------------------------------------------ */

export function Workshops() {
  return (
    <section
      id="workshops"
      className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8"
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal">
          <SectionLabel index="05">Workshops</SectionLabel>
          <Heading>
            Learn it on
            <br />
            Saturday. Ship it
            <br />
            by Monday.
          </Heading>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
            Hands-on, instructor-led sessions across 10+ domains, run with
            industry partners and IIT Bombay faculty. Every completed module
            carries an IIT Bombay certificate — and free access passes to the
            entire festival.
          </p>
          <a
            href="#register"
            className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-gold"
          >
            Book a seat
            <span className="h-px w-8 bg-gold transition-all group-hover:w-14" />
          </a>
        </div>

        <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 sm:grid-cols-3">
          {WORKSHOPS.map((w, i) => (
            <div
              key={w}
              className="group relative bg-ink px-4 py-7 transition-colors hover:bg-ink2"
            >
              <span className="font-mono text-[9px] text-gold/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-2 text-[13px] font-medium leading-snug text-white/75 transition group-hover:text-white">
                {w}
              </div>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-aether transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* impact                                                              */
/* ------------------------------------------------------------------ */

export function Impact() {
  const cards = [
    {
      title: "CURED",
      tag: "Healthcare",
      copy: "Nationwide blood-donation and health-screening drives run by the Techfest team through the year.",
    },
    {
      title: "Techfest Outreach",
      tag: "Education",
      copy: "Science workshops taken to municipal schools across Maharashtra — labs on wheels, no fees.",
    },
    {
      title: "Green Campus",
      tag: "Sustainability",
      copy: "Solar retrofits, e-waste collection and a carbon audit of the festival itself.",
    },
    {
      title: "International MUN",
      tag: "Dialogue",
      copy: "Delegates from across the world debating technology policy in the Convocation Hall.",
    },
  ];
  return (
    <section
      id="impact"
      className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8"
    >
      <div className="reveal mb-12 text-center">
        <SectionLabel index="06">
          <span className="mx-auto">Beyond the festival</span>
        </SectionLabel>
        <Heading>A festival with a conscience</Heading>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.title}
            className="reveal glass group relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1.5 hover:border-gold/40"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/10 blur-2xl transition group-hover:bg-gold/25" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-aether/80">
              {c.tag}
            </span>
            <h3 className="mt-3 font-display text-xl font-bold text-white">
              {c.title}
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-white/50">
              {c.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useState } from "react";

const SPONSORS = [
  "QUALCOMM",
  "MICROSOFT",
  "ISRO",
  "DRDO",
  "JIO",
  "GOOGLE",
  "TATA",
  "ADANI",
  "NVIDIA",
  "L&T",
];

export function Sponsors() {
  return (
    <section className="relative z-10 overflow-hidden border-y border-white/8 py-10">
      <p className="mb-7 text-center font-mono text-[10px] uppercase tracking-[0.34em] text-white/35">
        Powered by the people building tomorrow
      </p>
      <div className="flex w-max animate-marquee-fast">
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-14 pr-14">
            {SPONSORS.map((s) => (
              <span
                key={s + k}
                className="font-display text-xl font-bold tracking-[0.18em] text-white/25 transition hover:text-gold sm:text-2xl"
              >
                {s}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Register() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section
      id="register"
      className="relative z-10 mx-auto max-w-7xl px-5 py-28 sm:px-8"
    >
      <div className="reveal relative overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-gold/12 via-ink2 to-plasma/15 px-6 py-16 text-center sm:px-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="animate-spin-slow h-[520px] w-[520px] rounded-full border border-white/5" />
          <div className="animate-spin-slower absolute h-[340px] w-[340px] rounded-full border border-white/5" />
        </div>

        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
            16 — 18 December 2026
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,7vw,5rem)] font-black leading-[0.92] tracking-tight text-white">
            Claim your
            <br />
            <span className="shimmer-text">place in Powai</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/55">
            Registration, campus accommodation (15–19 Dec) and free event passes
            — all in one go. Zonal rounds are already live in 5 countries.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setDone(true);
            }}
            className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@college.edu"
              className="flex-1 rounded-full border border-white/15 bg-black/40 px-5 py-3.5 font-mono text-xs text-white placeholder:text-white/30 outline-none transition focus:border-gold"
            />
            <button
              type="submit"
              className="rounded-full bg-gold px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition hover:scale-[1.03] hover:bg-white"
            >
              {done ? "You're in ✓" : "Register"}
            </button>
          </form>
          {done && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-aether">
              Confirmation sent — see you at the 30th edition.
            </p>
          )}

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
            <span>Accommodation 15–19 Dec</span>
            <span className="text-gold">·</span>
            <span>Free event passes</span>
            <span className="text-gold">·</span>
            <span>20+ countries</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    {
      head: "Festival",
      links: ["Competitions", "Lectures", "Workshops", "Exhibitions", "Technoholix"],
    },
    {
      head: "Participate",
      links: ["Register", "Accommodation", "Zonal Rounds", "Campus Ambassador", "MUN"],
    },
    {
      head: "Organisation",
      links: ["About", "Team", "Sponsors", "Initiatives", "Contact"],
    },
  ];
  return (
    <footer className="relative z-10 border-t border-white/10 bg-ink2/60">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative grid h-10 w-10 place-items-center">
                <span className="absolute inset-0 rotate-45 rounded-[11px] border border-gold/70" />
                <span className="absolute inset-[8px] rounded-full bg-gradient-to-br from-gold to-plasma" />
              </span>
              <div>
                <div className="font-display text-lg font-bold tracking-[0.2em] text-white">
                  TECHFEST
                </div>
                <div className="font-mono text-[9px] tracking-[0.28em] text-gold/80">
                  IIT BOMBAY
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-white/45">
              Asia's largest science and technology festival. Promoting
              technology, scientific thinking and innovation since 1998.
            </p>
            <div className="mt-6 flex gap-2.5">
              {["IG", "X", "IN", "YT", "FB"].map((s) => (
                <a
                  key={s}
                  href="#top"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/12 font-mono text-[10px] text-white/55 transition hover:border-gold hover:text-gold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.head}>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold/80">
                  {c.head}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="text-[13px] text-white/50 transition hover:text-white"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 sm:flex-row">
          <span>© 2026 Techfest, IIT Bombay · Powai, Mumbai 400076</span>
          <span>An Aetherial Renaissance · 30th Edition</span>
        </div>
      </div>
    </footer>
  );
}

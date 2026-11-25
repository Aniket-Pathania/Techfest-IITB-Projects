import { Section } from "../components/Section";
import { Label, Marquee, Reveal, TiltCard } from "../components/ui";
import { SPEAKERS, SPONSORS } from "../data";

export function Speakers() {
  return (
    <Section id="speakers" className="px-5 py-28 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Label>04 — Speakers</Label>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-6 text-4xl font-extrabold leading-[1.02] sm:text-5xl">
                Minds from
                <br />
                <span className="text-cyan">the frontier.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              Keynotes and fireside chats with the people shipping the things everyone else is still tweeting about.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {SPEAKERS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 0.1}>
              <TiltCard className="glass group h-full rounded-3xl p-6 transition-colors" style={{ borderColor: undefined }}>
                <div className="flex items-start justify-between">
                  <div
                    className="font-display flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-black text-void"
                    style={{ background: `linear-gradient(135deg, ${s.hue}, #ffffff)` }}
                  >
                    {s.initials}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">Keynote</span>
                </div>
                <div className="mt-8">
                  <div className="font-display text-xl font-bold">{s.name}</div>
                  <div className="mt-1 text-sm text-white/50">
                    {s.role} · <span className="text-white/75">{s.org}</span>
                  </div>
                </div>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">Talk</div>
                  <div className="mt-1 font-medium transition-colors" style={{ color: s.hue }}>
                    “{s.topic}”
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 0 1px ${s.hue}66, 0 20px 60px -30px ${s.hue}` }}
                />
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 space-y-4 border-y border-white/10 py-6">
          <Label className="px-1">Powered by</Label>
          <Marquee items={SPONSORS} />
          <Marquee items={[...SPONSORS].reverse()} reverse />
        </div>
      </div>
    </Section>
  );
}

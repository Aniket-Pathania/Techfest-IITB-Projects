import { Section } from "../components/Section";
import { Counter, Label, Reveal } from "../components/ui";
import { STATS } from "../data";

const PILLARS = [
  { t: "Compete", d: "120+ competitions across software, hardware, robotics and design with a ₹2 Cr prize pool." },
  { t: "Learn", d: "Workshops and masterclasses by engineers from frontier labs, run on real hardware." },
  { t: "Witness", d: "Exhibitions of humanoids, autonomous vehicles and quantum demos — most for the first time in India." },
];

export function About() {
  return (
    <Section id="about" className="flex items-center px-5 py-28 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-2">
        <div className="max-w-xl">
          <Reveal>
            <Label>01 — About the fest</Label>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-6 text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-6xl">
              Where the future
              <br />
              <span className="text-violet">gets stress-tested.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
              Techfest is a three-day collision of students, researchers and builders. We don't do panels about
              innovation — we hand you a soldering iron, a GPU cluster and a deadline. Edition 29 is themed
              <span className="text-white"> Singularity</span>: the point where tools start building tools.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-2">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <div className="font-display text-4xl font-black tabular-nums text-white sm:text-5xl">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-end gap-4 lg:pl-24">
          <div className="hidden h-[46vh] lg:block" />
          {PILLARS.map((p, i) => (
            <Reveal key={p.t} delay={0.15 + i * 0.1}>
              <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-violet/40">
                <div className="absolute -right-6 -top-6 font-display text-7xl font-black text-white/[0.04] transition-colors group-hover:text-violet/10">
                  0{i + 1}
                </div>
                <div className="font-display text-xl font-bold">{p.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

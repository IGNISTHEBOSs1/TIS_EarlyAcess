import { Shield, Lock, Database, Eye } from "./ui/Icons";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const SAFETY_PILLARS = [
  {
    icon: Lock,
    title: "Client-Side Encrypted Vault",
    tag: "ZERO CLOUD LEAK",
    desc: "Your goals, reflections, and trajectory computations are encrypted locally in your browser's IndexedDB using standard WebCrypto. Not even Kinetic can read what you write.",
  },
  {
    icon: Eye,
    title: "Zero Third-Party Telemetry",
    tag: "NO AD TRACKERS",
    desc: "No Meta pixels, no Google Analytics, no session recorders. Verify this yourself at any time by opening your browser's Network Inspector. Complete silence.",
  },
  {
    icon: Database,
    title: "Instant Export & Zero-Trace Purge",
    tag: "DATA SOVEREIGNTY",
    desc: "Export your entire historical trajectory to clean JSON with one click. Wipe all data completely off your device at any second with zero trace left behind.",
  },
  {
    icon: Shield,
    title: "The One-Email Promise",
    tag: "SPAM-IMMUNE PROTOCOL",
    desc: "We collect your email for exactly one reason: to send your Cohort 01 activation key when the build is ready. No marketing drip campaigns, no partner sales, ever.",
  },
];

export function DataSafetySection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24" aria-labelledby="safety-heading">
      <Reveal>
        <Eyebrow variant="badge">DATA SOVEREIGNTY & PRIVACY ARCHITECTURE</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="safety-heading"
          className="font-display mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.12]"
        >
          Engineered to feel safe. Built so we can't see your life.
        </h2>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
          Most habit and productivity software is built around cloud data monetization. Kinetic is engineered with local-first mathematical integrity: your trajectory belongs entirely to you.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SAFETY_PILLARS.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <Reveal
              key={pillar.title}
              delayMs={i * 70}
              className="kinetic-specular-box p-6 sm:p-8 rounded-2xl border border-[var(--color-border-default)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="size-10 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] flex items-center justify-center text-[var(--color-text-primary)] shadow-xs">
                    <Icon size={18} />
                  </div>
                  <span className="font-tech-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[var(--color-border-default)] text-[var(--color-text-muted)] bg-[var(--color-bg-surface)]">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--color-border-default)] flex items-center justify-between text-[11px] font-tech-mono text-[var(--color-text-muted)]">
                <span>VERIFIABLE CLIENT-SIDE</span>
                <span className="text-[var(--color-text-primary)] font-medium">100% PRIVATE</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

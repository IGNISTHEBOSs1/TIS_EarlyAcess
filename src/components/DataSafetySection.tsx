import { Shield, Lock, Eye, Database } from "./ui/Icons";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const SAFETY_PILLARS = [
  {
    icon: Lock,
    tag: "CLIENT-SIDE STORAGE",
    title: "Local Encrypted Vault",
    desc: "Your goals, reflections, and trajectory vectors are encrypted locally in your browser using standard WebCrypto. Not even Kinetic can read what you write.",
  },
  {
    icon: Eye,
    tag: "VERIFIABLE SILENCE",
    title: "Zero Third-Party Telemetry",
    desc: "No Meta pixels, no Google Analytics, no session recorders. Verify this yourself at any time by opening your browser's Network Inspector. Total client silence.",
  },
  {
    icon: Shield,
    tag: "SPAM-IMMUNE PROTOCOL",
    title: "The One-Email Promise",
    desc: "We collect your email for one reason: to send your Cohort 01 activation key when the build opens. No marketing drip funnels, no partner lists, ever.",
  },
];

export function DataSafetySection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20" aria-labelledby="safety-heading">
      <Reveal>
        <Eyebrow variant="badge">ACT 04 // DATA SOVEREIGNTY ARCHITECTURE</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="safety-heading"
          className="font-display mt-6 max-w-2xl text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.1]"
        >
          Engineered to feel safe. Built so we can't see your life.
        </h2>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed font-body">
          Most habit software monetizes your psychological data in the cloud. Kinetic is engineered with local-first mathematical integrity: your trajectory belongs entirely to your machine.
        </p>
      </Reveal>

      <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAFETY_PILLARS.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <Reveal
              key={pillar.title}
              delayMs={i * 70}
              className="kinetic-specular-box p-6 sm:p-7 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="size-9 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-white/[0.04] flex items-center justify-center text-[var(--color-text-primary)] [box-shadow:inset_0_1px_1px_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.05)] dark:[box-shadow:inset_0_1px_1px_rgba(255,255,255,0.15),0_1px_2px_rgba(0,0,0,0.3)]">
                    <Icon size={16} />
                  </div>
                  <span className="stat-chip px-2.5 py-0.5 font-tech-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-body">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between text-[10px] font-tech-mono text-[var(--color-text-muted)]">
                <span>CLIENT-SIDE AUDITABLE</span>
                <span className="text-[var(--color-text-primary)] font-semibold">100% PRIVATE</span>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Export & Purge Sovereignty Bar */}
      <Reveal delayMs={240} className="mt-6">
        <div className="p-4 rounded-xl debossed-well flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-tech-mono text-[var(--color-text-secondary)]">
          <div className="flex items-center gap-2">
            <Database size={14} className="text-[var(--color-text-primary)] shrink-0" />
            <span>DATA PORTABILITY: 1-click JSON export & 1-click complete zero-trace local device wipe.</span>
          </div>
          <span className="text-[var(--color-text-muted)] uppercase tracking-wider text-[11px]">
            SOVEREIGNTY GUARANTEED
          </span>
        </div>
      </Reveal>
    </section>
  );
}

import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { Target, Layers, Compass, ShieldCheck } from "./ui/Icons";

interface InvariantRule {
  num: string;
  tag: string;
  title: string;
  what: string;
  why: string;
  prevents: string;
  icon: typeof Target;
}

const INVARIANTS: InvariantRule[] = [
  {
    num: "01",
    tag: "DECISION CLARITY",
    title: "Strict 1 Focus Cap",
    what: "Lock in your single highest-leverage outcome each morning in under 60 seconds before touching email or notifications.",
    why: "Cognitive bandwidth is finite. Real velocity comes from finishing one decisive outcome, not managing 20 trivial errands.",
    prevents: "Prevents decision fatigue, backlog paralysis, and the hollow feeling of being busy without making progress.",
    icon: Target,
  },
  {
    num: "02",
    tag: "HABIT STABILITY",
    title: "Strict 2 Routine Anchors",
    what: "Anchor two lightweight, non-negotiable rituals that protect your energy without depleting your daily willpower.",
    why: "Routines preserve stability on high-energy days and chaotic, exhausting ones alike with zero cognitive friction.",
    prevents: "Prevents turning your life into an unsustainable 15-item habit checklist that inevitably collapses.",
    icon: Layers,
  },
  {
    num: "03",
    tag: "RESILIENT VECTOR",
    title: "The ±10% Buffer Cone",
    what: "A mathematical tolerance corridor calibrated continuously across your cumulative 90-day trajectory.",
    why: "Streaks are static tallies that shatter on an off-day. Trajectory is dynamic velocity that measures cumulative achievement.",
    prevents: "Prevents the all-or-nothing guilt spiral. Your streak may reset in other apps, but your vector never restarts at zero.",
    icon: Compass,
  },
];

export function FourBeliefs() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24" aria-labelledby="invariants-heading">
      <Reveal>
        <Eyebrow variant="badge">ACT 03 // THE THREE INVARIANTS</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="invariants-heading"
          className="font-display mt-6 max-w-3xl text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.1]"
        >
          Fewer decisions. Deeper follow-through.
        </h2>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed font-body">
          Kinetic is strictly constrained by three mathematical guardrails designed to eliminate cognitive overload.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {INVARIANTS.map((rule, i) => {
          const Icon = rule.icon;
          return (
            <Reveal
              key={rule.num}
              delayMs={i * 80}
              className="kinetic-specular-box p-6 sm:p-7 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="size-10 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-white/[0.04] flex items-center justify-center text-[var(--color-text-primary)] [box-shadow:inset_0_1px_1px_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.05)] dark:[box-shadow:inset_0_1px_1px_rgba(255,255,255,0.15),0_1px_2px_rgba(0,0,0,0.3)]">
                    <Icon size={18} />
                  </div>
                  <span className="font-tech-mono font-bold text-xs text-[var(--color-text-muted)] tracking-wider">
                    RULE {rule.num}
                  </span>
                </div>

                <span className="font-tech-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                  {rule.tag}
                </span>
                <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)] mt-1 tracking-tight">
                  {rule.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-body">
                  {rule.what}
                </p>

                <div className="mt-4 p-3 rounded-xl debossed-well text-[11px] leading-relaxed text-[var(--color-text-secondary)] font-body">
                  <strong className="text-[var(--color-text-primary)] font-semibold">Prevents: </strong>
                  {rule.prevents}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between font-tech-mono text-[10px] text-[var(--color-text-muted)]">
                <span>ENFORCED AT RUNTIME</span>
                <span className="text-[var(--color-text-primary)] font-bold">100% DETERMINISTIC</span>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Anti-RPG Gamification Invariant Strip */}
      <Reveal delayMs={240} className="mt-6">
        <div className="p-4 rounded-xl border border-[var(--color-border-default)] bg-black/[0.02] dark:bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-tech-mono text-[var(--color-text-secondary)]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[var(--color-text-primary)] shrink-0" />
            <span>ANTI-GAMIFICATION CONTRACT: No XP bars, no fantasy hunter ranks, no cartoon badges.</span>
          </div>
          <span className="text-[var(--color-text-muted)] uppercase tracking-wider text-[11px]">
            REAL LIFE // REAL SERIOUSNESS
          </span>
        </div>
      </Reveal>
    </section>
  );
}

import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const TRAJECTORY_BARS = [22, 28, 24, 32, 30, 38, 42, 46, 50, 58, 64, 70, 78, 86, 94];

interface Moment {
  label: string;
  title: string;
  body: string;
}

const MOMENTS: Moment[] = [
  {
    label: "01 · The task",
    title: "One clear thing, queued for you.",
    body: "Close the day at 22:30 — chosen for you, not buried in a list of forty other things you're supposed to remember to do.",
  },
  {
    label: "02 · The trajectory",
    title: "Thirty days, compounding quietly.",
    body: "Progress that used to live only in your head, rendered back as something you can actually see accumulate.",
  },
  {
    label: "03 · The reflection",
    title: "Momentum, before it looks like anything.",
    body: "You've kept your word to yourself six days running. This is what momentum feels like before it looks like anything.",
  },
];

/**
 * Three distinct panels — matching the section heading ("Three moments
 * that matter") literally. Each panel is self-contained visual + copy,
 * not a single merged dashboard mockup.
 */
export function MomentsShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 sm:py-36" aria-labelledby="moments-heading">
      <Reveal>
        <Eyebrow>A look inside</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="moments-heading"
          className="font-display mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
        >
          Three moments that matter.
        </h2>
      </Reveal>

      <div className="mt-16 space-y-24 sm:space-y-32">
        <Reveal delayMs={40} className="grid items-center gap-10 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs text-white/40">{MOMENTS[0].label}</p>
            <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-white">{MOMENTS[0].title}</h3>
            <p className="mt-3 max-w-md text-white/60">{MOMENTS[0].body}</p>
          </div>
          <div
            aria-hidden="true"
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 font-mono text-xs text-white/40">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="ml-2">the-system / today</span>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 text-sm">
              <label className="flex items-center gap-3 text-white/80">
                <input type="checkbox" checked readOnly tabIndex={-1} />
                Close the day at 22:30
              </label>
              <span className="font-mono text-xs text-white/40">Queued</span>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={40} className="grid items-center gap-10 sm:grid-cols-2">
          <div className="order-2 sm:order-1" aria-hidden="true">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between font-mono text-xs text-white/40">
                <span>Trajectory · 30 days</span>
                <span>+ compounding</span>
              </div>
              <div className="mt-4 flex items-end gap-1.5" style={{ height: 100 }}>
                {TRAJECTORY_BARS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-white/20 to-white/50"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-5">
                <div className="h-1.5 w-full rounded-full bg-white/10">
                  <div className="h-full w-1/4 rounded-full bg-white/60" />
                </div>
                <p className="mt-1.5 font-mono text-[11px] text-white/30">
                  Cognitive load — low · protected focus
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 sm:order-2">
            <p className="font-mono text-xs text-white/40">{MOMENTS[1].label}</p>
            <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-white">{MOMENTS[1].title}</h3>
            <p className="mt-3 max-w-md text-white/60">{MOMENTS[1].body}</p>
          </div>
        </Reveal>

        <Reveal delayMs={40} className="grid items-center gap-10 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs text-white/40">{MOMENTS[2].label}</p>
            <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-white">{MOMENTS[2].title}</h3>
          </div>
          <blockquote className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-lg text-white/70">
            {MOMENTS[2].body}
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

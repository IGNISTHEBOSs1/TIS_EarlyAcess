import { Reveal } from "./Reveal";

interface Feature {
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    title: "Fewer decisions, deeper ones.",
    body: "Instead of endless features, you get a small number of meaningful moves each day — chosen with you, in service of who you're becoming. Simplicity is the feature.",
  },
  {
    title: "You are not a character in a game.",
    body: "No points, no levels, no fantasy avatar. Improvement is treated with the seriousness of your real life — because that's exactly what it is.",
  },
];

export function FeaturePitch() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32" aria-label="Product principles">
      <div className="grid gap-12 sm:grid-cols-2">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delayMs={i * 100}>
            <h3 className="text-xl font-semibold text-white">{f.title}</h3>
            <p className="mt-3 text-white/60">{f.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

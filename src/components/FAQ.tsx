import { useState } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { AccordionItem } from "./AccordionItem";

const FAQS = [
  {
    question: "Why does Kinetic use a ±10% buffer instead of conventional streaks?",
    answer:
      "Because human lives are not robotic clocks. Illness, unexpected travel, and emergencies happen. Traditional streak apps reset your count from Day 60 to Day 0 upon a single missed day, triggering guilt and abandonment. Kinetic's ±10% mathematical buffer cone absorbs that volatility so your 90-day vector stays unbroken.",
  },
  {
    question: "Where is my data stored? Does Kinetic harvest my personal habits?",
    answer:
      "Your data never leaves your machine. Kinetic is engineered with local-first client-side architecture using IndexedDB and WebCrypto encryption. There are zero third-party tracking pixels, zero analytics scripts, and zero cloud leaks. You own your trajectory entirely.",
  },
  {
    question: "Why the strict limit of 1 Primary Focus + 2 Routines?",
    answer:
      "Cognitive overload is the number one reason personal improvement systems collapse. Sustained personal velocity comes from executing one decisive high-leverage move each day and anchoring two low-friction foundation rituals — not managing a demoralizing 20-item checklist.",
  },
  {
    question: "Is Kinetic gamified? Are there XP bars, levels, or avatar ranks?",
    answer:
      "No. We strictly reject RPG gamification tropes. You are not a fantasy character in an idle game. Kinetic treats your real life with adult seriousness, framing your progress as quiet mathematical velocity and deterministic personal trajectory.",
  },
  {
    question: "What happens to my email when I request early access?",
    answer:
      "We send you exactly one email: your Cohort 01 activation key when the build opens. We do not send marketing newsletters, automated sales funnels, or promotional partner emails. You can also self-serve unsubscribe with one click.",
  },
  {
    question: "Will Kinetic be free?",
    answer:
      "Yes. The core local-first encrypted browser version is free forever. Early access members in Cohort 01 also receive founding member terms for any optional future multi-device sync protocols.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24" aria-labelledby="faq-heading">
      <Reveal>
        <Eyebrow variant="badge">ARCHITECTURAL QUESTIONS</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="faq-heading"
          className="font-display mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.12]"
        >
          Frequently answered questions.
        </h2>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
          Everything you need to know about our privacy architecture, mathematical buffer model, and early access rollout.
        </p>
      </Reveal>

      <Reveal delayMs={160} className="mt-10">
        <div className="kinetic-specular-box p-6 sm:p-10 rounded-2xl md:rounded-3xl border border-[var(--color-border-default)]">
          {FAQS.map((item, i) => (
            <AccordionItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

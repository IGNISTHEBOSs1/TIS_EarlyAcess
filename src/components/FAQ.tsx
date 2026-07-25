import { useState } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { AccordionItem } from "./AccordionItem";

const FAQS = [
  {
    question: "Is this just another habit tracker?",
    answer:
      "No. Habit trackers ask you to log everything yourself. This system holds direction and progress for you, and gives it back as something you can feel — not another checklist to maintain.",
  },
  {
    question: "Why is there nothing to try yet?",
    answer:
      "We're building in public and refining the core experience with early waitlist members before opening it more broadly. Joining now means shaping what ships.",
  },
  {
    question: "What will it cost?",
    answer:
      "Pricing hasn't been finalized. Waitlist members will hear about it first, and early access typically comes with founding-member terms.",
  },
  {
    question: "Is it gamified? Points, levels, avatars?",
    answer:
      "No. There are no points, levels, or avatars. Improvement is treated with the seriousness of your real life, not as a game layer on top of it.",
  },
  {
    question: "What happens to my email?",
    answer:
      "It's used only to notify you about access and product updates. One email to join, no spam, and you can leave whenever you want.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-6 py-28" aria-labelledby="faq-heading">
      <Reveal>
        <Eyebrow>Before you ask</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2 id="faq-heading" className="mt-6 text-4xl font-bold text-white sm:text-5xl">
          Fair questions.
        </h2>
      </Reveal>

      <Reveal delayMs={160} className="mt-10">
        <div>
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

import { useId } from "react";
import { ChevronDown } from "./ui/Icons";
import { useSoundEffects } from "../hooks/useSoundEffects";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  const panelId = useId();
  const buttonId = useId();
  const { playTap } = useSoundEffects();

  const handleToggle = () => {
    playTap();
    onToggle();
  };

  return (
    <div className="border-b border-black/[0.08] dark:border-white/[0.08] transition-colors">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={handleToggle}
          className="flex w-full items-center justify-between gap-4 py-5 sm:py-6 text-left font-display font-semibold text-base sm:text-lg text-[var(--color-text-primary)] hover:opacity-80 transition-all select-none"
        >
          <span>{question}</span>
          <span
            className={`flex size-7 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-zinc-800 text-[var(--color-text-secondary)] shrink-0 transition-transform duration-200 [box-shadow:inset_0_1px_1px_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.06)] dark:[box-shadow:inset_0_1px_1px_rgba(255,255,255,0.15),0_1px_2px_rgba(0,0,0,0.4)] ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronDown size={14} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-body max-w-2xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

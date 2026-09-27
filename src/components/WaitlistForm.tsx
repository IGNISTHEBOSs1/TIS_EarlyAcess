import { useId, useState } from "react";
import type { FormEvent } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { SmoothInput } from "./SmoothInput";

type Status = "idle" | "submitting" | "success" | "error";

interface WaitlistFormProps {
  onSubmit?: (email: string, context: string) => Promise<void> | void;
}

export function WaitlistForm({ onSubmit }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");
  const [showOptional, setShowOptional] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const emailId = useId();
  const contextId = useId();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setStatus("submitting");
    try {
      await onSubmit?.(email, context);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Try again.");
    }
  };

  if (status === "success") {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-16" aria-live="polite">
        <p className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">You're on the list.</p>
        <p className="mt-2 text-[var(--color-text-secondary)]">We'll be in touch before public launch.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-16" aria-labelledby="waitlist-heading">
      <Reveal>
        <Eyebrow>The waitlist</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2 id="waitlist-heading" className="font-[var(--font-display)] mt-6 text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
          Be early. Shape it.
        </h2>
        <p className="mt-4 max-w-md text-[var(--color-text-secondary)]">
          One field to join. The rest is optional — but it genuinely helps us
          build the right thing first.
        </p>
      </Reveal>

      <Reveal delayMs={160} className="mt-10">
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <SmoothInput
            id={emailId}
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? `${emailId}-error` : undefined}
            wrapperClassName="border-b border-[var(--color-border-default)] pb-3 focus-within:border-[var(--color-border-focus)] transition-colors"
            className="text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-neutral-500)]"
          />
          {error && (
            <p id={`${emailId}-error`} className="mt-2 text-sm text-[var(--color-error-600)]" role="alert">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowOptional((v) => !v)}
              aria-expanded={showOptional}
              aria-controls={contextId}
              className="flex items-center gap-1.5 font-[var(--font-mono)] text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className={`transition-transform duration-200 ${showOptional ? "rotate-180" : ""}`}
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Help us build the right thing (optional)
            </button>

            <Button type="submit" variant="primary" icon disabled={status === "submitting"} className="group">
              {status === "submitting" ? "Joining…" : "Join the waitlist"}
            </Button>
          </div>

          <div
            id={contextId}
            className={`grid overflow-hidden transition-all duration-300 ${
              showOptional ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <label htmlFor={`${contextId}-textarea`} className="sr-only">
                What would help you most?
              </label>
              <textarea
                id={`${contextId}-textarea`}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={3}
                placeholder="What are you hoping this helps you with?"
                className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-border-focus)]"
              />
            </div>
          </div>
        </form>
      </Reveal>
    </section>
  );
}

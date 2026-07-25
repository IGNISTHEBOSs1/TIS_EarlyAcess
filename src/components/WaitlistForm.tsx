import { useId, useState } from "react";
import type { FormEvent } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { Button } from "./Button";

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
      <section className="mx-auto max-w-3xl px-6 py-32 sm:py-40" aria-live="polite">
        <p className="text-2xl font-semibold text-white">You're on the list.</p>
        <p className="mt-2 text-white/60">We'll be in touch before public launch.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-32 sm:py-40" aria-labelledby="waitlist-heading">
      <Reveal>
        <Eyebrow>The waitlist</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2 id="waitlist-heading" className="mt-6 text-4xl font-bold text-white sm:text-5xl">
          Be early. Shape it.
        </h2>
        <p className="mt-4 max-w-md text-white/60">
          One field to join. The rest is optional — but it genuinely helps us
          build the right thing first.
        </p>
      </Reveal>

      <Reveal delayMs={160} className="mt-10">
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <input
            id={emailId}
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? `${emailId}-error` : undefined}
            className="w-full border-b border-white/20 bg-transparent pb-3 text-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
          />
          {error && (
            <p id={`${emailId}-error`} className="mt-2 text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowOptional((v) => !v)}
              aria-expanded={showOptional}
              aria-controls={contextId}
              className="flex items-center gap-1.5 font-mono text-xs text-white/50 hover:text-white/80 transition-colors"
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

            <Button type="submit" variant="primary" icon disabled={status === "submitting"} className="group text-black">
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
                className="w-full resize-none rounded-lg border border-white/15 bg-white/[0.03] p-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40"
              />
            </div>
          </div>
        </form>
      </Reveal>
    </section>
  );
}

import { useId, useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { ShieldCheck, Lock, Check, Copy } from "./ui/Icons";
import { useSoundEffects } from "../hooks/useSoundEffects";

type Status = "idle" | "submitting" | "success" | "error";

interface StoredTicket {
  ticketId: string;
  email: string;
  cohort: string;
  registeredAt: string;
}

const TICKET_STORAGE_KEY = "kinetic-cohort-ticket";

interface WaitlistFormProps {
  onSubmit?: (email: string, context: string) => Promise<void> | void;
}

export function WaitlistForm({ onSubmit }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");
  const [showOptional, setShowOptional] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<StoredTicket | null>(null);
  const [copied, setCopied] = useState(false);

  const emailId = useId();
  const contextId = useId();
  const { playSuccess, playConfirmation, playButtonPress } = useSoundEffects();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(TICKET_STORAGE_KEY);
      if (saved) {
        setTicket(JSON.parse(saved));
        setStatus("success");
      }
    } catch {
      // Ignore private mode
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setStatus("submitting");

    try {
      await onSubmit?.(email, context);

      // Generate verifiable local cohort pass
      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      const newTicket: StoredTicket = {
        ticketId: `KNT-01-${randomSeq}`,
        email: email.trim(),
        cohort: "COHORT 01 // FOUNDING TIER",
        registeredAt: new Date().toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };

      try {
        localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(newTicket));
      } catch {
        // ignore
      }

      setTicket(newTicket);
      setStatus("success");
      playSuccess();
    } catch {
      setStatus("error");
      setError("Unable to process reservation. Please check your connection and retry.");
    }
  };

  const copyTicketId = () => {
    if (!ticket) return;
    navigator.clipboard.writeText(ticket.ticketId);
    setCopied(true);
    playConfirmation();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    playButtonPress();
    localStorage.removeItem(TICKET_STORAGE_KEY);
    setTicket(null);
    setStatus("idle");
    setEmail("");
    setContext("");
  };

  return (
    <section
      id="waitlist"
      className="mx-auto max-w-4xl px-6 py-16 sm:py-24"
      aria-labelledby="waitlist-heading"
    >
      <Reveal>
        <Eyebrow variant="badge">EARLY ACCESS PROTOCOL // COHORT 01</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="waitlist-heading"
          className="font-display mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.12]"
        >
          Reserve your place. Shape the v1 release.
        </h2>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed font-body">
          Cohort 01 is capped at 250 founding members to ensure direct engineering support and architecture refinement. One email to join. Zero marketing noise.
        </p>
      </Reveal>

      <Reveal delayMs={160} className="mt-10">
        <div className="kinetic-specular-box p-6 sm:p-10 rounded-2xl md:rounded-3xl border border-[var(--color-border-default)]">
          {status === "success" && ticket ? (
            /* Secured Cohort Pass State */
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-default)]">
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <span className="font-tech-mono text-xs uppercase tracking-widest text-[var(--color-text-primary)] font-bold">
                    RESERVATION SECURED
                  </span>
                </div>
                <span className="font-tech-mono text-xs text-[var(--color-text-muted)]">
                  {ticket.registeredAt}
                </span>
              </div>

              {/* Digital Access Pass Voucher */}
              <div className="p-6 rounded-2xl border border-black/15 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.03] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="font-tech-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                    FOUNDING COHORT TICKET
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] mt-1 tnum">
                    {ticket.ticketId}
                  </h3>
                  <p className="font-tech-mono text-xs text-[var(--color-text-secondary)] mt-1">
                    Registered to: {ticket.email}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyTicketId}
                    className="font-tech-mono text-xs"
                  >
                    {copied ? (
                      <span className="flex items-center gap-1.5">
                        <Check size={13} /> Copied Ticket ID
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Copy size={13} /> Copy Ticket ID
                      </span>
                    )}
                  </Button>
                </div>
              </div>

              {/* Safety Guarantees Confirmation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-xs">
                  <span className="font-display font-bold text-[var(--color-text-primary)] block">
                    Zero Marketing Drips
                  </span>
                  <span className="font-tech-mono text-[11px] text-[var(--color-text-muted)] block mt-0.5">
                    1 single launch email only
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-xs">
                  <span className="font-display font-bold text-[var(--color-text-primary)] block">
                    Local-First Tier Included
                  </span>
                  <span className="font-tech-mono text-[11px] text-[var(--color-text-muted)] block mt-0.5">
                    100% Free forever
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-xs">
                  <span className="font-display font-bold text-[var(--color-text-primary)] block">
                    Data Sovereignty
                  </span>
                  <span className="font-tech-mono text-[11px] text-[var(--color-text-muted)] block mt-0.5">
                    Zero third-party trackers
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="font-tech-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors underline"
                >
                  Register a different email
                </button>
              </div>
            </div>
          ) : (
            /* Active Registration Form */
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={emailId}
                  className="font-display font-bold text-sm text-[var(--color-text-primary)]"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    id={emailId}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${emailId}-error` : undefined}
                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)] font-body text-base transition-all"
                  />
                </div>
                {error && (
                  <p id={`${emailId}-error`} className="text-xs text-[var(--color-text-primary)] font-semibold mt-1" role="alert">
                    {error}
                  </p>
                )}
              </div>

              {/* Optional Context Drawer */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowOptional((v) => !v)}
                  aria-expanded={showOptional}
                  aria-controls={contextId}
                  className="flex items-center gap-1.5 font-tech-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <span className="text-[10px]">{showOptional ? "▼" : "▶"}</span>
                  <span>Help shape Cohort 01: What habit or tool has failed you before? (Optional)</span>
                </button>

                {showOptional && (
                  <div id={contextId} className="mt-3">
                    <textarea
                      rows={3}
                      placeholder="e.g., Streak apps always reset when I travel or get sick, which ruins my motivation..."
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-border-focus)] text-xs sm:text-sm font-body resize-none transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Safety Badges & Submit Button */}
              <div className="mt-8 pt-6 border-t border-[var(--color-border-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1 text-[11px] font-tech-mono text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-[var(--color-text-primary)]" />
                    No spam guarantee · 1 launch key email only
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock size={13} className="text-[var(--color-text-primary)]" />
                    Zero credit card · Free forever local-first tier
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon
                  disabled={status === "submitting"}
                  className="group self-start sm:self-auto"
                >
                  {status === "submitting" ? "Reserving..." : "Reserve My Seat"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}

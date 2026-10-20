import { useState } from "react";
import { MonochromaticMeshBackground } from "./MonochromaticMeshBackground";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { MarqueeBelt } from "./MarqueeBelt";
import { TrajectoryVisualizer } from "./TrajectoryVisualizer";
import { FourBeliefs } from "./FourBeliefs";
import { DataSafetySection } from "./DataSafetySection";
import { WaitlistForm } from "./WaitlistForm";
import { FAQ } from "./FAQ";
import { ClosingStatement } from "./ClosingStatement";
import { Footer } from "./Footer";

/**
 * Kinetic · Personal Trajectory Engine — Early Access Waitlist
 * Decluttered, high-converting 6-act narrative arc:
 * Act 1: The Hook & Fast Inline Reservation + Product Dashboard Preview
 * Act 2: Architectural Contrast & Interactive ±10% Buffer Cone Proof
 * Act 3: The 3 Daily Invariants (1 Focus + 2 Routines + Buffer)
 * Act 4: Verifiable Data Sovereignty & Local-First Vault
 * Act 5: Cohort 01 Enrollment Terminal
 * Act 6: Architectural Q&A and Minimalist Close
 */
export default function LandingPage() {
  const [fastEmail, setFastEmail] = useState("");

  const handleWaitlistSubmit = async (email: string, context: string) => {
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, context }),
      });
    } catch {
      // Gracefully continue to local client-side confirmation
    }
  };

  const handleFastSubmit = (email: string) => {
    setFastEmail(email);
    handleWaitlistSubmit(email, "Fast reservation from hero");
  };

  return (
    <div className="relative min-h-screen text-[var(--color-text-primary)] antialiased bg-[var(--color-bg-page)] selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-950">
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link font-tech-mono text-xs">
        Skip to main content
      </a>

      {/* Kinetic Monochromatic Motion Background */}
      <MonochromaticMeshBackground />

      {/* Floating Glass Island Navbar */}
      <Navbar />

      {/* Main Content: 6-Act Decluttered Flow */}
      <main id="main-content" className="relative z-10">
        {/* Act 1: Hero Hook + Fast Inline Reservation + Dashboard Preview */}
        <Hero onFastSubmit={handleFastSubmit} />

        {/* Technical Ticker */}
        <MarqueeBelt />

        {/* Act 2: Streaks Shatter. Trajectory Absorbs (Interactive Buffer Proof) */}
        <TrajectoryVisualizer />

        {/* Act 3: The 3 Invariants (1 Focus + 2 Routines + Buffer Cone) */}
        <FourBeliefs />

        {/* Act 4: Data Sovereignty Architecture & Local Vault */}
        <DataSafetySection />

        {/* Act 5: Cohort 01 Enrollment Terminal & Digital Access Pass */}
        <WaitlistForm initialEmail={fastEmail} onSubmit={handleWaitlistSubmit} />

        {/* Act 6: High-Signal Q&A & Quiet Close */}
        <FAQ />
        <ClosingStatement />
      </main>

      {/* Neoskeuomorphic Footer */}
      <Footer />
    </div>
  );
}

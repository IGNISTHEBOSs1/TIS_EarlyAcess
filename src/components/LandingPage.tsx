import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { MarqueeBelt } from "./MarqueeBelt";
import { Philosophy } from "./Philosophy";
import { FourBeliefs } from "./FourBeliefs";
import { MomentsShowcase } from "./MomentsShowcase";
import { BuildingInPublic } from "./BuildingInPublic";
import { FAQ } from "./FAQ";
import { ClosingStatement } from "./ClosingStatement";
import { WaitlistForm } from "./WaitlistForm";
import { Footer } from "./Footer";

/**
 * Top-level composition. Each section is self-contained and
 * independently reusable/testable — none of them reach into siblings'
 * state, so this stays a plain layout component with no logic of its own.
 */
export default function LandingPage() {
  const handleWaitlistSubmit = async (email: string, context: string) => {
    // Wire this up to your actual signup endpoint.
    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, context }),
    });
  };

  return (
    <div className="min-h-screen text-[var(--color-text-primary)] antialiased">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <MarqueeBelt />
        <Philosophy />
        <FourBeliefs />
        <MomentsShowcase />
        <BuildingInPublic />
        <WaitlistForm onSubmit={handleWaitlistSubmit} />
        <FAQ />
        <ClosingStatement />
      </main>
      <Footer />
    </div>
  );
}

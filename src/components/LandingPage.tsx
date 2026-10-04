import { MonochromaticMeshBackground } from "./MonochromaticMeshBackground";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { MarqueeBelt } from "./MarqueeBelt";
import { Philosophy } from "./Philosophy";
import { ComparisonTable } from "./ComparisonTable";
import { FourBeliefs } from "./FourBeliefs";
import { MomentsShowcase } from "./MomentsShowcase";
import { DataSafetySection } from "./DataSafetySection";
import { BuildingInPublic } from "./BuildingInPublic";
import { WaitlistForm } from "./WaitlistForm";
import { FAQ } from "./FAQ";
import { ClosingStatement } from "./ClosingStatement";
import { Footer } from "./Footer";

/**
 * Kinetic · The Improvement System — Early Access Waitlist & Safety Showcase
 * Composes the complete neoskeuomorphic, monochromatic product landing experience.
 */
export default function LandingPage() {
  const handleWaitlistSubmit = async (email: string, context: string) => {
    try {
      // Attempt backend API if available
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, context }),
      });
    } catch {
      // Gracefully continue to local client-side confirmation
    }
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

      {/* Main Content Flow */}
      <main id="main-content" className="relative z-10">
        <Hero />
        <MarqueeBelt />
        <Philosophy />
        <ComparisonTable />
        <FourBeliefs />
        <MomentsShowcase />
        <DataSafetySection />
        <BuildingInPublic />
        <WaitlistForm onSubmit={handleWaitlistSubmit} />
        <FAQ />
        <ClosingStatement />
      </main>

      {/* Neoskeuomorphic Footer */}
      <Footer />
    </div>
  );
}

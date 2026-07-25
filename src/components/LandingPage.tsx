import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { MarqueeBelt } from "./MarqueeBelt";
import { Philosophy } from "./Philosophy";
import { FeaturePitch } from "./FeaturePitch";
import { MomentsShowcase } from "./MomentsShowcase";
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
  const waitlistCount = 1;

  const handleWaitlistSubmit = async (email: string, context: string) => {
    // Wire this up to your actual signup endpoint.
    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, context }),
    });
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <Navbar waitlistCount={waitlistCount} />
      <main>
        <Hero />
        <MarqueeBelt />
        <Philosophy />
        <FeaturePitch />
        <MomentsShowcase />
        <FAQ />
        <ClosingStatement />
        <WaitlistForm onSubmit={handleWaitlistSubmit} />
      </main>
      <Footer />
    </div>
  );
}

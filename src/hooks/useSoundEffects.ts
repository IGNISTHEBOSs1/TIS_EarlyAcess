import { useState, useEffect, useCallback } from "react";

const SOUND_KEY = "system-sound-enabled";

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(SOUND_KEY);
        this.enabled = saved !== null ? JSON.parse(saved) : true;
      } catch {
        this.enabled = true;
      }

      window.addEventListener("storage", (e) => {
        if (e.key === SOUND_KEY && e.newValue !== null) {
          try {
            this.enabled = JSON.parse(e.newValue);
          } catch {
            // ignore
          }
        }
      });
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(SOUND_KEY, JSON.stringify(val));
        window.dispatchEvent(
          new CustomEvent("kinetic-sound-change", { detail: { enabled: val } })
        );
      } catch {
        // ignore
      }
    }
  }

  public toggle(): boolean {
    const next = !this.enabled;
    this.setEnabled(next);
    return next;
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return null;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  /**
   * Tactile Micro-Click: Crisp, velvety mechanical press.
   * Mimics a high-end micro-switch or trackpad haptic.
   */
  public playButtonPress() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(720, now);
    osc1.frequency.exponentialRampToValueAtTime(1240, now + 0.012);

    gain1.gain.setValueAtTime(0.06, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc1.start(now);
    osc1.stop(now + 0.035);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(280, now);
    osc2.frequency.exponentialRampToValueAtTime(140, now + 0.025);

    gain2.gain.setValueAtTime(0.04, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc2.start(now);
    osc2.stop(now + 0.025);
  }

  public playTap() {
    this.playButtonPress();
  }

  /**
   * Harmonic Success Bloom: Pentatonic major chord.
   * Quiet, peaceful, rewarding feedback upon waitlist registration.
   */
  public playSuccess() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [
      { freq: 523.25, time: 0, dur: 0.38, vol: 0.12 },
      { freq: 659.25, time: 0.045, dur: 0.35, vol: 0.13 },
      { freq: 783.99, time: 0.09, dur: 0.38, vol: 0.14 },
      { freq: 1046.5, time: 0.14, dur: 0.44, vol: 0.11 },
    ];

    notes.forEach(({ freq, time, dur, vol }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.001, now + time);
      gain.gain.linearRampToValueAtTime(vol, now + time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });

    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmer.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);

    shimmer.type = "sine";
    shimmer.frequency.setValueAtTime(1318.5, now + 0.18);

    shimmerGain.gain.setValueAtTime(0.001, now + 0.18);
    shimmerGain.gain.linearRampToValueAtTime(0.05, now + 0.2);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);

    shimmer.start(now + 0.18);
    shimmer.stop(now + 0.48);
  }

  /**
   * Tactile Affirmation / Toggle: Snappy two-tone toggle.
   */
  public playConfirmation() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(580, now);
    osc1.frequency.exponentialRampToValueAtTime(840, now + 0.04);

    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc1.start(now);
    osc1.stop(now + 0.07);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(920, now + 0.045);
    osc2.frequency.exponentialRampToValueAtTime(1180, now + 0.085);

    gain2.gain.setValueAtTime(0.07, now + 0.045);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    osc2.start(now + 0.045);
    osc2.stop(now + 0.11);
  }

  public playToggle() {
    this.playConfirmation();
  }
}

export const soundEngine = new SoundEngine();

export const useSoundEffects = () => {
  const [soundEnabled, setSoundEnabledState] = useState(() =>
    soundEngine.isEnabled()
  );

  useEffect(() => {
    const handleSoundChange = (e: Event) => {
      const detail = (e as CustomEvent<{ enabled: boolean }>).detail;
      if (detail && typeof detail.enabled === "boolean") {
        setSoundEnabledState(detail.enabled);
      } else {
        setSoundEnabledState(soundEngine.isEnabled());
      }
    };

    window.addEventListener("kinetic-sound-change", handleSoundChange);
    return () => {
      window.removeEventListener("kinetic-sound-change", handleSoundChange);
    };
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    soundEngine.setEnabled(enabled);
    setSoundEnabledState(enabled);
  }, []);

  const toggleSound = useCallback(() => {
    const next = soundEngine.toggle();
    setSoundEnabledState(next);
    if (next) {
      soundEngine.playConfirmation();
    }
  }, []);

  const playTap = useCallback(() => soundEngine.playTap(), []);
  const playButtonPress = useCallback(() => soundEngine.playButtonPress(), []);
  const playSuccess = useCallback(() => soundEngine.playSuccess(), []);
  const playConfirmation = useCallback(() => soundEngine.playConfirmation(), []);
  const playToggle = useCallback(() => soundEngine.playToggle(), []);

  return {
    soundEnabled,
    setSoundEnabled,
    toggleSound,
    playTap,
    playButtonPress,
    playSuccess,
    playConfirmation,
    playToggle,
  };
};

import { useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';

const HOVER = { frequency: 600, duration: 0.02,  gain: 0.12, wave: 'square' as OscillatorType };
const CLICK = { frequency: 400, duration: 0.05,  gain: 0.20, wave: 'square' as OscillatorType };

// Singleton — shared across all useSound() instances, survives re-renders
let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!sharedCtx) sharedCtx = new AudioContext();
  return sharedCtx;
}

function fire(frequency: number, duration: number, gain: number, wave: OscillatorType) {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(gain, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
    osc.onended = () => { osc.disconnect(); gainNode.disconnect(); };
  } catch {
    // AudioContext blocked or unavailable — silent fail
  }
}

// Mechanical keyboard simulation: sharp click (high freq) + thump (low freq)
function fireKeyClick() {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime;

    // Click layer — sharp transient
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(1200, t);
    clickOsc.frequency.exponentialRampToValueAtTime(600, t + 0.012);
    clickGain.gain.setValueAtTime(0.14, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.018);
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(t);
    clickOsc.stop(t + 0.018);
    clickOsc.onended = () => { clickOsc.disconnect(); clickGain.disconnect(); };

    // Thump layer — body of the keystroke
    const thumpOsc = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thumpOsc.type = 'triangle';
    thumpOsc.frequency.setValueAtTime(180, t + 0.008);
    thumpOsc.frequency.exponentialRampToValueAtTime(80, t + 0.045);
    thumpGain.gain.setValueAtTime(0.0, t);
    thumpGain.gain.setValueAtTime(0.10, t + 0.008);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);
    thumpOsc.connect(thumpGain);
    thumpGain.connect(ctx.destination);
    thumpOsc.start(t + 0.008);
    thumpOsc.stop(t + 0.055);
    thumpOsc.onended = () => { thumpOsc.disconnect(); thumpGain.disconnect(); };
  } catch {
    // AudioContext blocked or unavailable — silent fail
  }
}

export function useSound() {
  const soundEnabled = useAppStore((s) => s.soundEnabled);

  const playTyping = useCallback(() => { if (soundEnabled) fireKeyClick(); }, [soundEnabled]);
  const playHover  = useCallback(() => { if (soundEnabled) fire(HOVER.frequency, HOVER.duration, HOVER.gain, HOVER.wave); }, [soundEnabled]);
  const playClick  = useCallback(() => { if (soundEnabled) fire(CLICK.frequency, CLICK.duration, CLICK.gain, CLICK.wave); }, [soundEnabled]);

  return { playTyping, playHover, playClick };
}

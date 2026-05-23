import { useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';

const TYPING = { frequency: 440, duration: 0.025, gain: 0.08, wave: 'sine'   as OscillatorType };
const HOVER  = { frequency: 600, duration: 0.02,  gain: 0.12, wave: 'square' as OscillatorType };
const CLICK  = { frequency: 400, duration: 0.05,  gain: 0.20, wave: 'square' as OscillatorType };

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

export function useSound() {
  const soundEnabled = useAppStore((s) => s.soundEnabled);

  const playTyping = useCallback(() => { if (soundEnabled) fire(TYPING.frequency, TYPING.duration, TYPING.gain, TYPING.wave); }, [soundEnabled]);
  const playHover  = useCallback(() => { if (soundEnabled) fire(HOVER.frequency,  HOVER.duration,  HOVER.gain,  HOVER.wave);  }, [soundEnabled]);
  const playClick  = useCallback(() => { if (soundEnabled) fire(CLICK.frequency,  CLICK.duration,  CLICK.gain,  CLICK.wave);  }, [soundEnabled]);

  return { playTyping, playHover, playClick };
}

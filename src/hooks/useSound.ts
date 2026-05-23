import { useCallback, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

type SoundConfig = {
  frequency: number;
  duration: number;
  gain: number;
};

const TYPING: SoundConfig = { frequency: 800, duration: 0.03, gain: 0.25 };
const HOVER: SoundConfig  = { frequency: 600, duration: 0.02, gain: 0.15 };
const CLICK: SoundConfig  = { frequency: 400, duration: 0.05, gain: 0.25 };

export function useSound() {
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const ctxRef = useRef<AudioContext | null>(null);

  function getCtx(): AudioContext {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }

  function play({ frequency, duration, gain }: SoundConfig) {
    if (!soundEnabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(gain, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);

      osc.onended = () => {
        osc.disconnect();
        gainNode.disconnect();
      };
    } catch {
      // AudioContext blocked or unavailable — silent fail
    }
  }

  const playTyping = useCallback(() => play(TYPING), [soundEnabled]);
  const playHover  = useCallback(() => play(HOVER),  [soundEnabled]);
  const playClick  = useCallback(() => play(CLICK),  [soundEnabled]);

  return { playTyping, playHover, playClick };
}

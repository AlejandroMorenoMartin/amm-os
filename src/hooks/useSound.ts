import { useCallback } from 'react';
import { Howl, Howler } from 'howler';
import { useAppStore } from '../store/useAppStore';

function unlockAudio() {
  if (Howler.ctx && Howler.ctx.state === 'suspended') {
    Howler.ctx.resume();
  }
}
document.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
document.addEventListener('click', unlockAudio, { once: true });

const clickSound = new Howl({
  src: ['/sounds/click.wav'],
  volume: 0.5,
  preload: true,
  sprite: { key: [100, 300] },
});
const typingSound = new Howl({
  src: ['/sounds/typing.wav'],
  volume: 0.5,
  rate: 0.8,
  preload: true,
  sprite: { key: [0, 150] },
});

export function useSound() {
  const soundEnabled = useAppStore((s) => s.soundEnabled);

  const playTyping = useCallback(() => { if (soundEnabled) typingSound.play('key'); }, [soundEnabled]);
  const playClick  = useCallback(() => { if (soundEnabled) clickSound.play('key'); }, [soundEnabled]);

  return { playTyping, playClick };
}

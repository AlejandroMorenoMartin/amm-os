import { useCallback } from 'react';
import { Howl } from 'howler';
import { useAppStore } from '../store/useAppStore';

const clickSound = new Howl({
  src: ['/sounds/click.wav'],
  volume: 0.5,
  preload: true,
  sprite: { key: [100, 300] },
});
const typingSound = new Howl({
  src: ['/sounds/typing.wav'],
  volume: 0.3,
  preload: true,
  sprite: { key: [0, 150] },
});

export function useSound() {
  const soundEnabled = useAppStore((s) => s.soundEnabled);

  const playTyping = useCallback(() => { if (soundEnabled) typingSound.play('key'); }, [soundEnabled]);
  const playClick  = useCallback(() => { if (soundEnabled) clickSound.play('key'); }, [soundEnabled]);

  return { playTyping, playClick };
}

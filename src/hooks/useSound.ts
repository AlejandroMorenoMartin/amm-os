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

export function playTyping() {
  if (!useAppStore.getState().soundEnabled) return;
  if (Howler.ctx?.state === 'suspended') return;
  typingSound.play('key');
}

export function playClick() {
  if (!useAppStore.getState().soundEnabled) return;
  const ctx = Howler.ctx;
  if (ctx?.state === 'suspended') ctx.resume().then(() => clickSound.play('key'));
  else clickSound.play('key');
}

export function useSound() {
  return { playTyping, playClick };
}

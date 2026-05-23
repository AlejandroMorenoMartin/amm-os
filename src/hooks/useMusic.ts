import { useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { useAppStore } from '../store/useAppStore';

const music = new Howl({
  src: ['/ambient.mp3'],
  loop: true,
  volume: 1,
  preload: true,
  html5: true,
  onloaderror: (_id, err) => console.error('[useMusic] load error:', err),
  onplayerror: (_id, err) => {
    console.error('[useMusic] play error:', err);
    Howler.ctx?.resume().then(() => music.play());
  },
});

function tryPlay() {
  if (Howler.ctx?.state === 'suspended') {
    Howler.ctx.resume().then(() => music.play());
  } else {
    music.play();
  }
}

export function useMusic() {
  const { musicEnabled, volume } = useAppStore();
  const playingRef = useRef(false);

  useEffect(() => {
    Howler.volume(useAppStore.getState().volume);
  }, []);

  useEffect(() => {
    Howler.volume(volume);
  }, [volume]);

  useEffect(() => {
    if (!musicEnabled) {
      if (playingRef.current) {
        music.pause();
        playingRef.current = false;
      }
      return;
    }

    if (playingRef.current) return;

    // Si el contexto ya está corriendo, reproducir directamente
    if (!Howler.ctx || Howler.ctx.state === 'running') {
      tryPlay();
      playingRef.current = true;
      return;
    }

    // Contexto suspendido — esperar primera interacción
    function onInteraction() {
      if (!useAppStore.getState().musicEnabled) return;
      tryPlay();
      playingRef.current = true;
    }

    document.addEventListener('click', onInteraction, { once: true });
    document.addEventListener('keydown', onInteraction, { once: true });

    return () => {
      document.removeEventListener('click', onInteraction);
      document.removeEventListener('keydown', onInteraction);
    };
  }, [musicEnabled]);
}

import { useEffect } from 'react';
import { useSound } from './useSound';

export function useSoundListeners() {
  const { playClick } = useSound();

  useEffect(() => {
    function getInteractiveTarget(e: Event): Element | null {
      const target = e.target as Element | null;
      return target?.closest('[data-sound="interactive"]') ?? null;
    }

    function onClick(e: Event) {
      if (getInteractiveTarget(e)) playClick();
    }

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [playClick]);
}

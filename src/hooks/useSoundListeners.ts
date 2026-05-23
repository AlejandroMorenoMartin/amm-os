import { useEffect } from 'react';
import { useSound } from './useSound';

export function useSoundListeners() {
  const { playHover, playClick } = useSound();

  useEffect(() => {
    function getInteractiveTarget(e: Event): Element | null {
      const target = e.target as Element | null;
      return target?.closest('[data-sound="interactive"]') ?? null;
    }

    function onMouseOver(e: Event) {
      if (getInteractiveTarget(e)) playHover();
    }

    function onClick(e: Event) {
      if (getInteractiveTarget(e)) playClick();
    }

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('click', onClick);
    };
  }, [playHover, playClick]);
}

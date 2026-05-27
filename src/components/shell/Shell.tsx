import { useEffect, useRef, useState } from 'react';
import { TopBar } from './TopBar';
import { BottomBar } from './BottomBar';
import { useSoundListeners } from '../../hooks/useSoundListeners';
import { useMusic } from '../../hooks/useMusic';
interface ShellProps {
  children: React.ReactNode;
  hideBars?: boolean;
  hideCtrl?: boolean;
  hideBottomBar?: boolean;
  bottomSlot?: React.ReactNode;
}

export function Shell({ children, hideBars = false, hideCtrl = false, hideBottomBar = false, bottomSlot }: ShellProps) {
  const topRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLElement>(null);
  const [topH, setTopH] = useState(48);
  const [bottomH, setBottomH] = useState(80);

  useSoundListeners();
  useMusic();

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (topRef.current) setTopH(topRef.current.getBoundingClientRect().height);
      if (bottomRef.current) setBottomH(bottomRef.current.getBoundingClientRect().height);
    });
    if (topRef.current) obs.observe(topRef.current);
    if (bottomRef.current) obs.observe(bottomRef.current);
    return () => obs.disconnect();
  }, []);

  const barsStyle: React.CSSProperties = hideBars ? { visibility: 'hidden' } : {};

  return (
    <div className="flex flex-col min-h-dvh bg-background font-mono">
      <TopBar ref={topRef} style={barsStyle} hideCtrl={hideCtrl} />


{hideBars ? (
        <div className="flex-1 flex justify-center">
          <main className="w-full flex flex-col" style={{ maxWidth: 'var(--shell-max-width)', paddingInline: 'var(--shell-padding)', paddingBlock: '2rem' }}>
            {children}
          </main>
        </div>
      ) : (
        <div
          className="flex-1 flex justify-center relative"
          style={{
            paddingTop: `calc(${topH}px + 3rem)`,
            paddingBottom: (hideBottomBar || bottomSlot) ? '3rem' : `calc(${bottomH}px + 3rem)`,
            alignItems: hideBottomBar ? 'stretch' : undefined,
          }}
        >
          {/* Fade vignette — top */}
          <div
            aria-hidden="true"
            style={{
              position: 'fixed',
              top: topH,
              left: 0,
              right: 0,
              height: '3rem',
              background: 'linear-gradient(to bottom, var(--color-background) 0%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 40,
            }}
          />
          {/* Fade vignette — bottom */}
          <div
            aria-hidden="true"
            style={{
              position: 'fixed',
              bottom: bottomH,
              left: 0,
              right: 0,
              height: '3rem',
              background: 'linear-gradient(to top, var(--color-background) 0%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 40,
            }}
          />
          <main className="w-full flex flex-col" style={{ maxWidth: 'var(--shell-max-width)', gap: 'var(--gap-page)', paddingInline: '0.75rem', height: hideBottomBar ? '100%' : undefined }}>
            {children}
          </main>
        </div>
      )}

      {!hideBottomBar && (bottomSlot ?? <BottomBar ref={bottomRef} style={barsStyle} />)}
    </div>
  );
}

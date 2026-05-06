import { useEffect, useRef, useState } from 'react';
import { TopBar } from './TopBar';
import { BottomBar } from './BottomBar';
interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const topRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLElement>(null);
  const [topH, setTopH] = useState(48);
  const [bottomH, setBottomH] = useState(48);

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (topRef.current) setTopH(topRef.current.getBoundingClientRect().height);
      if (bottomRef.current) setBottomH(bottomRef.current.getBoundingClientRect().height);
    });
    if (topRef.current) obs.observe(topRef.current);
    if (bottomRef.current) obs.observe(bottomRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-dvh bg-background font-mono">
      <TopBar ref={topRef} />
      <div
        className="flex-1 flex justify-center relative"
        style={{
          paddingTop: `calc(${topH}px + 2rem)`,
          paddingBottom: `calc(${bottomH}px + 2rem)`,
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
        <main className="w-full flex flex-col overflow-y-auto" style={{ maxWidth: 'var(--shell-max-width)', gap: 'var(--gap-page)', paddingInline: 'var(--shell-padding)' }}>
          {children}
        </main>
      </div>
      <BottomBar ref={bottomRef} />
    </div>
  );
}

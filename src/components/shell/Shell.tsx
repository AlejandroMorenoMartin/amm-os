import { useEffect, useRef, useState } from 'react';
import { TopBar } from './TopBar';
import { BottomBar } from './BottomBar';
import { useSoundListeners } from '../../hooks/useSoundListeners';
interface ShellProps {
  children: React.ReactNode;
  hideBars?: boolean;
}

export function Shell({ children, hideBars = false }: ShellProps) {
  const topRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLElement>(null);
  const [topH, setTopH] = useState(48);
  const [bottomH, setBottomH] = useState(48);

  useSoundListeners();

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
      <TopBar ref={topRef} style={barsStyle} />


{hideBars ? (
        <div className="flex-1 flex justify-center">
          <main className="w-full flex flex-col" style={{ maxWidth: 'var(--shell-max-width)', paddingInline: 'var(--shell-padding)', paddingBlock: '2rem' }}>
            {children}
          </main>
        </div>
      ) : (
        <div
          className="flex-1 flex justify-center"
          style={{
            paddingTop: `calc(${topH}px + 2rem)`,
            paddingBottom: `calc(${bottomH}px + 2rem)`,
          }}
        >
          <main className="w-full flex flex-col overflow-y-auto" style={{ maxWidth: 'var(--shell-max-width)', gap: 'var(--gap-page)', paddingInline: 'var(--shell-padding)' }}>
            {children}
          </main>
        </div>
      )}

      <BottomBar ref={bottomRef} style={barsStyle} />
    </div>
  );
}

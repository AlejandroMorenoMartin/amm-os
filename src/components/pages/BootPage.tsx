import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../i18n';

interface BootPageProps {
  onComplete: () => void;
}

export function BootPage({ onComplete }: BootPageProps) {
  const { lang } = useAppStore();
  const { t } = useT();
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);
  const called = useRef(false);

  const lines = [t.boot.line1, t.boot.line2, t.boot.line3, t.boot.line4, t.boot.line5, t.boot.line6];
  const delay = 1500 / lines.length;

  function finish() {
    if (called.current) return;
    called.current = true;
    setDone(true);
    onComplete();
  }

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === lines.length - 1) {
          timers.push(setTimeout(finish, 400));
        }
      }, delay * (i + 1)));
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setVisibleLines(lines.length);
        finish();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <div className="flex-1 flex flex-col font-mono" style={{ height: '100%' }}>
      {/* Top: label + lines */}
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <p className="text-txt-xs" style={{ color: 'var(--color-zinc-600)' }}>
          AMM_OS_V5
        </p>
        {lines.slice(0, visibleLines).map((line, i) => {
          const spaceIdx = line.lastIndexOf(' ');
          const body = spaceIdx !== -1 ? line.slice(0, spaceIdx) : line;
          const suffix = spaceIdx !== -1 ? line.slice(spaceIdx + 1) : '';
          return (
            <p key={i} className="text-txt-s">
              {body}{suffix && <> <span className="text-txt-base">{suffix}</span></>}
            </p>
          );
        })}
      </div>

      {/* Bottom: progress bar + skip */}
      <div className="flex flex-col" style={{ marginTop: 'auto', gap: 'var(--gap-block)' }}>
        <div aria-hidden="true" style={{ height: '2px', background: 'var(--color-zinc-800)' }}>
          <div
            style={{
              height: '100%',
              width: `${(visibleLines / lines.length) * 100}%`,
              background: 'var(--color-zinc-400)',
              transition: 'width 300ms ease',
            }}
          />
        </div>
        {!done && (
          <>
            <p className="text-txt-xs" style={{ color: 'var(--color-zinc-600)' }} aria-hidden="true">
              PRESS ENTER TO SKIP
            </p>
            <span className="sr-only">{t.boot.skip}</span>
          </>
        )}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../i18n';
import { PreloadShell } from '../shell/PreloadShell';

interface BootPageProps {
  onComplete: () => void;
}

export function BootPage({ onComplete }: BootPageProps) {
  const { lang } = useAppStore();
  const { t } = useT();
  const [visibleLines, setVisibleLines] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const called = useRef(false);

  const lines = [t.boot.line1, t.boot.line2, t.boot.line3, t.boot.line4, t.boot.line5, t.boot.line6, t.boot.line7];
  const delay = 2500 / lines.length;

  function finish() {
    if (called.current) return;
    called.current = true;
    onComplete();
  }

  function skipToEnd() {
    setVisibleLines(lines.length);
    setAllDone(true);
  }

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === lines.length - 1) {
          timers.push(setTimeout(() => setAllDone(true), 400));
        }
      }, delay * (i + 1)));
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (!allDone) { skipToEnd(); } else { finish(); }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, allDone]);

  return (
    <PreloadShell>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        {lines.slice(0, visibleLines).map((line, i) => {
          const okIdx = line.lastIndexOf('[OK]');
          const body = okIdx !== -1 ? line.slice(0, okIdx).trimEnd() : line;
          const hasOk = okIdx !== -1;
          return (
            <p key={i} className="text-txt-s">
              {body}{hasOk && <> <span className="text-txt-base">[OK]</span></>}
            </p>
          );
        })}
      </div>

      {allDone && (
        <div className="flex" style={{ gap: 'var(--gap-block)' }}>
          <button type="button" onClick={finish} className="btn-secondary font-mono" data-sound="interactive">[SKIP]</button>
          <button type="button" onClick={finish} className="btn-secondary font-mono" style={{ color: 'var(--color-blue-500)', borderColor: 'var(--color-blue-500)' }} data-sound="interactive">[CONTINUE]</button>
        </div>
      )}
    </PreloadShell>
  );
}

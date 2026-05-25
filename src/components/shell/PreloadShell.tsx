import { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';

function getSessionStamp(locale: string) {
  const now = new Date();
  const weekday = now.toLocaleDateString(locale, { weekday: 'long' });
  const month = now.toLocaleDateString(locale, { month: 'long' });
  const day = now.getDate();
  const year = now.getFullYear();
  return `${weekday} ${month} ${day}, ${year}`;
}

function getTimeStamp(locale: string) {
  const now = new Date();
  return now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

interface PreloadShellProps {
  children: React.ReactNode;
}

export function PreloadShell({ children }: PreloadShellProps) {
  const lang = useAppStore((s) => s.lang);
  const locale = lang === 'es' ? 'es-ES' : 'en-US';
  const [sessionDate, setSessionDate] = useState(() => getSessionStamp(locale));
  const [sessionTime, setSessionTime] = useState(() => getTimeStamp(locale));

  useEffect(() => {
    setSessionDate(getSessionStamp(locale));
  }, [locale]);

  useEffect(() => {
    const interval = setInterval(() => setSessionTime(getTimeStamp(locale)), 1000);
    return () => clearInterval(interval);
  }, [locale]);

  return (
    <div className="flex-1 flex flex-col font-mono" style={{ height: '100%', gap: 'var(--gap-page)' }}>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <p className="text-txt-s">{sessionDate}</p>
        <p className="text-txt-s" style={{ color: 'var(--color-zinc-500)' }}>{sessionTime}</p>
        <p className="text-txt-s" style={{ color: 'var(--color-zinc-500)' }}>{lang === 'es' ? 'Madrid, España' : 'Madrid, Spain'}</p>
      </div>

      {children}
    </div>
  );
}

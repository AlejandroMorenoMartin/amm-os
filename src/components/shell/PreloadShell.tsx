import { useState } from 'react';

function getSessionStamp() {
  const now = new Date();
  const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
  const month = now.toLocaleDateString('en-US', { month: 'long' });
  const day = now.getDate();
  const year = now.getFullYear();
  return `${weekday} ${month} ${day}, ${year}`;
}

function getTimeStamp() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

interface PreloadShellProps {
  children: React.ReactNode;
}

export function PreloadShell({ children }: PreloadShellProps) {
  const [sessionDate] = useState(getSessionStamp);
  const [sessionTime] = useState(getTimeStamp);

  return (
    <div className="flex-1 flex flex-col font-mono" style={{ height: '100%', gap: 'var(--gap-page)' }}>
      {/* Static header */}
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <p className="text-txt-s">{sessionDate}</p>
        <p className="text-txt-s" style={{ color: 'var(--color-zinc-500)' }}>{sessionTime}</p>
        <p className="text-txt-s" style={{ color: 'var(--color-zinc-500)' }}>Madrid, Spain</p>
      </div>

      {/* Page content */}
      {children}
    </div>
  );
}

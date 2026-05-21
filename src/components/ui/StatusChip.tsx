type Status = 'Live' | 'Beta' | 'In Progress' | 'Paused' | 'Archived';

interface StatusChipProps {
  status: string;
}

export function StatusChip({ status }: StatusChipProps) {
  const normalized = status as Status;

  const colorMap: Record<Status, string> = {
    'Live':        'var(--color-green)',
    'Beta':        'var(--color-yellow)',
    'In Progress': 'var(--color-cyan)',
    'Paused':      'var(--color-zinc-500)',
    'Archived':    'var(--color-zinc-700)',
  };

  const color = colorMap[normalized] ?? 'var(--color-zinc-500)';

  return <span className="text-txt-base" style={{ color }}>{status}</span>;
}

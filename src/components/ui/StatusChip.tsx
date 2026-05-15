type Status = 'Live' | 'Beta' | 'In Progress' | 'Paused' | 'Archived';

interface StatusChipProps {
  status: string;
}

export function StatusChip({ status }: StatusChipProps) {
  const normalized = status as Status;

  const classMap: Record<Status, string> = {
    'Live':        'chip status-chip--live',
    'Beta':        'chip status-chip--beta',
    'In Progress': 'chip status-chip--in-progress',
    'Paused':      'chip status-chip--paused',
    'Archived':    'chip status-chip--archived',
  };

  const cls = classMap[normalized] ?? 'chip status-chip--paused';

  return <span className={cls}>{status}</span>;
}

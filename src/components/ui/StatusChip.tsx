type Status = 'Live' | 'Beta' | 'In Progress' | 'Paused' | 'Archived';

interface StatusChipProps {
  status: string;
}

export function StatusChip({ status }: StatusChipProps) {
  const normalized = status as Status;

  const classMap: Record<Status, string> = {
    'Live':        'status-chip status-chip--live',
    'Beta':        'status-chip status-chip--beta',
    'In Progress': 'status-chip status-chip--in-progress',
    'Paused':      'status-chip status-chip--paused',
    'Archived':    'status-chip status-chip--archived',
  };

  const cls = classMap[normalized] ?? 'status-chip status-chip--paused';

  return <span className={cls}>{status}</span>;
}

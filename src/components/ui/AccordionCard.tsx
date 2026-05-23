interface AccordionCardProps {
  id: string;
  open: boolean;
  onToggle: (id: string) => void;
  label: string;
  children: React.ReactNode;
}

export function AccordionCard({ id, open, onToggle, label, children }: AccordionCardProps) {
  return (
    <div
      className={`skill-card${open ? ' skill-card--open' : ''}`}
      onClick={() => onToggle(id)}
      data-sound="interactive"
      style={{ cursor: 'pointer' }}
    >
      <div className="flex items-center justify-between skill-group-btn" style={{ padding: '0.5rem 1rem' }}>
        <span>{label}</span>
        <span style={{ flexShrink: 0, marginLeft: '1rem' }}>{open ? '[-]' : '[+]'}</span>
      </div>

      {open && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-section)', padding: '0.5rem 1rem 1rem' }}>
          {children}
        </div>
      )}
    </div>
  );
}

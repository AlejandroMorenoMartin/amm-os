import { useState } from 'react';

interface AccordionCardProps {
  id: string;
  open?: boolean;
  onToggle?: (id: string) => void;
  label: React.ReactNode;
  children: React.ReactNode;
  variant?: 'default' | 'neutral';
}

export function AccordionCard({ id, open: openProp, onToggle, label, children, variant = 'default' }: AccordionCardProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const controlled = onToggle !== undefined && openProp !== undefined;
  const open = controlled ? openProp : internalOpen;

  const handleToggle = () => {
    if (controlled) onToggle!(id);
    else setInternalOpen((v) => !v);
  };

  const cardClass = `skill-card${variant === 'neutral' ? ' skill-card--neutral' : ''}${open ? ' skill-card--open' : ''}`;

  return (
    <div
      className={cardClass}
      onClick={handleToggle}
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

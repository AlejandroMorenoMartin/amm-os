interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="text-txt-s uppercase w-full" style={{ paddingBottom: '0.5rem', borderBottom: 'var(--border-default)', display: 'block' }}>
      {children}
    </span>
  );
}

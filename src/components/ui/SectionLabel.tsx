interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <h2 className="font-mono text-txt-s uppercase w-full" style={{ paddingBottom: '0.5rem', borderBottom: 'var(--border-default)' }}>
      [{children}]
    </h2>
  );
}

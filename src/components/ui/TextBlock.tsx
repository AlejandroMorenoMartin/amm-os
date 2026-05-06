interface TextBlockProps {
  children: React.ReactNode;
}

export function TextBlock({ children }: TextBlockProps) {
  return (
    <div className="flex flex-col items-start" style={{ gap: 'var(--gap-block)' }}>
      {children}
    </div>
  );
}

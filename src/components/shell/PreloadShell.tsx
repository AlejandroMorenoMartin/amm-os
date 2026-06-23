interface PreloadShellProps {
  children: React.ReactNode;
}

export function PreloadShell({ children }: PreloadShellProps) {
  return (
    <div className="flex-1 flex flex-col font-mono" style={{ height: '100%', gap: 'var(--gap-page)' }}>
      {children}
    </div>
  );
}

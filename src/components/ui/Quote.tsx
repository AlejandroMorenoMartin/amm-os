interface QuoteProps {
  text: string;
  author?: string;
}

export function Quote({ text, author }: QuoteProps) {
  return (
    <div style={{ borderLeft: '2px solid var(--color-blue-500)', paddingLeft: '0.75rem', display: 'flex', flexDirection: 'column', gap: 'var(--gap-block)' }}>
      <span className="text-txt-base" style={{ color: 'var(--color-zinc-300)', fontStyle: 'italic' }}>{text}</span>
      {author && <span className="text-txt-xs">{author}</span>}
    </div>
  );
}

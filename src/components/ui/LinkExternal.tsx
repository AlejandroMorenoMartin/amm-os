import { useFocused } from '../../hooks/useFocused';

interface LinkExternalProps {
  href: string;
  children: React.ReactNode;
}

export function LinkExternal({ href, children }: LinkExternalProps) {
  const { focused, focusProps } = useFocused();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-txt-base link-external"
      {...focusProps}
    >
      {focused ? '> ' : ''}{children} ↗
    </a>
  );
}

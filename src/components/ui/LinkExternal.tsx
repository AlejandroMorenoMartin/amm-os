import { useFocused } from '../../hooks/useFocused';

interface LinkExternalProps {
  href: string;
  children: React.ReactNode;
  tooltip?: string;
}

export function LinkExternal({ href, children, tooltip }: LinkExternalProps) {
  const { focused, focusProps } = useFocused();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-mono text-txt-base link-external${tooltip ? ' has-tooltip' : ''}`}
      {...focusProps}
    >
      {focused ? '> ' : ''}{children} ↗
      {tooltip && <span className="tooltip">{tooltip}</span>}
    </a>
  );
}

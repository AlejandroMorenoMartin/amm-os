import { useFocused } from '../../hooks/useFocused';
import type { Lang } from '../../store/useAppStore';

interface BtnLangProps {
  code: Lang;
  activeLang: Lang;
  onClick: (lang: Lang) => void;
}

export function BtnLang({ code, activeLang, onClick }: BtnLangProps) {
  const isActive = activeLang === code;
  const { focused, focusProps } = useFocused();

  return (
    <button
      onClick={() => onClick(code)}
      className={`btn-nav ${isActive ? 'btn-nav--active' : ''}`}
      aria-pressed={isActive}
      {...focusProps}
    >
      {focused ? '> ' : ''}[{code.toUpperCase()}]
    </button>
  );
}

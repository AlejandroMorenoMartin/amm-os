import { useFocused } from '../../hooks/useFocused';
import { useT } from '../../i18n';

interface BtnOpenProps {
  onClick?: () => void;
  disabled?: boolean;
}

export function BtnOpen({ onClick, disabled = false }: BtnOpenProps) {
  const { focused, focusProps } = useFocused();
  const { t } = useT();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-action btn-action--primary w-fit has-tooltip"
      {...focusProps}
    >
      {focused ? '> ' : ''}[OPEN]
      <span className="tooltip">{t.trabajo.tooltipOpen}</span>
    </button>
  );
}

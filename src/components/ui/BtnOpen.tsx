import { useFocused } from '../../hooks/useFocused';

interface BtnOpenProps {
  onClick?: () => void;
  disabled?: boolean;
}

export function BtnOpen({ onClick, disabled = false }: BtnOpenProps) {
  const { focused, focusProps } = useFocused();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-action btn-action--primary w-fit"
      {...focusProps}
    >
      {focused ? '> ' : ''}[OPEN]
    </button>
  );
}

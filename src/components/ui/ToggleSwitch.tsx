interface ToggleOption<T extends string> {
  label: string;
  value: T;
}

interface ToggleSwitchProps<T extends string> {
  options: [ToggleOption<T>, ToggleOption<T>];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
  activeColor?: string;
  activeTextColor?: string;
}

export function ToggleSwitch<T extends string>({ options, value, onChange, ariaLabel, activeColor = 'var(--color-blue-500)', activeTextColor = 'var(--color-blue-950)' }: ToggleSwitchProps<T>) {
  const [a, b] = options;
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="font-mono"
      style={{
        display: 'inline-flex',
        width: 'calc(2 * 3.5rem + var(--gap-block))',
        border: 'var(--border-default)',
        overflow: 'hidden',
      }}
    >
      {[a, b].map((opt, i) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            data-sound="interactive"
            aria-pressed={active}
            style={{
              flex: 1,
              height: '34.3px',
              fontSize: '14px',
              fontFamily: 'inherit',
              cursor: 'pointer',
              border: 'none',
              borderLeft: i === 1 ? 'var(--border-default)' : undefined,
              background: active ? activeColor : 'transparent',
              color: active ? activeTextColor : 'var(--color-zinc-400)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 150ms, color 150ms',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

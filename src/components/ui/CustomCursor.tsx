import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'hover' | 'active';

const FILL: Record<CursorState, string> = {
  default: '#010816',
  hover:   '#061A3F',
  active:  '#0086FF',
};

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [role="button"], [tabindex]');
      if (state !== 'active') setState(clickable ? 'hover' : 'default');
    };

    const onDown = () => setState('active');
    const onUp   = () => setState('default');

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
    };
  }, [state]);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        transform: 'translate(-100px, -100px)',
      }}
    >
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          transform: state === 'active' ? 'scale(0.9)' : 'scale(1)',
          transition: state === 'active'
            ? 'transform 0.08s ease-out'
            : 'transform 0.15s ease-out',
        }}
      >
        <path
          d="M1 1L1 16L5.5 11.5L8.5 18L11 17L8 10.5L14 10.5L1 1Z"
          fill={FILL[state]}
          stroke="#E4E4E7"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

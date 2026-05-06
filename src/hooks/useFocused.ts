import { useRef, useState } from 'react';

export function useFocused() {
  const [focused, setFocused] = useState(false);
  const mouseDown = useRef(false);

  const focusProps = {
    onMouseDown: () => { mouseDown.current = true; },
    onMouseUp: () => { mouseDown.current = false; },
    onFocus: () => { if (!mouseDown.current) setFocused(true); },
    onBlur: () => setFocused(false),
  };

  return { focused, focusProps };
}

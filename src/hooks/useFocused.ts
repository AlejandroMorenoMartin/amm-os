import { useState } from 'react';

export function useFocused() {
  const [focused, setFocused] = useState(false);

  const focusProps = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return { focused, focusProps };
}

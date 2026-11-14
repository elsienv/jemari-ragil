import { useCallback } from 'react';

export function useScrollToSection(id, { focus = false } = {}) {
  return useCallback(
    (event) => {
      event?.preventDefault();
      const element = document.getElementById(id);
      if (!element) return;
      if (focus) element.focus({ preventScroll: true });
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    },
    [id, focus],
  );
}

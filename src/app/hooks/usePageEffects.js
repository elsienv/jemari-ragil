import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { routes } from '../config/routes';

export function usePageEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const route = routes.find((entry) => matchPath(entry.path, pathname));
    document.title = (route?.title || 'Jelajahi koleksi') + ' — Jemari Ragil';
  }, [pathname]);
}

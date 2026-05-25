import { useEffect } from 'react';

const BASE = 'AMM-OS · Alejandro Moreno Martín · AI Product Designer';

export function usePageTitle(section?: string) {
  useEffect(() => {
    document.title = section ? `${section} · ${BASE}` : BASE;
    return () => { document.title = BASE; };
  }, [section]);
}

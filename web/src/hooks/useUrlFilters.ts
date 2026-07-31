import { useState, useEffect, useCallback } from 'react';

export interface UrlFilterState {
  python: string | null;
  torch: string | null;
  cuda: string | null;
  query: string;
  pkg: string | null;
}

function readUrlParams(): UrlFilterState {
  const params = new URLSearchParams(window.location.search);
  return {
    python: params.get('python'),
    torch: params.get('torch'),
    cuda: params.get('cuda'),
    query: params.get('q') || '',
    pkg: params.get('pkg'),
  };
}

function writeUrlParams(state: UrlFilterState): void {
  const params = new URLSearchParams();
  if (state.python) params.set('python', state.python);
  if (state.torch) params.set('torch', state.torch);
  if (state.cuda) params.set('cuda', state.cuda);
  if (state.query) params.set('q', state.query);
  if (state.pkg) params.set('pkg', state.pkg);

  const newUrl = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;

  window.history.replaceState(null, '', newUrl);
}

export function useUrlFilters(): {
  filters: UrlFilterState;
  updateFilters: (updates: Partial<UrlFilterState>) => void;
} {
  const [filters, setFilters] = useState<UrlFilterState>(readUrlParams);

  const updateFilters = useCallback((updates: Partial<UrlFilterState>) => {
    setFilters((prev) => {
      const next = { ...prev, ...updates };
      writeUrlParams(next);
      return next;
    });
  }, []);

  // Sync on browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setFilters(readUrlParams());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return { filters, updateFilters };
}

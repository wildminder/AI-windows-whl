import { useState, useEffect, useCallback } from 'react';
import type { WheelsData } from '@/types';
import { loadWheelsData } from '@/utils';

// Re-export usePerformance from separate file
export { usePerformance, PerformanceProvider } from './usePerformance';

interface UseWheelsReturn {
  data: WheelsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useWheels(): UseWheelsReturn {
  const [data, setData] = useState<WheelsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const wheelsData = await loadWheelsData();
      setData(wheelsData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error occurred while loading wheels data');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  debouncedQuery: string;
}

export function useSearch(initialQuery = '', debounceMs = 300): UseSearchReturn {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  return { query, setQuery, debouncedQuery };
}

import { useState, useEffect, useCallback } from 'react';
import type { WheelsData, Package } from '@/types';
import { loadWheelsData, filterWheels } from '@/utils';

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

interface UseFilterOptions {
  packages: Package[];
  searchQuery: string;
  pythonVersion: string | null;
  torchVersion: string | null;
  cudaVersion: string | null;
  selectedPackage: string | null;
}

interface UseFilterReturn {
  filteredPackages: Package[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export function useFilter(options: UseFilterOptions): UseFilterReturn {
  const { packages, searchQuery, pythonVersion, torchVersion, cudaVersion, selectedPackage } =
    options;

  const filteredPackages = filterWheels(packages, {
    searchQuery,
    pythonVersion: pythonVersion || undefined,
    torchVersion: torchVersion || undefined,
    cudaVersion: cudaVersion || undefined,
    packageId: selectedPackage || undefined,
  });

  const hasActiveFilters =
    searchQuery !== '' ||
    pythonVersion !== null ||
    torchVersion !== null ||
    cudaVersion !== null ||
    selectedPackage !== null;

  const clearFilters = useCallback(() => {
    // This is a placeholder - actual implementation should be handled by the component state
    console.log('Clear filters called');
  }, []);

  return { filteredPackages, hasActiveFilters, clearFilters };
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

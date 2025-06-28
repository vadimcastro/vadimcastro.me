// src/lib/api/hooks.ts
'use client';

import { useState, useEffect } from 'react';
import { useProtectedApi } from './protected';

interface UseProtectedFetchResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => void;
}

export function useProtectedFetch<T>(endpoint: string): UseProtectedFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const { get } = useProtectedApi();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await get<T>(endpoint);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const refetch = () => {
    fetchData();
  };

  return { data, error, loading, refetch };
}
// src/lib/api/hooks.ts
import { useState, useEffect } from 'react';
import { useProtectedApi } from './protected';
import { ApiResponse } from './types';

export function useProtectedFetch<T>(endpoint: string) {
  const { get } = useProtectedApi();
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<T>(endpoint);
        setState({ data, error: null, loading: false });
      } catch (err) {
        setState({
          data: null,
          error: {
            message: err instanceof Error ? err.message : 'An error occurred',
            status: 500
          },
          loading: false
        });
      }
    };

    fetchData();
  }, [endpoint, get]);

  return state;
}